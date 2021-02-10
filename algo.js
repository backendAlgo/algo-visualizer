// Returns random values between lowerBound (inclusive) and upperBound (inclusive)
const returnRandom = (lowerBound, upperBound) => {
    return Math.floor((Math.random() * (upperBound - lowerBound + 1))) + lowerBound;
}

// Swapping values
const swap = (list, index1, index2) => {
    let temp = list[index1];
    list[index1] = list[index2];
    list[index2] = temp;
}

// Initializing list with random values between 0 and 1,000,000
const initialize = (list) => {
    for (let i = 0; i < list.length; i++)
        list[i] = returnRandom(0, 1000000);
}

// Checks if array is sorted
const isSorted = (list) => {
    for (let i = 1; i < list.length; i++) {
        if (list[i - 1] > list[i]) {
            return false;
        }
    }
    return true;
}

// Choosing pivot randomly
const randomPivot = (list, low, high) => {
    let rand = returnRandom(low, high);
    swap(list, rand, high);
}


const partition = (list, low, high) => {
    randomPivot(list, low, high);

    let pivot = low - 1;
    for (let i = low; i <= high; i++) {
        if (list[i] <= list[high]) {
            pivot++;
            swap(list, pivot, i);
        }
    }
    return pivot;
}

// from low (inclusive) to high (inclusive)
const quickSort = (list, low, high) => {
    if (low < high) {
        let pivot = partition(list, low, high);
        quickSort(list, low, pivot - 1);
        quickSort(list, pivot + 1, high);
    }
}

const merge = (list, low, middle, high) => {
    let temp = new Array(high - low + 1);
    let i = low;
    let j = middle + 1;
    let k = 0;
    while (i <= middle && j <= high) {
        if (list[i] > list[j]) {
            temp[k] = list[j];
            j++;
        } else {
            temp[k] = list[i];
            i++;
        }
        k++;
    }

    while (i <= middle) {
        temp[k] = list[i];
        i++;
        k++;
    }

    while (j <= high) {
        temp[k] = list[j];
        j++;
        k++;
    }

    for (let n = 0; n < temp.length; n++)
        list[low + n] = temp[n];
}


const mergeSort = (list, low, high) => {
    if (low >= high) {
        return;
    }

    let middle = Math.floor((high + low) / 2);
    // Sort left
    mergeSort(list, low, middle);
    //Sort right
    mergeSort(list, middle + 1, high);
    merge(list, low, middle, high);

}

const mergeSortIterative = (list) => {
    let length = list.length;
    for (let i = 1; i < length; i = i * 2) {
        for (let low = 0; low < length; low += i * 2) {
            let mid = Math.min(low + i - 1, length - 1);
            let high = Math.min(low + 2 * i - 1, length - 1);
            merge(list, low, mid, high);
        }
    }
}


const heapSort = (list) => {
    // Converting array to maxHeap
    for (let i = list.length - 1; i >= 0; i--) {
        heapify(list, i, list.length - 1);
    }

    // Sorting array
    for (let i = list.length - 1; i > 0; i--) {
        swap(list, i, 0);
        heapify(list, 0, i - 1);
    }
}

// Performing heapify on the node at given nodeIndex till the array index of rightBound (inclusive)
const heapify = (list, nodeIndex, rightBound) => {

    while (nodeIndex * 2 + 1 <= rightBound) {
    	// Checking if left child exists
        let leftChild = nodeIndex * 2 + 1; // Getting index of left child
        let rightChild = nodeIndex * 2 + 2; // Getting index of right child

        // Checking if right child exists and if so checking if it is higher than left child
        if (rightChild <= rightBound && list[rightChild] > list[leftChild]) {
            // Checking if right child is greater than current node
            if (list[rightChild] > list[nodeIndex]) {
                swap(list, rightChild, nodeIndex);
                nodeIndex = rightChild;
            } else {
                // if right child is not greater than current node exiting the loop
                break;
            }
        }
        // If right child does not exist or right child is not greater than current node then comparing current node and left child
        else if (list[leftChild] > list[nodeIndex]) {
            swap(list, leftChild, nodeIndex);
            nodeIndex = leftChild;
        } else {
            break;
        }
    }
}

let list = new Array(100);
initialize(list);

// mergeSort(list, 0, list.length - 1);
// mergeSortIterative(list);
// quickSort(list, 0, list.length - 1);
// heapSort(list)

console.log(list)
console.log(isSorted(list));
