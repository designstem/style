export default {
  name: "Slider",
  description: "An slider component",
  example: `
<Slider>
  <h1 slot-scope="{value}">
    {{ value }}
  </h1>
</Slider>
  `,
  props: {
    title: { default: "Value" },
    max: { default: 100 },
    step: { default: 1 }
  },
  data: () => ({ value: 0 }),
  template: `
    <div>
      <slot :value="value"/>
      <label>{{ title }} <code>{{ value }}</code></label>
      <input type="range" v-model="value" :max="max" :step="step" />
    </div>
  `
}