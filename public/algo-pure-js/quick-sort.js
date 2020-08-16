export function quickSort(arr, start = 0 , end = arr.length - 1) {
    if (start >= end) return;

    let index = partition(arr, start, end);

    quickSort(arr, index + 1, end); //starts sorting for bigger half
    quickSort(arr, start, index - 1); //start sorting for smaller half
}


//find index of where the pivot number lands
function partition(arr, start, end) {
    let index = start;
    let pivotValue = arr[end];

    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            swap(arr, index, i)
            index++;
        }
    }
    swap(arr, index, end)
    return index;
}


//swap bars at index i and j, where i > j
//insertBefore will remove the 1st node
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr.splice(j, 1, temp);
}
