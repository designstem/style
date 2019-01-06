export default {
  tag: '2D',
  description: `
TBD
  `,
  example: `
<f-artboard grid="true">
  <f-group slot-scope="data">
  <f-circle
    v-for="y in range(100, 200, 25)"
    :x="100"
    :y="y"
    :r="50"
    :fill="hsl(y)"
    :opacity="0.25"
  />
  <f-circle
    :x="data.value[0]"
    :y="data.value[1]"
    r="50"
  />
  </f-group>
</f-artboard>
  `,
  props: {
    width: { default: 600, type: [Number,String] },
    height: { default: 600, type: [Number,String] },
    grid: { default: false, type: Boolean },
    step: { default: 25, type: [Number,String] }
  }, 
  template: `
  <f-svg 
    :width="width"
    :height="height"
    class="f-artboard"
  >
    <f-group slot-scope="data">
      <f-basegrid 
        v-if="grid"
        :inner-width="width"
        :inner-height="height"
        :step="step"
      />
      <f-basegrid 
        v-if="grid"
        :inner-width="width"
        :inner-height="height"
        :step="step * 4"
      />
      <slot :value="data.value" />
    </f-group>
  </f-svg>
  `,
};