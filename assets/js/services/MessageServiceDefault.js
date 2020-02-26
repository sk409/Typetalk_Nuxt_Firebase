import {
  messageRepository
} from "@/assets/js/repositories.js";

export default class MessageServiceDefault {

  findByTopicId(topicId) {
    return messageRepository.findByTopicId(topicId);
  }

  findByUserId(userId) {
    return messageRepository.findByUserId(userId);
  }

  save(userId, message) {
    return messageRepository.save(userId, message);
  }

}
