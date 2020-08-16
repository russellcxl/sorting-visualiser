// visual: while sorting into buckets, bars to yellow, bucket boundaries to red, 

let numOfBuckets = 10;
let buckets = [];

async function bucketSort(arr) {

    //create 'buckets' (arrays)
    for (let i = 0; i < numOfBuckets; i++) {
        buckets.push([]);    
    }

    let max = 0;
    let min = 0;

    for (let i = 0; i < arr.length; i++) {
        let value = parseFloat(arr[i].style.height);
        if (value > max) max = value;
        if (value < min) min = value;
    }

    // +1 because buckets have min inclusive
    bucketSize = Math.floor((max - min) / numOfBuckets) + 1;
    
    // sort numbers into buckets
    for (let i = 0; i < arr.length; i++) {
        let value = parseFloat(arr[i].style.height);
        buckets[Math.floor((value - min) / bucketSize)].push(arr[i]);     
    }

    // sort numbers into buckets for UI, boundaries to blue, sort using merge
    let bucketsFlat = buckets.flat();
    let colorTemp = white;

    for (let i = 0; i < bucketsFlat.length - 1; i++) {

        let value1 = parseFloat(bucketsFlat[i].style.height);
        let value2 = parseFloat(bucketsFlat[i + 1].style.height);

        let bucketIndex1 = Math.floor((value1 - min) / bucketSize);
        let bucketIndex2 = Math.floor((value2 - min) / bucketSize);

        await pause();
        timerReset();

        if (bucketIndex1 != bucketIndex2) {
            bucketsFlat[i].style.background = darkBlue;
        }

        $container.insertBefore(bucketsFlat[i], $container.childNodes[i]);       
    }

    bucketsFlat[bucketsFlat.length - 1].style.background = darkBlue;

    // sort numbers within buckets
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = await mergeSort(buckets[i]);        
    }
}

