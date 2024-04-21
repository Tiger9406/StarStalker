import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RenderPass } from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';

// DOM elements
const loader = document.getElementById("loading-icon");

// load star data from json file
let starsJson;
let activeStars = [];
fetch('.././data/hyglike.json')
    .then((response) => response.json())
    .then((json) => {
        starsJson = json;
        activeStars = starsJson;
        drawStars();
    })


// create scene and renderer
const scene = new THREE.Scene();
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000);
// view from earth
camera.position.set(0, 0, 0.2)

// controls
const controls = new OrbitControls( camera, canvas );
controls.enableZoom = true;
controls.enableDamping = true;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// Particles
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('./src/star.png'); // Add a texture to the particle


// Bloom
const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1,
    0.1,
    0.1
);
composer.addPass(bloomPass);

let renderNum = 1000;
let activeStarsDetailed = [];
let activeStarsLowDetail = [];

function drawStars() {
    pointer.x = -1;
    pointer.y = -1;

    activeStarsDetailed = [];
    activeStarsLowDetail = [];
    if(activeStars.length > renderNum) activeStars.sort(function(a, b){return a.dist - b.dist});
    for(let i = 0; i < activeStars.length; i++) {
        const star = activeStars[i];
        // if(star.dist >= 99999) continue;
        if(i <= renderNum) activeStarsDetailed.push(star);
        else activeStarsLowDetail.push(star);
    }

    // Draw detailed stars as spheres
    for(let i = 0; i < activeStarsDetailed.length; i++) {
        const star = activeStarsDetailed[i];
        const color = getHex(star.ci);
        const sphereMaterial = new THREE.MeshBasicMaterial( { color: color} ); 
        const sphereGeometry = new THREE.SphereGeometry( star.absmag / 750, 32, 32 ); 
        const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
        sphere.starData = star;
        sphere.position.set(star.x, star.y, star.z);
        scene.add(sphere);
    }

    // Draw low detail stars as particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({    
        map: particleTexture, // Texture
        size: 0.01, // Size of the particles
        sizeAttenuation: true, // size of the particle will be smaller as it gets further away from the camera, and if it's closer to the camera, it will be bigger
    });

    const particlesCount = activeStarsLowDetail.length; // number of particles to be created
    const vertices = new Float32Array(particlesCount * 3); // Float32Array is an array of 32-bit floats. This is used to represent an array of vertices. (we have 3 values for each vertex - coordinates x, y, z)

    for (let i = 0; i < particlesCount; i++) {
        const star = activeStarsLowDetail[i];
        vertices[i * 3] = star.x;
        vertices[i * 3  + 1] = star.y;
        vertices[i * 3  + 2] = star.z;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3) // 3 values for each vertex (x, y, z)
    );
    
    const stars = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(stars);
    hideLoader();
}

let clicked = false;

