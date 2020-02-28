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
        <TopicList :topic.sync="topic" :topics="topics" @created-topic="createdTopic"></TopicList>
      </div>
    </div>
    <div v-if="topic" class="d-flex flex-column h-100 messages white">
      <MessageList
        class="flex-fill"
        :first-message="firstMessage"
        :messages="messages"
        :scroll-to-bottom.sync="messageListScrollToBottom"
        @load-messages="fetchMessages"
      ></MessageList>
      <MessageInput class="w-100" @send="sendMessage"></MessageInput>
    </div>
    <SnackbarView :notification="notification" :visible.sync="snackbar"></SnackbarView>
  </div>
</template>

<script>
import firebase from "firebase";
import MessageInput from "@/components/MessageInput.vue";
import MessageList from "@/components/MessageList.vue";
import SnackbarView from "@/components/SnackbarView.vue";
import TopicList from "@/components/TopicList.vue";
import { messageRepository } from "@/assets/js/repositories.js";
import {
  messageService,
  topicService,
  topicUserService,
  userService
} from "@/assets/js/services.js";
let user = null;
export default {
  layout: "auth",
  components: {
    MessageInput,
    MessageList,
    SnackbarView,
    TopicList
  },
  data() {
    return {
      firstMessage: null,
      messageListScrollToBottom: false,
      messages: [],
      notification: "",
      snackbar: false,
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
      this.messages = [];
      this.fetchFirstMessage();
      this.fetchMessages();
    }
  },
  methods: {
    clickTool(tool) {
      this.toolname = tool.name;
    },
    createdTopic(topic) {
      this.topics.push(topic);
      this.notification = `トピック「${topic.name}」を作成しました`;
      console.log("OOO");
      console.log(this.snackbar);
      this.snackbar = true;
      console.log(this.snackbar);
    },
    fetchFirstMessage() {
      const option = {
        where: [
          ["userId", "==", user.id],
          ["topicId", "==", this.topic.id]
        ],
        orderBy: "createdAt",
        limit: 1
      };
      messageService.findOne(option).then(firstMessage => {
        this.firstMessage = firstMessage;
      });
    },
    fetchMessages() {
      const option = {
        where: [
          ["userId", "==", user.id],
          ["topicId", "==", this.topic.id]
        ],
        orderBy: "createdAt desc",
        limit: 10
      };
      if (this.messages.length !== 0) {
        option.startAfter = this.messages[0].id;
      }
      messageService.findAll(option).then(messages => {
        this.messageListScrollToBottom = this.messages.length === 0;
        this.messages = messages.reverse().concat(this.messages);
      });
    },
    fetchTopics() {
      topicUserService
        .findByUserId(user.id)
        .then(topicUsers => {
          const topicIds = topicUsers.map(topicUser => topicUser.topicId);
          return topicService.findByIds(topicIds);
        })
        .then(topics => {
          topics.forEach(topic => {
            topic.class = {};
            topic.style = {};
          });
          this.topics = topics;
        });
    },
    sendMessage(text) {
      messageService.save(this.topic.id, user.id, text);
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
