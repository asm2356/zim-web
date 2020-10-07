import Vue from "vue";
import Vuex from "vuex";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import "es6-promise/auto";
import myUtils from "./myUtils";
import myGlobal from "./myGlobal";


Vue.config.productiontip = false;
Vue.use(ViewUI);
Vue.use(Vuex);
import ChatContent from "../views/chat/chatContent";
import Contacts from "../views/chat/contacts";
import ChatDialog from "../views/chat/chatDialog";
import SearchFriend from "../views/friend/searchFriend";
import AddFriend from "../views/friend/addFriend";
import FriendManager from "../views/friend/friendManager";
import Notice from "../views/notice/notice";
import Setting from "../views/setting/setting";
import Emotion from "../components/emoji/emotion";
import EditDiv from "../components/EditDiv";

Vue.component("ChatContent", ChatContent);
Vue.component("Contacts", Contacts);
Vue.component("ChatDialog", ChatDialog);
Vue.component("SearchFriend", SearchFriend);
Vue.component("FriendManager", FriendManager);
Vue.component("AddFriend", AddFriend);
Vue.component("Notice", Notice);
Vue.component("Setting", Setting);
Vue.component("Emotion", Emotion);
Vue.component("EditDiv", EditDiv);
// =========================================================
window.mySocket = null;
Vue.filter("timestampToTime", (value) => {
  return myUtils.timestampToTime(value);
});
Vue.filter("timestampToSimpleTime", (value) => {
  return myUtils.timestampToSimpleTime(value);
});
Vue.prototype.personId = "";
Vue.prototype.myGlobal = myGlobal;
Vue.prototype.myUtils = myUtils;
//单位 毫秒 心跳检测
Vue.prototype.heartTime = 59000;
let chat = {
  messageType: {
    ordinary: 1,
    system: 2
  },
  messageCategory: {
    text: 1,
    file: 2
  },
  chatType: {
    groupChat: 1,
    privateChat: 2
  }, terminalType: {
    android: 1,
    webSocket: 2,
    ios: 3
  }, protocol: {
    tcp: "tcp",
    webSocket: "webSocket"
  }
};
Vue.prototype.chat = chat;
Vue.prototype.messageObj = {
  id: myUtils.getRandomCode(),
  code: 200,
  fromId: myUtils.getStore("personId"),
  toId: "",
  content: "",
  sendTime: new Date().getTime(),
  messageType: chat.messageType.system,
  messageCategory: chat.messageCategory.text,
  chatType: chat.chatType.privateChat,
  terminalType: chat.terminalType.webSocket,
  protocol: chat.protocol.webSocket,
  token: myUtils.getCookie("token"),
  data: null,
  messageFile: null
};
Vue.prototype.getFileUrl = function(url) {
  return this.baseUrl + url;
};