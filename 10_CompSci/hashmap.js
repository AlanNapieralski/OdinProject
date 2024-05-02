const LinkedList = require('./LinkedList')

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

const names = new HashMap()
names.set("Alan", "Napieralski")
names.set('Carlos', 'de la torre')
console.log(names.get("Carlos"))
console.log(names.has("Carlos"))
console.log(names.remove("Carlos"))
console.log(names.get("Carlos"))
console.log(names.has("Carlos"))