import * as THREE from 'three'
//import * as remote from '@electron/remote'

export default class Game {

    static _scene: any
    static _camera: any
    static _renderer: any
    static _remote: any
    static _cube: any
    constructor() {
        const remote = require('@electron/remote')
        let dimensions: any = remote.screen.getPrimaryDisplay().size
        
        Game._scene = new THREE.Scene()
        Game._camera = new THREE.PerspectiveCamera( 75, dimensions.width / dimensions.height, 0.1, 1000 )
        Game._renderer =  new THREE.WebGLRenderer()

        Game._renderer.setSize(dimensions.width, dimensions.height)
        document.body.appendChild(Game._renderer.domElement)

        let geometry: any = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
        Game._cube = new THREE.Mesh( geometry, material )
        Game._scene.add( Game._cube )
        
        Game._camera.position.z = 5;

        let animate = (): void => {
            requestAnimationFrame(animate)

            Game._cube.rotation.x += 0.01;
            Game._cube.rotation.y += 0.01;
            Game._renderer.render(Game._scene, Game._camera)
        }

        animate()
    }
}