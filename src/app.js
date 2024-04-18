let starsJson;
fetch('.././data/hygdata_v41.json')
    .then((response) => response.json())
    .then((json) => starsJson = json);

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
