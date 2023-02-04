const rootURI = "https://jsonplaceholder.typicode.com"
export const userSelect = document.querySelector('#user');
let localisations = [];

const userList = [];

function getTodos(userId) {
    console.log(userId);
    const u = parseInt(userId);
    fetch("https://jsonplaceholder.typicode.com/todos?userId=" + userId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const result = document.querySelector("#todos");
        result.innerHTML = " ";
        const total = data.length;
        const completed = data.filter((todo) => todo.completed).length;
        const notCompleted = total - completed;
        result.innerHTML += `<div class="result box"><p> Tâche complétées </p> <p>  ${completed}</div>`;
        result.innerHTML += `<div class="result box"> <p>Tâche en cours </p> <p> ${notCompleted}</p></div>`;


      });
  }
  document.querySelector("#user").addEventListener("change", () => {
    getTodos(document.querySelector(".user").value);
    
  });


export async function get(uri, ...params) {
    let url = rootURI + uri;
    if (params) {
        for (let i = 0; i < params.length; i++) {
            let param = params[i];
            if (param.length !== 2) {
                throw new Error("Need both the param name and the value")
            }
            url += `?${param[0]}=${param[1]}`;
            if (i >= 1) {
                url += "&";
            }
        }
    }
    return await fetch(url)
        .then(req => req.json())
        .catch(error => console.log(error));
}


async function displayUserList() {
    const data = await get("/users").then(data => data.forEach(user => {

        let userMap = new Map();
        userMap.set("id", user.id);
        userMap.set("name", user.name);
        userMap.set("username", user.username);
        userMap.set("email", user.email);
        userMap.set("phone", user.phone);
        userMap.set("website", user.website);
        userMap.set("lat", user.address.geo.lat);
        userMap.set("lng", user.address.geo.lng);
        console.log(userMap);
        userList.push(userMap);


        localisations.push([user.address.geo.lat, user.address.geo.lng]);

        console.table(localisations);
        console.table(userList);


        const option = document.createElement('option');
        option.value = user.id;
        option.innerHTML = user.name;
        userSelect.appendChild(option);


    }));


    userSelect.click();
}


function getDistance(userPosition, positions) {
    const distance = [];
    // console.table(positions);
    // console.table(userPosition); 
    // console.log("userPosition[O]"+userPosition[0]);
    // console.log("userPosition[1]"+userPosition[1]);
    // console.log("positions[0]"+positions[0]);
    // console.log("positions[1]"+positions[1]);

    if (positions[0] != userPosition[0] && positions[1] != userPosition[1]) {
        distance.push(
            Math.floor(
                Math.sqrt(
                    (userPosition[0] - positions[0]) ** 2 + (userPosition[1] - positions[1]) ** 2
                ) * 100
            ) / 100
        );
    }

    console.table(distance);
    return distance;
}

function displayDistances(distances) {
    console.log(userList[3].get("lat"));
    const container = document.querySelector("#statistiques");
    container.innerHTML = " ";
    distances.forEach((distance) => {
        if (distance.distance > 0) {
            const div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML += `
      <div class="result box" style="padding:12px; min-width: 150px ">
     
        <p> ${userList[parseInt(distance.user)].get("name")}</p>
        <div class="flex flex-right noneMargin">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z" fill="#F8F8F8"/>
        </svg>

        <p style="font-size:15px;margin-bottom: 0px;" >Distance : ${distance.distance}</p></div></div>
       
      `;

            container.appendChild(div);
        }
    });
}

// Fonction qui calcule les distances entre les utilisateurs
function calculateDistances(userId) {

    console.log("Calcul des distances");  
    console.log(userList);
    // Récupération de la localisation de l'utilisateur grâce à son ID
    let userLocalisation = [parseFloat(userList[userId].get("lat")), parseFloat(userList[userId].get("lng"))];

    console.log("UserLocalisation 🔥 : " + userLocalisation);
    // Tableau pour stocker les distances entre les utilisateurs
    const distances = [];
    // Boucle qui parcourt la liste des localisations
    localisations.forEach((coordonner, id) => {
        let data = coordonner
        // Séparation des coordonnées en latitude et longitude
        let coordonnerArray = (data.toString()).split(",");
        let lat = parseFloat(coordonnerArray[0]);
        let log = parseFloat(coordonnerArray[1]);
        // Affichage de la latitude
        console.log("lat" + lat);
        // Vérification que ce n'est pas la localisation de l'utilisateur actuel
        if (user.id !== id) {
            console.log("userLocalisation : " + userLocalisation);
            console.log("[lat,log] : " + [lat, log]);
            // Calcul de la distance entre les deux utilisateurs
            const distance = getDistance(userLocalisation, [lat, log]);
           
            distances.push({
                user: id,
                distance: distance
            });
        }
    });
    // Affichage du tableau des distances
    console.log(distances);
    // Appel de la fonction pour afficher les distances sur la page
    displayDistances(distances);
}


userSelect.addEventListener('change', (event) => {
    const userId = userSelect.value;
    console.log("userID : " + userId);

    calculateDistances(userId);
});

window.addEventListener('load', function () {
    displayUserList();
});