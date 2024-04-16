function quickSort(array){
    //base case
    if (array.length <= 1) {
        return array;
    }

    //pick to be last element in array
    let pivot = array[array.length - 1]; 

    //separate into left and right arrays
    let left = [];
    let right = [];

    //if smaller goes left, if bigger goes right
    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    //returns divided arrays + middle
    return quickSort(left).concat(pivot, quickSort(right));
}