import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RenderPass } from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';

let starsJson;
fetch('.././data/hygdata_v41.json')
    .then((response) => response.json())
    .then((json) => {
        starsJson = json;
        setActiveStars();
        drawStars();
        console.log(starsJson.length)
    })


const scene = new THREE.Scene();

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000);
// view from earth
camera.position.set(0, 0, 0.3)

// controls
const controls = new OrbitControls( camera, canvas );
// controls.enablePan = true;
controls.enableZoom = true;
controls.enableDamping = true;

// Particles
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('./src/star.png'); // Add a texture to the particle
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
    map: particleTexture, // Texture
    size: 0.01, // Size of the particles
    sizeAttenuation: true, // size of the particle will be smaller as it gets further away from the camera, and if it's closer to the camera, it will be bigger
});

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


const activeStarsClose = [];
const activeStarsFar = [];

function setActiveStars() {
    for(let i = 0; i < starsJson.length; i++) {
        const star = starsJson[i];
        // if (star.con == "Leo" ) {
            if(star.dist <= 20) activeStarsClose.push(star);
            else activeStarsFar.push(star);
        // }
    }
}

function drawStars() {
    // Draw close stars as spheres
    for(let i = 0; i < activeStarsClose.length; i++) {
        const star = activeStarsClose[i];
        const color = getHex(star.ci);
        const sphereMaterial = new THREE.MeshBasicMaterial( { color: color} ); 
        const sphereGeometry = new THREE.SphereGeometry( star.mag / 1000, 32, 32 ); 
        const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
        scene.add(sphere);
        sphere.position.set(star.x, star.y, star.z);
    }

        // Draw far stars as particles
        const particlesCount = activeStarsFar.length; // number of particles to be created
        const vertices = new Float32Array(particlesCount * 3); // Float32Array is an array of 32-bit floats. This is used to represent an array of vertices. (we have 3 values for each vertex - coordinates x, y, z)

        for (let i = 0; i < particlesCount; i++) {
            const star = activeStarsFar[i];
            vertices[i * 3] = star.x;
            vertices[i * 3  + 1] = star.y;
            vertices[i * 3  + 2] = star.z;
        }

        particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(vertices, 3) // 3 values for each vertex (x, y, z)
        );
        
        const stars = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(stars);
    // }
}


function animate() {
    controls.update();
	requestAnimationFrame( animate );
	// renderer.render( scene, camera );
    composer.render();
}
animate();


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

function resetView() {
    controls.reset();
}

document.getElementById("reset-view").addEventListener("click", resetView);