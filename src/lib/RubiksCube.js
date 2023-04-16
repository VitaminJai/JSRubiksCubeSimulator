import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

import Cube from './Cube';

export default class RubiksCube {
  constructor() {
    this.lastEventTime = 0;
    this.THROTTLE_TIME = 250;
    this.scrambleNum = 20;
    this.scale = 20;
    this.epsilon = 0.5;
    this.consoleDebug = true;
    this.selectedCube = null;
    this.rubiksCubeGroup = new THREE.Group();
    this.rubiksCubeGroup.scale.x = this.scale;
    this.rubiksCubeGroup.scale.y = this.scale;
    this.rubiksCubeGroup.scale.z = this.scale;
    //all possible moves
    /*
    this.premoves = ["DPrime", "F2", "U2", "D2", "L2"];
    this.premoves2 = ["L2", "D2", "U2", "F2", "D"];
    console.log(this.premoves);
    console.log(this.premoves2);

    this.moveFunctions = [
      "U", "UPrime", "U2",
      "D", "DPrime", "D2",
      "R", "RPrime", "R2",
      "L", "LPrime", "L2",
      "F", "FPrime", "F2",
      "B", "BPrime", "B2",
      "M", "MPrime", "M2",
      "E", "EPrime", "E2",
      "S", "SPrime", "S2",
      "Uw", "UwPrime", "Uw2",
      "Dw", "DwPrime", "Dw2",
      "Rw", "RwPrime", "Rw2",
      "Lw", "LwPrime", "Lw2",
      "Fw", "FwPrime", "Fw2",
      "Bw", "BwPrime", "Bw2"
    ];
    */

    //limited range for scramble
    this.moveFunctions = [
      "U", "UPrime",
      "L", "LPrime",
      "F", "FPrime",
      "M", "MPrime",
      "E", "EPrime",
      "S", "SPrime",
    ];
    //initialise arrays to track moves
    this.moved = [];
    this.solved = [];

    //set rotations and animation
    this.rubiksCubeGroup.rotation.x = Math.PI / 7;
    this.rubiksCubeGroup.rotation.y = -Math.PI / 4;

    this.initializeRubiksCube();

    const anim = (t) => {
      TWEEN.update(t);
      requestAnimationFrame(anim);
    };
    anim();
  }

  //handle axis rotation
  rotateAroundWorldAxis(cubeGroup, axis) {
    const start = { rotation: 0 };
    const prev = { rotation: 0 };
    const end = { rotation: Math.PI / 2 };

    const tween = new TWEEN.Tween(start)
      .to(end, this.THROTTLE_TIME)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(({ rotation }) => {
        cubeGroup.position.applyAxisAngle(axis, rotation - prev.rotation);
        cubeGroup.rotateOnWorldAxis(axis, rotation - prev.rotation);
        prev.rotation = rotation;
      });

    tween.start();
  }

  //handle rotations
  cubeInSameY(c1, c2) {
    return (
      c1.cubeGroup.position.y > c2.cubeGroup.position.y - this.epsilon &&
      c1.cubeGroup.position.y < c2.cubeGroup.position.y + this.epsilon
    );
  }

  cubeInSameX(c1, c2) {
    return (
      c1.cubeGroup.position.x > c2.cubeGroup.position.x - this.epsilon &&
      c1.cubeGroup.position.x < c2.cubeGroup.position.x + this.epsilon
    );
  }

  cubeInSameZ(c1, c2) {
    return (
      c1.cubeGroup.position.z > c2.cubeGroup.position.z - this.epsilon &&
      c1.cubeGroup.position.z < c2.cubeGroup.position.z + this.epsilon
    );
  }

  //console debug notation
  getText(key) {
    return (
      {
        w: 'W: rotate up',
        s: 'S: rotate down',
        a: 'A: rotate left',
        d: 'D: rotate right',
        q: 'Q: rotate face left',
        e: 'E: rotate face right',
        r: 'R: random highlight',
      }[key] || ''
    );
  }

  displayKey(key) {
    if (this.consoleDebug) {
      console.log(
        `%c ${this.getText(key)} `,
        'background: #fafafa; color: #0a0a0a; font-size: 20px'
      );
    }
  }

