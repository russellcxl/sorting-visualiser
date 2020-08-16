const quickSort = require("./quick-sort.js");
let numOfBuckets = 10;
let buckets = [];

// create buckets (array)
for (let i = 0; i < numOfBuckets; i++) {
    buckets.push([]);    
}

function bucketSort(arr) {
    let max = arr[0];
    let min = arr[0];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
    }

    // +1 because buckets have min inclusive
    bucketSize = Math.floor((max - min) / numOfBuckets) + 1;
    console.log("size is " + bucketSize);
    
    // sort numbers into buckets
    for (let i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - min) / bucketSize)].push(arr[i]);     
    }

    // sort numbers within buckets
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = quickSort(buckets[i]);        
    }

    return buckets.flat();
}