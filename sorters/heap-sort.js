// visual: root node red, shift to end, all others white to yellow, when root node hits end, red to white, as heapifyAll runs, yellow to white from right, root node red, etc.

async function heapify(arr, i) {
    let max = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (arr[left]) {
        if (arr[left] > arr[max]) {
            max = left;
        }
    }
    
    if (arr[right]) {
        if (arr[right] > arr[max]) {
            max = right;
        }
    }
    
    if (max != i) {

        // selects all nodes to be compared, colors yellow
        $container.children[i].style.background = yellow;
        await pause();
        if (arr[left]) $container.children[left].style.background = yellow;
        await pause();
        if (arr[right]) $container.children[right].style.background = yellow;
        await pause();

        swapArr(arr, i, max);
        updateBars(arr, i, max);

        // change them back to white after the swap
        $container.children[i].style.background = white;
        if (arr[left]) $container.children[left].style.background = white;
        if (arr[right]) $container.children[right].style.background = white;

        await heapify(arr, max);
    }
}


async function heapifyAll(arr) {
    let middle = Math.floor(arr.length / 2);
    for (let i = middle; i >= 0; i--) {
        await heapify(arr, i);        
    }
}


async function heapSort(arr) {
    let sortedArr = [];
    let arrLength = arr.length;

    // heapify all parent nodes
    await heapifyAll(arr);

    for (let i = arrLength - 1; i >= 0; i--) {

        await pause();
        swapArr(arr, 0, i);
        updateBars(arr, 0, i);

        arr.pop();

        await heapifyAll(arr);
    }
}


function swapArr(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr.splice(j, 1, temp);
}

// updates HTML bars according to the values in the arr
function updateBars(arr, i, j) {
    $container.children[i].style.height = `${arr[i]}%`;
    $container.children[j].style.height = `${arr[j]}%`;
}