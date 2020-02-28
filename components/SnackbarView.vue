<template>
  <v-snackbar :value="visible" @input="input" :timeout="2000" top>
    <span>{{notification}}</span>
    <v-btn icon>
      <v-icon class="white--text">mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    notification: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    input(visible) {
      console.log(visible);
      this.$emit("update:visible", visible);
    }
  }
};
</script>