function fibs(n) {
    if (n === 0) return []
    else if (n === 1) return [0] 
    let array = [0, 1] // base for fibonacci

    for (let i=2; i < n; i++) {
        let lastTwo = array[i-1] + array[i-2]
        array.push(lastTwo)
    }

    return array
}
console.log('iterative fib:')
console.log(fibs(8))

function fibsR(n) {
    if (n === 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    let fibs = fibsR(n - 1);
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
    return fibs;
}
console.log('recursive fib:');
console.log(fibsR(8));


