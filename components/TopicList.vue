<template>
  <div>
    <div class="align-center d-flex toolbar">
      <v-btn icon small class="ml-auto white">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon small class="ml-2 mr-2 white">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <div
      v-for="topic in topics"
      :key="topic.id"
      :style="topic.style"
      class="pa-2 text-center"
      @click="clickTopic(topic)"
    >
      <span class="subtitle-1">{{topic.name}}</span>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      topic: null,
      topics: []
    };
  },
  created() {
    console.log(this.$vuetify);
    this.fetchTopics();
  },
  methods: {
    clickTopic(topic) {
      if (this.topic) {
        this.topic.class = "topic";
        this.topic.style = {};
      }
      topic.class = "active-topic";
      topic.style = {
        background: "white",
        "border-top": "1px solid rgb(200, 200, 200)",
        "border-bottom": "1px solid rgb(200, 200, 200)",
        "border-left": `4px solid ${this.$vuetify.theme.currentTheme.primary}`,
        color: this.$vuetify.theme.currentTheme.primary
      };
      this.topic = topic;
    },
    fetchTopics() {
      firebase.auth().onAuthStateChanged(user => {
        firebase
          .firestore()
          .collection("topicUser")
          .where("userId", "==", user.uid)
          .get()
          .then(snapshot => {
            if (snapshot.size === 0) {
              return;
            }
            const topicIds = [];
            snapshot.forEach(topicUser =>
              topicIds.push(topicUser.data().topicId)
            );
            return firebase
              .firestore()
              .collection("topics")
              .where(firebase.firestore.FieldPath.documentId(), "in", topicIds)
              .get();
          })
          .then(snapshot => {
            if (!snapshot) {
              return;
            }
            snapshot.forEach(topic => {
              const data = topic.data();
              data.class = "topic";
              data.style = {};
              this.topics.push(data);
            });
          });
      });
    }
  }
};
</script>

<style>
.toolbar {
  height: 53px;
}
.topic:hover {
  background: rgb(235, 229, 228);
}
</style>