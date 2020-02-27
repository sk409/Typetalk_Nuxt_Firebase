<template>
  <div v-if="message">
    <!-- <div>{{ message.user.name }}</div> -->
    <div>{{ message.text }}</div>
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
