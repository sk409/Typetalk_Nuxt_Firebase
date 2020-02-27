import MessageServiceDefault from "@/assets/js/services/MessageServiceDefault.js";
import TopicUserServiceDefault from "@/assets/js/services/TopicUserServiceDefault.js";
import TopicServiceDefault from "@/assets/js/services/TopicServiceDefault.js";
import UserServiceDefault from "@/assets/js/services/UserServiceDefault.js";

const service = "default";

let messageService = null;
let topicService = null;
let topicUserService = null;
let userService = null;
switch (service) {
  case service:
    messageService = new MessageServiceDefault();
    topicService = new TopicServiceDefault();
    topicUserService = new TopicUserServiceDefault();
    userService = new UserServiceDefault();
    break;
}

export {
  messageService,
  topicService,
  topicUserService,
  userService
}
