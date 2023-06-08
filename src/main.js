import * as THREE from 'three'
import { AdditiveBlending } from 'three'

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

// Option 1
/*parameters.count = 44200
parameters.size = 0.015
parameters.radius = 5
parameters.branches = 7
parameters.spin = 1
parameters.randomness = 0.4
parameters.randomnessPower = 5
parameters.stars = 4400
parameters.starColor = '#3e3e3e'
parameters.insideColor = '#989898'
parameters.outsideColor = '#595959'*/

// Option 2
parameters.count = 44200
parameters.size = 0.015
parameters.radius = 5
parameters.branches = 7
parameters.spin = 1
parameters.randomness = 0.4
parameters.randomnessPower = 5
parameters.stars = 4400
parameters.starColor = '#60608e'
parameters.insideColor = '#f56c4d'
parameters.outsideColor = '#3c5389'

/*gui.add(parameters, 'count').min(100).max(100000).step(100).onChange(generateGalaxy).name('stars in galaxy')
gui.add(parameters, 'stars').min(0).max(100000).step(100).onChange(generateBgStars).name('background stars')
gui.addColor(parameters, 'starColor').onChange(generateBgStars).name('color of stars')
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onChange(generateGalaxy).name('size of stars in galaxy')
gui.add(parameters, 'radius').min(1).max(10).step(1).onChange(generateGalaxy).name('radius of galaxy')
gui.add(parameters, 'branches').min(1).max(10).step(1).onChange(generateGalaxy).name('branches in galaxy')
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onChange(generateGalaxy).name('spin of the galaxy')
gui.add(parameters, 'randomness').min(0).max(2).step(0.01).onChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(1).onChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onChange(generateGalaxy).name('color of core')
gui.addColor(parameters, 'outsideColor').onChange(generateGalaxy).name('color of branches')*/

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
const getCanvasHeight = () => {
    const VIEWPORT_HEIGHT = window.innerHeight;
    const VH_VALUE = 123;
    return (VH_VALUE * VIEWPORT_HEIGHT) / 100;
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
    //height:  getCanvasHeight(),
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
const INIT_CAMERA_POSITION_Y = 0.9
camera.position.x = 1
camera.position.y = INIT_CAMERA_POSITION_Y
camera.position.z = 3.5
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

const tick = () =>  {
    const elapsedTime = clock.getElapsedTime()

    //Update the camera
    points.rotation.y = elapsedTime*0.08
    bgStars.rotation.y = - elapsedTime*0.02


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * Animate in scroll
 */
window.addEventListener("scroll", (ev) => {
    camera.position.y = INIT_CAMERA_POSITION_Y + window.scrollY / -270.0;
});