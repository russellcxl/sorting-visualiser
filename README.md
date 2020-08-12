# Sorting algorithms

*Pure js functions can be found in public/js*

### Current sorts:
- quick sort
- merge sort
- bucket sort

### To-do:
- heap sort
- bubble sort

### Tips for creating the visualisation:
- Never start with the entire function; always start with the helper functions. Run it once on an isolated array and see if the function and DOM works as expected.
- After that, start adding in the colours and async/await

### Understanding heap sort:
- Of the sorts, heap was the hardest to understand and code. Thought I'd record here how I got about it.
- Understanding: 
    - The heap sort consists of 2 parts -- (1) the process of rearranging the array so that if all the elements are placed in a binary tree, the parent node will always be larger than the child nodes (this is also called the *heapify* function), and (2) swapping the root node i.e. the largest node with the last node, removing the root node and then running the first process of rearrangement again.
    - This way, the largest node/element will always be removed and placed in the final, sorted array.
- Coding: 
    - The formula for selecting the parent and child nodes within a binary tree is, with a parent indexed **i** in an array: **2i + 1** for the left child node and **2i + 2** for the right child node.
    ```
    let arr = [3, 1, 5, 7, 9, 4, 6]
                    3
            1               5
        7       9       4       6
    
    # you'll notice that if we take the parent node 3, it is indexed at [0], while the child nodes 1 and 5 are indexed at [2i + 1 = 1] and [2i + 2 = 2] respectively.
    ```
    - The first step, as mentioned above, is to rearrange the array, or *heapify* it. We only need to start from the middle of the array, or node 5, since the nodes below are not parent to any child nodes.


### Other to-do:
- Include option to sort ascending/descending
- Include option for evenly distributed bar heights/random
- Improve radio buttons; a little hard to click on that tiny dot