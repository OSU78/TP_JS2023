let elInput = document.querySelector('.post');
let labelPost = document.getElementById('labelPost');
let elSubmit = document.querySelector('.submitPost');
let message = document.querySelector('.message');
let statsMoyenne = document.querySelector('#statsMoyenne')

const payload = {post : {},targetChar : "",tabAverage : []}  // global mutable object for define post, targeted post, average
const url = 'https://jsonplaceholder.typicode.com/posts'

/**
 * 
 * function called at the load of DOM we fetch all post
 */
function changeInitDom(payload){
    payload.post = payload
    labelPost.innerHTML += payload.post.length + ''
    console.log(payload);
    payload.post.map(n =>{
        let containerPost = document.createElement('div')
        containerPost.setAttribute('id',`post ${n.id}`)
        containerPost.setAttribute('class','cardPost')
        containerPost.innerHTML = `<p>post number : ${n.id}</p>
                                    <p>${n.title}<p/>`
        message.appendChild(containerPost)
    })
}

/**
 * 
 * function to add stats in one post
 */
function buildStatsForEachPost(incrementation,numberOfChar){
    let stats = document.createElement('p')
    stats.setAttribute('class','statsPost')
    stats.innerHTML = `le nombre de "${payload.target}" est de : ${numberOfChar}` 
    document.getElementById(`post ${incrementation+1}`).removeChild(document.getElementById(`post ${incrementation+1}`).lastChild)
    document.getElementById(`post ${incrementation+1}`).appendChild(stats)
}

/**
 * 
 * function to add global stats for char resarch
 */
function buildCharStatsForAllPost(){
    let max = payload.tabAverage.reduce((acc,cur)=>acc+=cur,0)
    let average = payload.tabAverage.reduce((acc,cur)=>acc+=cur,0)/payload.post.length
    statsMoyenne.innerHTML = `le caractère "${payload.target}" apparait en moyenne ${average} fois par post, il est present : ${max} fois`
    elInput.value = ""
}

/**
 * 
 * function to calculate the average of targeted char in all post 
 */
function defineAverageForTargetChar(post){
    payload.post = post
    payload.tabAverage = []
    for (let i = 0; i < payload.post.length ; i++) {
        let title = [...payload.post[i].title]
        if (payload.target !== "") {
            let numberOfChar = title.reduce((acc,curr) => {
                if (curr === payload.target) {
                    acc +=1
                }
                return acc
            },0)
            payload.tabAverage.push(numberOfChar)
            buildStatsForEachPost(i,numberOfChar)
        }
    }
    buildCharStatsForAllPost()
}

/**
 * 
 * function for fetch all post
 */
const fetchUserPost = async(URL)=>{
    const r = await fetch(URL)
    if (r.ok === true) {
        return r.json()
    }
}

/**
 * 
 * function to set the targetChar
 */
function eventInput(event) {
    payload.target = event.data
}

/**
 * 
 * function to fetch new post with stats building
 */
function onClick() {
    fetchUserPost(url)
        .then(x => defineAverageForTargetChar(x))
}

elInput.addEventListener('input', eventInput);

elSubmit.addEventListener('click', onClick);

fetchUserPost(url).then(x => changeInitDom(x))
