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
             arr2[i + 1].style.background = yellow;
             timerReset();               
        }
    }
    else if (arr2.length < arr1.length) {
        await pause();
        arr1[0].style.background = yellow;
        for (let i = 0; i < arr1.length - 1; i++) {
            await pause();
            arr2[i].style.background = yellow;
            arr1[i + 1].style.background = yellow;
            timerReset();               
        }
    }
    else {
        for (let i = 0; i < arr1.length - 1; i++) {
            await pause();
            arr1[i].style.background = yellow;
            arr2[i].style.background = yellow;
            timerReset();               
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