// calculate pointer position
function calculatePointer( event ) {
	// (-1 to +1) for both components
    clicked = true;
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
window.addEventListener( 'click', calculatePointer );

let last;
let lastColor;
let lastID;


function animate() {
    controls.update();

    if(clicked) {
        // calclate raycasting
        // update the picking ray with the camera and pointer position
        raycaster.setFromCamera( pointer, camera );

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects( scene.children );
        const closest = intersects[0];

        if (closest && closest.object.type != "Points") {
            if(last) last.object.material.color.set(lastColor);
            lastColor = closest.object.material.color.getHex();
            if(last && closest.object == last.object) {
                displayStarData(null);
                last = null;
            } else {
                closest.object.material.color.set( 0xffffff );
                displayStarData(closest.object.starData);
                last = closest;
            }
        } else {
            lastID = "";
        }
        clicked = false;
    }

	requestAnimationFrame( animate );
    composer.render();
}
animate();

function clearScene() {
    scene.remove.apply(scene, scene.children);
} 



// get approximate hex color value from star color index
function getHex(ci) {
    if(ci >= 1.4 ) return "#ffcc6f";
    if(ci >= 0.8) return "#ffd2a1";
    if(ci >= 0.6) return "#FDB813";
    if(ci >= 0.3) return "#f8f7ff";
    if(ci >= 0.0) return "#cad7ff";
    if(ci >= -0.33) return "#aabfff";
    return "#ffffff";
}

document.getElementById("reset-view").addEventListener("click", resetView);
function resetView() {
    controls.reset();
}

const changeRD = document.getElementById("change-rd");

changeRD.addEventListener("change", changeRenderDistance)
function changeRenderDistance() {
    showLoader();
    renderNum = parseInt(changeRD.value);
    window.setTimeout(function() {
        clearScene();
        drawStars();
    }, 5000)
    
    
}

document.getElementById("unreasonable").addEventListener("click", toggleReasonableRange);
let reasonable = true;
function toggleReasonableRange() {
    if(reasonable) {
        changeRD.setAttribute("max", "100000");
        changeRD.setAttribute("step", "10000");
    } else {
        changeRD.setAttribute("max", "200");
        changeRD.setAttribute("step", "5");
    }
    reasonable = !reasonable;
    document.getElementById("reasonable-range-values").classList.toggle("hidden");
    document.getElementById("unreasonable-range-values").classList.toggle("hidden");
}


function displayStarData(data) {
    if(data == null) {
        document.getElementById("proper-name").innerText = "";
        document.getElementById("constellation").innerText = "";
        document.getElementById("spectral-type").innerText = "";
        document.getElementById("distance").innerText = "";
        document.getElementById("radial-velocity").innerText = "";
        document.getElementById("absolute-magnitude").innerText = "";
        document.getElementById("visual-magnitude").innerText = "";
    } else {
        document.getElementById("proper-name").innerText = data.proper;
        document.getElementById("constellation").innerText = data.con;
        document.getElementById("spectral-type").innerText = data.spect;
        document.getElementById("distance").innerText = data.dist;
        document.getElementById("xyz").innerText = `(${data.x}, ${data.y}, ${data.z})`;
        document.getElementById("radial-velocity").innerText = data.rv;
        document.getElementById("absolute-magnitude").innerText = data.absmag;
        document.getElementById("visual-magnitude").innerText = data.mag;
    }
}


function showLoader() {
    loader.classList.remove("invisible");
    window.setTimeout(function() {
        loader.classList.remove("opacity-0");
    }, 1000);

}
function hideLoader() {
    loader.classList.add("opacity-0");
    window.setTimeout(function() {
        loader.classList.add("invisible");
    }, 1000);
}

document.getElementById("go").addEventListener("click", filterStars);
function filterStars() {
    showLoader();
    const k = parseInt(document.getElementById("number").value);
    const property = document.getElementById("properties").value;
    const greatestOrLeast = document.getElementById("greatest-or-least").value;
    const constellation = document.getElementById("constellations").value;

    let heapTime;
    let quickTime;

    if(property == "con") {
        activeStars = [];
        for(let i = 0; i < starsJson.length; i++) {
            const star = starsJson[i];
            if(star.con == constellation) {
                activeStars.push(star);
            }
        }
    } else {
        let heapSorted;
        let quickSorted;

        let heapStartTime;
        let heapEndTime;
        let quickStartTime;
        let quickEndTime;

        if(greatestOrLeast == "least") {
            heapStartTime =  performance.now();
            heapSorted = heapsortSmallestK(starsJson, k, property);
            heapEndTime =  performance.now();
            
            quickStartTime =  performance.now();
            quickSorted = quicksortSmallestK(starsJson, k, property);
            quickEndTime =  performance.now();
        }
        else{
            heapStartTime =  performance.now();
            heapSorted = heapsortLargestK(starsJson, k, property);
            heapEndTime =  performance.now();

            quickStartTime =  performance.now();
            quickSorted = quicksortLargestK(starsJson, k, property);
            quickEndTime =  performance.now();
        } 
        activeStars = heapSorted;

        heapTime = heapEndTime - heapStartTime;
        quickTime = quickEndTime - quickStartTime;
    }

    const filterProperties = {
        "dist-greatest" : "farthest",
        "dist-least" : "closest",
        "rv-greatest" : "fastest",
        "rv-least" : "slowest",
        "absmag-greatest" : "absolute dimmest",
        "absmag-least" : "absolute brightest",
        "mag-greatest" : "visually dimmest",
        "mag-least" : "visually brightest"
    };


    if(property == "con") {
        document.getElementById("num-stars-con").innerText = activeStars.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
        document.getElementById("filter-info").classList.add("hidden");
        document.getElementById("filter-info-con").classList.remove("hidden");
        document.getElementById("con-group").innerText = constellation;
    } else {
        document.getElementById("num-stars").innerText = activeStars.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
        document.getElementById("filter-info").classList.remove("hidden");
        document.getElementById("filter-info-con").classList.add("hidden");
        document.getElementById("filter-property").innerText = filterProperties[property + "-" + greatestOrLeast];
        document.getElementById("heap-time").innerText = heapTime;
        document.getElementById("quick-time").innerText = quickTime;
        document.getElementById("filter-time").classList.remove("hidden");
        if(greatestOrLeast == "greatest") document.getElementById("heap-type").innerText = "min";
        else document.getElementById("heap-type").innerText = "max";
    }

    clearScene();
    drawStars();
    resetView();
    hideLoader();

}