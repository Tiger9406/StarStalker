import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let starsJson;
fetch('.././data/hygdata_v41.json')
    .then((response) => response.json())
    .then((json) => {
        starsJson = json;
        setActiveStars();
        drawStars();
    })


const scene = new THREE.Scene();

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// over head view
// camera.position.set( 0, 20, 100 ); 
// view from earth
camera.position.set( 0, 0, 0.1 )

// controls
const controls = new OrbitControls( camera, canvas );
controls.enableDamping = true;

// Spheres
const sphereGeometry = new THREE.SphereGeometry( 0.01, 32, 32 ); 
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 

// Particles
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('./src/star.png'); // Add a texture to the particle
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
    map: particleTexture, // Texture
    size: 0.01, // Size of the particles
    sizeAttenuation: true, // size of the particle will be smaller as it gets further away from the camera, and if it's closer to the camera, it will be bigger
  });

const activeStarsClose = [];
const activeStarsFar = [];

function setActiveStars() {
    for(let i = 0; i < starsJson.length; i++) {
        const star = starsJson[i];
        // if (star.dist <= 50) {
            if(star.dist <= 10) activeStarsClose.push(star);
            else activeStarsFar.push(star);
        // }
    }
}

function drawStars() {
    // Draw close stars as spheres
    for(let i = 0; i < activeStarsClose.length; i++) {
        const star = activeStarsClose[i];
        const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
        scene.add(sphere);
        sphere.position.x = star.x;
        sphere.position.y = star.y;
        sphere.position.z = star.z;
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

	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}
animate();
