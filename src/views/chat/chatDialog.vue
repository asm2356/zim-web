<template>
    <div>
        <Modal
                draggable scrollable
                v-model="visible"
                :z-index="zIndex"
                width="700"
                @on-visible-change="close">
            <div slot="header">
                <div class="title">
                    <span class="remark-name">{{friend.remarkName}}</span>
                    <span v-if="noOnlineState" class="no-online">离线</span>
                    <span v-if="!noOnlineState" class="online">在线</span>
                </div>
            </div>
            <div class="chat-container">
                <input type="file" style="display: none;" id="sendFile" name="file"
                       @change="fileChange">
                <Scroll id="scroll" :on-reach-top="loadMore">
                    <ul class="content clearfix" id="chatContent">
                        <li class="clearfix" v-for="message in messages" :key="message.id">
                            <chat-content :message="message" :sendHeadImg="person.header"
                                          :receiveHeadImg="friend.person.header" @imgLoad="imgLoad"/>
                        </li>
                    </ul>
                </Scroll>
                <div class="tool">
                    <Icon type="ios-copy-outline" class="tool-item" @click="loadFile"/>
                </div>
                <Input maxlength="150" show-word-limit v-model="inputContent" class="chat-textarea" type="textarea"
                       :rows="6"
                       placeholder="请输入..."/>
            </div>
            <div slot="footer">
                <Button type="text" @click="closeDialog">关闭</Button>
                <Button type="primary" @click="send">发送</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
  import $ from "jquery";

  export default {
    name: "my-dialog",
    props: ["toId", "chatDialogVisible", "noOnlineState", "receiveMessage"],
    data() {
      return {
        messageLoading: false,
        visible: false,
        inputContent: "",
        //文本输入最大长度
        contentMaxLength: 200,
        //文件上传大小限制
        fileMaxLength: 1024 * 1024 * 80,
        receiveHeadImg: "",
        person: {
          header: "../../assets/img/app/default.jpg"
        },
        friend: {
          remarkName: "",
          person: {
            header: ""
          }
        },
        messages: [],
        zIndex: 9999,
        personId: this.myUtils.getStore("personId"),
        page: 1
      };
    }, created() {
    }, mounted() {
    },
    methods: {
      /**
       * 图片加载完一个往下滚动一次
       */
      imgLoad() {
        this.scrollBottom();
      },
      loadMore() {
        this.page++;
        this.loadPrivate();
      },
      loadIcon() {

      },
      fileChange() {
        this.inputContent = "@文件";
      },
      sendFile() {
        let files = document.getElementById("sendFile").files;
        if (files.length === 0) {
          return;
        }
        for (let i = 0; i < files.length; i++) {
          let netMessage = this.messageObj;
          netMessage.id = this.myUtils.getRandomCode();
          netMessage.sendTime = new Date().getTime();
          netMessage.messageType = this.chat.messageType.ordinary;
          netMessage.toId = this.toId;
          netMessage.messageCategory = this.chat.messageCategory.file;
          let content = {
            id: netMessage.id,
            type: 1,
            content: "",
            header: this.person.header,
            loading: true,
            messageCategory: netMessage.messageCategory,
            messageFile: null
          };
          let file = files[i];
          if (file.size > this.fileMaxLength) {
            this.$Message.error(file.name + "当前文件" + this.myUtils.formatSize(file.size) + "大于" + this.myUtils.formatSize(this.fileMaxLength));
            continue;
          }
          let formData = new FormData();
          formData.append("file", file);
          const config = {
            headers: { "Content-Type": "multipart/form-data;" }
          };
          let _this = this;
          this.axios.post("/message/uploadMessageFile", formData, config)
            .then(function(response) {
              let data = response.data;
              if (data.code === 200) {
                netMessage.messageFile = data.data;
                content.messageFile = data.data;
                _this.$emit("chatSend", netMessage);
                _this.messages.push(content);
              }
            });
        }
        this.inputContent = "";
        document.getElementById("sendFile").value = "";
      },
      loadFile() {
        document.getElementById("sendFile").click();
      },
      loadPrivate() {
        let _this = this;
        this.axios({
          url: "/message/loadPrivate",
          method: "post",
          params: {
            toId: this.toId,
            page: this.page
          }
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            data = data.data;
            let list = data.records;
            if (list.length === 0) {
              _this.page--;
              return;
            }
            for (let i = 0; i < list.length; i++) {
              if (list[i].personId === list[i].fromId) {
                let message = list[i];
                message.type = 1;
                message.loading = false;
                message.header = _this.person.header;
                _this.messages.unshift(message);
              } else if (list[i].personId === list[i].toId) {
                let message = list[i];
                message.type = 2;
                message.loading = false;
                message.header = _this.friend.person.header;
                _this.messages.unshift(message);
              }
            }
          }
        });
      },
      loadPersonalInfo() {
        let _this = this;
        this.axios({
          url: "/person/findPersonalInfo",
          method: "post"
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            data = data.data;
            _this.person.header = data.header;
          }
        });
      },
      loadFriendInfo() {
        let _this = this;
        this.axios({
          url: "/friend/find",
          method: "post",
          params: {
            friendId: this.toId
          }
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            data = data.data;
            if (data != null) {
              _this.friend.remarkName = data.remarkName;
              _this.friend.person.header = data.person.header;
            }
          }
        });
      },
      scrollBottom() {
        let div = document.getElementsByClassName("ivu-scroll-container")[0];
        if (div) {
          div.scrollTop = div.scrollHeight + 500;
        }
      },
      closeDialog() {
        this.visible = false;
      },
      close(state) {
        this.setPrivateHasRead();
        if (state === false) {
          this.closeDialog();
        }
        this.$emit("close", state);
      },
      setPrivateHasRead() {
        this.axios({
          url: "/message/setPrivateHasRead",
          method: "post",
          params: {
            fromId: this.personId,
            toId: this.toId
          }
        });
      },
      sendText() {
        let netMessage = this.messageObj;
        netMessage.id = this.myUtils.getRandomCode();
        netMessage.sendTime = new Date().getTime();
        netMessage.content = this.inputContent;
        netMessage.messageType = this.chat.messageType.ordinary;
        netMessage.toId = this.toId;
        netMessage.messageCategory = this.chat.messageCategory.text;
        let content = {
          id: netMessage.id,
          type: 1,
          messageCategory: this.chat.messageCategory.text,
          header: this.person.header,
          content: this.inputContent,
          loading: true
        };
        this.$emit("chatSend", netMessage);
        this.messages.push(content);
        this.inputContent = "";
      },
      send() {
        let files = document.getElementById("sendFile").files;
        let length = files.length;
        this.sendFile();
        if (length === 0) {
          this.sendText();
        }
      },
      receive(netMessage) {
        if (netMessage.messageType !== this.chat.messageType.system) {
          let message = netMessage;
          message.type = 2;
          message.header = this.friend.person.header;
          if (netMessage.fromId === this.toId) {
            this.messages.push(message);
          }
        } else {
          if (netMessage.code === 200) {
            let netId = netMessage.id;
            for (let i = this.messages.length - 1; i >= 0; i--) {
              if (this.messages[i].id === netId) {
                this.messages[i].loading = false;
                break;
              }
            }
          }
        }
      }
    },
    updated: function() {
      this.scrollBottom();
    },
    watch: {
      "chatDialogVisible":
        function(newValue) {
          this.messages = [];
          this.visible = this.chatDialogVisible;
          if (newValue) {
            this.loadPrivate();
            this.loadPersonalInfo();
            this.loadFriendInfo();
          }
        }
      ,
      "receiveMessage":
        function(value) {
          this.receive(value);
        }
    }
  }
  ;
</script>
<style scoped>
    .title {
        text-align: center;

    }

    .title .no-online {
        margin-left: 10px;

    }

    .title .online {
        margin-left: 10px;
        color: red;
    }

    .remark-name {

    }

    .content {
        height: 65%;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
    }

    .content li {
        height: auto;
    }

    .tool {
        height: 28px;
        border: 1px solid black;
    }

    .tool-item {
        font-size: 28px;
        cursor: pointer;
    }

    .chat-textarea {
        height: 25%
    }

    .chat-container {
        height: 480px;
        position: relative;
    }

    .clearfix:before,
    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }

</style>