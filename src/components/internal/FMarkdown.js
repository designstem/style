import FRender from "./FRender.js";

export default {
  components: { FRender },
  props: ["content"],
  methods: { marked },
  computed: {
    processedContent() {
      return this.content.replace(/(<[^>]+>)/g, w =>
        w.replace(/(\n|[\n])/g, " ").replace(/\s+/g, " ")
      ).replace(/(@)(.*)(=)/g,'v-on:$2$3')
    }
  },
  template: `
  <div>
    <FRender :content="'<div>' + marked(processedContent, { breaks: true }) + '</div>'" />
  </div>
  `
};