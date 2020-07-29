//==================== ui board set-up ====================//

let bars = []
let numOfBars = 70;
let $container = document.querySelector(".main-container");
let $randomiser = document.querySelector(".button-randomise");
let $sorter = document.querySelector(".button-sort");

for (let i = 0; i < numOfBars; i++) {
    let $newBar = document.createElement("div");
    $newBar.style.height = `${Math.random() * 90}%`;
    $newBar.className = "bar mr-1";
    bars.push(parseFloat($newBar.style.height));
    $container.append($newBar);
}

$randomiser.addEventListener("click", function() {
    $container.innerHTML = "";
    bars = [];

    for (let i = 0; i < numOfBars; i++) {
        let $newBar = document.createElement("div");
        $newBar.style.height = `${Math.random() * 90}%`;
        $newBar.className = "bar mr-1";
        bars.push(parseFloat($newBar.style.height));
        $container.append($newBar);
    }
});

$sorter.addEventListener("click", function() {
    quickSort(bars);
    let $bars = document.getElementsByClassName("bar");
    for (let i = 0; i < $bars.length; i++) {
        $bars[i].style.height = `${bars[i]}%`;        
    }
});

//==================== quick sort O(N^2) ====================//

//taking pivot as last element
//done when start index = end index i.e. no array left to sort
function quickSort(arr, start = 0 , end = arr.length - 1) {
    if (start >= end) return;
    
    let index = partition(arr, start, end);
    quickSort(arr, index + 1, end); //starts sorting for bigger half
    quickSort(arr, start, index - 1); //start sorting for smaller half
}

//find index of where the pivot number lands
function partition(arr, start, end) {
    let index = start;
    let pivotValue = arr[end]
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            swap(arr, index, i)
            index++;
        }
    }
    swap(arr, index, end)
    return index;
}

//swap elements at index i and j, where i > j
function swap(arr, i, j) {
    let extracted = arr.splice(j, 1)
    arr.splice(i, 0, extracted[0]);
}

//==================== visualisation ====================//



