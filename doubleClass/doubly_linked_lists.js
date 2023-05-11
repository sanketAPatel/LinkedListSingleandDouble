class DLLNode {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  constructor(value) {
    const newNode = new DLLNode(value)
    this.head = newNode
    this.tail = newNode
    this.length = 1
  }

  printList() {
    if (this.length === 0) {
      console.log('List is empty')
    } 
    let temp = this.head
    while (temp !== null) {
      console.log(temp.value)
      temp = temp.next
    }
  }

  getHeadNode() {
    if (this.head === null) {
      console.log("Head: null")
    } else {
      console.log("Head: " + this.head.value)
    }
  }

  getTailNode() {
    if (this.tail === null) {
      console.log("Tail: null")
    } else {
      console.log("Tail: " + this.tail.value)
    }
  }

  getLength() {
    console.log("Length: " + this.length)
  }

  makeEmpty() {
    this.head = null
    this.tail = null
    this.length = 0

    const returnString = '{ empty }'
    return returnString
  }

  addNode(value) {
    const newNode = new DLLNode(value)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
    this.length++
    return `New node added: ${newNode.value}`
  }

  removeNode() {
    if (this.length === 0) return undefined
    let temp = this.tail
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.tail = this.tail.prev
      this.tail.next = null
      temp.prev = null
    }
    this.length--
    return `Node removed from end: ${temp.value}`
  }

  insertAtBeginning(value) {
    const newNode = new DLLNode(value)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }
    this.length++
    return `New node inserted at beginning: ${newNode.value}`
  }

  removeFromBeginning() {
    if (this.length === 0) return undefined
    let temp = this.head
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = this.head.next
      this.head.prev = null
      temp.next = null
    }
    this.length--
    return `Node removed from beginning: ${temp.value}`
  }

  getNode(index) {
    if (index < 0 || index >= this.length) return undefined
    let temp = this.head
    if (index < this.length / 2) {
      for (let i = 0; i < index; i++) {
        temp = temp.next
      }
    } else {
      temp = this.tail
      for (let i = this.length - 1; i > index; i--) {
        temp = temp.prev
      }
    }
    return temp
  }

  setNode(index, value) {
    let temp = this.getNode(index)
    if (temp) {
      temp.value = value
      return `New node value at index ${index}: ${temp.value}`
    }
    return 'No node at specified index'
  }

  insertAtIndex(index, value) {
    if (index < 0 || index > this.length) return 'No node at specified index'
    if (index === this.length) {
      this.addNode(value)
      return `Node inserted at index ${index}: ${value}`
    }
    if (index === 0) return this.insertAtBeginning(value)

    const newNode = new DLLNode(value)
    const before = this.getNode(index - 1)
    const after = before.next
    before.next = newNode
    newNode.prev = before
    newNode.next = after
    after.prev = newNode
    this.length++
    return `Node inserted at index ${index}: ${newNode.value}`
  }

  removeAtIndex(index) {
    if (index === 0) return this.removeFromBeginning()
    if (index === this.length - 1) return this.removeNode()
    if (index < 0 || index >= this.length) return undefined

    const temp = this.getNode(index)

    temp.prev.next = temp.next
    temp.next.prev = temp.prev
    temp.next = null
    temp.prev = null

    this.length--
    return `Node removed at index ${index}: ${temp.value}`
  }
  
}


// Custom stringify function
function stringify(obj) {
  let cache = [];
  let str = JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, return node value instead of complete object
        return `DLLNode: ${value.value}`;
      }
      // Store value in cache
      cache.push(value);
    }
    return value;
  }, '\t');
  cache = null; // reset the cache
  return str;
}

// Create a new DoublyLinkedList instance with an initial value of 1
const list = new DoublyLinkedList(1)

console.log('DOUBLY LINKED LIST:\n\n')

// See the doubly linked list in the console
const dllClone1 = _.cloneDeep(list)
console.log('The initial doubly linked list object: ')
console.log(stringify(dllClone1))

// Test the addNode method by adding some new nodes
console.log('\n')
console.log('addNode() method:')
console.log(list.addNode(2))
console.log(list.addNode(3))
console.log(list.addNode(4))

const dllClone2 = _.cloneDeep(list)
console.log('\nThe doubly linked list object after adding nodes:')
console.log(stringify(dllClone2))

// Test the printList method to see the current state of the linked list
console.log('\nList of node values after three nodes added:')
console.log('printList() method:')
list.printList() // Output: 1 2 3 4

// Test the getHeadNode method to get the head node of the linked list
console.log('\n')
console.log('getHeadNode() method:')
list.getHeadNode() // Output: Head: 1

// Test the getTailNode method to get the tail node of the linked list
console.log('\n')
console.log('getTailNode() method:')
list.getTailNode() // Output: Tail: 4

// Test the getLength method to get the length of the linked list
console.log('\n')
console.log('getLength() method:')
list.getLength() // Output: Length: 4

// Test the removeNode method by removing the last node
console.log('\n')
console.log('removeNode() method:')
console.log(list.removeNode())

// Test the insertAtBeginning method by adding a new node at the beginning
console.log('\n')
console.log('insertAtBeginning() method:')
console.log(list.insertAtBeginning(0))

// Test the removeFromBeginning method by removing the first node
console.log('\n')
console.log('removeFromBeginning() method:')
console.log(list.removeFromBeginning())

// Test the getNode method by getting the node at index 2
const dllClone3 = _.cloneDeep(list)
console.log('getNode() method:')
console.log('\nNode at index 2: ') 
console.log(stringify(dllClone3.getNode(2)))
// Output: DLLNode { value: 3, next: null, prev: DLLNode { value: 2, ... } }

// Test the setNode method by setting the value of the node at index 2 to 10
console.log('\n')
console.log('setNode() method:')
console.log(list.setNode(2, 10))

// Test the insertAtIndex method by inserting a new node with the value 5 at index 2
console.log('\n')
console.log('insertAtIndex() method:')
console.log(list.insertAtIndex(2, 5))

// Test the removeAtIndex method by removing the node at index 3
console.log('\n')
console.log('removeAtIndex() method:')
console.log(list.removeAtIndex(3))

const dllClone4 = _.cloneDeep(list)
console.log('\nList after node removed at index 3:')
dllClone4.printList()

// Test the makeEmpty method by emptying the linked list
console.log('\n')
console.log('makeEmpty() method:')
console.log('List after makeEmpty method called: ')
console.log(list.makeEmpty())