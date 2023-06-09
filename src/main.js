import * as THREE from 'three'
import { AdditiveBlending } from 'three'
import { gsap } from "gsap";
import initAnimations from './cards-animation'


import './styles/app.css'

/**
 * Base
 */
const textureLoader = new THREE.TextureLoader()
const shape = textureLoader.load('https://uploads-ssl.webflow.com/647fa9e68cb822c74d6ec016/647fbfd9250220d14fa29b84_1.png')

// Canvas
const canvas = document.getElementById('webgl')

// Scene
const scene = new THREE.Scene()

//Galaxy Generator
const parameters = {}

// Option
parameters.count = 30500 // stars in galaxy
parameters.stars = 3000 // background stars
parameters.size = 0.012 // size of stars in galaxy
parameters.radius = 5 // radius of galaxy
parameters.branches = 6 // branches in galaxy
parameters.spin = 1.1 // spin of the galaxy
parameters.randomness = 0.1 // generateGalaxy
parameters.starColor = '#5f5f5f' // color of stars
parameters.randomnessPower = 5 // generateGalaxy
parameters.insideColor = '#fa9071' // color of core
parameters.outsideColor = '#7c74bb' // color of branches

let bgStarsGeometry = null
let bgStarsMaterial = null
let bgStars = null

//Background stars
function generateBgStars(){

    if(bgStars!==null){
        bgStarsGeometry.dispose()
        bgStarsMaterial.dispose()
        scene.remove(bgStars)
    }

    bgStarsGeometry = new THREE.BufferGeometry()
    const bgStarsPositions = new Float32Array(parameters.stars * 3)

    for(let j = 0; j<parameters.stars; j++){
        bgStarsPositions[j*3 + 0] = (Math.random() - 0.5) * 20
        bgStarsPositions[j*3 + 1] = (Math.random() - 0.5) * 20
        bgStarsPositions[j*3 + 2] = (Math.random() - 0.5) * 20
    }

    bgStarsGeometry.setAttribute('position', new THREE.BufferAttribute(bgStarsPositions, 3))

    bgStarsMaterial = new THREE.PointsMaterial({
        size: parameters.size,
        depthWrite: false,
        sizeAttenuation: true,
        blending: AdditiveBlending,
        color: parameters.starColor,
        transparent: true,
        alphaMap: shape
    })

    bgStars = new THREE.Points(bgStarsGeometry, bgStarsMaterial)

    scene.add(bgStars)
}

generateBgStars()

//Galaxy generator
let geometry = null
let material = null
let points = null

function generateGalaxy(){

    if(points !== null){
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count *3)
    const colors = new Float32Array(parameters.count *3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for(let i=0; i<parameters.count; i++){

        //Position
        const x = Math.random() * parameters.radius
        const branchAngle = (i % parameters.branches) / parameters.branches * 2 * Math.PI
        const spinAngle = x * parameters.spin

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random()<0.5 ? 1: -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random()<0.5 ? 1: -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random()<0.5 ? 1: -1)

        positions[i*3] = Math.sin(branchAngle + spinAngle) * x + randomX
        positions[i*3 + 1] = randomY
        positions[i*3 + 2] = Math.cos(branchAngle + spinAngle) * x + randomZ

        //Color

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, x / parameters.radius)

        colors[i*3 + 0] = mixedColor.r
        colors[i*3 + 1] = mixedColor.g
        colors[i*3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    material = new THREE.PointsMaterial({
        color: 'white',
        size: parameters.size,
        depthWrite: false,
        sizeAttenuation: true,
        blending: AdditiveBlending,
        vertexColors: true,
        transparent: true,
        alphaMap: shape
    })

    points = new THREE.Points(geometry, material)
    scene.add(points)


}

generateGalaxy()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>  {
    // Update sizes
    sizes.width = window.innerWidth
    //sizes.height = getCanvasHeight()
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const INIT_CAMERA_POSITION_X = 0
const INIT_CAMERA_POSITION_Y = 0
const INIT_CAMERA_POSITION_Z = 30

const READY_CAMERA_POSITION_X = 0
const READY_CAMERA_POSITION_Y = 0.9
const READY_CAMERA_POSITION_Z = 3.5

camera.position.x = INIT_CAMERA_POSITION_X
camera.position.y = INIT_CAMERA_POSITION_Y
camera.position.z = INIT_CAMERA_POSITION_Z
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x1A1A1A);

/**
 * Animate
 */
const clock = new THREE.Clock()
let firstRender = true;

const tick = () =>  {
    const elapsedTime = clock.getElapsedTime()

    points.rotation.y = elapsedTime*0.08
    bgStars.rotation.y = - elapsedTime*0.02

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

/**
 * Animate intro
 */
function animateCamera() {
    const duration = 3;
    gsap.fromTo(camera.position,
      { x: INIT_CAMERA_POSITION_X, y: INIT_CAMERA_POSITION_Y, z: INIT_CAMERA_POSITION_Z },
      { x: READY_CAMERA_POSITION_X, y: READY_CAMERA_POSITION_Y, z: READY_CAMERA_POSITION_Z, duration, ease: "power4.out" }
    );
}

/**
 * Animate in scroll
 */
window.addEventListener("scroll", (ev) => {
    camera.position.y = READY_CAMERA_POSITION_Y + window.scrollY / -350.0;
});

/**
 * Force page scroll position to top at page refresh in HTML
 */
window.onbeforeunload =  () => {
    window.scrollTo(0, 0);
}

/**
 * Init all modules
 */
window.addEventListener('load', function() {
    animateCamera();
    initAnimations()
});

