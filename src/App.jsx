
import { useEffect } from 'react';
import { GUI } from 'dat.gui';
import * as THREE from 'three';
import SceneInit from './lib/SceneInit';
import RubiksCube from './lib/RubiksCube';

function App() {

  useEffect(() => {

    //create the scene
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    const r = new RubiksCube();
    test.scene.add(r.rubiksCubeGroup);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    //recognise user mouse input 
    function onMouseDown(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, test.camera);
      const objects = raycaster.intersectObjects(r.rubiksCubeGroup.children);
      const cubeObjects = objects.filter((c) => {
        return c.object.type === 'Mesh';
      });
      if (cubeObjects.length > 0) {
        r.highlightCubes(cubeObjects[0].object);
      }
    }

    //recognise key inputs
    const onKeyDown = (event) => {
      if (event.repeat) {
        return;
      }
      r.onKeyDown(event);
    };

    //use appropriate event listeners
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onMouseDown);



    //create gui to manipulate cube
    const gui = new GUI();

    const folder = gui.addFolder("Rubik's Cube");
    folder.add(r, 'scrambleNum', 1, 100, 1).name('Scramble Moves');
    folder.add(r, 'scramble2').name('Scramble');
    folder.add(r, 'solve').name('Solve');
    folder.add(r, 'THROTTLE_TIME', 100, 500, 10).name('Speed (ms)');
    folder.add(test, 'resetCamera').name('Reset Camera');
    //folder.add(r, 'epsilon', 0.5, 1.5, 0.5).name('Rotation Density');
    folder.add(r, 'consoleDebug');
    folder.open();

    //add all possible moves

    const rotations = gui.addFolder("Rotate Cube");
    rotations.add(r, "x").name("x");
    rotations.add(r, "xPrime").name("x'");
    rotations.add(r, "x2").name("x2");
    rotations.add(r, "y").name("y");
    rotations.add(r, "yPrime").name("y'");
    rotations.add(r, "y2").name("y2");
    rotations.add(r, "z").name("z");
    rotations.add(r, "zPrime").name("z'");
    rotations.add(r, "z2").name("z2");

    const sMoves = gui.addFolder("Single Moves");
    sMoves.add(r, "U").name("U");
    sMoves.add(r, "UPrime").name("U'");
    sMoves.add(r, "U2").name("U2");
    sMoves.add(r, "D").name("D");
    sMoves.add(r, "DPrime").name("D'");
    sMoves.add(r, "D2").name("D2");
    sMoves.add(r, "R").name("R");
    sMoves.add(r, "RPrime").name("R'");
    sMoves.add(r, "R2").name("R2");
    sMoves.add(r, "L").name("L");
    sMoves.add(r, "LPrime").name("L'");
    sMoves.add(r, "L2").name("L2");
    sMoves.add(r, "F").name("F");
    sMoves.add(r, "FPrime").name("F'");
    sMoves.add(r, "F2").name("F2");
    sMoves.add(r, "B").name("B");
    sMoves.add(r, "BPrime").name("B'");
    sMoves.add(r, "B2").name("B2");


    const slMoves = gui.addFolder("Slice Moves");
    slMoves.add(r, "M").name("M");
    slMoves.add(r, "MPrime").name("M'");
    slMoves.add(r, "M2").name("M2");
    slMoves.add(r, "E").name("E");
    slMoves.add(r, "EPrime").name("E'");
    slMoves.add(r, "E2").name("E2");
    slMoves.add(r, "S").name("S");
    slMoves.add(r, "SPrime").name("S'");
    slMoves.add(r, "S2").name("S2");

    const wMoves = gui.addFolder("Wide Moves");
    wMoves.add(r, "Uw").name("Uw");
    wMoves.add(r, "UwPrime").name("Uw'");
    wMoves.add(r, "Uw2").name("Uw2");
    wMoves.add(r, "Dw").name("Dw");
    wMoves.add(r, "DwPrime").name("Dw'");
    wMoves.add(r, "Dw2").name("Dw2");
    wMoves.add(r, "Rw").name("Rw");
    wMoves.add(r, "RwPrime").name("Rw'");
    wMoves.add(r, "Rw2").name("Rw2");
    wMoves.add(r, "Lw").name("Lw");
    wMoves.add(r, "LwPrime").name("Lw'");
    wMoves.add(r, "Lw2").name("Lw2");
    wMoves.add(r, "Fw").name("Fw");
    wMoves.add(r, "FwPrime").name("Fw'");
    wMoves.add(r, "Fw2").name("Fw2");
    wMoves.add(r, "Bw").name("Bw");
    wMoves.add(r, "BwPrime").name("Bw'");
    wMoves.add(r, "Bw2").name("Bw2");
    
    
    

    return () => {
      //remove everything on closure/reload
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onMouseDown);
      gui.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
