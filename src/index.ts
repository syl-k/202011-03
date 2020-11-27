import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {MMDLoader} from "three/examples/jsm/loaders/MMDLoader";

let obj;
let camera;

window.addEventListener("DOMContentLoaded", () => {
    // canvasの取得
    const canvas = document.getElementById('canvas')

    // シーンの生成
    const scene = new THREE.Scene()

    // レンダラーの生成
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(document.getElementById('canvas').clientWidth - 20,
        document.getElementById('canvas').clientHeight - 35);
    // renderer.setSize(window.innerWidth - 300, window.innerHeight - 180);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvas.appendChild(renderer.domElement)

    // ライトの生成
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1.0, 1.0, 1.0).normalize()
    scene.add(light)

    /*
    // カメラの生成
    const camera = new THREE.PerspectiveCamera(
        80, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 1.2, -1)
    camera.rotation.set(0, Math.PI, 0)

    // VRMの読み込み
    const loader = new GLTFLoader()
    loader.load('./alicia.vrm',
        (gltf) => {
            VRM.from(gltf).then( (vrm) => {
                // シーンへの追加
                scene.add(vrm.scene)
            })
        }
    )
    */

    let loader = new MMDLoader();
    loader.crossOrigin = 'anonymous';
    //コールバックに画面に描画するための諸々のプログラムを書く
    loader.load(
        './doraemon.pmx',
        function ( mesh ) {
            obj = mesh
            obj.scale.set(2, 2, 2)
            obj.rotation.set(0, 0, 0);
            obj.position.set(0, 0, 0);
            scene.add(obj);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );

    // カメラの生成
    camera = new THREE.PerspectiveCamera(
        60.0, window.innerWidth / window.innerHeight, 0.1, 2000.0)
    camera.position.set( 0.0, 15.5, 38.0 );

    // camera controls
    const controls = new OrbitControls( camera, renderer.domElement )
    controls.screenSpacePanning = true;
    controls.target.set( 0.0, 10.0, 0.0 );
    controls.update();

    // helpers
    const gridHelper = new THREE.GridHelper( 100, 10 );
    scene.add( gridHelper );

    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    // フレーム毎に呼ばれる
    const update = () => {
        requestAnimationFrame(update)
        renderer.render(scene, camera)
    }
    update()
})

window.globalThis.moveAction = function(x, y ,z) {
    obj.rotation.set(x, y, z)
}

window.globalThis.resizeAction = function(x, y ,z) {
    obj.scale.set(x, y, z)
}
