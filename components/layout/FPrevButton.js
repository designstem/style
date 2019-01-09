import { send } from "../../utils.js";

export default {
  description: `
Button that goes to the previous slide.

<f-prev-button />
`,
  props: { title: { default: "", description: "Button title" } },
  methods: { send },
  template: `
  <button class="secondary" @click="send('prev')">←</button>
  `
};