<template>
  <v-container>
    <v-card>
      <v-card-title>新規登録</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="name" label="ユーザ名"></v-text-field>
          <v-text-field v-model="email" type="email" label="メールアドレス"></v-text-field>
          <v-text-field v-model="password" autocomplete type="password" label="パスワード"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" class="mx-auto" @click="register">登録</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { userService } from "@/assets/js/services.js";
export default {
  layout: "guest",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      userService
        .registerWithEmailAndPassword(this.email, this.password, this.name)
        .then(response => {
          console.log(response);
          this.$router.push(this.$routes.root);
        });
    }
  }
};
</script>
