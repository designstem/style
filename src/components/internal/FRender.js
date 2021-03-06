import { Vue, utils } from "../../../fachwerk.js";

export default {
  props: { content: String },
  data: () => ({
    render: null,
    someVariable: 0
  }),
  methods: Object.assign({}, utils),
  mounted() {
    this.$watch(
      "content",
      value => {
        const template = Vue.compile(value);
        this.render = template.render;
        this.$options.staticRenderFns = [];
        this._staticTrees = [];
        for (var i in template.staticRenderFns) {
          this.$options.staticRenderFns.push(template.staticRenderFns[i]);
        }
      },
      { immediate: true }
    );
  },
  render: function(h) {
    return this.render ? this.render() : h();
  }
};
