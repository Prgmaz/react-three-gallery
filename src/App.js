import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Scene from "./components/Scene";
import "./styles/main.scss";
import { Suspense } from "react";

function App() {
	return (
		<Suspense fallback={<div className="centered">Loading</div>}>
			<Canvas
				eventSource={document.getElementById("body")}
				className="main-canvas"
			>
				<OrthographicCamera
					position={[0, 0, 50]}
					zoom={100}
					makeDefault
				/>
				<OrbitControls
					enableRotate={false}
					enableZoom={true}
					enableDamping={true}
					maxZoom={150}
					minZoom={75}
				/>
				<ambientLight intensity={2} />
				<Scene />
			</Canvas>
		</Suspense>
	);
}

export default App;
