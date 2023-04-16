
import * as THREE from 'three';

import * as sh from './Shaders';

export default class Cube {
  constructor(xOffset, yOffset, zOffset, cubeType) {
    this.cubeGroup = new THREE.Group();
    this.uniforms = {
      opacity: {
        type: 'f',
        value: 1.0,
      },
    };


    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //shade object with appropriate cube shaders
    const fragmentShaderFunction = sh[cubeType];
      

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: this.uniforms,
      vertexShader: sh.vertexShader(),
      fragmentShader: fragmentShaderFunction(),
    });
    this.cubeMesh = new THREE.Mesh(geometry, material);

    const lineEdges = new THREE.EdgesGeometry(this.cubeMesh.geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#000000',  linewidth: 3 });
    this.lineMesh = new THREE.LineSegments(lineEdges, lineMaterial);

    //add shaders to the cube group
    this.cubeGroup.add(this.cubeMesh);
    this.cubeGroup.add(this.lineMesh);
    this.cubeGroup.position.x = xOffset;
    this.cubeGroup.position.y = yOffset;
    this.cubeGroup.position.z = zOffset;
  }

}
