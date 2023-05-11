class Node {
    constructor(value) {
        this.value = value
        this.next = null
        this.prev = null
    }
}

class DoublyLinkedList {
    constructor(value) {
        this.head = null
        this.tail = null
        this.length = 0

        // make it optional to create Doubly Linked List with or without starter value
        if (value) {
            this.append(value)
        }
    }
    
    // Add to the end of list
    append(value) {
        // Initialize a newNode with value recieved
        const newNode = new Node(value)

        // Let's first check if Doubly Linked List is empty or not.
        if (!this.head) {
            // If there is no head (no elements) it is empty. In that case make the newNode as head
            // since it is the only node at this point and there is no tail either,
            // tail will also have the same value (both head and tail will point to same place in memory from now on):
            this.head = newNode
            this.tail = newNode
        } else {
            // Since the newNode will be the new tail, set the prev value to current tail before applying changes. Timing is important!
            newNode.prev = this.tail
            // we have this.tail = this.head is setup with first entry
            // at first we populate the this.tail.next with newNode. Since both are referencing the same object, both head and tail will look equal at this step:
            this.tail.next = newNode
            // at this step, we cleanup the tail by setting it to newNode. In other words we extended the head by using tail first, then cleaned up the tail by using newNode.
            this.tail = newNode
        }
        this.length++
        return this
    }

    // Add to the beginning of list
    prepend(value) {
        // Let's check first if Doubly Linked List is empty or not.
        // If that's the case, return here by using the append method instead

        if (!this.head) {
            return this.append(value)
        }

        // Initialize a newNode with value recieved
        const newNode = new Node(value)
        // apply a reference to newNode.next prop. When we add it at the start, naturally prepended node's next value should point to the this.head.
        newNode.next = this.head
        // Since the newNode will be the new previous for the current head, set the prev value of head to be newNode. We do this before changing the pointer of this.head to newNode. Timing is important!
        this.head.prev = newNode
        // now that newNode has the this.head as next and newNode as prev, we can set the this.head as newNode directly.
        this.head = newNode
        this.length++
        return this
    }

    // toArray - loop through nested objects, then return the values in an array
    toArray() {
        const array = []
        let currentNode = this.head

        while (currentNode !== null) {
            array.push(currentNode.value)
            currentNode = currentNode.next
        }
        return array
    }

    // lookup / traversal helper
    traverseToIndex(index) {
        // validate the received index parameter:
        if (!index) return 'Index is missing'
        if (typeof index !== 'number') return 'Index should be a number'

        let counter = 0
        let currentNode = this.head

        while (counter !== index) {
            currentNode = currentNode.next
            counter++
        }

        return currentNode
    }

    // insert to specific index
    insert(index, value) {
        // validate the received index parameter:
        if (!index) return 'Index is missing'
        if (typeof index !== 'number') return 'Index should be a number'

        // if length is too long, just append (add at the end)
        if (index >= this.length || !this.head) {
            return this.append(value)
        }

        // if index is 0, just prepend (add to the beginning)
        if (index === 0) {
            return this.prepend(value)
        }

        // Initialize a newNode with value recieved
        const newNode = new Node(value)

        /*
        Solution flow:
          1 - Pick the previous index Node of target idx
          2 - Pick the target idx Node by using preIdx.next pointer
          3 - Now change previous idx Node pointer to newNode. This will change the previous Node's pointer.
          4 - Now change the newNode.next to targetIdx.
          5 - In other words, we just put the new node in between previous and target: by making previous to point to new node, then new node to previous target idx before insert()
        */

        // previous one
        const preIdx = this.traverseToIndex(index - 1)
        const targetIdx = preIdx.next
        // Set the preIdx next to newNode. This is because newNode replaces the targetIdx's position.
        preIdx.next = newNode
        // Set the newNode prev to preIdx. This is because newNode replaces the targetIdx's position.
        newNode.prev = preIdx
        // Set the newNode next to targetIdx. This is because newNode replaces the targetIdx's position.
        newNode.next = targetIdx
        // Now, targetIdx (which have changed place until this step) will point the prev to the newNode. Again, timing is important on steps!
        targetIdx.prev = newNode
        this.length++
        return this
    }

