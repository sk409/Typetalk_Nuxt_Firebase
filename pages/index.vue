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
          <v-icon :style="toolIconStyle" :class="toolIconClass(tool)">
            {{
            tool.icon
            }}
          </v-icon>
        </v-btn>
      </div>
      <div class="h-100 tools-spacer"></div>
    </div>
    <div class="h-100 utility">
      <div v-if="toolname === 'topics'">
        <TopicList :topic.sync="topic" :topics="topics"></TopicList>
      </div>
    </div>
    <div v-if="topic" class="h-100 messages white position-relative">
      <MessageList :messages="messages"></MessageList>
      <MessageInput class="w-100 position-absolute left-0 bottom-0" @send="sendMessage"></MessageInput>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import MessageInput from "@/components/MessageInput.vue";
import MessageList from "@/components/MessageList.vue";
import TopicList from "@/components/TopicList.vue";
import { messageRepository } from "@/assets/js/repositories.js";
import {
  messageService,
  topicService,
  userService
} from "@/assets/js/services.js";
let user = null;
export default {
  layout: "auth",
  components: {
    MessageInput,
    MessageList,
    TopicList
  },
  data() {
    return {
      messages: [],
      toolIconStyle: {
        "font-size": "30px"
      },
      toolname: "topics",
      topic: null,
      topics: []
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
  created() {
    userService.current().then(u => {
      user = u;
      this.fetchTopics();
    });
  },
  watch: {
    topic() {
      this.fetchMessages();
    }
  },
  methods: {
    clickTool(tool) {
      this.toolname = tool.name;
    },
    fetchMessages() {
      if (!this.topic) {
        return;
      }
      const messages = [];
      firebase
        .firestore()
        .collection("messages")
        .where("topicId", "==", this.topic.id)
        .get()
        .then(snapshot => {
          if (snapshot.size === 0) {
            return;
          }
          snapshot.forEach(message => {
            messages.push(this.$convert(message));
          });
          const userIds = messages.map(message => message.userId);
          return firebase
            .firestore()
            .collection("users")
            .where("uid", "in", userIds)
            .get();
        })
        .then(snapshot => {
          if (!snapshot) {
            return;
          }
          const users = {};
          snapshot.forEach(doc => {
            const user = this.$convert(doc);
            users[user.uid] = user;
          });
          messages.forEach(message => {
            message.user = users[message.userId];
          });
          this.messages = messages;
        });
    },
    fetchTopics() {
      topicService.findByUserId(user.id).then(topics => {
        this.topics = topics;
        messageService.findByTopicId(topics[0].id);
      });
    },
    sendMessage(text) {
      messageService.save(user.id, {
        text,
        topicId: this.topic.id,
        userId: user.uid
      });
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
