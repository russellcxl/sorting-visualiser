//==================== quick sort ====================//

//taking pivot as last element
//done when start index = end index i.e. no array left to sort
function quickSort(arr, start, end) {
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

let arr= [2, 23, 56, 21, 6, 10];
