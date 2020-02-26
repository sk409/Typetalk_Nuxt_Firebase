import MessageServiceDefault from "@/assets/js/services/MessageServiceDefault.js";
import TopicServiceDefault from "@/assets/js/services/TopicServiceDefault.js";
import UserServiceDefault from "@/assets/js/services/UserServiceDefault.js";

const service = "default";

let messageService = null;
let topicService = null;
let userService = null;
switch (service) {
  case service:
    messageService = new MessageServiceDefault();
    topicService = new TopicServiceDefault();
    userService = new UserServiceDefault();
    break;
}

export {
  messageService,
  topicService,
  userService
}
