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
