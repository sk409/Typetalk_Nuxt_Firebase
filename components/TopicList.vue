<template>
  <div>
    <div class="align-center d-flex toolbar">
      <v-btn icon small class="ml-auto white" @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon small class="ml-2 mr-2 white">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <div
      v-for="topic in topics"
      :key="topic.id"
      :style="topic.style"
      class="pa-2 text-center"
      @click="clickTopic(topic)"
    >
      <span class="subtitle-1">{{ topic.name }}</span>
    </div>
    <v-dialog v-model="dialog">
      <TopicForm @created="createdTopic"></TopicForm>
    </v-dialog>
  </div>
</template>

<script>
import TopicForm from "@/components/TopicForm.vue";
export default {
  props: {
    topic: {
      type: Object,
      default: null
    },
    topics: {
      type: Array,
      default: () => []
    }
  },
  components: {
    TopicForm
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    clickTopic(topic) {
      if (this.topic) {
        this.topic.class = "topic";
        this.topic.style = {};
      }
      topic.class = "active-topic";
      topic.style = {
        background: "white",
        "border-top": "1px solid rgb(200, 200, 200)",
        "border-bottom": "1px solid rgb(200, 200, 200)",
        "border-left": `4px solid ${this.$vuetify.theme.currentTheme.primary}`,
        color: this.$vuetify.theme.currentTheme.primary
      };
      this.$emit("update:topic", topic);
    },
    createdTopic(topic) {
      this.dialog = false;
      this.$emit("created-topic", topic);
    }
  }
};
</script>

<style>
.toolbar {
  height: 53px;
}
.topic:hover {
  background: rgb(235, 229, 228);
}
</style>