  onKeyDown(event) {
    if (event.key === 'r') {
      this.displayKey(event.key);
      this.highlightRandCubes();
      return; //Ignore event if the key pressed is 'r'
    } else if (event.key === 'i') {
      this.topLeft();
      return;
    }

    const currentTime = new Date().getTime();
    if (currentTime - this.lastEventTime < this.THROTTLE_TIME) {
      return; // Ignore event if it's too soon after the last one
    }
    this.lastEventTime = currentTime;

    if (event.key === 'w') {
      this.displayKey(event.key);
      const axis = new THREE.Vector3(-1, 0, 0);
      this.cubes.forEach((cube) => {
        if (this.cubeInSameX(cube, this.selectedCube)) {
          this.rotateAroundWorldAxis(cube.cubeGroup, axis);
        }
      });
    } else if (event.key === 'a') {
      this.displayKey(event.key);
      const axis = new THREE.Vector3(0, -1, 0);
      this.cubes.forEach((cube) => {
        if (this.cubeInSameY(cube, this.selectedCube))
          this.rotateAroundWorldAxis(cube.cubeGroup, axis);
      });
    } else if (event.key === 's') {
      this.displayKey(event.key);
      const axis = new THREE.Vector3(1, 0, 0);
      this.cubes.forEach((cube) => {
        if (this.cubeInSameX(cube, this.selectedCube))
          this.rotateAroundWorldAxis(cube.cubeGroup, axis);
      });
    } else if (event.key === 'd') {
      this.displayKey(event.key);
      const axis = new THREE.Vector3(0, 1, 0);
      this.cubes.forEach((cube) => {
        if (this.cubeInSameY(cube, this.selectedCube))
          this.rotateAroundWorldAxis(cube.cubeGroup, axis);
      });
    } else if (event.key === 'q') {
      this.displayKey(event.key);
      const axis = new THREE.Vector3(0, 0, 1);
      this.cubes.forEach((cube) => {
        if (this.cubeInSameZ(cube, this.selectedCube))
          this.rotateAroundWorldAxis(cube.cubeGroup, axis);
      });
    } else if (event.key === 'e') {
      this.displayKey(event.key);
      const axis = new THREE.Vector3(0, 0, -1);
      this.cubes.forEach((cube) => {
        if (this.cubeInSameZ(cube, this.selectedCube))
          this.rotateAroundWorldAxis(cube.cubeGroup, axis);
      });
    }
  }


  highlightCubes(cubeToHighlight) {
    this.cubes.forEach((cube) => {
      if (cube.cubeMesh.uuid === cubeToHighlight.uuid) {
        this.selectedCube = cube;
        cube.uniforms.opacity.value = 0.9;
      } else {
        cube.uniforms.opacity.value = 1.0;
      }
    });
  }

  highlightRandCubes() {
    const randomIndex = Math.floor(Math.random() * this.cubes.length);
    const cubeToHighlight = this.cubes[randomIndex];
    //const cubeToHighlight = this.cubes[13];
    //console.log(cubeToHighlight.cubeGroup.position);
    this.cubes.forEach((cube) => {
      if (cube.cubeMesh.uuid === cubeToHighlight.cubeMesh.uuid) {
        this.selectedCube = cube;
        cube.uniforms.opacity.value = 0.9;
      } else {
        cube.uniforms.opacity.value = 1.0;
      }
    });
  }

  highlightSelectCubes(i) {
    const cubeToHighlight = this.cubes[i];
    this.cubes.forEach((cube) => {
      if (cube.cubeMesh.uuid === cubeToHighlight.cubeMesh.uuid) {
        this.selectedCube = cube;
        cube.uniforms.opacity.value = 0.9;
      } else {
        cube.uniforms.opacity.value = 1.0;
      }
    });
  }

  //get cube positions using vectors
  frontCenter() {
    for (let index = 0; index < 25; index++) {
      if (Math.round(this.cubes[index].cubeGroup.position.x) === 0 && Math.round(this.cubes[index].cubeGroup.position.y) === 0 && Math.round(this.cubes[index].cubeGroup.position.z) === 1) {
        this.highlightSelectCubes(index);
        break;
      }
    }
  }

