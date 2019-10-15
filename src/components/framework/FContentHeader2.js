import {
  Vue,
  components,
  parseContent,
  send,
  isimageurl,
  color,
  slug,
  store,
  Css
} from "../../../fachwerk.js";

export default {
  props: {
    content: { default: "", type: String },
    edit: { default: false, type: [String, Boolean] },
    showEdit: { default: true, type: [String, Boolean] },
    menu: { default: false, type: [String, Boolean] },
    showMenu: { default: true, type: [String, Boolean] },
    type: { default: "document", type: String },
    saveId: { default: "fachwerk", type: String }
  },
  data: () => ({ currentIndex: 0 }),
  computed: {
    currentContent() {
      return parseContent(this.content);
    },
    iconComponent() {
      if (this.type == "slides") {
        return "f-document-icon";
      }
      return "f-slides-icon";
    }
  },
  methods: {
    first() {
      this.currentIndex = 0;
      this.$global.$emit("index", this.currentIndex);
    },
    last() {
      this.currentIndex = this.currentContent.length - 1;
      this.$global.$emit("index", index);
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.$global.$emit("index", this.currentIndex);
      }
    },
    next() {
      if (this.currentIndex < this.currentContent.length - 1) {
        this.currentIndex++;
        this.$global.$emit("index", this.currentIndex);
      }
    },
    goto(id) {
      if (typeof id === "string") {
        const index = this.currentContent.findIndex(
          slide => slide.section === id || slide.id === id
        );
        if (index > -1) {
          this.currentIndex = index;
          window.location.hash = slug(id);
        }
      } else {
        this.currentIndex = id;
        window.location.hash = "id-" + i;
      }
      this.$global.$emit("index", this.currentIndex);
    }
  },
  mounted() {
    this.$global.$on("next", () => this.next());
    this.$global.$on("prev", () => this.prev());
    this.$global.$on("first", () => this.first());
    this.$global.$on("last", () => this.last());
    this.$global.$on("goto", id => this.goto(id));
    this.$global.$on("section", section => this.goto(section));

    const storedCurrentIndex = store.get(this.saveId + ".index");

    if (storedCurrentIndex && storedCurrentIndex < this.currentContent.length) {
      this.currentIndex = storedCurrentIndex;
      this.$global.$emit("index", this.currentIndex);
      store.set(this.saveId + ".index", this.currentIndex);
    }

    this.$watch("currentIndex", currentIndex => {
      this.$global.$emit("index", currentIndex);
      store.set(this.saveId + ".index", currentIndex);
    });

    this.$watch(
      "currentIndex",
      currentIndex => {
        const currentSlide = this.currentContent[currentIndex];
        if (currentSlide && currentSlide.section) {
          this.$global.$emit("section", currentSlide.section);
        }
      },
      { immediate: true }
    );
  },
  template: `
    <div style="
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: var(--base6);
      padding: 0 var(--base2);
      display: flex;
      align-items: center;
      justify-content: space-between;
    ">
      <div>
        <a
          v-if="showEdit"
          class="quaternary"
          @click="$global.$emit('edit')"
        >
          <f-edit-icon :style="{
            '--icon-stroke': edit ? 'var(--blue)' : ''}
          "/>
        </a>
        <a
          v-if="showMenu && currentContent.filter(c => c.chapter || c.section).length"
          class="quaternary"
          @click="$global.$emit('menu')"
        >
          <f-menu-icon2
            :style="{
              '--icon-stroke': menu ? 'var(--blue)' : '',
            }
          "/>
        </a>
      </div>
      <div style="display: flex">
        <div v-if="type == 'slides' && currentContent.length > 1" style="display: flex; margin-right: var(--base2)">
          <a class="quaternary" style="padding: 0 4px" @click="prev" ><f-leftarrow-icon /></a>
          <a class="quaternary" style="padding: 0 4px" @click="next" ><f-rightarrow-icon /></a>
        </div>
        <a
          class="quaternary"
          @click="$global.$emit('type', type == 'document' ? 'slides' : 'document')"
        >
          <component :is="iconComponent" />&nbsp;
        </a>
      </div>
    </div>
    `
};