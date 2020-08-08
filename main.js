//==================== ui board set-up ====================//

let bars = []; //used as temp array for creating HTML bars
let numOfBars = 140;
let pauseTime = 30;
let barWidth = 0.5;
let timer; //for disabling UI
let $container = document.querySelector(".main-container");
let $randomiser = document.querySelector(".button-randomise");
let $sorter = document.querySelector(".button-sort");
let $bars = document.getElementsByClassName("bar");
let $size = document.querySelector(".bars-range");
let $sortTypes = document.getElementsByName("sort-type");
let $labels = document.getElementsByClassName("labels");
let $type;
let yellow = "#f8e9a1";
let red = "#f76c6c";
let darkBlue = "#374785"
let white = "#fff";


//default bars
// for (let i = 0; i < numOfBars; i++) {
//     let $newBar = document.createElement("div");
//     $newBar.style.height = `${Math.random() * 90}%`;
//     $newBar.style.width = `${barWidth}%`;
//     $newBar.className = "bar";
//     bars.push($newBar);
//     $container.append($newBar);
// }

//bars of evenly distributed height
async function barsUniform() {
    for (let i = 0; i < numOfBars; i++) {
        let $newBar = document.createElement("div");
        $newBar.style.height = `${100 / numOfBars * i}%`;
        $newBar.style.width = `${barWidth}%`;
        $newBar.className = "bar";
        await bars.push($newBar);
    }

    for (let i = 0; i < numOfBars; i++) {
        $container.append(bars.splice([Math.floor(Math.random() * bars.length)], 1)[0]);
    }
}
barsUniform();

//'extend' click from radio buttons to adjacent labels
for (let i = 0; i < $labels.length; i++) {
    $labels[i].addEventListener("click", function() {
        $sortTypes[i].checked = true;
    });    
}

//loops through radio buttons to find the value of the checked one
function determineSorter() {
    for (let i = 0; i < $sortTypes.length; i++) {
        if ($sortTypes[i].checked) {
            $type = $sortTypes[i].value;
            break;
        }
    }
}

//populates container with bars
function setBars() {
    $container.innerHTML = "";
    buckets = [];

    $size.value <= 15 ? pauseTime = 800
        : $size.value <= 35 ? pauseTime = 100
        : pauseTime = 30;

    $size.value <= 120 ? barWidth = 70/$size.value
        : barWidth = 0.5;

    barsUniform();
}

//adjust number of bars in container
$size.addEventListener("input", function() {
    numOfBars = $size.value;
    setBars();
});

$randomiser.addEventListener("click", function() {
    setBars();
});

$sorter.addEventListener("click", function() {
    $bars = document.getElementsByClassName("bar");

    // disable buttons when sorter runs
    $size.disabled = true;
    $randomiser.disabled = true;
    $sorter.disabled = true;

    determineSorter(); 

    $type === "quick" ? quickSort($bars) 
        : $type === "merge" ? mergeSort(Array.from($bars))
        : bucketSort(Array.from($bars));
});

//used for visualisation
function pause() {
    return new Promise(resolve => setTimeout(resolve, pauseTime));
}

//clears timer for re-enabling of buttons
function timerReset() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        $size.disabled = false;
        $randomiser.disabled = false;
        $sorter.disabled = false;
    }, 2000);
}



//==================== quick sort ====================//



//visual: last bar pink, all bars before yellow, yellow to white as loop runs, last bar to new index + white


//taking pivot as last element
//done when start index = end index i.e. no array left to sort
async function quickSort(arr, start = 0 , end = arr.length - 1) {
    if (start >= end) return;
    
    $bars[end].style.background = "#f76c6c";
    let index = await partition(arr, start, end);

    quickSort(arr, index + 1, end); //starts sorting for bigger half
    quickSort(arr, start, index - 1); //start sorting for smaller half
}


//find index of where the pivot number lands
async function partition(arr, start, end) {
    let index = start;
    let pivotValue = parseFloat(arr[end].style.height);
    
    //color all before [end] yellow
    for (let i = start; i < end; i++) {
        $bars[i].style.background = yellow;   
    }

    for (let i = start; i < end; i++) {
        await pause()
        $bars[i].style.background = "#fff";

        timerReset();

        if (parseFloat(arr[i].style.height) < pivotValue) {
            swap(arr, index, i)
            index++;
        }
    }
    await pause()
    $bars[end].style.background = "#fff";
    swap(arr, index, end)
    return index;
}


