// Min Heap Class
class MinHeap
{
    // Constructor 

    constructor() 
    {
        this.heap = [];
    }

    // Helper Functions  

    getValueAtIndex(index)
    {
        return this.heap[index];
    }

    getLeftChildIndex(parentIndex)
    {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex)
    {
        return 2 * parentIndex + 2;
    }

    getParentIndex(childIndex)
    {
        return Math.floor((childIndex - 1) / 2);
    }

    hasLeftChild(index)
    {
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    hasRightChild(index)
    {
        return this.getRightChildIndex(index) < this.heap.length;
    }

    hasParent(index)
    {
        return this.getParentIndex(index) >= 0;
    }

    getLeftChild(index)
    {
        return this.getValueAtIndex(this.getLeftChildIndex(index)); 
    }

    getRightChild(index)
    {
        return this.getValueAtIndex(this.getRightChildIndex(index));
    }

    getParent(index)
    {
        return this.getValueAtIndex(this.getParentIndex(index));
    }

    getSize()
    {
        return this.heap.length;
    }

    // Heapify Related Functions 

    swapIndices(indexOne, indexTwo)
    {
        const tempValue = this.getValueAtIndex(indexOne);
        this.heap[indexOne] = this.getValueAtIndex(indexTwo);
        this.heap[indexTwo] = tempValue;
    }

    peekTop()
    {
        if (this.heap.length == 0) return null;

        return this.getValueAtIndex(0);
    }

    removeRoot()
    {
        if (this.heap.length == 0) return null;

        const element = this.getValueAtIndex(0);
        this.heap[0] = this.getValueAtIndex(this.getSize() - 1);
        this.heap.pop();
        this.heapifyDown();
        return element;
    }

    insert(item)
    {
        this.heap.push(item);
        this.heapifyUp();
    }

    heapifyUp()
    {
        let index = this.getSize() - 1;
        while(this.hasParent(index) && this.getParent(index) > this.getValueAtIndex(index))
        {
            this.swapIndices(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    heapifyDown()
    {
        let index = 0;
        while (this.hasLeftChild(index))
        {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.getRightChild(index) < this.getLeftChild(index)) 
            {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (this.getValueAtIndex(index) < this.getValueAtIndex(smallerChildIndex)) break;
            else this.swapIndices(index, smallerChildIndex);
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

// Code translated to javascript from lecture slides
function kthLargest(nums, k) 
{
    // min heap
    let pq = new MinHeap();
    for (const element of nums) 
    {
        if (pq.getSize() === k && element < pq.peekTop()) 
            continue;
        pq.insert(element);
        if (pq.getSize() > k) 
            pq.removeRoot();
    }

    pq.printHeap();
}