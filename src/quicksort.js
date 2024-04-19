
function loadJSONTOArray(jsonData){
    const fs = require('fs');
    const readJsonData = fs.readFileSync(jsonData);
    const converted = JSON.parse(readJsonData);
    let arrayData = [];
    
    for (let key in converted) {
        arrayData.push(converted[key]);
    }
    return arrayData;
}

function swap(array, i, j) {
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}

function partitionFunc(array, bottom, top) {
    //choose top as pivot
    const pivot = parseFloat(array[top].dist);

    let i = bottom;

    //go low to high
    for (let j = bottom; j < top; j++) {
        //if smaller, swap with i; i goes up along with j
        //if larger, i stays, j goes up
        //next j will swap with i
        if (parseFloat(array[j].dist) < pivot) {
            swap(array, i, j);
            i++;
        }
    }

    //put pivot in correct spot: top+1 is initial pivot pos
    swap(array, i, top);
    return i;
}


function quickSort(array){
    let stack = [];
    stack.push(0);
    stack.push(array.length - 1);

    while (stack.length > 0) {
        const top = stack.pop();
        const bottom = stack.pop();

        //pivot index returned
        const pivotI = partitionFunc(array, bottom, top);

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

function largestKofArray(array, k){
    //sort array
    let sortedArray = quickSort(array);
    //return last k elements
    return sortedArray.slice(-k);
}

function smallestKofArray(array, k){
    //sort array
    let sortedArray = quickSort(array);
    //return first k elements
    return sortedArray.slice(0, k);
}

// const arrayData = loadJSONTOArray('data/hygdata_v41.json');
// console.log(largestKofArray(arrayData, 5));