import * as components from "./framework.js";
import { kebabCase } from "./utils.js";

for (const name in components) {
  Vue.component(name, components[name]);
}
import { sortedComponents } from "./framework.js";

const FCard = {
  props: {
    title: { default: "", type: String },
    subtitle: { default: "", type: String },
    fill: { default: "var(--secondary)", type: String },
    width: { default: "", type: String },
    height: { default: "", type: String }
  },
  template: `
    <div
      style="
        border-radius: var(--border-radius);
        padding: calc(var(--base) * 1);
        color: var(--white);
        display: flex;
        justify-content: space-between;
      "
      :style="{
        background: fill,
        width,
        height
      }"
    >
      <h5 style="margin: 0; font-size: calc(var(--base) * 1.75);" v-html="title">{{}}</h5>
      <p><small>{{ subtitle }}</small></p>
    `
};

const FTable = {
  props: { rows: { default: [], type: Array } },
  template: `
  <div>
  <table>
    <thead>
      <th
        v-for="(k,i) in Object.keys(rows[0])"
        :key={i}
      >
        {{ k }}
      </th>
    </thead>
    <tbody>
      <tr v-for="(row,i) in rows" :key="i">
        <td
          v-for="(r,j) in Object.values(row)"
          :key="j"
          v-html="r"
        />
      </tr>
    </tbody>
  </table>
  </div>
`
};

Vue.component("FCard", FCard);
Vue.component("FTable", FTable);

const PropsTable = {
  props: { props: { default: {}, type: Number } },
  computed: {
    propRows() {
      return Object.entries(this.props).map(p => ({
        Name: `<code>${p[0]}</code>`,
        Default: `<code>${p[1].default}</code>`,
        Type: `<code>${
          Array.isArray(p[1].default) ? "array" : typeof p[1].default
        }</code>`
      }));
    }
  },
  template: `
    <f-table :rows="propRows" style="--lightblue: transparent" />
  `
};

const ComponentRow = {
  props: {
    component: { default: {}, type: Object },
    editor: { default: true, type: Boolean }
  },
  methods: { kebabCase },
  components: { PropsTable },
  template: `
    <div>
      <h3>&lt;{{ kebabCase(component.name) }}&gt;</h3>
      <div class="grid" style="--cols: 1fr 2fr">
        <div>
          <markdown v-if="component.description" :content="component.description" />
          <div style="max-height: calc(var(--base) * 50); overflow: auto;">
            <h5>Props</h5>
            <PropsTable :props="component.props" />
          </div>
        </div>
        <div>
          <f-content-editor
            v-if="component.example && editor"
            :content="component.example.trim()"
            :autosave-id="component.name"
            style="min-height: calc(var(--base) * 15)"
          ><f-content-document slot-scope="{content}" :content="content" /></f-content-editor> 
          <render 
            v-if="component.example && !editor"
            :t="component.example.trim()"
          />
        </div>
      </div>
      <br><br>
      
    </div>
  `
};

const FHr = {
  template: `
    <div style="height: 0; border-bottom: 3px solid var(--primary)">&nbsp;</div>
  `
};

const FVr = {
  template: `
    <div style="display: flex; width: 0; border-right: 3px solid var(--primary)">&nbsp;</div>
  `
};

Vue.component("FHr", FHr);
Vue.component("FVr", FVr);

new Vue({
  el: "#app",
  data: {
    sortedComponents,
    tags: ["2D", "3D", "Data", "Transitions", "Content", "Layout"],
    activeTag: 0
  },
  components: { ComponentRow },
  template: `
    <f-theme>
      <header>
        <div>Fachwerk is a part of <a href="https://designstem.github.io/homepage">DesignSTEM</a> education initiative.</div>
      </header>
      <div style="padding: var(--base4);">
        <h1>Grid</h1>
        <f-fetch-data url="./contents/grid.md">
          <f-content-editor
            slot-scope="data"
            :content="data.value"
            autosave-id="grid"
          ><f-content-document slot-scope="{content}" :content="content" /></f-content-editor> 
        </f-fetch-data>
      </div>
      <f-separator />
      <div style="padding: var(--base4);">
        <h1 style="margin: 0;">Components</h1>
      </div>
      <f-separator />
      <f-tabs
        style="background: white; position: sticky; top:0; z-index: 1000;"
        :buttons="tags"
        v-model="activeTag"
      />
      <div style="display: flex;">
        <div style="flex: 1; padding: var(--base4)">
          <ComponentRow
            v-for="(c,i) in sortedComponents.map(c => Object.values(c)[0]).filter(c => c.tag == tags[activeTag])"
            :component="c"
            :editor="activeTag !== 5"
            :key="i"
            style="margin-bottom: calc(var(--base) * 10);"
          />
        </div>
    </f-theme>
  `
});
