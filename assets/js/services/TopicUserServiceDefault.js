import {
  topicUserRepository
} from "@/assets/js/repositories.js";

export default class TopicUserServiceDefault {

  findByUserId(userId) {
    return topicUserRepository.findByUserId(userId);
  }

  save(topicId, userId) {
    return topicUserRepository.save(topicId, userId);
  }

}
