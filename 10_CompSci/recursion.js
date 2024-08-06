// task 1
function sumRange(n) {
    if (n == 1) return 1

    return n + sumRange(n-1)

}
console.log("Task1:")
console.log(sumRange(3))



// task 2
function power(base, exponent) {
    if (exponent == 0) return 1

    return base * power(base, exponent-1)
}
console.log("Task2:")
console.log(power(2, 4)); // 16
console.log(power(2, 3)); // 8
console.log(power(2, 2)); // 4 
console.log(power(2, 1)); // 2
console.log(power(2, 0)); // 1


// task 3
function factorial(n) {
    if (n == 1) return 1
    return n * factorial(n-1)
} 

console.log("Task3:")
console.log(factorial(4))

// task 4
function all(arr, callback) {
    const lastIndex = arr.length-1

    if (arr.length === 0) return true

    if (!callback(arr[lastIndex])) return false
    else {
        arr.pop()
        return all(arr, callback)
    }
}
var allAreLessThanSeven = all([1,2,5], function(num){
	return num < 7;
});
// [1, 6, 3, 2, 9, 0]
console.log('Task 4:')
console.log(allAreLessThanSeven); // false

// task 5
function productOfArray(arr) {
    if (arr.length === 0) return 1
    return arr.shift() * productOfArray(arr)
}

var six = productOfArray([1,2,3]) // 6
console.log(six)
var sixty = productOfArray([1,2,3,10]) // 60
console.log(sixty)

// task6
function contains(obj, value) {
    for(let key in obj) {
        if (typeof obj[key] === 'object') {
            return contains(obj[key], value)
        }

        if (obj[key] === value) {
            return true
        }
    }
    return false
}

// task 7
function totalIntegers(arr) {
    let count = 0
    for (let dim of arr) {
        if (Array.isArray(dim)) {
            count += totalIntegers(dim) 
        } else if (Number.isInteger(dim)) {
            count++
        }
    } 
    return count
}
var seven = totalIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]]) // 7
console.log('Task 7:')
console.log(seven)

// task 8
function SumSquares(arr) {
    let sum = 0

    for (let dim of arr) {
        if (Array.isArray(dim)) sum += SumSquares(dim)
        else if (Number.isInteger(dim)) {
            sum += dim*dim
        }
    }
    return sum
}
console.log('Task 8:')
console.log(SumSquares([[[[[[[[[1]]]]]]]]] ))

// task 9
function replicate(rep, num) {
    if (rep <= 0) return []

    return [num].concat(replicate(rep-1, num))
}

console.log(replicate(3, 5))