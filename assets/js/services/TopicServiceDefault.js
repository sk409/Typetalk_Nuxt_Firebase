import {
  topicRepository
} from "@/assets/js/repositories.js";

export default class TopicServiceDefault {

  findByUserId(userId) {
    return topicRepository.findByUserId(userId);
  }

  save(name, userId) {
    return topicRepository.save(name, userId);
  }

}
