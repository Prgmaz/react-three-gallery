import { Html } from "@react-three/drei";
import Plane from "./Plane";
import { useEffect, useState } from "react";

function Scene() {
	const [planes, setPlanes] = useState([]);

	useEffect(() => {
		const textures = [
			"https://images.unsplash.com/photo-1597871040916-4b4c20ba08dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&w=1000&q=80",
			"https://images.unsplash.com/photo-1564566800380-aa5a49acb065?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
			"https://images.unsplash.com/photo-1429292394373-ddbcc6bb7468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
			"https://images.unsplash.com/photo-1470137237906-d8a4f71e1966?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTDNEpUTHQoQUJMHLrErGJyHg89uy71MyuHwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
			"https://images.unsplash.com/photo-1542400275-f0f2796b253f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
			"https://images.unsplash.com/photo-1632749696089-8d8c26073794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTDNEpUTHQoQUJMHLrErGJyHg89uy71MyuHwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
			"https://images.unsplash.com/photo-1609272300331-a288ba4411b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTDNEpUTHQoQUJMHLrErGJyHg89uy71MyuHwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
			"https://images.unsplash.com/photo-1590326926537-a3769bb4c913?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
			"https://images.unsplash.com/photo-1617428882846-7e235cbeabe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
			"https://images.unsplash.com/photo-1487766036723-04aebf785670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
			"https://images.unsplash.com/photo-1608675873996-4d5f38b7712e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
		];
		const n = 100;
		const ps = [];
		var circleRadius = 5;
		var scale = 1;
		for (var i = 1; i <= n; i++) {
			ps.push(
				<Plane
					key={i}
					position={[
						Math.cos(circleRadius) * circleRadius * scale,
						Math.sin(circleRadius) * circleRadius * scale,
						0,
					]}
					textureURL={textures[i % textures.length]}
					name={"Photo " + i.toString()}
				/>
			);
			circleRadius += 1;
			scale -= 1 / (n * 2);
		}
		setPlanes(ps);
	}, []);

	return (
		<>
			{planes}
			<Html transform center>
				<div className="container">
					<h1 className="canvas-heading">Gallery</h1>
					<h3 className="canvas-subheading">
						Use right click to move the camera
					</h3>
					<h3 className="canvas-subheading">
						Use mouse wheel to zoom in or out
					</h3>
				</div>
			</Html>
		</>
	);
}

export default Scene;
