<template>
  <div>
    <v-app-bar app color="primary" dark flat :height="height">
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn icon small v-on="on" class="white primary--text">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>プロジェクトの追加</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 64
    }
  },
  data() {
    return {
      notification: "",
      snackbar: false,
      user: null
    };
  },
  created() {},
  methods: {}
};
</script>