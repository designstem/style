import { Object3D } from "./internal/three.js";

export default {
  mixins: [Object3D],
  name: "ThreeLine",
  description: `
Draws a line in full 3D space, accepts any number of 3D coordinates in <code>:points</code> array.  `,
  example: `
<ThreeScene>
  <ThreeGroup
    :rotation="{ y: 0.5, x: 0.5 }"
    :scale="{ x: 0.5, y: 0.5, z: 0.5 }"
  >
  <ThreeGrid />
  <ThreeLine
    :points="[
      { x: 1, y:  1, z: 0 },
      { x: 1, y:  0, z: 1 },
      { x: 1, y: -1, z: 0 },
      { x: 1, y: -2, z: 0 },
    ]"
  />
  </ThreeGroup>
</ThreeScene>
  `,
  mixins: [Object3D],
  props: {
    points: { default: [] },
    stroke: { default: "black" },
    strokeWidth: { default: 3 }
  },
  data() {
    let curObj = this.obj;
    if (!curObj) {
      const geometry = new THREE.Geometry();
      this.points.forEach(p => {
        geometry.vertices.push(new THREE.Vector3(p.x || 0, p.y || 0, p.z || 0));
      });
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(this.stroke),
        linewidth: this.strokeWidth
      });
      curObj = new THREE.Line(geometry, material);
    }
    curObj.name = curObj.name || curObj.type;
    return { curObj };
  }
};