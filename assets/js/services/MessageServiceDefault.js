import { messageRepository } from "@/assets/js/repositories.js";

export default class MessageServiceDefault {
  findOne(option) {
    return messageRepository.findOne(option);
  }

  findAll(option) {
    return messageRepository.findAll(option);
  }

  findNextMessages(topicId, userId, startAfter, limit) {
    return messageRepository.findNextMessages(
      topicId,
      userId,
      startAfter,
      limit
    );
  }

  findByTopicIdAndUserId(topicId, userId) {
    return messageRepository.findByTopicIdAndUserId(topicId, userId);
  }

  save(topicId, userId, text) {
    return messageRepository.save(topicId, userId, text);
  }
}
