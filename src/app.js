let starsJson;

function getStars() {
    const property = document.getElementById("properties").value;
    const greatestOrLeast = document.getElementById("greatest-or-least").value;
    const k = document.getElementById("number").value;

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


const ctx = document.getElementById("canvas").getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;

function drawStars() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.fill();  
    for(let i = 0; i < starsJson.length; i++) {
        const star = starsJson[i];
        ctx.beginPath();
        // arbitrary scale for now
        // 100000 is max dist
        ctx.arc(star.x / 20 * width + width / 2, star.y / 20 * height + height / 2, 1, 0, 2 * Math.PI);
        ctx.fill();  
    }
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    ctx.canvas.width  = width;
    ctx.canvas.height = height;
}

window.addEventListener('resize', resize());

fetch('.././data/hygdata_v41.json')
    .then((response) => response.json())
    .then((json) => {
        starsJson = json;
        drawStars();
    })