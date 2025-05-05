// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

const a = [1,2,5,4,6];
class Node{
    
    constructor( left, right){
        this.left = left
        this.right = right
    }
}

function Recur(a){
    if(a.length == 0)return 0
    return  Recur(a)
}

const b = new Node()

console.log('b',Recur(a))