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
        }
    }
    i++;
    tmp = array[i];
    array[i] = array[lastIndex]
    array[lastIndex] = tmp;
    if(i < 1) {
        return array;
    }

    let left = quicksort(array.slice(0, i));
    let right = quicksort(array.slice(i+1, lastIndex+1));
    let merge = [...left, array[i], ...right];
    return merge.filter(value => typeof value != "undefined");
}