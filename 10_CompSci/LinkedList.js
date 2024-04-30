class LinkedList {
    headNode = null
    tailNode = null
    
    append(value) {
        if (this.headNode === null) {
            const newNode = new Node(value, null)
            this.headNode = newNode
            this.tailNode = newNode
            return
        }
        
        this.tailNode.next = new Node(value, null)
        this.tailNode = this.tailNode.next
    }
    
    prepend(value) {
        const newValue = new Node(value, this.headNode)
        this.headNode = newValue
    }
    
    size() {
        let currentNode = this.headNode
        let count = 0
        while(currentNode !== null) {
            count++
            currentNode = currentNode.next
        }
        
        return count
    }
    
    head() {
        return this.headNode
    }
    
    tail() {
        return this.tailNode
    }
    
    at(index) {
        let currentNode = this.headNode
        let count = 0
        while(currentNode !== null) {
            if (count === index) return currentNode
            count++
            currentNode = currentNode.next
        }
    }
    
    pop() {
        let currentNode = this.headNode
        while(currentNode !== null) {
            if (currentNode.next === this.tailNode) {
                currentNode.next === null
                this.tailNode = currentNode
                break
            }
            currentNode = currentNode.next
        }
    }
    
    contains(value) {
        let currentNode = this.headNode
        while(currentNode !== null) {
            if (currentNode.value === value) return true
            currentNode = currentNode.next
        }
        return false
    }
    
    find(value) {
        let currentNode = this.headNode
        let count = 0
        while(currentNode !== null) {
            if (currentNode.value === value) return count
            count++
            currentNode = currentNode.next
        }
        return null
    }
    
    toStringg() {
        let string = '';
        let currentNode = this.headNode
        while(currentNode !== null) {
            string +=`( ${currentNode.value} ) -> `
            currentNode = currentNode.next
        }
        string += 'null'
        
        return string
    }
    
    insertAt(value, index) {
        const newNode = new Node(value, null)
        
        let currentNode = this.headNode
        let currentIndex = 0
        while(currentNode !== null) {
            if (index === 0) {
               const newValue = new Node(value, this.headNode)
                this.headNode = newValue
                break
            }
            else if (currentIndex === index - 1) {
                newNode.next = currentNode.next
                currentNode.next = newNode
            }
            currentIndex++
            currentNode = currentNode.next
        }
        
        if (index > currentIndex) {
            console.log('List does not have a position with the given index')
        }
    }
    
    removeAt(index) {
        
        let currentNode = this.headNode
        let currentIndex = 0
        while(currentNode !== null) {
            if (index === 0) {
                this.headNode = currentNode.next
                currentNode.next = null
                return
            }
            else if (currentIndex === index - 1) {
                const prev = currentNode
                const current = currentNode.next
                const next = current.next
                
                prev.next = current.next
                current.next = null
                return
            }
            currentIndex++
        }
        
        if (index > currentIndex) {
            console.log('List does not have a position with the given index')
        }
    }
    
}

class Node {
    value = null
    next = null
    
    constructor(value, next) {
        this.value = value
        this.next = next
    }
    
    get value() {
        return this.value
    }
    
    get nextNode() {
        return this.next
    }
}

const string = "string"

const list = new LinkedList()
list.append(string)
list.append('shit')
list.prepend('three')

list.removeAt(1)
console.log(list.toStringg())