  rightCenter() {
    for (let index = 0; index < 25; index++) {
      if (Math.round(this.cubes[index].cubeGroup.position.x) === 1 && Math.round(this.cubes[index].cubeGroup.position.y) === 0 && Math.round(this.cubes[index].cubeGroup.position.z) === 0) {
        this.highlightSelectCubes(index);
        break;
      }
    }
  }

  topLeft() {
    for (let index = 0; index < 25; index++) {
      if (Math.round(this.cubes[index].cubeGroup.position.x) === -1 && Math.round(this.cubes[index].cubeGroup.position.y) === 1 && Math.round(this.cubes[index].cubeGroup.position.z) === 1) {
        this.highlightSelectCubes(index);
        break;
      }
    }
  }

  topRight() {
    for (let index = 0; index < 25; index++) {
      if (Math.round(this.cubes[index].cubeGroup.position.x) === 1 && Math.round(this.cubes[index].cubeGroup.position.y) === 1 && Math.round(this.cubes[index].cubeGroup.position.z) === 1) {
        this.highlightSelectCubes(index);
        break;
      }
    }
  }

  bottomLeft() {
    for (let index = 0; index < 25; index++) {
      if (Math.round(this.cubes[index].cubeGroup.position.x) === -1 && Math.round(this.cubes[index].cubeGroup.position.y) === -1 && Math.round(this.cubes[index].cubeGroup.position.z) === 1) {
        this.highlightSelectCubes(index);
        break;
      }
    }
  }

  topBackLeft() {
    for (let index = 0; index < 25; index++) {
      if (Math.round(this.cubes[index].cubeGroup.position.x) === -1 && Math.round(this.cubes[index].cubeGroup.position.y) === 1 && Math.round(this.cubes[index].cubeGroup.position.z) === -1) {
        this.highlightSelectCubes(index);
        break;
      }
    }
  }

  //all standard moves
  //Us
  U() {
    this.topLeft();
    this.onKeyDown({ key: 'a' });
  }
  UPrime() {
    this.topLeft();
    this.onKeyDown({ key: 'd' });
  }
  U2() {
    this.topLeft();
    this.onKeyDown({ key: 'a' });
    setTimeout(() => {
      this.topLeft();
      this.onKeyDown({ key: 'a' });
    }, this.THROTTLE_TIME);
  }
  //Ds
  D() {
    this.bottomLeft();
    this.onKeyDown({ key: 'a' });
  }
  DPrime() {
    this.bottomLeft();
    this.onKeyDown({ key: 'd' });
  }
  D2() {
    this.bottomLeft();
    this.onKeyDown({ key: 'a' });
    setTimeout(() => {
      this.bottomLeft();
      this.onKeyDown({ key: 'a' });
    }, this.THROTTLE_TIME);
  }
  //Rs
  R() {
    this.topRight();
    this.onKeyDown({ key: 'w' });
  }
  RPrime() {
    this.topRight();
    this.onKeyDown({ key: 's' });
  }
  R2() {
    this.topRight();
    this.onKeyDown({ key: 'w' });
    setTimeout(() => {
      this.topRight();
      this.onKeyDown({ key: 'w' });
    }, this.THROTTLE_TIME);
  }
  //Ls
  L() {
    this.topLeft();
    this.onKeyDown({ key: 'w' });
  }
  LPrime() {
    this.topLeft();
    this.onKeyDown({ key: 's' });
  }
  L2() {
    this.topLeft();
    this.onKeyDown({ key: 'w' });
    setTimeout(() => {
      this.topLeft();
      this.onKeyDown({ key: 'w' });
    }, this.THROTTLE_TIME);
  }
  //Fs
  F() {
    this.topLeft();
    this.onKeyDown({ key: 'e' });
  }
  FPrime() {
    this.topLeft();
    this.onKeyDown({ key: 'q' });
  }
  F2() {
    this.topLeft();
    this.onKeyDown({ key: 'e' });
    setTimeout(() => {
      this.topLeft();
      this.onKeyDown({ key: 'e' });
    }, this.THROTTLE_TIME);
  }
  //Bs
  B() {
    this.topBackLeft();
    this.onKeyDown({ key: 'e' });
  }
  BPrime() {
    this.topBackLeft();
    this.onKeyDown({ key: 'q' });
  }
  B2() {
    this.topBackLeft();
    this.onKeyDown({ key: 'e' });
    setTimeout(() => {
      this.topBackLeft();
      this.onKeyDown({ key: 'e' });
    }, this.THROTTLE_TIME);
  }

