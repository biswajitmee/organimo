precision highp float;

uniform float uOpacity;

uniform vec3 uTroughColor;
uniform vec3 uSurfaceColor;
uniform vec3 uPeakColor;

uniform float uPeakThreshold;
uniform float uPeakTransition;
uniform float uTroughThreshold;
uniform float uTroughTransition;

uniform float uFresnelScale;
uniform float uFresnelPower;

uniform samplerCube uEnvironmentMap;
uniform sampler2D uReflectionTexture;

varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vWorldPosition - cameraPosition);
  vec3 reflectedDir = reflect(viewDir, normal);

  // Environment (sky) reflection
  vec3 cubeReflection = textureCube(uEnvironmentMap, reflectedDir).rgb;

  // Map world position to reflection texture UV
  vec2 uv = vWorldPosition.xz / 2000.0 + 0.5;

  // Fake reflection blur by offset sampling
  vec3 sceneReflection = vec3(0.0);
  float totalWeight = 0.0;
  float blurRadius = 1.0 / 512.0;

  for (int x = -2; x <= 2; x++) {
    for (int y = -2; y <= 2; y++) {
      vec2 offset = vec2(float(x), float(y)) * blurRadius;
      float weight = 1.0 - length(offset) * 0.5;
      sceneReflection += texture2D(uReflectionTexture, uv + offset).rgb * weight;
      totalWeight += weight;
    }
  }

  sceneReflection /= totalWeight;

  // Blend both types of reflection
  vec3 blendedReflection = mix(cubeReflection, sceneReflection, 0.6);

  // Fresnel effect
  float fresnel = uFresnelScale * pow(1.0 - clamp(dot(viewDir, normal), 0.0, 1.0), uFresnelPower);

  // Elevation-based coloring
  float elevation = vWorldPosition.y;

  float peakFactor = smoothstep(uPeakThreshold - uPeakTransition, uPeakThreshold + uPeakTransition, elevation);
  float troughFactor = smoothstep(uTroughThreshold - uTroughTransition, uTroughThreshold + uTroughTransition, elevation);

  vec3 mixedColor1 = mix(uTroughColor, uSurfaceColor, troughFactor);
  vec3 mixedColor2 = mix(mixedColor1, uPeakColor, peakFactor);

  // Foam color near peaks
  float foam = smoothstep(0.05, 0.15, elevation);
  vec3 foamColor = vec3(1.0); // white foam
  mixedColor2 = mix(mixedColor2, foamColor, foam * 0.4);

  // Distance-based fade (optional: fade reflections with distance)
  float distFade = clamp(length(viewDir) / 1000.0, 0.0, 1.0);

  // Caustics placeholder (for real caustics you'd need another texture)
  vec3 causticsColor = vec3(0.9, 1.0, 0.8); // subtle green-blue tint
  float causticsStrength = smoothstep(-0.05, 0.05, elevation);
  mixedColor2 = mix(mixedColor2, causticsColor, causticsStrength * 0.1);

  // Final blend with Fresnel + fade
  vec3 finalColor = mix(mixedColor2, blendedReflection, fresnel * (1.0 - distFade));

  gl_FragColor = vec4(finalColor, uOpacity);
}
