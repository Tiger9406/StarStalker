const filterMenu = document.getElementById('filter-menu');
const startMenu = document.getElementById('start-menu');
const filterExtraButtons = document.getElementById('filter-extra-buttons');
const starsExtraButtons = document.getElementById('stars-extra-buttons');


document.getElementById("filter").addEventListener("click", showFilterMenu);
document.getElementById("filter-top").addEventListener("click", showFilterMenu);
function showFilterMenu() {
    filterMenu.classList.remove('hidden'); 
    startMenu.classList.add('hidden'); 
    filterExtraButtons.classList.remove('hidden');
    starsExtraButtons.classList.add('hidden');
}

document.getElementById("view").addEventListener("click", showStars);
document.getElementById("go").addEventListener("click", showStars);
document.getElementById("back").addEventListener("click", showStars);
function showStars() {
    startMenu.classList.add("hidden");
    // filterExtraButtons.classList.remove("hidden");

    document.getElementById('filter-menu').classList.add('hidden'); 
    document.getElementById('filter-extra-buttons').classList.add('hidden'); 
    document.getElementById('stars-extra-buttons').classList.remove('hidden');
}


function getStars() {
    const property = document.getElementById("properties").value;
    const greatestOrLeast = document.getElementById("greatest-or-least").value;
    const k = document.getElementById("number").value;

}


//function to get array of distances
//changeable later to include more properties
// function getDistanceArray(jsonFile){
//     let array = [];
//     //for each item in jsonFile
//     for (const key in jsonFile) {
//         const star_info = jsonFile[key];
//         let un_squarerooted_distance = Math.pow(star_info.x, 2)+Math.pow(star_info.y, 2)+Math.pow(star_info.z, 2);
//         let distance = Math.sqrt(un_squarerooted_distance);
//         //append each distance
//         array.push(distance);
//     }
//     return array;
// }