let bars = []; //used as temp array for creating HTML bars
let barHeights; //used only for heapsort because sorting the heights rather than the HTML elements seems much easier
let numOfBars = 140;
let pauseTime = 10;
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


//bars of evenly distributed height
function barsUniform() {
    for (let i = 0; i < numOfBars; i++) {
        let $newBar = document.createElement("div");
        $newBar.style.height = `${98 / numOfBars * (i +1)}%`;
        $newBar.style.width = `${barWidth}%`;
        $newBar.className = "bar";
        bars.push($newBar);
    }

    for (let i = 0; i < numOfBars; i++) {
        let randIndex = Math.floor(Math.random() * bars.length);
        $container.append(bars.splice([randIndex], 1)[0]);
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
        : $size.value <= 50 ? pauseTime = 100
        : pauseTime = 1400 / $size.value;

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
    barHeights = Array.from($bars).map(x => parseFloat(x.style.height));

    // disable buttons when sorter runs
    $size.disabled = true;
    $randomiser.disabled = true;
    $sorter.disabled = true;

    determineSorter(); 

    $type === "quick" ? quickSort($bars) 
        : $type === "merge" ? mergeSort(Array.from($bars))
        : $type === "bucket" ? bucketSort(Array.from($bars))
        : heapSort(barHeights);
});


//pauses between animations
function pause() {
    return new Promise(resolve => setTimeout(resolve, pauseTime));
}


//resets timer for re-enabling of buttons
function timerReset() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        $size.disabled = false;
        $randomiser.disabled = false;
        $sorter.disabled = false;
    }, 1000);
}

