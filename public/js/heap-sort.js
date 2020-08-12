// create max heap -- all parent nodes should be > child nodes
// swap root and last node, remove last node ie the largest
// create max heap again

// i is the parent, left and right are children
// if child > parent, swap
// heapifies only 1 parent node
function heapify(arr, i) {
    let max = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (arr[left] > arr[max]) {
        max = left;
    }
    if (arr[right] > arr[max]) {
        max = right;
    }
    if (max != i) {
        swap(arr, i, max);
        // heapify needs to be called on the child node that was swapped
        heapify(arr, max);
    }
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr.splice(j, 1, temp);
}

// heapify all parent nodes
function heapifyAll(arr) {
    let middle = Math.floor(arr.length / 2);
    for (let i = arr[middle]; i >= 0; i--) {
        heapify(arr, i);        
    }
}

function heapSort(arr) {
    let sortedArr = [];
    let arrLength = arr.length;

    // heapify all parent nodes
    heapifyAll(arr);

    // swap root and last, heapify all parent nodes
    for (let i = arrLength - 1; i >= 0; i--) {
        swap(arr, 0, i);
        sortedArr.push(arr.splice(i, 1));
        heapifyAll(arr);
    }

    return sortedArr.reverse();
}

let arrTest = [3, 1, 5, 7, 9, 4, 6];
console.log(arrTest);
// after heapifyAll => [9, 7, 6, 3, 1, 4, 5]
