<template>
    <div>
        <Input v-model="inputValue"/>
        <Button @click="getChannelTokens()">getChannelTokens</Button>
        <Button @click="initSocket">initSocket</Button>
        <Button @click="login">loginWebSocket</Button>
        <Button @click="getCurrentToken">getToken</Button>
        <Button @click="removeChannel">removeChannel</Button>
    </div>
</template>

<script>
  import protobuf from "protobufjs";
  import proto from "../../proto/proto";


  export default {
    name: "systemManage",
    data() {
      return {
        inputValue: '192.168.52.1'
      }
    },
    created() {
      this.BaseMessage = proto.protocol.Message;
    },
    methods: {
      getChannelTokens() {
        this.axios({
          url: "/channel/getChannelTokens",
          method: "post"
          // ,params: {
          //   ip: this.inputValue
          // }
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            data = data.data;
            console.log(data);
          }
        })
      },
      login() {
        console.log("登录中...");
        let obj = this.messageObj;
        obj.id = this.myUtils.getRandomCode();
        obj.messageType = this.chat.messageType.system;
        obj.code = 202;
        obj.fromId = this.myUtils.getStore("personId");
        obj.sendTime = new Date().getTime();
        obj.token = this.myUtils.getCookie("token");
        window.mySocket.send(this.coverMessage(obj));
        this.loginCount++;
      }, coverMessage(obj) {
        if (!this.BaseMessage) {
          return;
        }
        let message = this.BaseMessage.create(obj);
        let errMsg = this.BaseMessage.verify(message);
        if (errMsg) {
          console.log("error" + errMsg);
          throw Error(errMsg);
        }
        return this.BaseMessage.encode(message).finish();
      },
      getCurrentToken() {
        console.log(this.myUtils.getCookie("token"));
      },
      removeChannel() {
        this.axios({
          url: "/channel/remove",
          method: "post",
          params: {
          }
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            data = data.data;
            console.log(data);
          }
        })
      },
      initSocket() {
        let _this = this;
        if (!window.WebSocket) {
          this.$Message.error("不支持websocket");
          return;
        }
        if (!window.mySocket) {
          window.mySocket = new WebSocket(this.webSocketUrl);
        }
        window.mySocket.onmessage = function(event) {
          if (event.data instanceof ArrayBuffer) {
            console.log("二进制数据");
          } else {
            console.log("普通文本数据");
          }
        };
        //连接建立的回调函数
        window.mySocket.onopen = function(event) {
          console.log("建立连接");
          _this.login();
        };
        window.mySocket.onclose = function(event) {
          console.log("连接断开");
          if (_this.loginCount > 4) {
            console.log("尝试三次登录失败");
          } else {
            _this.login();
          }
        };
        window.onbeforeunload = function() {
          window.mySocket.close();
        };
      }
    }
  }
</script>

<style scoped>

</style>