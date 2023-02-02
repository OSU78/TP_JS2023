let currentUserId = null;
const postsContainer = document.querySelector('#posts');
const templatePost = document.querySelector('#templatePost');
import { userSelect } from "./start.js";
import { get } from "./start.js";

async function displayPostsUser(userId) {
    const posts = await get("/posts", ["userId", userId]);
    const container = document.createElement("div");
    posts.map(async (post) => {
        const elem = await createPostElem(post);
        container.append(elem)
    })
    postsContainer.append(container);
}

async function createPostElem(data) {
    const post = document.createElement("div");

    post.id = data.id;
    post.userId = data.userId;

    post.classList.add("post");
    post.append(templatePost.content.cloneNode(true))

    post.children[0].textContent = data.title;
    post.children[1].textContent = data.body;
    const numberComs = await getNumberComments(data.id);
    post.children[2].textContent = `Nombre de commentaires: ${numberComs}`

    return post;
}

async function getNumberComments(postId) {
    const comments = await get("/comments", ["postId", postId]);
    return comments.length
}


userSelect.addEventListener("click", ()=> {
    if(userSelect.value !== currentUserId) {
        currentUserId = userSelect.value;
        if(postsContainer.children.length > 0){
            const currentPosts = postsContainer.children[1];
            postsContainer.removeChild(currentPosts);
        }
        const userId = userSelect.value;
        displayPostsUser(userId);
    }
})