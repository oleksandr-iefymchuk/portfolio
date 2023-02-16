import * as THREE from 'three';
import map from '../img/map.webp';



const slides = document.querySelectorAll(".slide");
const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setClearColor(0x000007, 0);
slides[0].appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set(-0.7, 0, 3);

const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0x000007, 0.5, 3.5);
// const bg = new THREE.TextureLoader().load('/img/3c4070fba708ecb7c07a045fadd884bc.jpeg');
// scene.background = bg;


const ambientLight = new THREE.AmbientLight();
ambientLight.intensity = 5;
const light = new THREE.SpotLight(0xFFFFFF, 10);
light.position.set(-4, 3, 1);
light.castShadow = true;
light.shadow.mapSize.width = 10000;
light.shadow.mapSize.height = light.shadow.mapSize.width;
light.penumbra = 0.5;

const lightBottom = new THREE.PointLight(0xffffff, 2);
lightBottom.position.set(-0.4, -0.8, 0.5);
lightBottom.intensity = 10;

const lightTop = new THREE.PointLight(0xFFFFFF, 2);
lightTop.position.set(-1.5, 0.5, 1);
lightTop.intensity = 10;

// const backLightHelper = new THREE.PointLightHelper(lightBottom, 0.5);
// scene.add(backLightHelper);
// const fontLightHelper = new THREE.PointLightHelper(lightTop, 0.5);
// scene.add(fontLightHelper);

scene.add(ambientLight);
scene.add(light);
scene.add(lightTop);
scene.add(lightBottom);

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener('resize', onWindowResize);

const mouse = new THREE.Vector2();
const onMouseMove = (event) => {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) - 1;
  mouse.y = -(event.clientY / window.innerHeight) / 2;
}
window.addEventListener('mousemove', onMouseMove, false);

const particularGruop = new THREE.Object3D();
const modularGruop = new THREE.Object3D();
scene.add(particularGruop);
scene.add(modularGruop);

const mathRandom = (num = 1) => {
  const setNumber = - Math.random() * num + Math.random() * num;
  return setNumber;
}
const getRandomNum = (min, max) => Math.random() * (max - min) + min;

const generateParticle = (num, pos) => {
  const gmaterial = new THREE.MeshStandardMaterial({color:0xFFFFFF, roughness: 0.3, side:THREE.DoubleSide});
  const gparticular = new THREE.CircleGeometry(0.2, 5);
  for (var i = 1; i < num; i++) {
    const pscale = 0.01 + Math.abs(mathRandom(0.05));
    const particular = new THREE.Mesh(gparticular, gmaterial);
    particular.position.set(mathRandom(3),mathRandom(2),mathRandom(pos));
    particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
    particular.scale.set(pscale,pscale,pscale);
    particular.speedValue = mathRandom(1);

    particularGruop.add(particular);
  }
}
generateParticle(200, 1);

const generateColor = () => Math.random() < 0.5 ? 0xFFFF00 : 0x7B68EE;

const init = () => {
  let numberFigures = 7;
  for (let i = 0; i < numberFigures; i++) {
    const geometry = new THREE.BoxGeometry();
    const texture = new THREE.TextureLoader().load(map);
    
    const material = new THREE.MeshStandardMaterial({color: generateColor(), roughness: 0, transparent:false, opacity:1, wireframe:false});
    material.normalMap = texture;
    material.metalness = 0.7;
    const cube = new THREE.Mesh(geometry, material);
    cube.speedRotation = Math.random() * 0.1;
    cube.positionX = mathRandom()*0.6;
    cube.positionY = mathRandom()*0.6;
    cube.positionZ = mathRandom()*0.6;
    cube.castShadow = true;
    cube.receiveShadow = true;

    const newScaleValue = getRandomNum(0.07, 0.21);
    cube.scale.set(newScaleValue,newScaleValue,newScaleValue);
    cube.rotation.x = mathRandom(180 * Math.PI / 180);
    cube.rotation.y = mathRandom(180 * Math.PI / 180);
    cube.rotation.z = mathRandom(180 * Math.PI / 180);
    cube.position.set(0.7,0,1.2);
    modularGruop.add(cube);
  }
}

const animate = () => {
  const time = performance.now() * 0.0008;
  requestAnimationFrame(animate);
  for (let i = 0; i < particularGruop.children.length; i++) {
    const newObject = particularGruop.children[i];
    newObject.rotation.x += newObject.speedValue/10;
    newObject.rotation.y += newObject.speedValue/10;
    newObject.rotation.z += newObject.speedValue/10;
  };
  
  for (let i = 0; i < modularGruop.children.length; i++) {
    const newCubes = modularGruop.children[i];
    newCubes.rotation.x += 0.008;
    newCubes.rotation.y += 0.005;
    newCubes.rotation.z += 0.003;
    newCubes.position.x = Math.sin(time * newCubes.positionZ) * newCubes.positionY;
    newCubes.position.y = Math.cos(time * newCubes.positionX) * newCubes.positionZ;
    newCubes.position.z = Math.sin(time * newCubes.positionY) * newCubes.positionX;
  }
  particularGruop.rotation.z -= 0.002;
  particularGruop.rotation.y -= (mouse.x + particularGruop.rotation.y) * 0.025;
  particularGruop.rotation.x -= (-mouse.y + particularGruop.rotation.x) * 0.1;
  modularGruop.rotation.y -= ((mouse.x*2) + modularGruop.rotation.y) * 0.1;
  modularGruop.rotation.x -= ((-mouse.y*2) + modularGruop.rotation.x) * 0.1;

if (window.innerWidth < 900){
    camera.lookAt(scene.position);
}else{
  camera.lookAt(camera.position);

}
  renderer.render( scene, camera );  
}

export {animate, init}
