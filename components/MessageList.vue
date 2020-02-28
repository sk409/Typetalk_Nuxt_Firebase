<template>
  <div ref="messagesContainer" class="overflow-y-auto" @scroll="scroll">
    <div v-show="more" class="pa-3 text-center">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-for="message in messages" :key="message.id">
      <MessageListItem :message="message"></MessageListItem>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
import MessageListItem from "@/components/MessageListItem.vue";
export default {
  props: {
    firstMessage: {
      type: Object,
      default: null
    },
    messages: {
      type: Array,
      default: () => []
    },
    scrollToBottom: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MessageListItem
  },
  computed: {
    more() {
      return (
        this.firstMessage !== null &&
        this.messages.find(message => message.id === this.firstMessage.id) ===
          undefined
      );
    }
  },
  watch: {
    messages(newMessages, oldMessages) {
      const preScrollHeight = this.$refs.messagesContainer.scrollHeight;
      this.$nextTick(() => {
        this.$refs.messagesContainer.scrollTop =
          this.$refs.messagesContainer.scrollHeight - preScrollHeight;
      });
    },
    scrollToBottom(newScrollToBottom) {
      if (!newScrollToBottom) {
        return;
      }
      this.$nextTick(() => {
        this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        this.$emit("update:scrollToBottom", false);
      });
    }
  },
  methods: {
    scroll() {
      if (this.$refs.messagesContainer.scrollTop !== 0) {
        return;
      }
      this.$emit("load-messages");
    }
  }
};
</script>
