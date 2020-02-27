import firebase from "firebase";
import RepositoryFirestore from "@/assets/js/repositories/RepositoryFirestore.js";

const path = "topics";

export default class TopicRepositoryFirestore extends RepositoryFirestore {

  findByIds(ids) {
    return new Promise(resolve => {
      if (ids.length === 0) {
        resolve([]);
      }
      firebase.firestore().collection(path).where(firebase.firestore.FieldPath.documentId(), "in", ids).get().then(snapshot => {
        const topics = [];
        snapshot.forEach(topic => {
          topics.push(this.convert(topic));
        });
        resolve(topics);
      });
    });
  }

  save(name) {
    return new Promise(resolve => {
      const topic = {
        name,
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
