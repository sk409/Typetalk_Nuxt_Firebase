<template>
  <div class="d-flex h-100">
    <div class="d-flex flex-column h-100 tools white">
      <div
        v-for="(tool, index) in tools"
        :key="tool.icon"
        :class="toolClass(tool, index)"
        class="py-2 text-center tool"
      >
        <v-btn text @click="clickTool(tool)">
          <v-icon :style="toolIconStyle" :class="toolIconClass(tool)">{{tool.icon}}</v-icon>
        </v-btn>
      </div>
      <div class="h-100 tools-spacer"></div>
    </div>
    <div class="h-100 utility">
      <div v-if="toolname === 'topics'">
        <TopicList></TopicList>
      </div>
    </div>
    <div class="h-100 messages white"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import TopicList from "@/components/TopicList.vue";
let user = null;
export default {
  layout: "auth",
  components: {
    TopicList
  },
  data() {
    return {
      toolIconStyle: {
        "font-size": "30px"
      },
      toolname: "topics"
    };
  },
  computed: {
    tools() {
      return [
        {
          icon:
            this.toolname === "topics"
              ? "mdi-file-document"
              : "mdi-file-document-outline",
          name: "topics"
        },
        {
          icon:
            this.toolname === "messages" ? "mdi-email" : "mdi-email-outline",
          name: "messages"
        },
        {
          icon:
            this.toolname === "notifications" ? "mdi-bell" : "mdi-bell-outline",
          name: "notifications"
        },
        {
          icon:
            this.toolname === "favorite" ? "mdi-heart" : "mdi-heart-outline",
          name: "favorite"
        }
      ];
    }
  },
  created() {},
  methods: {
    clickTool(tool) {
      this.toolname = tool.name;
    },
    toolClass(tool, index) {
      if (this.toolname === tool.name) {
        const classes = ["tool-active"];
        if (index === 0) {
          classes.push("tool-top");
        }
        return classes;
      }
      return "tool-inactive";
    },
    toolIconClass(tool) {
      if (this.toolname === tool.name) {
        return "primary--text";
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
$border: 1px solid rgb(200, 200, 200);
$utility-bg: rgb(246, 246, 246);

.tool {
  height: 64px;
}

.tool-active {
  background: $utility-bg;
  border-top: $border;
  border-bottom: $border;
}

.tool-top {
  border-top: none;
}

.tool-inactive {
  border-right: $border;
}

.tools {
  width: 8%;
}

.tools-spacer {
  border-right: $border;
}

.utility {
  background: $utility-bg;
  border-right: $border;
  width: 25%;
}

.messages {
  width: 67%;
}
</style>