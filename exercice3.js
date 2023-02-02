/*Exercice 3
*Membre du groupe :
*   -Thomas DIAS
*   -FLorand RICHARD
*   -Salamatao Ousmane
*/

class Main {
    static countOccurence(data) {
        const integers = data.filter(num => Number.isInteger(num));
        const nums = new Set(integers);
        const results = new Map();
        for (const num of nums) {
            let count = 0;
            for (const int of integers) {
                if(int === num){
                    count++;
                }
            }
            results.set(num, count)
        }
        return results;
    }
}

data = [
  1, 1, 2, 3, 4, 8, 8, 5, 6, 6, 9, 9, 10, 11, 12, 14, 48, 48, 51, 51, 1, 1, 1,
  51, 3, 3, 3, 51, 51, 51, 51, 51, 0,
];

const res = Main.countOccurence(data)
console.log(res)