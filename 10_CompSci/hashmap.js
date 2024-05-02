class HashMap {
    arraySize = 16
    buckets = new Array(this.arraySize)
  
    set(key, value) {
        const hashcode = this.hash(key)
        const index = hashcode % 16

        if (this.buckets[index] !== undefined) {
            this.bucket[index].append(new HashNode(hashcode, value))
        } else {
            const newList = new LinkedList()
            this.buckets[index] = newList
            newList.append(new HashNode(hashcode, value))
        }
    }

    get(key) {
        if (this.getNode(key) === null) return null
        const { node } = this.getNode(key)
        return node.value
    }

     has(key) {
        if (this.getNode(key) === null) return false
        return true
     }

     remove(key) {
        if (this.getNode(key) === null) return false
        const { index, ll, node} = this.getNode(key)
        if (ll.size <= 1) {
            this.buckets[index] = undefined
        } else {
            ll.removeAt(ll.indexOf(node))
        }
        return true
     }
    
    set arraySize(value) {
       this.arraySize = value 
    }
    
    getNode(key) {
        const hashcode = this.hash(key)
        const index = hashcode % 16

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound")
        }

        if (this.buckets[index] !== undefined) {
            const ll = this.buckets[index]
            for (let i = 0; i < ll.size(); i++) {
                const node = ll.at(i).value
                if (node.key === hashcode) return {index, ll, node}
            }
        } else {
            console.warn('the bucket has not been created')
        }
        return null
    }
    
    hash(key) {
        let hashCode = 0;
        
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }   

    get buckets() {
        return this.buckets
    }
}

class HashNode {
    key = null
    value = null

    constructor(key, value) {
        this.key = key
        this.value = value
    }

    get key() {
        return this.key
    }

    get value() {
        return this.value
    }

    set key(value) {
       this.key = value 
    }

    set value(value) {
        this.value = value
    }
}

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

    indexOf(value) {
        let currentNode = this.headNode
        let index = 0
        while(currentNode.value !== value) {
           count++ 
           currentNode = currentNode.next
        }
        return index
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

const names = new HashMap()
names.set("Alan", "Napieralski")
console.log(names.get("Alan"))
console.log(names.has("Alan"))
console.log(names.remove("Alan"))
console.log(names.get("Alan"))
console.log(names.has("Alan"))