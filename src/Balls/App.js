import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./styles/main.scss";
import { OrthographicCamera } from "@react-three/drei";
import Home from "./components/Home";
import { useEffect, useRef, useState } from "react";
import { Physics, useSphere } from "@react-three/cannon";
import * as THREE from "three";

function Sphere({ position, size = 1 }) {
	const uniforms = {
		uTime: {
			value: 0,
		},
		offsetR: {
			value: Math.random() * 2 * Math.PI,
		},
		offsetG: {
			value: Math.random() * 2 * Math.PI,
		},
		offsetB: {
			value: Math.random() * 2 * Math.PI,
		},
	};
	var offset = Math.random() * 2 * Math.PI;
	const vertexShader = `
		void main(){
			vec4 newPos = vec4(position, 1.0);
			gl_Position = projectionMatrix * modelViewMatrix * newPos;
		}
	`;
	const fragmentShader = `
		uniform float uTime, offsetR, offsetG, offsetB;

		void main(){
			gl_FragColor = vec4(clamp(sin(uTime + offsetR), 0.2, 0.85), clamp(cos(uTime + offsetG), 0.2, 0.85), clamp(sin(uTime + offsetB), 0.2, 0.85), 1.0);
		}
	`;
	const pos = useRef(new THREE.Vector3());
	const { viewport } = useThree();
	const [ref, api] = useSphere(
		() => ({
			mass: 0.05,
			linearDamping: 0.1,
			position,
			material: { restitution: 0.95 },
		}),
		useRef()
	);

	useEffect(() => {
		api.position.subscribe((val) => {
			pos.current.set(val[0], val[1], val[2]);
		});
		console.log(viewport);
	}, []);

	useFrame(({ pointer, clock }) => {
		const mousePos = new THREE.Vector3(
			(pointer.x * viewport.width) / 2,
			(pointer.y * viewport.height) / 2,
			0
		);
		const currPos = pos.current.clone();
		const direction = mousePos.sub(currPos).normalize();
		api.applyForce(
			[direction.x, direction.y, direction.z],
			[pos.current.x, pos.current.y, pos.current.z]
		);
		uniforms.uTime.value = clock.elapsedTime;
		offset += 0.01;
		api.scaleOverride([
			Math.sin(offset) * (size - 0.15) + 0.15,
			Math.sin(offset) * (size - 0.15) + 0.15,
			Math.sin(offset) * (size - 0.15) + 0.15,
		]);
	});

	return (
		<mesh ref={ref} position={position} castShadow receiveShadow>
			<sphereGeometry args={[size, 64, 64]} />
			<shaderMaterial
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={uniforms}
			/>
		</mesh>
	);
}

function Balls() {
	const [balls, setBalls] = useState([]);
	const { viewport } = useThree();

	useEffect(() => {
		const ball = [];
		for (var i = 0; i < 20; i++) {
			const x = ((Math.random() - 0.5) * 2 * viewport.width) / 2;
			const y = ((Math.random() - 0.5) * 2 * viewport.height) / 2;
			const z = (Math.random() - 0.5) * 2 * 5;
			ball.push(<Sphere key={i} position={[x, y, z]} />);
		}
		setBalls(ball);
	}, []);

	return <>{balls}</>;
}

function App() {
	return (
		<div id="container">
			<Canvas
				eventSource={document.getElementById("container")}
				className="main-canvas"
			>
				<OrthographicCamera
					position={[0, 0, 50]}
					zoom={100}
					makeDefault
				/>
				<ambientLight intensity={2} />
				{/* <directionalLight
					position={[0, 5, 2]}
					lookAt={[0, 0, 0]}
					intensity={2}
				/> */}
				<Physics gravity={[0, 0, 0]}>
					<Balls />
				</Physics>
			</Canvas>
			<Home />
		</div>
	);
}

export default App;
