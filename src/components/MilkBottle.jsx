import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function MilkBottle(props) {

  const { nodes, materials } = useGLTF("/half-and-half.glb");



  const ref = useRef();


  useFrame((state, delta) => {
    // Auto-rotate the model
    ref.current.rotation.y += delta * 0.5; // Adjust rotation speed as needed

    // Bounce effect
    // The sine function creates a smooth up and down motion
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3; // Adjust frequency and amplitude as needed
  });





  return (
    <group {...props} dispose={null}  ref={ref}>
      <group position={[0, 2.609, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006_1.geometry}
          material={materials["Material.002"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials["Material.002"]}
        position={[0, 4.591, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.012"]}
        position={[0, 2.565, 0]}
        rotation={[0, -0.041, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials["Material.013"]}
        position={[0, 2.609, 0]}
        rotation={[0, -0.086, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials["Material.016"]}
        position={[0.003, 4.74, 0]}
      />
    </group>
  );
}

useGLTF.preload("/half-and-half.glb");

export default MilkBottle;






