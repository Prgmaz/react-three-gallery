import { useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Float, Html } from "@react-three/drei";

const Plane = React.forwardRef(
	(
		{
			textureURL = "https://d1hjkbq40fs2x4.cloudfront.net/2021-10-18/files/THUMBNAIL_(1).jpg",
			position,
			scale = new THREE.Vector3(3, 4, 1),
			rotation,
			name,
		},
		ref
	) => {
		const [hover, setHover] = useState(false);
		const texture = useLoader(THREE.TextureLoader, textureURL);
		const matRef = useRef();

		function onPointerEnter(e) {
			setHover(true);
			document.body.style.cursor = "pointer";
			if (matRef?.current) {
				matRef.current.map = texture;
				matRef.current.needsUpdate = true;
			}
		}

		function onPointerLeave(e) {
			document.body.style.cursor = "default";
			setHover(false);
			if (matRef?.current) {
				matRef.current.map = null;
				matRef.current.needsUpdate = true;
			}
		}

		function onClick(e) {
			window.open("https://instagram.com/prgmaz", "_blank");
		}

		return (
			<Float onClick={onClick} floatIntensity={2}>
				<mesh
					onPointerEnter={onPointerEnter}
					onPointerLeave={onPointerLeave}
					ref={ref}
					position={position}
					rotation={rotation}
				>
					<planeGeometry args={[scale.x, scale.y, scale.z]} />
					<meshBasicMaterial ref={matRef} />
					<Html
						pointerEvents="none"
						center
						transform
						style={{
							opacity: hover ? 1 : 0,
						}}
					>
						<div className="photo-title">{name}</div>
					</Html>
				</mesh>
			</Float>
		);
	}
);

export default Plane;