  //slice moves
  //Ms
  M() {
    this.frontCenter();
    this.onKeyDown({ key: 's' });
  }
  MPrime() {
    this.frontCenter();
    this.onKeyDown({ key: 'w' });
  }
  M2() {
    this.frontCenter();
    this.onKeyDown({ key: 's' });
    setTimeout(() => {
      this.topBackLeft();
      this.onKeyDown({ key: 's' });
    }, this.THROTTLE_TIME);
  }
  //Es
  E() {
    this.frontCenter();
    this.onKeyDown({ key: 'd' });
  }
  EPrime() {
    this.frontCenter();
    this.onKeyDown({ key: 'a' });
  }
  E2() {
    this.frontCenter();
    this.onKeyDown({ key: 'd' });
    setTimeout(() => {
      this.frontCenter();
      this.onKeyDown({ key: 'd' });
    }, this.THROTTLE_TIME);
  }
  //Ss
  S() {
    this.rightCenter();
    this.onKeyDown({ key: 'e' });
  }
  SPrime() {
    this.rightCenter();
    this.onKeyDown({ key: 'q' });
  }
  S2() {
    this.rightCenter();
    this.onKeyDown({ key: 'e' });
    setTimeout(() => {
      this.rightCenter();
      this.onKeyDown({ key: 'e' });
    }, this.THROTTLE_TIME);
  }

  //Wide moves
  //Uws
  Uw() {
    this.epsilon = 1.5;
    this.topLeft();
    this.onKeyDown({ key: 'a' });
    this.epsilon = 0.5;
  }
  UwPrime() {
    this.epsilon = 1.5;
    this.topLeft();
    this.onKeyDown({ key: 'd' });
    this.epsilon = 0.5;
  }
  Uw2() {
    this.epsilon = 1.5;
    this.topLeft();
    this.onKeyDown({ key: 'a' });
    setTimeout(() => {
      this.topLeft(); s
      this.epsilon = 1.5;
      this.onKeyDown({ key: 'a' });
      this.epsilon = 0.5;
    }, this.THROTTLE_TIME);
    this.epsilon = 0.5;
  }
  //Dws
  Dw() {
    this.epsilon = 1.5;
    this.bottomLeft();
    this.onKeyDown({ key: 'a' });
    this.epsilon = 0.5;
  }
  DwPrime() {
    this.epsilon = 1.5;
    this.bottomLeft();
    this.onKeyDown({ key: 'd' });
    this.epsilon = 0.5;
  }
  Dw2() {
    this.epsilon = 1.5;
    this.bottomLeft();
    this.onKeyDown({ key: 'a' });
    setTimeout(() => {
      this.bottomLeft();
      this.epsilon = 1.5;
      this.onKeyDown({ key: 'a' });
      this.epsilon = 0.5;
    }, this.THROTTLE_TIME);
    this.epsilon = 0.5;
  }
  //Rws
  Rw() {
    this.epsilon = 1.5;
    this.topRight();
    this.onKeyDown({ key: 'w' });
    this.epsilon = 0.5;
  }
  RwPrime() {
    this.epsilon = 1.5;
    this.topRight();
    this.onKeyDown({ key: 's' });
    this.epsilon = 0.5;
  }
  Rw2() {
    this.epsilon = 1.5;
    this.topRight();
    this.onKeyDown({ key: 'w' });
    setTimeout(() => {
      this.topRight();
      this.epsilon = 1.5;
      this.onKeyDown({ key: 'w' });
      this.epsilon = 0.5;
    }, this.THROTTLE_TIME);
    this.epsilon = 0.5;
  }
  //Lws
  Lw() {
    this.epsilon = 1.5;
    this.topLeft();
    this.onKeyDown({ key: 'w' });
    this.epsilon = 0.5;
  }
  LwPrime() {
    this.epsilon = 1.5;
    this.topLeft();
    this.onKeyDown({ key: 's' });
    this.epsilon = 0.5;
  }
  Lw2() {
    this.epsilon = 1.5;
    this.topLeft();
    this.onKeyDown({ key: 'w' });
    setTimeout(() => {
      this.topLeft();
      this.epsilon = 1.5;
      this.onKeyDown({ key: 'w' });
      this.epsilon = 0.5;
    }, this.THROTTLE_TIME);
    this.epsilon = 0.5;
  }
  //Fws
  Fw() {
    this.epsilon = 1.5;
    this.topLeft();
    this.onKeyDown({ key: 'e' });
    this.epsilon = 0.5;
  }
  FwPrime() {
    this.epsilon = 1.5;
    this.topLeft();
    this.onKeyDown({ key: 'q' });
    this.epsilon = 0.5;
  }
  Fw2() {
    this.epsilon = 1.5;
    this.topLeft();
    this.onKeyDown({ key: 'e' });
    setTimeout(() => {
      this.topLeft();
      this.epsilon = 1.5;
      this.onKeyDown({ key: 'e' });
      this.epsilon = 0.5;
    }, this.THROTTLE_TIME);
    this.epsilon = 0.5;
  }
  //Bws
  Bw() {
    this.epsilon = 1.5;
    this.topBackLeft();
    this.onKeyDown({ key: 'e' });
    this.epsilon = 0.5;
  }
  BwPrime() {
    this.epsilon = 1.5;
    this.topBackLeft();
    this.onKeyDown({ key: 'q' });
    this.epsilon = 0.5;
  }
  Bw2() {
    this.epsilon = 1.5;
    this.topBackLeft();
    this.onKeyDown({ key: 'e' });
    setTimeout(() => {
      this.topBackLeft();
      this.epsilon = 1.5;
      this.onKeyDown({ key: 'e' });
      this.epsilon = 0.5;
    }, this.THROTTLE_TIME);
    this.epsilon = 0.5;
  }

