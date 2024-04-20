function swap(array, i, j) {
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}

function partitionFunc(array, bottom, top, property) {
    //choose top as pivot
    const pivot = array[top][property];

    let i = bottom;

    //go low to high
    for (let j = bottom; j < top; j++) {
        //if smaller, swap with i; i goes up along with j
        //if larger, i stays, j goes up
        //next j will swap with i
        if (array[j][property] < pivot) {
            swap(array, i, j);
            i++;
        }
    }

    //put pivot in correct spot: top+1 is initial pivot pos
    swap(array, i, top);
    return i;
}


function quickSort(array, property){
    array = array.filter(star => star[property] != "");

    let stack = [];
    stack.push(0);
    stack.push(array.length - 1);

    while (stack.length > 0) {
        const top = stack.pop();
        const bottom = stack.pop();

        //pivot index returned
        const pivotI = partitionFunc(array, bottom, top, property);

        //if final pivot location is not at the bottom, add the left side to stack
        if (pivotI - 1 > bottom) {
            stack.push(bottom);
            stack.push(pivotI - 1);
        }

        //if final pivot location is not at the top, add the right side to stack
        if (pivotI + 1 < top) {
            stack.push(pivotI + 1);
            stack.push(top);
        }
    }
    return array;
}

function quicksortLargestK(array, k, property){
    //sort array
    let sortedArray = quickSort(Array.from(array), property);
    //return last k elements
    return sortedArray.slice(-k);
}

function quicksortSmallestK(array, k, property){
    //sort array
    let sortedArray = quickSort(Array.from(array), property);

    //return first k elements
    return sortedArray.slice(0, k);
}
