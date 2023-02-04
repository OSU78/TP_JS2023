// Définition de la valeur par défaut de currentUserId
let currentUserId = null;

// Récupération des éléments du DOM
const postsContainer = document.querySelector("#posts");
const templatePost = document.querySelector("#templatePost");
const avgComContainer = document.querySelector("#avgNumberComments");
const topWordsPostsContainer = document.querySelector("#topWordsPosts");

// Importation des fonctions
import { userSelect } from "./start.js";
import { get } from "./start.js";

// Fonction pour afficher les posts du user
async function displayPostsUser(userId) {
  // Récupération des posts à partir de l'Id du user
  const posts = await get("/posts", ["userId", userId]);

  // Vérification si le conteneur existe déjà
  if(document.querySelector(".commentGroup")){
    document.querySelector(".commentGroup").remove()
  }
   // Création d'un conteneur
  const container = document.createElement("div");
  postsContainer.append(container);
  container.classList.add("grid");
  container.classList.add("commentGroup");

  // Initialisation des variables pour le calcul des moyennes
  let totalComments = 0;
  let aggregateWords = "";

  // Boucle pour créer les éléments des posts
  for (const post of posts) {
    const elem = await createPostElem(post);
    container.append(elem);
    totalComments += Number(elem.dataset.numberComs);
    aggregateWords += `${elem.children[1].textContent} `;
  }

  // Calcul du nombre moyen de commentaires par post
  const avgCommentsPerPost = totalComments / posts.length;

  // Affichage du nombre moyen de commentaires par post
  avgComContainer.innerHTML = `<div class="result box pd10 width100"> <p>Nombre moyen de commentaires par post </p><p> ${avgCommentsPerPost}</p></div>`;

  // Calcul du tableau des mots les plus utilisés
  const array = await countWords(aggregateWords);
  // Affichage du tableau des mots les plus utilisés
  topWords(array)
  //console.log(array)
}



async function createPostElem(data) {
  const post = document.createElement("div");

  // On récupère le nombre de commentaires pour chaque post
  const numberComs = await getNumberComments(data.id);

  post.dataset.id = data.id;
  post.dataset.userId = data.userId;
  post.dataset.numberComs = numberComs;

  post.classList.add("post");

  post.append(templatePost.content.cloneNode(true));

  // On vérifie si le div pour afficher les mots les plus utilisés est rempli
  if (document.querySelector("#topWordsPosts")) {
    if (document.querySelector("#topWordsPosts").children.length > 0) {
      // On vide le div
      document.querySelector("#topWordsPosts").children[1].innerHTML = ""
    }
  }
  post.children[0].textContent = `Titre: ${data.title}`;
  post.children[1].textContent = data.body;
  // On affiche le nombre de commentaires
  post.children[2].innerHTML = `<div class="flex flex-right noneMargin">
  <svg class="opacity067" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9C11.8022 9 11.6089 9.05865 11.4444 9.16853C11.28 9.27841 11.1518 9.43459 11.0761 9.61732C11.0004 9.80004 10.9806 10.0011 11.0192 10.1951C11.0578 10.3891 11.153 10.5673 11.2929 10.7071C11.4327 10.847 11.6109 10.9422 11.8049 10.9808C11.9989 11.0194 12.2 10.9996 12.3827 10.9239C12.5654 10.8482 12.7216 10.72 12.8315 10.5556C12.9414 10.3911 13 10.1978 13 10C13 9.73478 12.8946 9.48043 12.7071 9.29289C12.5196 9.10536 12.2652 9 12 9ZM19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V15C2 15.7956 2.31607 16.5587 2.87868 17.1213C3.44129 17.6839 4.20435 18 5 18H16.59L20.29 21.71C20.3834 21.8027 20.4943 21.876 20.6161 21.9258C20.7379 21.9755 20.8684 22.0008 21 22C21.1312 22.0034 21.2613 21.976 21.38 21.92C21.5626 21.845 21.7189 21.7176 21.8293 21.5539C21.9396 21.3901 21.999 21.1974 22 21V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM20 18.59L17.71 16.29C17.6166 16.1973 17.5057 16.124 17.3839 16.0742C17.2621 16.0245 17.1316 15.9992 17 16H5C4.73478 16 4.48043 15.8946 4.29289 15.7071C4.10536 15.5196 4 15.2652 4 15V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V18.59ZM8 9C7.80222 9 7.60888 9.05865 7.44443 9.16853C7.27998 9.27841 7.15181 9.43459 7.07612 9.61732C7.00043 9.80004 6.98063 10.0011 7.01921 10.1951C7.0578 10.3891 7.15304 10.5673 7.29289 10.7071C7.43275 10.847 7.61093 10.9422 7.80491 10.9808C7.99889 11.0194 8.19996 10.9996 8.38268 10.9239C8.56541 10.8482 8.72159 10.72 8.83147 10.5556C8.94135 10.3911 9 10.1978 9 10C9 9.73478 8.89464 9.48043 8.70711 9.29289C8.51957 9.10536 8.26522 9 8 9ZM16 9C15.8022 9 15.6089 9.05865 15.4444 9.16853C15.28 9.27841 15.1518 9.43459 15.0761 9.61732C15.0004 9.80004 14.9806 10.0011 15.0192 10.1951C15.0578 10.3891 15.153 10.5673 15.2929 10.7071C15.4327 10.847 15.6109 10.9422 15.8049 10.9808C15.9989 11.0194 16.2 10.9996 16.3827 10.9239C16.5654 10.8482 16.7216 10.72 16.8315 10.5556C16.9414 10.3911 17 10.1978 17 10C17 9.73478 16.8946 9.48043 16.7071 9.29289C16.5196 9.10536 16.2652 9 16 9Z" fill="#F8F8F8"/>
</svg>

   ${numberComs}</div>`;

  return post;
}

