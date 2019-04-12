import { color } from "../../../fachwerk.js";

export default {
  description: `
Navigation menu icon.
  
<f-menu-icon />

<p />
  `,
  data: () => ({
    size: 16
  }),
  methods: { color },
  template: `
  <f-artboard :width="size" :height="size">
    <f-line
      v-for="(y,i) in [3, size / 2, size - 3]"
      :key="i"
      :x1="2"
      :y1="y"
      :x2="size - 2"
      :y2="y"
      :stroke="color('primary')"
      stroke-width="2"
    />
  </f-artboard>
  `
};
