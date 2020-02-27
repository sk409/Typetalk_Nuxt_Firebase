import MessageRepositoryFirestore from "@/assets/js/repositories/MessageRepositoryFirestore.js";
import TopicRepositoryFirestore from "@/assets/js/repositories/TopicRepositoryFirestore.js";
import TopicUserRepositoryFirestore from "@/assets/js/repositories/TopicUserRepositoryFirestore.js";
import UserRepositoryFirestore from "@/assets/js/repositories/UserRepositoryFirestore.js";

const database = "firebase";

let messageRepository;
let topicRepository;
let topicUserRepository;
let userRepository;
switch (database) {
  case "firebase":
    messageRepository = new MessageRepositoryFirestore();
    topicUserRepository = new TopicUserRepositoryFirestore();
    topicRepository = new TopicRepositoryFirestore();
    userRepository = new UserRepositoryFirestore();
    break
}

export {
  messageRepository,
  topicRepository,
  topicUserRepository,
  userRepository
};
