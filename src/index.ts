import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {MMDLoader} from "three/examples/jsm/loaders/MMDLoader";

window.addEventListener("DOMContentLoaded", () => {
    // canvasの取得
    const canvas = document.getElementById('canvas')

    // シーンの生成
    const scene = new THREE.Scene()

    // レンダラーの生成
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth - 300, window.innerHeight - 180);
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

    // カメラの生成
    const camera = new THREE.PerspectiveCamera(
        28.0, window.innerWidth / window.innerHeight, 0.1, 2000.0)
    camera.position.set( 0.0, 5.5, 38.0 );

    var loader = new MMDLoader();
    loader.crossOrigin = 'anonymous';
    //コールバックに画面に描画するための諸々のプログラムを書く
    loader.load(
        './doraemon.pmx',
        function ( mesh ) {
            mesh.scale.set(1, 1, 1)
            mesh.rotation.set(0, 0, 0);
            mesh.position.set(0, -5, 0);
            scene.add( mesh );
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

    // camera controls
    const controls = new OrbitControls( camera, renderer.domElement )
    controls.screenSpacePanning = true;
    controls.target.set( 0.0, 1.0, 0.0 );
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