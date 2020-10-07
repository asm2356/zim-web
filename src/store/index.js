import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    currentChangeGroupId: "",//当前通知变化的个人组
    unReadCount: 0,//未读计数器
    onlinePersonId: "",//上线通知人
    offlinePersonId: ""//下线通知人
  },
  mutations: {
    refreshGroup(state, currentChangeGroupId) {
      state.currentChangeGroupId = currentChangeGroupId;
    },
    noRefreshGroup(state) {
      state.currentChangeGroupId = "";
    },
    increaseUnRead(state) {
      state.unReadCount++;
    },
    online(state, personId) {
      state.onlinePersonId = personId;
    },
    offline(state, personId) {
      state.offlinePersonId = personId;
    }

  },
  actions: {},
  modules: {}
});
