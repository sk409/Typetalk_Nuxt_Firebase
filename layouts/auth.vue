<template>
  <v-app ref="app">
    <Navbar :height="navbarHeight"></Navbar>
    <v-content :style="contentStyle">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  middleware: "auth",
  components: {
    Navbar
  },
  data() {
    return {
      navbarHeight: 64,
      contentHeight: 0
    };
  },
  computed: {
    contentStyle() {
      return {
        height: this.contentHeight + "px"
      };
    }
  },
  mounted() {
    this.contentHeight = this.$refs.app.$el.clientHeight - this.navbarHeight;
  }
};
</script>
