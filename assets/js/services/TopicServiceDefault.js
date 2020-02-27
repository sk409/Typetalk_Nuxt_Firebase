import {
  topicRepository
} from "@/assets/js/repositories.js";

export default class TopicServiceDefault {

  findByIds(ids) {
    return topicRepository.findByIds(ids);
  }

  save(name) {
    return topicRepository.save(name);
  }

}
