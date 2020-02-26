import firebase from "firebase";
import FirestoreRepository from "@/assets/js/repositories/FirestoreRepository.js";

const path = "users";

export default class UserRepositoryFirestore extends FirestoreRepository {

  current() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        firebase.firestore().collection(path).where("uid", "==", user.uid).get().then(snapshot => {
          resolve(this.convert(snapshot.docs[0]));
        });
      });
    });
  }

  save(uid, name, email) {
    const user = {
      uid,
      name,
      email
    }
    return new Promise(resolve => {
      firebase
        .firestore()
        .collection("users")
        .add(user).then(response => {
          user.id = response.id;
          resolve(user);
        });
    });
  }

  registerWithEmailAndPassword(email, password, name) {
    return new Promise(resolve => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          response.user
            .updateProfile({
              displayName: name
            })
          this.save(response.user.uid, name, email).then(user => {
            resolve(user);
          })
        });
    });
  }

}
