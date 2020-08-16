// visual: binary tree nodes to yellow when compared, red for largest

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
        
        if (arr[left]) {
            setBarColor(left, yellow);
        }

        if (arr[right]) {
            setBarColor(right, yellow);
        } 
        await setBarColor(i, yellow);

        // largest node / tallest bar to red
        await setBarColor(max, red);

        swapInArr(arr, i, max);
        setBarHeight(arr, i, max);

        // change tallest bar to red after swapping; a little manual but oh well
        setBarColor(i, red);
        await setBarColor(max, yellow);

        // change them back to white after the swap
        setBarColor(i, white);
        setBarColor(left, white);
        setBarColor(right, white);

        // additional animation for when there are <= 15 bars
        if ($size.value <= 15) {
            await pause();
        }
        

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

        // set both first and last bar to red i.e. the ones being swapped
        // additional animation for when there are <= 15 bars
        if ($size.value <= 15) {
            setBarColor(i, red);
            await setBarColor(0, red);
        }
        
        swapInArr(arr, 0, i);
        setBarHeight(arr, 0, i);

        arr.pop();

        // additional animation for when there are <= 15 bars
        if ($size.value <= 15) {
            setBarColor(i, white);
            await setBarColor(0, white);
        }

        await heapifyAll(arr);
    }
}


//==================== complementary functions ====================//


// swaps values in arr only
function swapInArr(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr.splice(j, 1, temp);
}


// for updating HTML bar heights according to the values in the arr
function setBarHeight(arr, ...args) {
    for (let i = 0; i < args.length; i++) {
        let index = args[i];
        $container.children[index].style.height = `${arr[index]}%`;    
    }
    
}


async function setBarColor(index, color) {
    $container.children[index].style.background = color;
    await pause();
}