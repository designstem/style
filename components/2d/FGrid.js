import { Object2d } from "../../mixins.js";

export default {
  mixins: [Object2d],
  description: `
Generates a rectangular grid.

Compared to \`<f-scene grid>\` it allows allows greater freedom to generate custom grids using transformation parameters.

<f-scene>
  <f-grid />
  <f-grid step="0.25" />
  <f-grid step="0.125" />
</f-scene>
  `,
  props: {
    step: { default: 0.5, type: [Number,String] },
    position: { default: () => ({}), type: Object },
    rotation: { default: () => ({}), type: Object },
    scale: { default: () => ({}), type: Object },
    opacity: { default: 0.15, type: [Number,String] },
  },
  template: `
  <f-group :transform="transform">
    <f-basegrid
      :inner-x="-2"
      :inner-y="-2"
      :inner-width="4"
      :inner-height="4"
      :step="step"
      :opacity="opacity"
    />
    <f-basegrid
      :inner-x="-2"
      :inner-y="-2"
      :inner-width="4"
      :inner-height="4"
      :step="step * 4"
      :opacity="opacity"
    />
  </f-group>
  `
};
