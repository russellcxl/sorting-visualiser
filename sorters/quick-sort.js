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