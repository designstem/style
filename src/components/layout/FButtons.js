import {
  get as getValue,
  set as setValue,
  makeNumber
} from "../../../fachwerk.js"
;

export default {
  description: `
Displays a group of buttons.

<f-buttons
  set="a"
  :buttons="['First','Second']"
/>

    Index of selected button: {{ get('a', 0) }}  
  `,
  props: {
    buttons: { default: [], type: Array },
    value: { default: 0, type: [String, Number] },
    set: {
      default: "",
      type: [String],
      description: "Key for setting a global value"
    }
  },
  methods: {
    setValue,
    isActive(i) {
      if (this.set) {
        const index = this.$global.$data.state[this.set];
        return index == undefined ? i == 0 : i == index;
      }
      return i == this.value;
    }
  },
  template: `
    <div :style="{display: 'flex', marginLeft: 'var(--border-width)', marginBottom: 'var(--base2)'}">
      <div
        v-for="(button,i) in buttons"
        :key="i"
        @click="$emit('input',i); $emit('value',i); if (set) { setValue(set, i) }"
        :style="{
          padding: '0.25rem 0.5rem',
          border: 'var(--border-width) solid var(--primary)',
          borderTopLeftRadius: i == 0 && 'var(--border-radius)',
          borderBottomLeftRadius: i == 0 && 'var(--border-radius)',
          borderTopRightRadius: i == buttons.length - 1 && 'var(--border-radius)',
          borderBottomRightRadius: i == buttons.length - 1 && 'var(--border-radius)',
          color: i === value ? 'var(--primary)' : 'var(--primary)',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          marginLeft: 'calc(var(--border-width) * -1)',
          cursor: 'pointer',
          background: isActive(i) ? 'var(--tertiary)' : 'none',
        }"
        v-html="button"
      />
    </div>
  `
};
