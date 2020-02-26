import firebase from "firebase";
import FirestoreRepository from "@/assets/js/repositories/FirestoreRepository.js";

const base = "messages";
const path = (userId) => `users/${userId}/${base}`;

export default class MessageRepositoryFirestore extends FirestoreRepository {

  findByTopicId(topicId) {
    return new Promise(resolve => {
      firebase.firestore().collectionGroup(base).where("topicId", "==", topicId).get().then(response => {
        // console.log(response);
      });
    });
  }

  findByUserId(userId) {
    return new Promise(resolve => {
      firebase.firestore().collection(path(userId)).get().then(snapshot => {
        const messages = [];
        snapshot.forEach(message => {
          messages.push(this.convert(message));
        });
        resolve(messages);
      });
    });
  }

  save(userId, message) {
    return firebase.firestore().collection(path(userId)).add(message);
  }

  // where(lhs, ops, rhs) {
  //   if (this.query) {
  //     // firebase.firestore().colle
  //     this.query = firebase.firestore().collection(path);
  //   }
  //   this.query = this.query.where(lhs, ops, rhs);
  //   return this;
  // }

  // withUsers() {
  //   this.withUsers = null;
  // }

  // get() {
  //   this.query.get().then(snapshot => {
  //     this.messages = [];
  //     snapshot.forEach(message => {
  //       this.messages.push(this.convert(message));
  //     });
  //   });
  // }

}
