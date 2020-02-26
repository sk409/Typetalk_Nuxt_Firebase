<template>
  <div>
    <MessageListItem
      v-for="message in messages"
      :key="message.id"
      :message="message"
    ></MessageListItem>
  </div>
</template>

<script>
import MessageListItem from "@/components/MessageListItem.vue";
export default {
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  },
  components: {
    MessageListItem
  }
};
</script>
