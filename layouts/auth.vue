<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
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
  }
};
</script>