  //rotate the cube
  //Xs
  x() {
    this.epsilon = 1.5;
    this.frontCenter();
    this.onKeyDown({ key: 'w' });
    this.epsilon = 0.5;
  }
  xPrime() {
    this.epsilon = 1.5;
    this.frontCenter();
    this.onKeyDown({ key: 's' });
    this.epsilon = 0.5;
  }
  x2() {
    this.epsilon = 1.5;
    this.frontCenter();
    this.onKeyDown({ key: 'w' });
    setTimeout(() => {
      this.epsilon = 1.5;
      this.onKeyDown({ key: 'w' });
      this.epsilon = 0.5;
    }, this.THROTTLE_TIME);
    this.epsilon = 0.5;
  }
  //Ys
  y() {
    this.epsilon = 1.5;
    this.frontCenter();
    this.onKeyDown({ key: 'a' });
    this.epsilon = 0.5;
  }
  yPrime() {
    this.epsilon = 1.5;
    this.frontCenter();
    this.onKeyDown({ key: 'd' });
    this.epsilon = 0.5;
  }
  y2() {
    this.epsilon = 1.5;
    this.frontCenter();
    this.onKeyDown({ key: 'a' });
    setTimeout(() => {
      this.epsilon = 1.5;
      this.onKeyDown({ key: 'a' });
      this.epsilon = 0.5;
    }, this.THROTTLE_TIME);
    this.epsilon = 0.5;
  }
  //Zs
  z() {
    this.epsilon = 1.5;
    this.rightCenter();
    this.onKeyDown({ key: 'e' });
    this.epsilon = 0.5;
  }
  zPrime() {
    this.epsilon = 1.5;
    this.rightCenter();
    this.onKeyDown({ key: 'q' });
    this.epsilon = 0.5;
  }
  z2() {
    this.epsilon = 1.5;
    this.rightCenter();
    this.onKeyDown({ key: 'q' });
    setTimeout(() => {
      this.epsilon = 1.5;
      this.onKeyDown({ key: 'q' });
      this.epsilon = 0.5;
    }, this.THROTTLE_TIME);
    this.epsilon = 0.5;
  }

