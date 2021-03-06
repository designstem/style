import { Css } from "../../fachwerk.js";

export default {
  mixins: [Css],
  props: ["items", "value"],
  data: () => ({ currentActiveItem: 0, show: true }),
  methods: {
    top() {
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    this.$global.$on("type", type => (this.show = type == "document"));
  },
  template: `
    <div v-show="show">
      <div
        v-for="(item,i) in items"
        :key="i"
        :style="{
          cursor: 'pointer',
        }"
      >
        <div :style="{
          display: 'flex',
          alignItems: 'center',
          padding: 'var(--base3) var(--base3) var(--base) var(--base2)',
          fontWeight: 'bold',
          color: 'var(--primary)',
        }"
        v-html="item.title"
        />
        <router-link
          if="i == currentActiveItem"
          v-for="(item,j) in item.items"
          :key="j"
          :style="{
            display: 'flex',
            alignItems: 'center',
            padding: 'var(--base) var(--base) var(--base) var(--base5)',
            border: 'none',
            fontWeight: 'normal'
          }"
          class="router-link"
          :to="item.path"
          @click.native="top"
        >
          <span v-html="item.title" />
        </router-link>
      </div>
      <p />
      <small>
      <f-footer style="margin: var(--base2); --cols: 1fr;"/>
        </small>
    </div>
  `,
  css: `
    .router-link span {
      border-bottom: 2px solid var(--transparent);
    }
    .router-link-exact-active span {
      color: var(--blue);
      border-bottom: 2px solid var(--blue);
    }
  `
};
