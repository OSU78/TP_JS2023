let currentUserId = null;
const postsContainer = document.querySelector("#posts");
const templatePost = document.querySelector("#templatePost");
const avgComContainer = document.querySelector("#avgNumberComments");
const topWordsPostsContainer = document.querySelector("#topWordsPosts");
import { userSelect } from "./start.js";
import { get } from "./start.js";

async function displayPostsUser(userId) {
  const posts = await get("/posts", ["userId", userId]);
  const container = document.createElement("div");
  postsContainer.append(container);

  let totalComments = 0;
  let aggregateWords = "";

  for (const post of posts) {
    const elem = await createPostElem(post);
    container.append(elem);
    totalComments += Number(elem.dataset.numberComs);
    aggregateWords += `${elem.children[1].textContent} `;
  }

  const avgCommentsPerPost = totalComments / posts.length;
  // display the average number of comments per post
  avgComContainer.textContent = `Nombre moyen de commentaires par post : ${avgCommentsPerPost}`;

  const array = await countWords(aggregateWords);
  topWordsPostsContainer.insertAdjacentHTML("beforeend", topWords(array));
  //console.log(array)
}

async function createPostElem(data) {
  const post = document.createElement("div");

  const numberComs = await getNumberComments(data.id);

  post.dataset.id = data.id;
  post.dataset.userId = data.userId;
  post.dataset.numberComs = numberComs;

  post.classList.add("post");
  post.append(templatePost.content.cloneNode(true));

  post.children[0].textContent = `Titre: ${data.title}`;
  post.children[1].textContent = data.body;
  post.children[2].textContent = `Nombre de commentaires: ${numberComs}`;

  return post;
}

async function getNumberComments(postId) {
  const comments = await get("/comments", ["postId", postId]);
  return comments.length;
}

async function countWords(string, limit = 10) {
  const words = string.split(/[ \n]/);
  const occurences = new Set(words);
  const result = new Map();
  //console.log(occurences)
  for (const occurence of occurences) {
    let count = 0;
    for (const word of words) {
      if (word === occurence) {
        count++;
      }
    }
    result.set(occurence, count);
  }
  //console.log(result);
  const sorted = new Map([...result.entries()].sort((a, b) => b[1] - a[1]));
  //console.log(sorted)
  const iterator = sorted.entries();
  const topTenSorted = new Map();
  for (let i = 0; i < limit; i++) {
    const set = iterator.next().value;
    const key = set[0];
    const value = set[1];
    topTenSorted.set(key, value);
  }
  return topTenSorted;
}

function topWords(words) {
  console.log(words.size);
  document.querySelector(".topWordsPosts-title").innerHTML= "<p>Top 10 des mots les plus utilisés dans les posts</p>";
 
  const iterator = words.entries();
  for (let i = 0; i < words.size; i++) {
    const word = iterator.next().value;
    
    document.querySelector(".topWordsPosts-item").innerHTML+= `<div class="result box" style="padding:12px; min-width: 200px ;min-width: 220px;"><p> occurences : ${word[1]}</p><p style="font-size:15px">mot: ${word[0]}</p></div>`;
  }
  return true
}

userSelect.addEventListener("change", () => {
  if (userSelect.value !== currentUserId) {
    currentUserId = userSelect.value;
    if (postsContainer.children.length > 0) {
      const currentPosts = postsContainer.children[2];
      postsContainer.removeChild(currentPosts);
    }
    const userId = userSelect.value;
    displayPostsUser(userId);
    console.log("user changed");
    console.log(currentUserId);
  }
});
