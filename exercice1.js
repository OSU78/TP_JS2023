/*Exercice 1 : 
*Membre du groupe :
*   -Thomas DIAS
*   -FLorand RICHARD
*   -Salamatao Ousmane
*/
class Parser{
    constructor(motif){
        this.motif = motif
        this.str
    }

    parse (text){ 
        let convertInSrt = (text) =>{
        this.str = text.split(' ').join('').split(this.motif).reduce((acc,cur)=>{Number(cur)? acc.push(cur):0;return acc},[])
        console.log(this.str);
    }
    convertInSrt(text)
}

}

const phrase = "8790: bonjour le monde:8987:7777:Hello World:    9007";

const p = new Parser(':')
p.parse(phrase)
console.log(p.str);