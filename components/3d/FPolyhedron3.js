import { Object3D } from "./3d.js";

export default {
  description: `
Description to be written.

<f-scene3>
  <f-grid3 />
  <f-polyhedron3
    v-for="(hedron,i) in [
      'Tetrahedron',
      'Octahedron',
      'Icosahedron',
      'Dodecahedron'
    ]"
    :key="i"
    :hedron="hedron"
    :position="{x: i - 1.5}"
    :r="0.5"
  />
</f-scene3>  
  `,
  mixins: [Object3D],
  props: {
    hedron: { default: "Icosahedron", type: String },
    r: { default: 1, type: Number },
    scale: { default: () => ({}), type: [Object, Number] },
    position: { default: () => ({}), type: Object },
    rotation: { default: () => ({}), type: Object }
  },
  data() {
    let curObj = this.obj;
    if (!curObj) {
      var geometry = new THREE[this.hedron + "Geometry"](this.r, 0);
      curObj = new THREE.Mesh(
        geometry,
        new THREE.MeshNormalMaterial({
          flatShading: true,
          opacity: 0.8,
          side: THREE.DoubleSide
        })
      );
    }
    curObj.name = curObj.name || curObj.type;
    return { curObj };
  }
};