    // Delete from beginning of list
    deleteHead() {
        // check the length - if zero return a warning
        if (this.length === 0) return 'List is empty'

        // If there is only one node left:
        if (this.length === 1) {
            const headVal = this.head.value
            this.head = null
            this.tail = null
            this.prev = null
            this.length--
            return headVal
        }

        // pick the current head value:
        const headVal = this.head.value
        // define newHead as this.head.next
        const newHead = this.head.next
        // make the new heads prev pointer null
        newHead.prev = null
        // now change the head pointer to newHead
        this.head = newHead
        this.length--
        return headVal
    }

    // Delete from the end of list
    deleteTail() {
        // check the length - if zero return a warning
        if (this.length === 0) return 'List is empty'

        // If there is only one node left:
        if (this.length === 1) {
            const tailVal = this.tail.value
            this.head = null
            this.tail = null
            this.prev = null
            this.length--
            return tailVal
        }

        // Define new tail by traversing to previous Node of tail idx
        // Note that, tail always points to null. (which is length).
        // length - 1 will point to last Node with a value. Therefore we need to target length - 2
        const tailVal = this.tail.value
        const newTail = this.tail.prev
        // Now, we can just simply update the pointer of newTail to null:
        newTail.next = null
        this.tail = newTail
        this.length--
        return tailVal
    }

    // Delete from specific index
    delete(index) {
        // validate the received index parameter:
        if (!index) return 'Index is missing'
        if (typeof index !== 'number') return 'Index should be a number'

        // check the length - if zero return a warning
        if (this.length === 0) return 'List is empty'

        // Validation - should not be less than 0
        if (index < 0) return `Minimum idx should be 0 or greater`

        // Check if it is the last element. In that case reset head and tail to null
        if (this.length === 1) {
            this.head = null
            this.tail = null
            this.prev = null
        }

        // If not define removal style. Removal will be either head, middle or tail.
        let removalType

        if (index === 0) {
            removalType = 'head'
        }
        // When we do a removal from middle on Doubly Linked List, we need to take 3 indexes into account: pre, target and next. To be able to make it work the middle removal with the length prop, we specify the comparison one minus form the length prop compared to a Singly Linked List.
        if (index >= this.length - 1) {
            removalType = 'tail'
        }
        if (index > 0 && index < this.length - 1) {
            removalType = 'middle'
        }

        if (removalType === 'head') {
            return this.deleteHead()
        }

        if (removalType === 'tail') {
            return this.deleteTail()
        }

        if (removalType === 'middle') {
            /*
          Pick the previous Node of targetIdx via traverse.
          Pick the target idx with preIdx.next
          Now make preIdx point to targetIdx next. This will remove the node in middle.
        */
            const preIdx = this.traverseToIndex(index - 1)
            const targetIdx = preIdx.next
            const targetVal = targetIdx.value
            const nextIdx = targetIdx.next
            preIdx.next = nextIdx
            nextIdx.prev = preIdx
            this.length--
            return targetVal
        }
    }

    // Reverse the list
    reverse() {
        // do not reverse if no elements
        if (this.length === 0) return
        // do not reverse if there is a single element
        if (this.length === 1) return this

        let currNode = this.head
        let prevNode = null
        let nextNode = null

        while (currNode) {
            // Store next node.
            nextNode = currNode.next
            // Store prev node.
            prevNode = currNode.prev

            // Change next node of the current node so it would link to previous node.
            currNode.next = prevNode
            currNode.prev = nextNode

            // Move prevNode and currNode nodes one step forward.
            prevNode = currNode
            currNode = nextNode
        }

        // Set the new tail with this.head (it contains the last item at this point of time):
        this.tail = this.head
        // Now reference this head to previousNode (contains the reversed list):
        this.head = prevNode

        return this
    }
}