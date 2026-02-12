import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { createXRStore, XR, XRDomOverlay } from '@react-three/xr'
import { PerspectiveCamera, Environment, OrbitControls, Loader } from '@react-three/drei'
import { Avatar } from './components/Avatar'
import { UI } from './components/UI'
import './App.css'
import './components/UI.css' 

const store = createXRStore()

function App() {
  const [animation, setAnimation] = useState("T-Pose")
  const handleEnterAR = () => store.enterAR()

  return (
    <>
      {/* UI for non-AR users */}
      <UI onSelectAnimation={setAnimation} onEnterAR={handleEnterAR} showEnterAR={true} />
      
      <Canvas shadows camera={{ position: [0, 1.5, 3], fov: 50 }}>
        <XR store={store}>
          {/* UI inside AR Overlay */}
          <XRDomOverlay>
            <UI onSelectAnimation={setAnimation} showEnterAR={false} />
          </XRDomOverlay>
          
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
            
            <Avatar animationName={animation} position={[0, 0, -1]} scale={0.01} />
            
            <OrbitControls target={[0, 1, -2]} />
            <PerspectiveCamera makeDefault position={[0, 1.5, 3]} />
          </Suspense>
        </XR>
      </Canvas>
      <Loader />
    </>
  )
}

export default App
