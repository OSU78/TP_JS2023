function quicksort(array) {
    let i = -1;
    let tmp = null;
    let lastIndex = array.length-1;
    let pivot = array[lastIndex];
    for (let j = 0; j < array.length; j++) {
        if(array[j] < pivot) {
            i++;
            tmp = array[i];
            array[i] = array[j]
            array[j] = tmp;
            let stop = ""
        }
    }

    i++;
    tmp = array[i];
    array[i] = array[lastIndex]
    array[lastIndex] = tmp;
    // console.log(array)
    if(i < 1 && array.length < 3) {
        return array;
    }
    let left = quicksort(array.slice(0, i));
    let right = quicksort(array.slice(i+1, lastIndex+1));
    let merge = [...left, array[i], ...right];

    return merge.filter(value => typeof value !== "undefined");
}


const tests = [
    [2,8,3,98,1],
    [8,9,90,100],
    [105, 12, 9, 3],
    [89, 3, 8, 9, 90, 3, 3],
    [56,8,39,98,-100,99],
    [0],
    [8,2,3, 230, 78, -37, 8, 9, 8]
]

for (const test of tests) {
    console.log(quicksort(test))
}

// console.log(quicksort(tests[0]))