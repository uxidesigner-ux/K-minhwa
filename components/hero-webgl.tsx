'use client';

import { useEffect, useRef } from 'react';

const vertexSource = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * .5 + .5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentSource = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uStrength;
  uniform float uMediaAspect;
  void main() {
    float canvasAspect = uResolution.x / uResolution.y;
    vec2 uv = vUv;
    if (canvasAspect > uMediaAspect) {
      uv.y = (uv.y - .5) * (uMediaAspect / canvasAspect) + .5;
    } else {
      uv.x = (uv.x - .5) * (canvasAspect / uMediaAspect) + .5;
    }
    vec2 pointer = uPointer;
    if (canvasAspect > uMediaAspect) {
      pointer.y = (pointer.y - .5) * (uMediaAspect / canvasAspect) + .5;
    } else {
      pointer.x = (pointer.x - .5) * (canvasAspect / uMediaAspect) + .5;
    }
    vec2 delta = uv - pointer;
    delta.x *= canvasAspect;
    float radius = length(delta);
    float falloff = smoothstep(.32, 0.0, radius);
    vec2 direction = normalize(delta + vec2(.0001));
    direction.x /= canvasAspect;
    vec2 warped = clamp(uv + direction * falloff * uStrength, 0.001, 0.999);
    gl_FragColor = texture2D(uTexture, warped);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export function HeroWebgl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>('.hero');
    const video = hero?.querySelector<HTMLVideoElement>('.hero-video');
    if (!canvas || !hero || !video || window.innerWidth < 768) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    if (!buffer || !texture) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const uniforms = {
      texture: gl.getUniformLocation(program, 'uTexture'),
      resolution: gl.getUniformLocation(program, 'uResolution'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      strength: gl.getUniformLocation(program, 'uStrength'),
      mediaAspect: gl.getUniformLocation(program, 'uMediaAspect'),
    };
    let frame = 0;
    let visible = !document.hidden;
    let ready = false;
    let size = { width: 1, height: 1, dpr: 1 };
    const pointer = { x: .5, y: .5, targetX: .5, targetY: .5, strength: 0 };
    const lastMove = { x: Number.NaN, y: Number.NaN };
    const MOVE_THRESHOLD_PX = 10;
    const MAX_STRENGTH = 0.016;

    const resize = () => {
      const bounds = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      size = { width: Math.round(bounds.width), height: Math.round(bounds.height), dpr };
      canvas.width = Math.round(size.width * dpr);
      canvas.height = Math.round(size.height * dpr);
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const render = () => {
      if (!visible || !ready || reduced.matches || !fine.matches) return;
      pointer.x += (pointer.targetX - pointer.x) * .12;
      pointer.y += (pointer.targetY - pointer.y) * .12;
      pointer.strength *= .94;
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      gl.uniform1i(uniforms.texture, 0);
      gl.uniform2f(uniforms.resolution, size.width, size.height);
      gl.uniform2f(uniforms.pointer, pointer.x, 1 - pointer.y);
      gl.uniform1f(uniforms.strength, Math.min(MAX_STRENGTH, pointer.strength * MAX_STRENGTH));
      gl.uniform1f(uniforms.mediaAspect, video.videoWidth / video.videoHeight || 16 / 9);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = window.requestAnimationFrame(render);
    };
    const activate = () => {
      if (ready || video.readyState < 2) return;
      ready = true;
      hero.dataset.webgl = 'ready';
      frame = window.requestAnimationFrame(render);
    };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
        lastMove.x = Number.NaN;
        lastMove.y = Number.NaN;
        return;
      }
      const nextX = (event.clientX - bounds.left) / bounds.width;
      const nextY = (event.clientY - bounds.top) / bounds.height;
      pointer.targetX = nextX;
      pointer.targetY = nextY;
      if (Number.isNaN(lastMove.x) || Number.isNaN(lastMove.y)) {
        lastMove.x = event.clientX;
        lastMove.y = event.clientY;
        return;
      }
      const delta = Math.hypot(event.clientX - lastMove.x, event.clientY - lastMove.y);
      if (delta < MOVE_THRESHOLD_PX) return;
      lastMove.x = event.clientX;
      lastMove.y = event.clientY;
      pointer.strength = 1;
    };
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && ready) frame = window.requestAnimationFrame(render);
      else window.cancelAnimationFrame(frame);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    video.addEventListener('loadeddata', activate);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    activate();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      video.removeEventListener('loadeddata', activate);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      delete hero.dataset.webgl;
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas className="hero-webgl" ref={canvasRef} aria-hidden="true" />;
}
