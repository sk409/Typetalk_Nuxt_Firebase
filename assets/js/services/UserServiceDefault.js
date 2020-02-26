import {
  userRepository
} from "@/assets/js/repositories.js";

export default class UserServiceDefault {

  current() {
    return userRepository.current();
  }

  registerWithEmailAndPassword(email, password, name) {
    return userRepository.registerWithEmailAndPassword(email, password, name);
  }

}
