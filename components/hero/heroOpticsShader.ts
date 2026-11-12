import {
  OPTICS_CAMERA_FOV,
  OPTICS_CAMERA_Z,
  OPTICS_DROPLET_RADIUS,
} from "@/lib/optics";

export const HERO_OPTICS_VERTEX_SHADER = `#version 300 es
void main() {
  float x = float((gl_VertexID & 1) << 2) - 1.0;
  float y = float((gl_VertexID & 2) << 1) - 1.0;
  gl_Position = vec4(x, y, 0.0, 1.0);
}
`;

export const HERO_OPTICS_FRAGMENT_SHADER = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uPointerHit;
uniform float uPointerDepth;
uniform vec4 uTrail[8];
uniform float uIor;
uniform float uDispersion;
uniform float uIsDark;
uniform vec3 uBgColor;
uniform vec3 uGridColor;
uniform vec3 uBrandColor;

const float CAM_Z = ${OPTICS_CAMERA_Z.toFixed(2)};
const float CAM_FOV = ${OPTICS_CAMERA_FOV.toFixed(2)};
const float BASE_R = ${OPTICS_DROPLET_RADIUS.toFixed(2)};
const float BOUND_R = 0.96;
const float HIT_EPS = 0.0012;

float mapDroplet(vec3 p) {
  float d = length(p) - BASE_R;

  float ambient = sin(p.x * 4.2 + uTime * 1.4) * cos(p.y * 3.8 - uTime * 1.1) * 0.016
    + sin(p.z * 5.0 + uTime * 1.7) * 0.008;

  float hp = length(p - uPointerHit);
  float hoverDip = -exp(-hp * hp * (18.0 - 5.0 * uPointerDepth)) * (0.045 * uPointerDepth);

  // Suma suave de ondas tipo Ricker con saturación tanh para evitar costuras en círculos chicos
  float wakeSum = 0.0;
  for (int i = 0; i < 8; i++) {
    float age = uTrail[i].w;
    if (age >= 0.0 && age < 1.25) {
      float dist = length(p - uTrail[i].xyz);
      float radius = age * 0.56;
      float width = 0.088 + age * 0.075;
      float u = (dist - radius) / width;
      float ricker = -(1.0 - 2.0 * u * u) * exp(-u * u);
      float fade = exp(-age * 2.15) * smoothstep(1.25, 0.85, age);
      wakeSum += ricker * fade * 0.036;
    }
  }
  float wakeDisp = 0.052 * tanh(wakeSum / 0.052);

  return d + ambient + hoverDip + wakeDisp;
}

vec3 calcNormal(vec3 p) {
  const float h = 0.0022;
  const vec2 k = vec2(1.0, -1.0);
  return normalize(
    k.xyy * mapDroplet(p + k.xyy * h) +
    k.yyx * mapDroplet(p + k.yyx * h) +
    k.yxy * mapDroplet(p + k.yxy * h) +
    k.xxx * mapDroplet(p + k.xxx * h)
  );
}

float gridPattern(vec2 uv, float scale, float lineWidth) {
  vec2 coord = uv * scale;
  vec2 fw = clamp(fwidth(coord), vec2(0.0008), vec2(0.08));
  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fw;
  return 1.0 - min(min(grid.x, grid.y) / lineWidth, 1.0);
}

