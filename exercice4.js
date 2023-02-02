/*
*Exercice 4 : Exercice César
*Membre du groupe :
*   -Thomas DIAS
*   -FLorand RICHARD
*   -Salamatao Ousmane
*/
function char_rot(n, char) {
    const codeChar = char.charCodeAt(0);
    let rotatedCodeChar = codeChar + n;
    if (codeChar >= 97 && codeChar <= 122) {
      rotatedCodeChar = ((rotatedCodeChar - 97) % 26) + 97;
    } else if (codeChar >= 65 && codeChar <= 90) {
      rotatedCodeChar = ((rotatedCodeChar - 65) % 26) + 65;
    }
    return String.fromCharCode(rotatedCodeChar);
  }
  
  function cesear(n, text) {
    let encryptedText = "";
    for (const char of text) {
      encryptedText+= char_rot(n, char);
    }
    return encryptedText;
  }
  
  function cesear_decode(n, encryptedText) {
    let decryptedText = "";
    for (const char of encryptedText) {
      decryptedText += char_rot(-n, char);
    }
    return decryptedText;
  }
  
  console.log(char_rot(1, 'Z'));
  console.log(cesear(2, 'Bonjour tout le monde'));
  console.log(cesear_decode(2, 'Dqplqwt"vqwv"ng"oqpfg'));
  