async function getNumberComments(postId) {
  // On récupère le nombre de commentaires pour chaque post
  const comments = await get("/comments", ["postId", postId]);
  return comments.length;
}


// Début de la fonction countWords 
// Cette fonction prend en paramètre une chaîne de caractère et un nombre limite (optionel) et renvoie le nombre d'occurence des mots
async function countWords(string, limit = 10) {
  const words = string.split(/[ \n]/);
  const occurences = new Set(words);
  const result = new Map(); 

  // Boucle sur chaque mot présent dans le Set
  for (const occurence of occurences) {
    let count = 0; 
    for (const word of words) {
      // Si le mot de la boucle est présent dans le Set
      if (word === occurence) {
        count++; 
      }
    }
    // Ajout du mot et du nombre d'occurence dans le Map
    result.set(occurence, count);
  }
  // Tri du Map par ordre décroissant grâce à une fonction de comparaison
  const sorted = new Map([...result.entries()].sort((a, b) => b[1] - a[1]));

  const iterator = sorted.entries();
  const topTenSorted = new Map();
  // Boucle sur les 10 mots les plus utilisés
  for (let i = 0; i < limit; i++) {
    const set = iterator.next().value;
    const key = set[0]; // Mot 
    const value = set[1]; // Nombre d'occurences
    // Ajout du mot et du nombre d'occurences dans le Map
    topTenSorted.set(key, value);
  }
  // Renvoie du Map contenant les 10 mots les plus utilisés
  return topTenSorted;
}

// Début de la fonction topWords
// Cette fonction prend en paramètre un Map et affiche les mots les plus utilisés dans la page html
function topWords(words) {
  console.log(words.size); 
  document.querySelector(".topWordsPosts-title").innerHTML = "Top 10 des mots les plus utilisés dans les posts"; // Modifie le titre du html

  const iterator = words.entries();
  // Boucle sur le nombre de mots contenus dans le Map
  for (let i = 0; i < words.size; i++) {
    const word = iterator.next().value;

    // Modifie la page html pour afficher le mot et son nombre d'occurence
    document.querySelector(".topWordsPosts-item").innerHTML += `<div class="result box" style="padding:12px; min-width: 150px "><p> occurences : ${word[1]}</p><p style="font-size:15px">mot: ${word[0]}</p></div>`;
  }
  return true // Renvoie true
}

// Attache l'évènement change à la balise select 
userSelect.addEventListener("change", () => {

  if (userSelect.value !== currentUserId) {
    currentUserId = userSelect.value; 
   
    const userId = userSelect.value; // Récupère l'id de l'utilisateur
    displayPostsUser(userId); 
    console.log("user changed"); 
    console.log(currentUserId); 
  }
});