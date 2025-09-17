// Taken from: https://www.reactbits.dev/backgrounds/iridescence

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { type ComponentProps, useEffect, useRef } from "react";

import "./Background.css";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

interface IridescenceProps extends Omit<ComponentProps<"div">, "color">
{
    color?: [number, number, number];
    speed?: number;
    amplitude?: number;
}

export default function Iridescence({
    color = [1, 1, 1],
    speed = 1.0,
    amplitude = 0.1,
    ...props
}: IridescenceProps)
{
    const ctnDom = useRef<HTMLDivElement>(null);

    useEffect(() =>
    {
        const pane = document.querySelector(".main-frame");

        if (!pane || !ctnDom.current)
        {
            return;
        }

        const ctn = ctnDom.current;
        const renderer = new Renderer();
        const gl = renderer.gl;

        gl.clearColor(1, 1, 1, 1);

        let program: Program;

        function resize()
        {
            renderer.setSize(pane!.clientWidth, pane!.clientHeight);

            if (!program)
            {
                return;
            }

            program.uniforms.uResolution.value = new Color(
                gl.canvas.width,
                gl.canvas.height,
                gl.canvas.width / gl.canvas.height,
            );
        }

        window.addEventListener("resize", resize, false);
        resize();

        const geometry = new Triangle(gl);

        program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new Color(...color) },
                uResolution: {
                    value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
                },
                uAmplitude: { value: amplitude },
                uSpeed: { value: speed },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });
        let animateId: number;

        function update(t: number)
        {
            animateId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        }

        animateId = requestAnimationFrame(update);
        gl.canvas.className = "canvas";
        ctn.prepend(gl.canvas);

        return () =>
        {
            cancelAnimationFrame(animateId);
            window.removeEventListener("resize", resize);
            ctn.removeChild(gl.canvas);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }, [color, speed, amplitude]);

    return <div ref={ctnDom} {...props} />;
}