  //scramble the cube
  scramble() {
    const moves = ['w', 's', 'a', 'd', 'e', 'q'];
    let count = 0;

    const doMove = () => {
      const move = moves[Math.floor(Math.random() * moves.length)];
      this.onKeyDown({ key: move });
      this.onKeyDown({ key: 'r' });
      count++;

      if (count < this.scrambleNum) {
        setTimeout(doMove, this.THROTTLE_TIME);
      }
    };

    doMove();
  }

  scramble2() {
    const r = this;
    let count = 0;

    const doMove = () => {
      const move = this.moveFunctions[Math.floor(Math.random() * this.moveFunctions.length)];
      this.moved.push(move);
      console.log(this.moved);
      r[move](); // call the function dynamically using its name
      count++;

      if (count < this.scrambleNum) {
        setTimeout(doMove, this.THROTTLE_TIME);
      }
    };

    doMove();
  }

  call() {
    let count = 0;

    const doMove = () => {
      const i = count;
      if (i >= this.premoves.length) {
        return;
      }

      const move = this.premoves[i];
      this.moved.push(move);
      console.log(move);
      this[move](); // call the function dynamically using its name
      count++;
      setTimeout(doMove, this.THROTTLE_TIME);
    };

    doMove();
  }

  call2() {
    let count = 0;

    const doMove = () => {
      const i = count;
      if (i >= this.premoves2.length) {
        return;
      }

      const move = this.premoves2[i];
      this.moved.push(move);
      console.log(move);
      this[move](); // call the function dynamically using its name
      count++;
      setTimeout(doMove, this.THROTTLE_TIME);
    };

    doMove();
  }

  solve() {
    const r = this;
    let count = 0;

    const doMove = () => {
      const i = this.moved.length - count - 1;
      if (i < 0) {
        this.moved = [];
        return;
      }

      let move = this.moved[i];
      if (!move.includes("2")) {
        if (move.includes("Prime")) {
          move = move.replace("Prime", "");
        } else {
          move += "Prime";
        }
      }
      this.solved.push(move);
      console.log(this.solved);
      r[move](); // call the function dynamically using its name
      count++;
      setTimeout(doMove, this.THROTTLE_TIME);
    };

    doMove();
  }

  //create the rubiks cube, assigning each individual piece a cube type
  initializeRubiksCube() {
    this.cubes = [
      // Front face.
      new Cube(-1, 1, 1, 'corner1'),
      new Cube(0, 1, 1, 'edgeGW'),
      new Cube(1, 1, 1, 'corner2'),

      new Cube(-1, 0, 1, 'edgeGO'),
      new Cube(0, 0, 1, 'centerGreen'),
      new Cube(1, 0, 1, 'edgeGR'),

      new Cube(-1, -1, 1, 'corner5'),
      new Cube(0, -1, 1, 'edgeGY'),
      new Cube(1, -1, 1, 'corner6'),


      // Middle face.
      new Cube(-1, 1, 0, 'edgeWO'),
      new Cube(0, 1, 0, 'centerWhite'),
      new Cube(1, 1, 0, 'edgeWR'),

      new Cube(-1, 0, 0, 'centerOrange'),

      new Cube(1, 0, 0, 'centerRed'),

      new Cube(-1, -1, 0, 'edgeYO'),
      new Cube(0, -1, 0, 'centerYellow'),
      new Cube(1, -1, 0, 'edgeYR'),


      // Back face.
      new Cube(-1, 1, -1, 'corner4'),
      new Cube(0, 1, -1, 'edgeBW'),
      new Cube(1, 1, -1, 'corner3'),

      new Cube(-1, 0, -1, 'edgeBO'),
      new Cube(0, 0, -1, 'centerBlue'),
      new Cube(1, 0, -1, 'edgeBR'),

      new Cube(-1, -1, -1, 'corner8'),
      new Cube(0, -1, -1, 'edgeBY'),
      new Cube(1, -1, -1, 'corner7'),
    ];

    this.cubes.forEach((cube) => {
      this.rubiksCubeGroup.add(cube.cubeGroup);
    });

    this.selectedCube = this.cubes[0];
  }
}
