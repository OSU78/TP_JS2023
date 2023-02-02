/*Exercice 2 : 
*Membre du groupe :
*   -Thomas DIAS
*   -FLorand RICHARD
*   -Salamatao Ousmane
*/

class whoIsTheHigher{
    constructor(a,b,c){
        this.ref = a
        this.bench = [a,b,c]
    }

    theHighest(){
        let highest = () =>{
            return this.bench.reduce((acc,curr)=>acc<curr? acc=curr:acc ,this.ref)
        }
        return highest()
    }
}

const p = new whoIsTheHigher(10,25,5) 
const res =  p.theHighest()
console.log(res);