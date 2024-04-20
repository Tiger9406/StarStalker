const filterMenu = document.getElementById('filter-menu');
const startMenu = document.getElementById('start-menu');
const starsExtraButtons = document.getElementById('stars-extra-buttons');
const starInfo = document.getElementById("star-info");
const filterInfo = document.getElementById("filter-info");


document.getElementById("filter").addEventListener("click", showFilterMenu);
document.getElementById("filter-top").addEventListener("click", showFilterMenu);
function showFilterMenu() {
    filterMenu.classList.remove('hidden'); 
    startMenu.classList.add('hidden'); 
    starsExtraButtons.classList.add('hidden');
    starInfo.classList.add('hidden');
    filterInfo.classList.add("hidden");
}

document.getElementById("view").addEventListener("click", showStars);
document.getElementById("go").addEventListener("click", showStars);
document.getElementById("close-filter").addEventListener("click", showStars);
function showStars() {
    startMenu.classList.add("hidden");
    document.getElementById('filter-menu').classList.add('hidden'); 
    document.getElementById('stars-extra-buttons').classList.remove('hidden');
    document.getElementById("star-info").classList.remove("hidden");
    document.getElementById("filter-info").classList.remove("hidden");
}

document.getElementById("settings").addEventListener("click", showSettings);
function showSettings() {
    document.getElementById("settings-menu").classList.remove("hidden");
    startMenu.classList.add('hidden'); 
    starsExtraButtons.classList.add('hidden');
    starInfo.classList.add('hidden');
    filterInfo.classList.add('hidden');
}

document.getElementById("close-settings").addEventListener("click", hideSettings);
function hideSettings() {
    document.getElementById("settings-menu").classList.add("hidden");
    showStars();
}

const properties = document.getElementById("properties");
const greatestOrLeast = document.getElementById("greatest-or-least");
const greatest = document.getElementById("greatest");
const least = document.getElementById("least");
const number = document.getElementById("number");

const constellations = document.getElementById("constellations");


properties.addEventListener("change", updateDropdown);
function updateDropdown() {
    const prop = properties.value;
    if(prop == "con") {
        greatestOrLeast.classList.add("hidden");
        constellations.classList.remove("hidden");
        number.classList.add("hidden");
    } else {
        greatestOrLeast.classList.remove("hidden");
        constellations.classList.add("hidden");
        number.classList.remove("hidden");

        if(prop == "dist") {
            greatest.innerText = "Farthest";
            least.innerText = "Closest";
        } else if (prop == "rv") {
            greatest.innerText = "Fastest";
            least.innerText = "Slowest";
        } else if (prop == "absmag" || prop == "mag") {
            // least = brightest bc stars with more negative magnitudes are brighter
            least.innerText = "Brightest";
            greatest.innerText = "Dimmest";
        }
    }
}


//function to get array of distances
//changeable later to include more properties
function getDistanceArray(jsonFile){
    let array = [];
    //for each item in jsonFile
    for (const key in jsonFile) {
        const star_info = jsonFile[key];
        let un_squarerooted_distance = Math.pow(star_info.x, 2)+Math.pow(star_info.y, 2)+Math.pow(star_info.z, 2);
        let distance = Math.sqrt(un_squarerooted_distance);
        //append each distance
        array.push(distance);
    }
    return array;
}