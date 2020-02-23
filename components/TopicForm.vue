<template>
  <v-card class="pb-3">
    <v-card-title>新規トピック作成</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="name" :rules="nameRules" label="トピック"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :loading="loading" class="mx-auto" @click="create">作成</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase";
let user = null;
export default {
  data() {
    return {
      loading: false,
      name: "",
      nameRules: [v => !!v || "トピック名を入力してください"]
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(u => {
      user = u;
    });
  },
  methods: {
    create() {
      firebase
        .firestore()
        .collection("topics")
        .add({
          name: this.name
        })
        .then(response => {
          const topicId = response.id;
          firebase
            .firestore()
            .collection("topicUser")
            .add({
              topicId,
              userId: user.uid
            })
            .then(response => {
              this.$emit("created", topicId);
            });
        });
    }
  }
};
</script>