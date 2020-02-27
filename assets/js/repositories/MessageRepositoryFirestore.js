import firebase from "firebase";
import RepositoryFirestore from "@/assets/js/repositories/RepositoryFirestore.js";

const base = "messages";

export default class MessageRepositoryFirestore extends RepositoryFirestore {

  findNextMessages(topicId, userId, startAfter, limit) {
    return new Promise(resolve => {
      firebase.firestore().collection(base).where("topicId", "==", topicId).where("userId", "==", userId).orderBy("createdAt", "desc").startAfter(startAfter).limit(limit).get().then(snapshot => {
        const messages = [];
        snapshot.forEach(message => {
          messages.push(this.convert(message));
        });
        resolve(messages);
      });
    });
  }

  findByTopicIdAndUserId(topicId, userId) {
    return new Promise(resolve => {
      firebase.firestore().collection(base).where("topicId", "==", topicId).where("userId", "==", userId).get().then(snapshot => {
        const messages = [];
        snapshot.forEach(message => {
          messages.push(this.convert(message));
        });
        resolve(messages);
      });
    });
  }

  save(topicId, userId, text) {
    return new Promise(resolve => {
      const message = {
        topicId,
        userId,
        text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      firebase.firestore().collection(base).add(message).then(response => {
        message.id = response.id;
        resolve(message);
      });
    });
  }

}