//swap bars at index i and j, where i > j
//insertBefore will remove the 1st node
function swap(arr, i, j) {
    $container.insertBefore($container.childNodes[j], $container.childNodes[i]);
}



//==================== merge sort ====================//



//visual: last bar of both array red, rest white, while comparing white => yellow, rearrange sweep white

async function mergeSort(arr) {
    if  (arr.length <= 1) return arr;

    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);

    let leftSorted = await mergeSort(left);
    let rightSorted = await mergeSort(right);

    //returns a sorted array to the previous mergeSort call i.e. leftSorted / rightSorted
    let mergedArr = await merge(leftSorted, rightSorted);

    return mergedArr;
}


//merges 2 sorted arrays
async function merge(arr1, arr2) {
    let finalArr = [];
    let indexOffset = Array.from($container.childNodes).indexOf(arr1[0]);

    //color last bar red
    arr1[arr1.length - 1].style.background = red;
    arr2[arr2.length - 1].style.background = red;

    //color bars yellow as they are compared
    //conditions are for cases where arrays are of different lengths
    if (arr1.length < arr2.length) {
        await pause();
        arr2[0].style.background = yellow;
        for (let i = 0; i < arr1.length - 1; i++) {
            await pause();
             arr1[i].style.background = yellow;
             await pause();
             arr2[i + 1].style.background = yellow               
        }
    }
    else if (arr2.length < arr1.length) {
        await pause();
        arr1[0].style.background = yellow;
        for (let i = 0; i < arr1.length - 1; i++) {
            await pause();
            arr2[i].style.background = yellow;
            await pause();
            arr1[i + 1].style.background = yellow               
        }
    }
    else {
        for (let i = 0; i < arr1.length - 1; i++) {
            await pause();
            arr1[i].style.background = yellow;
            await pause();
            arr2[i].style.background = yellow               
        }
    }

    
    while (arr1.length && arr2.length) {
        if (parseFloat(arr1[0].style.height) < parseFloat(arr2[0].style.height)) {
            finalArr.push(arr1.shift());
        }
        else {
            finalArr.push(arr2.shift());
        }
    }

    finalArr = finalArr.concat(arr1, arr2);

    for (let i = 0; i < finalArr.length; i++) {
        await pause();
        timerReset();
        finalArr[i].style.background = white;
        $container.insertBefore(finalArr[i], $container.childNodes[i + indexOffset]);       
    }

    //concat the remaining numbers in either array
    return finalArr;
}



//==================== bucket sort ====================//



// visual: while sorting into buckets, bars to yellow, bucket boundaries to red, 

let numOfBuckets = 10;
let buckets = [];

async function bucketSort(arr) {

    //create 'buckets' (arrays)
    for (let i = 0; i < numOfBuckets; i++) {
        buckets.push([]);    
    }

    let max = 0;
    let min = 0;

    for (let i = 0; i < arr.length; i++) {
        let value = parseFloat(arr[i].style.height);
        if (value > max) max = value;
        if (value < min) min = value;
    }

    // +1 because buckets have min inclusive
    bucketSize = Math.floor((max - min) / numOfBuckets) + 1;
    
    // sort numbers into buckets
    for (let i = 0; i < arr.length; i++) {
        let value = parseFloat(arr[i].style.height);
        buckets[Math.floor((value - min) / bucketSize)].push(arr[i]);     
    }

    // sort numbers into buckets for UI, white to yellow, bucket boundary to red
    let bucketsFlat = buckets.flat();
    for (let i = 0; i < bucketsFlat.length - 1; i++) {
        await pause();
        timerReset();

        let bucketIndex1 = Math.floor((parseFloat(bucketsFlat[i].style.height) - min) / bucketSize);
        let bucketIndex2 = Math.floor((parseFloat(bucketsFlat[i + 1].style.height) - min) / bucketSize);

        if (bucketIndex1 != bucketIndex2) {
            bucketsFlat[i].style.background = darkBlue;
        }

        $container.insertBefore(bucketsFlat[i], $container.childNodes[i]);       
    }
    bucketsFlat[bucketsFlat.length - 1].style.background = darkBlue;

    // sort numbers within buckets
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = await mergeSort(buckets[i]);        
    }

    // return buckets.flat();
}

