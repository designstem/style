import { THREE, color } from '../../../fachwerk.js'
import Object3D from "./internal/Object3D.js";

export default {
  description: `
Displays a 3D box.

<f-scene3>
  <f-rotation3>
    <f-grid3 />
    <f-box3 />
  </f-rotation3>
</f-scene3>

<f-scene3>
  <f-rotation3>
    <f-grid3 />
    <f-box3 r="0.2" />
  </f-rotation3>
</f-scene3> 
  `,
  mixins: [Object3D],
  props: {
    width: { default: 1, type: Number },
    height: { default: 1, type: Number },
    depth: { default: 1, type: Number },
    r: { default: "", type: [Number, String] },
    stroke: { default: "", type: String },
    strokeWidth: { default: 3, type: Number },
    fill: { default: "color('primary')", type: String },
    scale: { default: "1 1 1", type: [String, Number, Array, Object] },
    position: { default: "0 0 0", type: [String, Number, Array, Object] },
    rotation: { default: "0 0 0", type: [String, Number, Array, Object] },
    opacity: { default: 1, type: [Number,String] },
    shading: { default: true, type: Boolean },
  },
  data() {
    let curObj = this.obj;
    if (!curObj) {
      var geometry = new THREE.BoxGeometry(this.r ? this.r * 2 : this.width, this.r ? this.r * 2 : this.height, this.r ? this.r * 2 : this.depth);
      curObj = new THREE.Mesh(
        geometry,
        this.shading ? new THREE.MeshNormalMaterial({
          opacity: this.opacity,
          side: THREE.DoubleSide
        })
        : new THREE.MeshBasicMaterial({
          color: this.fill == "color('primary')" ? color('primary') : this.fill,
          opacity: this.opacity,
          side: THREE.DoubleSide
        })
      );
    }
    curObj.name = curObj.name || curObj.type;
    return { curObj };
  }
};
