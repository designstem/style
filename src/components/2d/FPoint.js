import Object2D from "./internal/Object2D.js";
import { color, parseCoords } from "../../../fachwerk.js"


export default {
  mixins: [Object2D],
  description: `

Displays a point in 2D space.

#### A single point

<f-scene grid>
  <f-point x="1" y="1" />
</f-scene>

#### Multiple points as a string

<f-scene grid>
  <f-point points="1 1, 1 -1; -1 -1; -1 1" />
</f-scene>

#### Multiple points calculated by a function

<f-scene grid>
  <f-point
    :points="
      range(-4,4,0.05).map(x => ({ x, y: Math.cos(x) }))
    "
    :stroke="color('red')"
  />
  <f-point
    :points="
      range(-4,4,0.05).map(x => ({ x, y: Math.sin(x) }))
    "
    :stroke="color('blue')"
  />
</f-scene>
  `,
  props: {
    x: { default: 0, type: [Number,String] },
    y: { default: 0, type: [Number,String] },
    points: { default: '', type: [String, Number, Array, Object] },
    stroke: { default: "color('primary')", type: String },
    strokeWidth: { default: 3, type: [Number,String] },
    r: { default: '', type: [Number,String] },
    position: { default: '0 0', type: [String, Number, Object, Array] },
    rotation: { default: '0', type: [String, Number, Object, Array] },
    scale: { default: '1', type: [String, Number, Object, Array] },
    opacity: { default: 1, type: [Number,String] },
  },
  computed: {
    strokeColor() {
      return this.stroke == "color('primary')" ? color('primary') : this.stroke
    },
    currentPoints() {
      return this.points ? parseCoords(this.points) : null;
    }
  },
  template: `
    <g :transform="transform">
      <f-line
        v-if="currentPoints"
        v-for="(point,i) in currentPoints"
        :key="i"
        :points="[point,point]"
        :stroke="strokeColor"
        :stroke-width="r || strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        :opacity="opacity"
      />
      <f-line
        v-if="!currentPoints"
        :points="[[x, y],[x, y]]"
        :stroke="strokeColor"
        :stroke-width="r || strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        :opacity="opacity"
      />
    </g>
    `
};
