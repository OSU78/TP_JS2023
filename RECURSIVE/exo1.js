let TAB = [1,2,3,4]

let sumReduce = TAB.reduce((acc,curr)=>acc+=curr,0)
console.log(sumReduce)

function recSum(tab,res=0){
    if(tab.length === 0){
        return res
    }
    let count = tab.pop()
    let comp = res + count
    return recSum(tab,comp)
}
console.log(recSum(TAB))