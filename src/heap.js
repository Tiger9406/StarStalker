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

    peek()
    {
        if (this.heap.length == 0) return null;

        return this.heap[0];
    }

    // Extracts min from heap and heapifies array 
    remove()
    {
        const element = this.heap[0];
        this.heap[0] = this.heap[this.size() - 1];
        this.heap.pop();
        this.heapifyDown();
        return element;
    }

    // Inserts a new element into the heap 
    insert(item)
    {
        this.heap.push(item);
        this.heapifyUp();
    }

    // Heapify functions 

    heapifyUp()
    {
        let child = this.size() - 1;
        let parent = Math.floor((child - 1) / 2);
        while(parent >= 0 && this.heap[parent] > this.heap[child])
        {
            this.swap(parent, child);
            child = parent;
            parent = Math.floor((child - 1) / 2);
        }
    }

    heapifyDown()
    {
        let index = 0;
        while ((2 * index + 1) < this.size())
        {
            let smallerChildIndex = 2 * index + 1;
            if ((2 * index + 2) < this.size() && this.getRightChild(index) < this.getLeftChild(index)) 
            {
                smallerChildIndex = 2 * index + 2;
            }
            if (this.heap[index] < this.heap[smallerChildIndex]) break;
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

    peek()
    {
        if (this.heap.length == 0) return null;

        return this.heap[0];
    }

    // Extracts min from heap and heapifies array 
    remove()
    {
        const element = this.heap[0];
        this.heap[0] = this.heap[this.size() - 1];
        this.heap.pop();
        this.heapifyDown();
        return element;
    }

    // Inserts a new element into the heap 
    insert(item)
    {
        this.heap.push(item);
        this.heapifyUp();
    }

    // Heapify functions 
    
    heapifyUp()
    {
        let child = this.size() - 1;
        let parent = Math.floor((child - 1) / 2);
        while(parent >= 0 && this.heap[parent] < this.heap[child])
        {
            this.swap(parent, child);
            child = parent;
            parent = Math.floor((child - 1) / 2);
        }
    }

    heapifyDown()
    {
        let index = 0;
        while ((2 * index + 1) < this.size())
        {
            let greaterChildIndex = 2 * index + 1;
            if ((2 * index + 2) < this.size() && this.getRightChild(index) > this.getLeftChild(index)) 
            {
                greaterChildIndex = 2 * index + 2;
            }
            if (this.heap[index] > this.heap[greaterChildIndex]) break;
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

function kthLargest(nums, k) 
{
    // min heap
    let pq = new MinHeap();
    for (const element of nums) 
    {
        if (pq.size() == k && element < pq.peek()) 
            continue;
        pq.insert(element);
        if (pq.size() > k) 
            pq.remove();
    }

    pq.printHeap();
}

function kthSmallest(nums, k) 
{
    // max heap
    let pq = new MaxHeap();
    for (const element of nums) 
    {
        if (pq.size() == k && element > pq.peek()) 
            continue;
        pq.insert(element);
        if (pq.size() > k) 
            pq.remove();
    }

    pq.printHeap();
}