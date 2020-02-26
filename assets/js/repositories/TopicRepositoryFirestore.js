import firebase from "firebase";
import FirestoreRepository from "@/assets/js/repositories/FirestoreRepository.js";

const path = "topics";

export default class TopicRepositoryFirestore extends FirestoreRepository {

  findByUserId(userId) {
    return new Promise(resolve => {
      firebase.firestore().collection(path).where("userIds", "array-contains", userId).get().then(snapshot => {
        const topics = [];
        snapshot.forEach(topic => {
          topics.push(this.convert(topic));
        });
        resolve(topics);
      });
    });
  }

  save(name, userId) {
    return new Promise(resolve => {
      const topic = {
        name,
        userIds: [userId]
      };
      firebase
        .firestore()
        .collection(path)
        .add(topic)
        .then(response => {
          topic.id = response.id;
          resolve(topic);
        });
    });
  }

}
