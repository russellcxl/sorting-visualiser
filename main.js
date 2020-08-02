//==================== ui board set-up ====================//

let bars = []
let numOfBars = 140;
let pauseTime = 30;
let barWidth = 0.5;
let timer; //for disabling UI
let $container = document.querySelector(".main-container");
let $randomiser = document.querySelector(".button-randomise");
let $sorter = document.querySelector(".button-sort");
let $bars = document.getElementsByClassName("bar");
let $size = document.querySelector(".bars-range");


//default bars
for (let i = 0; i < numOfBars; i++) {
    let $newBar = document.createElement("div");
    $newBar.style.height = `${Math.random() * 90}%`;
    $newBar.style.width = `${barWidth}%`;
    $newBar.className = "bar";
    bars.push($newBar);
    $container.append($newBar);
}

//populates container with bars
function setBars() {
    $container.innerHTML = "";

    $size.value <= 15 ? pauseTime = 800
        : $size.value <= 35 ? pauseTime = 80
        : pauseTime = 30;

    $size.value <= 120 ? barWidth = 70/$size.value
        : barWidth = 0.5;

    for (let i = 0; i < numOfBars; i++) {
        let $newBar = document.createElement("div");
        $newBar.style.height = `${Math.random() * 90}%`;
        $newBar.style.width = `${barWidth}%`;
        $newBar.className = "bar";
        bars.push($newBar);
        $container.append($newBar);
    }
}

//adjust number of bars in container
$size.addEventListener("input", function() {
    numOfBars = $size.value; 
    bars = [];
    setBars();
});

$randomiser.addEventListener("click", function() {
    bars = [];
    setBars();
});

$sorter.addEventListener("click", function() {
    $bars = document.getElementsByClassName("bar");
    $size.disabled = true;
    $randomiser.disabled = true;
    $sorter.disabled = true;
    quickSort(bars);
});


//==================== quick sort O(N^2) ====================//


//visualisation:
//last bar pink, all bars before yellow, yellow to white as loop runs, last bar to new index + white

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
        $bars[i].style.background = "#f8e9a1";   
    }

    for (let i = start; i < end; i++) {
        await pause(pauseTime)
        $bars[i].style.background = "#fff";

        //enables UI if there is no sorting for 2s
        clearTimeout(timer);
        timer = setTimeout(() => {
            $size.disabled = false;
            $randomiser.disabled = false;
            $sorter.disabled = false;
        }, 2000);

        if (parseFloat(arr[i].style.height) < pivotValue) {
            swap(arr, index, i)
            index++;
        }
    }
    await pause(pauseTime)
    $bars[end].style.background = "#fff";
    swap(arr, index, end)
    return index;
}

//swap the heights of bars at index i and j, where i > j
function swap(arr, i, j) {
    //swap bars in array
    let extracted = arr.splice(j, 1)
    arr.splice(i, 0, extracted[0]);

    //swap bars in html
    $container.insertBefore($container.childNodes[j], $container.childNodes[i]);
}

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//==================== visualisation ====================//



