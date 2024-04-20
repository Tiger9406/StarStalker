function loadJSONTOArray(jsonData)
{
    const fs = require('fs');
    const readJsonData = fs.readFileSync(jsonData);
    const converted = JSON.parse(readJsonData);
    let arrayData = [];
    
    for (let key in converted)
     {
        arrayData.push(converted[key]);
    }
    return arrayData;
}

// Min Heap Class
class MinHeap
{
    // Initializes empty heap array
    constructor() 
    {
        this.heap = [];
    }

    getLeftChild(index)
    {
        return this.heap[2 * index + 1]; 
    }

    getRightChild(index)
    {
        return this.heap[2 * index + 2];
    }

    getParent(index)
    {
        return this.heap[Math.floor((index - 1) / 2)];
    }

    size()
    {
        return this.heap.length;
    }

    // Swaps the value at indexOne with indexTwo and indexTwo with indexOne
    swap(indexOne, indexTwo)
    {
        const tempValue = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = tempValue;
    }

    peek(property)
    {
        if (this.heap.length == 0) return null;

        return this.heap[0][property];
    }

    // Extracts min from heap and heapifies array 
    remove(property)
    {
        const element = this.heap[0];
        this.heap[0] = this.heap[this.size() - 1];
        this.heap.pop();
        this.heapifyDown(property);
        return element;
    }

    // Inserts a new element into the heap 
    insert(item, property)
    {
        this.heap.push(item);
        this.heapifyUp(property);
    }

    // Heapify functions 

    heapifyUp(property)
    {
        let child = this.size() - 1;
        let parent = Math.floor((child - 1) / 2);
        while(parent >= 0 && this.heap[parent][property] > this.heap[child][property])
        {
            this.swap(parent, child);
            child = parent;
            parent = Math.floor((child - 1) / 2);
        }
    }

    heapifyDown(property)
    {
        let index = 0;
        while ((2 * index + 1) < this.size())
        {
            let smallerChildIndex = 2 * index + 1;
            if ((2 * index + 2) < this.size() && this.getRightChild(index)[property] < this.getLeftChild(index)[property]) 
            {
                smallerChildIndex = 2 * index + 2;
            }
            if (this.heap[index][property] < this.heap[smallerChildIndex][property]) break;
            else this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    printHeap()
    {
        var heap = ` ${this.heap[0]} `
        for (var index = 1; index < this.heap.length; index++) 
        {
            heap += ` ${this.heap[index]} `;
        }
        console.log(heap);
    }
}

// Max Heap Class
class MaxHeap
{
    // Initializes empty heap array
    constructor() 
    {
        this.heap = [];
    }

    getLeftChild(index)
    {
        return this.heap[2 * index + 1]; 
    }

    getRightChild(index)
    {
        return this.heap[2 * index + 2];
    }

    getParent(index)
    {
        return this.heap[Math.floor((index - 1) / 2)];
    }

    size()
    {
        return this.heap.length;
    }

    // Swaps the value at indexOne with indexTwo and indexTwo with indexOne
    swap(indexOne, indexTwo)
    {
        const tempValue = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = tempValue;
    }

    peek(property)
    {
        if (this.heap.length == 0) return null;

        return this.heap[0][property];
    }

    // Extracts min from heap and heapifies array 
    remove(property)
    {
        const element = this.heap[0];
        this.heap[0] = this.heap[this.size() - 1];
        this.heap.pop();
        this.heapifyDown(property);
        return element;
    }

    // Inserts a new element into the heap 
    insert(item, property)
    {
        this.heap.push(item);
        this.heapifyUp(property);
    }

    // Heapify functions 
    
    heapifyUp(property)
    {
        let child = this.size() - 1;
        let parent = Math.floor((child - 1) / 2);
        while(parent >= 0 && this.heap[parent][property] < this.heap[child][property])
        {
            this.swap(parent, child);
            child = parent;
            parent = Math.floor((child - 1) / 2);
        }
    }

    heapifyDown(property)
    {
        let index = 0;
        while ((2 * index + 1) < this.size())
        {
            let greaterChildIndex = 2 * index + 1;
            if ((2 * index + 2) < this.size() && this.getRightChild(index)[property] > this.getLeftChild(index)[property]) 
            {
                greaterChildIndex = 2 * index + 2;
            }
            if (this.heap[index][property] > this.heap[greaterChildIndex][property]) break;
            else this.swap(index, greaterChildIndex);
            index = greaterChildIndex;
        }
    }

    printHeap()
    {
        var heap = ` ${this.heap[0]} `
        for (var index = 1; index < this.heap.length; index++) 
        {
            heap += ` ${this.heap[index]} `;
        }
        console.log(heap);
    }
}

function kthLargest(k, property) 
{
    let stars = loadJSONTOArray('data/hyglike.json');
    // min heap
    let pq = new MinHeap();
    for (const star of stars) 
    {
        if (star[property] == "") continue;
        if (pq.size() == k && star[property] < pq.peek(property)) 
            continue;
        pq.insert(star, property);
        if (pq.size() > k) 
            pq.remove(property);
    }

    return pq;
}

function kthSmallest(k, property) 
{
    let stars = loadJSONTOArray('data/hyglike.json');
    // max heap
    let pq = new MaxHeap();
    for (const star of stars) 
    {
        if (star[property] == "") continue;
        if (pq.size() == k && star[property] > pq.peek(property)) 
            continue;
        pq.insert(star, property);
        if (pq.size() > k) 
            pq.remove(property);
    }

    return pq;
}
