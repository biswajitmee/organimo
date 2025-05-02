import { Canvas, useFrame, } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll, Scroll } from "@react-three/drei";
import gsap from "gsap";
import { getProject, val } from "@theatre/core";
import theatreState from "./theatreState.json";
 
import {
  editable as e,
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import MilkBottle from "./components/MilkBottle";
 
 

if (import.meta.env.DEV) {
  import("@theatre/studio").then((studio) => {
    studio.default.initialize();
    import("@theatre/r3f/dist/extension").then((ext) => {
      studio.default.extend(ext.default);
    });
  });
}



export default function ScrollSection() {

  const sheet = getProject("myProject", { state: theatreState }).sheet("Scene");
  const isMobile = window.innerWidth <= 768; // Adjust the width breakpoint as needed
  const pages = isMobile ? 4 : 4;

  


  return (
    <div style={{}}>
      <Canvas shadows
        style={{ width: "100vw", height: "100vh" }}
        gl={{ preserveDrawingBuffer: true }}
      >

        <ScrollControls pages={pages}  distance={2} damping={0.5}>
          <SheetProvider sheet={sheet}>
            <Scene />
          </SheetProvider>
          <Scroll html style={{ width:"100vw" }}>
           
 
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length);
    sheet.sequence.position = scroll.offset * sequenceLength;   
  });

   
  return (
    <>
      <e.pointLight theatreKey="LightBlue" position={[0, 0, 1]} />
      <e.pointLight theatreKey="LightPurple" position={[0, 0, -2]} />
      <e.pointLight theatreKey="LightWhite" position={[-1, 0, -1]} />
            <e.mesh theatreKey="MilkBottle" position={[0, 0, -1]}>
              <MilkBottle />
            </e.mesh>
      <ambientLight intensity={0.2} />
      <directionalLight />
          <PerspectiveCamera
        position={[0, 0, 30]}  
        theatreKey="Camera"
        makeDefault
        near={5}
        far={500}
        fov={15}
      />
    </>
  );
}
