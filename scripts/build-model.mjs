// Generates the studio's central sculptural asset as a real GLB file.
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { writeFileSync } from 'node:fs';

// GLTFExporter is written for browsers; give it the two APIs it needs in Node.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      this.onloadend && this.onloadend();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = `data:${blob.type || 'application/octet-stream'};base64,${Buffer.from(buf).toString('base64')}`;
      this.onloadend && this.onloadend();
    });
  }
};


const root = new THREE.Group();
root.name = 'atelier-core';

const chrome = new THREE.MeshStandardMaterial({ color: '#cfd8e3', metalness: 1, roughness: 0.18, envMapIntensity: 1.6 });
const graphite = new THREE.MeshStandardMaterial({ color: '#38455a', metalness: 0.9, roughness: 0.35 });

const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.05, 0.17, 180, 20, 2, 3), chrome);
knot.name = 'knot';
root.add(knot);

for (let i = 0; i < 3; i++) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.55 + i * 0.16, 0.018, 18, 160), graphite);
  ring.rotation.set(Math.PI / 2 + i * 0.24, i * 0.4, i * 0.15);
  ring.position.y = (i - 1) * 0.24;
  ring.name = `orbit-${i}`;
  root.add(ring);
}

const shards = new THREE.Group();
shards.name = 'shards';
for (let i = 0; i < 14; i++) {
  const a = (i / 14) * Math.PI * 2;
  const s = new THREE.Mesh(new THREE.TetrahedronGeometry(0.07 + (i % 3) * 0.03), chrome);
  s.position.set(Math.cos(a) * 2.15, Math.sin(a * 2) * 0.55, Math.sin(a) * 2.15);
  s.rotation.set(a, a * 1.7, a * 0.6);
  shards.add(s);
}
root.add(shards);

const exporter = new GLTFExporter();
exporter.parse(
  root,
  (glb) => {
    writeFileSync('public/models/atelier-core.glb', Buffer.from(glb));
    console.log('wrote public/models/atelier-core.glb', Buffer.byteLength(glb), 'bytes');
  },
  (err) => {
    console.error(err);
    process.exit(1);
  },
  { binary: true, onlyVisible: true },
);
