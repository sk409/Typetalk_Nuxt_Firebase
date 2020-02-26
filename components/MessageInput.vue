<template>
  <div class="d-flex align-center message-input">
    <textarea
      v-model="message"
      class="message-textarea w-100"
      placeholder="Enterで投稿し Shift+Enterで改行します。"
      @keydown.enter="send"
    ></textarea>
    <v-btn color="primary" :disabled="empty" outlined>
      <v-icon>mdi-send</v-icon>
      <span>投稿</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    };
  },
  computed: {
    empty() {
      return this.message.length === 0;
    }
  },
  methods: {
    send() {
      this.$emit("send", this.message);
    }
  }
};
</script>

<style>
.message-input {
  border: 1px solid lightgray;
}
.message-textarea {
  resize: none;
  outline: none;
}
</style>
