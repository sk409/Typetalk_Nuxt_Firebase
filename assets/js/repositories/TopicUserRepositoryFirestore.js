import firebase from "firebase";
import RepositoryFirestore from "./RepositoryFirestore";

const base = "topicUser";
// const path = (topicId) => `topics/${topicId}/${base}`;

export default class TopicUser extends RepositoryFirestore {

  findByUserId(userId) {
    return new Promise(resolve => {
      firebase.firestore().collection(base).where("userId", "==", userId).get().then(snapshot => {
        const members = [];
        snapshot.forEach(member => {
          members.push(this.convert(member));
        });
        resolve(members);
      });
    });
  }

  save(topicId, userId) {
    return new Promise(resolve => {
      const member = {
        topicId,
        userId
      };
      firebase.firestore().collection(base).add(member).then(response => {
        member.id = response.id;
        resolve(member);
      });
    })
  }

}
