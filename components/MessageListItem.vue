<template>
  <div class="message" v-if="message">
    <!-- <div>{{ message.user.name }}</div> -->
    <pre>{{ message.text }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: null
    }
  }
};
</script>

<style>
.message {
  height: 100px;
}
</style>