vec3 sampleEnv(vec3 rd) {
  float up = clamp(rd.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 skyLow = mix(uBgColor * 0.94, uBgColor * 1.15, uIsDark);
  vec3 skyHigh = mix(uBgColor * 1.02, uBgColor * 1.55 + uBrandColor * 0.09, uIsDark);
  vec3 col = mix(skyLow, skyHigh, smoothstep(0.15, 0.95, up));

  float bgGrid = gridPattern(rd.xy / max(abs(rd.z) + 0.85, 0.35), 3.4, 1.25);
  float bgFade = smoothstep(-0.2, 0.65, -rd.z) * 0.42;
  col = mix(col, uGridColor, bgGrid * bgFade);

  vec3 keyDir = normalize(vec3(0.55 + uPointer.x * 0.45, 0.8 + uPointer.y * 0.35, 0.6));
  vec3 rimDir = normalize(vec3(-0.85, 0.45, -0.55));
  vec3 fillDir = normalize(vec3(0.2, -0.35, -0.9));

  float keyPanel = smoothstep(0.91, 0.985, dot(rd, keyDir));
  float rimPanel = smoothstep(0.84, 0.97, dot(rd, rimDir));
  float fillGlow = pow(max(dot(rd, fillDir), 0.0), 8.0);

  vec3 keyColor = mix(vec3(1.15, 1.14, 1.12), vec3(1.45, 1.48, 1.55), uIsDark);
  col += keyColor * keyPanel * 1.4;
  col += mix(uBrandColor, vec3(1.0), 0.35) * rimPanel * mix(0.65, 1.1, uIsDark);
  col += uBrandColor * fillGlow * mix(0.14, 0.26, uIsDark);

  return col;
}

vec3 exitRefractRay(vec3 rdIn, vec3 exitN, float ior) {
  vec3 rdOut = refract(rdIn, exitN, ior);
  if (length(rdOut) < 0.001) {
    return reflect(rdIn, exitN);
  }
  return normalize(rdOut);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
  vec3 ro = vec3(0.0, 0.0, CAM_Z);
  vec3 rd = normalize(vec3(uv, -CAM_FOV));

  float bBound = dot(ro, rd);
  float cBound = dot(ro, ro) - BOUND_R * BOUND_R;
  float discBound = bBound * bBound - cBound;
  if (discBound < 0.0) {
    fragColor = vec4(0.0);
    return;
  }

  float tStart = max(0.0, -bBound - sqrt(discBound));
  float tEnd = -bBound + sqrt(discBound);
  float t = tStart;
  float minD = 1e5;
  vec3 closestP = ro + rd * tStart;
  bool hit = false;

  for (int i = 0; i < 20; i++) {
    vec3 p = ro + rd * t;
    float d = mapDroplet(p);
    if (d < minD) {
      minD = d;
      closestP = p;
    }
    if (d < HIT_EPS) {
      hit = true;
      break;
    }
    t += d * 0.78;
    if (t > tEnd) {
      break;
    }
  }

  float aaWidth = 0.012;
  if (!hit && minD > aaWidth) {
    fragColor = vec4(0.0);
    return;
  }

  vec3 hitPos = hit ? (ro + rd * t) : closestP;
  vec3 N = calcNormal(hitPos);
  vec3 V = -rd;

  float f0 = pow((1.0 - uIor) / (1.0 + uIor), 2.0);
  float fresnel = f0 + (1.0 - f0) * pow(1.0 - max(dot(N, V), 0.0), 5.0);

  vec3 R = reflect(rd, N);
  vec3 reflColor = sampleEnv(R);

  vec3 rdInBase = refract(rd, N, 1.0 / uIor);
  float thickness = 0.0;
  vec3 refrColor = reflColor;

  if (length(rdInBase) > 0.001) {
    float bExit = dot(hitPos, rdInBase);
    float cExit = dot(hitPos, hitPos) - BASE_R * BASE_R;
    float tExit = max(0.06, -bExit + sqrt(max(0.0, bExit * bExit - cExit)));
    vec3 exitPos = hitPos + rdInBase * tExit;
    for (int j = 0; j < 3; j++) {
      exitPos -= rdInBase * mapDroplet(exitPos) * 0.78;
    }
    thickness = length(exitPos - hitPos);
    vec3 exitN = -calcNormal(exitPos);

    float iorRed = max(1.02, uIor - uDispersion);
    float iorViolet = uIor + uDispersion;

    vec3 rdInRed = refract(rd, N, 1.0 / iorRed);
    vec3 rdInViolet = refract(rd, N, 1.0 / iorViolet);
    vec3 rdOutRed = length(rdInRed) > 0.001 ? exitRefractRay(rdInRed, exitN, iorRed) : R;
    vec3 rdOutViolet = length(rdInViolet) > 0.001 ? exitRefractRay(rdInViolet, exitN, iorViolet) : R;

    vec3 spectralWeights[6] = vec3[6](
      vec3(0.35, 0.02, 0.00),
      vec3(0.35, 0.16, 0.00),
      vec3(0.22, 0.36, 0.02),
      vec3(0.06, 0.34, 0.18),
      vec3(0.02, 0.10, 0.42),
      vec3(0.00, 0.02, 0.38)
    );

    refrColor = vec3(0.0);
    for (int k = 0; k < 6; k++) {
      float lambda = float(k) / 5.0;
      vec3 dir = normalize(mix(rdOutRed, rdOutViolet, lambda));
      refrColor += sampleEnv(dir) * spectralWeights[k];
    }
  }

  vec3 absorbCoeff = mix(vec3(0.12, 0.05, 0.02), vec3(0.14, 0.06, 0.01), uIsDark);
  vec3 absorption = exp(-thickness * absorbCoeff);
  vec3 surfaceColor = mix(refrColor * absorption, reflColor, clamp(fresnel * 1.15, 0.0, 0.96));

  vec3 keyDir = normalize(vec3(0.55 + uPointer.x * 0.45, 0.8 + uPointer.y * 0.35, 0.6));
  float spec = pow(max(dot(R, keyDir), 0.0), 110.0);
  surfaceColor += vec3(1.0) * spec * mix(0.85, 1.15, uIsDark);

  surfaceColor = clamp(surfaceColor, 0.0, 1.35);
  surfaceColor = surfaceColor / (1.0 + surfaceColor * 0.12);

  float edgeAlpha = hit ? 1.0 : smoothstep(aaWidth, 0.0, minD);
  fragColor = vec4(surfaceColor * edgeAlpha, edgeAlpha);
}
`;

export interface HeroOpticsUniforms {
  uResolution: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
  uPointer: WebGLUniformLocation | null;
  uPointerHit: WebGLUniformLocation | null;
  uPointerDepth: WebGLUniformLocation | null;
  uTrail: WebGLUniformLocation | null;
  uIor: WebGLUniformLocation | null;
  uDispersion: WebGLUniformLocation | null;
  uIsDark: WebGLUniformLocation | null;
  uBgColor: WebGLUniformLocation | null;
  uGridColor: WebGLUniformLocation | null;
  uBrandColor: WebGLUniformLocation | null;
}

export interface CompiledHeroOpticsProgram {
  program: WebGLProgram;
  vao: WebGLVertexArrayObject | null;
  uniforms: HeroOpticsUniforms;
  dispose: () => void;
}

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("No se pudo crear el shader WebGL2.");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) ?? "Error compilando shader.";
    gl.deleteShader(shader);
    throw new Error(info);
  }
  return shader;
}

export function createHeroOpticsProgram(gl: WebGL2RenderingContext): CompiledHeroOpticsProgram {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, HERO_OPTICS_VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, HERO_OPTICS_FRAGMENT_SHADER);

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error("No se pudo crear el programa WebGL2.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program) ?? "Error enlazando programa WebGL2.";
    gl.deleteProgram(program);
    throw new Error(info);
  }

  const vao = gl.createVertexArray();
  const uniforms: HeroOpticsUniforms = {
    uResolution: gl.getUniformLocation(program, "uResolution"),
    uTime: gl.getUniformLocation(program, "uTime"),
    uPointer: gl.getUniformLocation(program, "uPointer"),
    uPointerHit: gl.getUniformLocation(program, "uPointerHit"),
    uPointerDepth: gl.getUniformLocation(program, "uPointerDepth"),
    uTrail: gl.getUniformLocation(program, "uTrail"),
    uIor: gl.getUniformLocation(program, "uIor"),
    uDispersion: gl.getUniformLocation(program, "uDispersion"),
    uIsDark: gl.getUniformLocation(program, "uIsDark"),
    uBgColor: gl.getUniformLocation(program, "uBgColor"),
    uGridColor: gl.getUniformLocation(program, "uGridColor"),
    uBrandColor: gl.getUniformLocation(program, "uBrandColor"),
  };

  return {
    program,
    vao,
    uniforms,
    dispose: () => {
      if (vao) gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    },
  };
}
