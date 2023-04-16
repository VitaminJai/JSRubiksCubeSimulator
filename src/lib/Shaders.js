

const vertexShader = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
    	pos = position;

		gl_Position = projectionMatrix
			* modelViewMatrix
			* vec4(
				position.x,
				position.y,
				position.z,
				1.0
			);
    }
  `;
};

const fragmentShader = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (front) {
			gl_FragColor = green;
		} else if (back) {
			gl_FragColor = blue;
		} else if (top) {
			gl_FragColor = white;
		} else if (bottom) {
			gl_FragColor = yellow;
		} else if (right) {
			gl_FragColor = red;
		 } else if (left) {
			gl_FragColor = orange;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const corner1 = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (front) {
			gl_FragColor = green;
		} else if (top) {
			gl_FragColor = white;
		 } else if (left) {
			gl_FragColor = orange;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const corner2 = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (front) {
			gl_FragColor = green;
		} else if (top) {
			gl_FragColor = white;
		} else if (right) {
			gl_FragColor = red;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const corner3 = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (back) {
			gl_FragColor = blue;
		} else if (top) {
			gl_FragColor = white;
		} else if (right) {
			gl_FragColor = red;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const corner4 = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (back) {
			gl_FragColor = blue;
		} else if (top) {
			gl_FragColor = white;
		} else if (left) {
			gl_FragColor = orange;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const corner5 = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (front) {
			gl_FragColor = green;
		} else if (bottom) {
			gl_FragColor = yellow;
		 } else if (left) {
			gl_FragColor = orange;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const corner6 = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (front) {
			gl_FragColor = green;
		} else if (bottom) {
			gl_FragColor = yellow;
		} else if (right) {
			gl_FragColor = red;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const corner7 = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (back) {
			gl_FragColor = blue;
		} else if (bottom) {
			gl_FragColor = yellow;
		} else if (right) {
			gl_FragColor = red;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const corner8 = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (back) {
			gl_FragColor = blue;
		} else if (bottom) {
			gl_FragColor = yellow;
		 } else if (left) {
			gl_FragColor = orange;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const centerGreen = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (front) {
			gl_FragColor = green;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const centerRed = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (right) {
			gl_FragColor = red;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const centerBlue = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (back) {
			gl_FragColor = blue;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const centerOrange = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (left) {
			gl_FragColor = orange;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const centerWhite = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (top) {
			gl_FragColor = white;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const centerYellow = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (bottom) {
			gl_FragColor = yellow;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeGY = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (front) {
			gl_FragColor = green;
		} else if (bottom) {
			gl_FragColor = yellow;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeGW = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (front) {
			gl_FragColor = green;
		} else if (top) {
			gl_FragColor = white;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeGR = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (front) {
			gl_FragColor = green;
		} else if (right) {
			gl_FragColor = red;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeGO = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (front) {
			gl_FragColor = green;
		 } else if (left) {
			gl_FragColor = orange;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeBW = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (back) {
			gl_FragColor = blue;
		} else if (top) {
			gl_FragColor = white;
		}
		

    }
  `;
};

const edgeBR = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (back) {
			gl_FragColor = blue;
		} else if (right) {
			gl_FragColor = red;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeBO = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (back) {
			gl_FragColor = blue;
		 } else if (left) {
			gl_FragColor = orange;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeBY = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (back) {
			gl_FragColor = blue;
		} else if (bottom) {
			gl_FragColor = yellow;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeWR = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (top) {
			gl_FragColor = white;
		} else if (right) {
			gl_FragColor = red;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeWO = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (top) {
			gl_FragColor = white;
		 } else if (left) {
			gl_FragColor = orange;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeYR = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (bottom) {
			gl_FragColor = yellow;
		} else if (right) {
			gl_FragColor = red;
		} else {
			gl_FragColor = black;
		}
		

    }
  `;
};

const edgeYO = () => {
	return `
	uniform float opacity;

    varying vec3 pos;

    void main() {
		vec4 green = vec4(0.0, 1.0, 0.0, opacity);
		vec4 white = vec4(1.0, 1.0, 1.0, opacity);
		vec4 red = vec4(1.0, 0.0, 0.0, opacity);
		vec4 yellow = vec4(1.0, 1.0, 0.0, opacity);
		vec4 orange = vec4(1.0, 0.65, 0.0, opacity);
		vec4 blue = vec4(0.0, 0.0, 1.0, opacity);

		vec4 black = vec4(0.0, 0.0, 0.0, opacity);

		float scale = 0.499;

		bool front = pos.z > scale;
		bool back = pos.z < -1.0 * scale;
		bool top = pos.y > scale;
		bool bottom = pos.y < -1.0 * scale;
		bool right = pos.x > scale;
		bool left = pos.x < -1.0 * scale;

		if (bottom) {
			gl_FragColor = yellow;
		 } else if (left) {
			gl_FragColor = orange;
		} else {
			gl_FragColor = black;
		}
		
    }
  `;
};

export {
	vertexShader,
	fragmentShader,
	corner1,
	corner2,
	corner3,
	corner4,
	corner5,
	corner6,
	corner7,
	corner8,
	centerGreen,
	centerRed,
	centerBlue,
	centerOrange,
	centerWhite,
	centerYellow,
	edgeBO, 
	edgeBR, 
	edgeBW, 
	edgeBY, 
	edgeGO, 
	edgeGR, 
	edgeGW, 
	edgeGY, 
	edgeWO, 
	edgeWR, 
	edgeYO, 
	edgeYR
};
