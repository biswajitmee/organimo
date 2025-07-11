
import React, { useRef, useEffect } from 'react'

import { useGLTF, useAnimations } from '@react-three/drei'

export function Fish(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../tosakin_goldfish.glb')
 
    const { actions, names } = useAnimations(animations, group)

useEffect(() => {
    // Auto-play the first animation if available
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().fadeIn(0.5).play()
    }

    // Optional: clean up animation on unmount
    return () => {
      if (names.length > 0 && actions[names[0]]) {
        actions[names[0]].fadeOut(0.5).stop()
      }
    }
  }, [actions, names])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="724c0536378742e888f3d6d7ab2b8ecafbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="finDorsalB" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="finAnalB" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="finPelvicB" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="finPectoralB" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="finCaudalB" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="body" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="eye_L" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="RIG_Tosakin" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_12">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_15"
                      geometry={nodes.Object_15.geometry}
                      material={materials.M_TosakinFins}
                      skeleton={nodes.Object_15.skeleton}
                    />
                    <skinnedMesh
                      name="Object_17"
                      geometry={nodes.Object_17.geometry}
                      material={materials.M_TosakinFins}
                      skeleton={nodes.Object_17.skeleton}
                    />
                    <skinnedMesh
                      name="Object_19"
                      geometry={nodes.Object_19.geometry}
                      material={materials.M_TosakinFins}
                      skeleton={nodes.Object_19.skeleton}
                    />
                    <skinnedMesh
                      name="Object_21"
                      geometry={nodes.Object_21.geometry}
                      material={materials.M_TosakinFins}
                      skeleton={nodes.Object_21.skeleton}
                    />
                    <skinnedMesh
                      name="Object_23"
                      geometry={nodes.Object_23.geometry}
                      material={materials.M_TosakinFins}
                      skeleton={nodes.Object_23.skeleton}
                    />
                    <skinnedMesh
                      name="Object_25"
                      geometry={nodes.Object_25.geometry}
                      material={materials.M_TosakinBody}
                      skeleton={nodes.Object_25.skeleton}
                    />
                    <skinnedMesh
                      name="Object_27"
                      geometry={nodes.Object_27.geometry}
                      material={materials.M_Sclara}
                      skeleton={nodes.Object_27.skeleton}
                    />
                    <skinnedMesh
                      name="Object_28"
                      geometry={nodes.Object_28.geometry}
                      material={materials.M_Iris}
                      skeleton={nodes.Object_28.skeleton}
                    />
                    <skinnedMesh
                      name="Object_29"
                      geometry={nodes.Object_29.geometry}
                      material={materials.M_Lens}
                      skeleton={nodes.Object_29.skeleton}
                    />
                    <skinnedMesh
                      name="Object_30"
                      geometry={nodes.Object_30.geometry}
                      material={materials.M_Cornea}
                      skeleton={nodes.Object_30.skeleton}
                    />
                    <skinnedMesh
                      name="Object_95"
                      geometry={nodes.Object_95.geometry}
                      material={materials.M_Sclara}
                      skeleton={nodes.Object_95.skeleton}
                    />
                    <skinnedMesh
                      name="Object_96"
                      geometry={nodes.Object_96.geometry}
                      material={materials.M_Iris}
                      skeleton={nodes.Object_96.skeleton}
                    />
                    <skinnedMesh
                      name="Object_97"
                      geometry={nodes.Object_97.geometry}
                      material={materials.M_Lens}
                      skeleton={nodes.Object_97.skeleton}
                    />
                    <skinnedMesh
                      name="Object_98"
                      geometry={nodes.Object_98.geometry}
                      material={materials.M_Cornea}
                      skeleton={nodes.Object_98.skeleton}
                    />
                    <group name="Object_14" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                    <group name="Object_16" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                    <group name="Object_18" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                    <group name="Object_20" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                    <group name="Object_22" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                    <group name="Object_24" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                    <group name="Object_26" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                    <group name="Object_94" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                  </group>
                </group>
                <group name="eye_R" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/tosakin_goldfish.glb')
