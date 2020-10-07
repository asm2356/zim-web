<template>
    <div>
        <Modal draggable scrollable
               v-model="visible" :z-index="addFriendIndex"
               width="500" :footer-hide="true" title="搜索">
            <div class="main">
                <Form :model="formItem" :label-width="80">
                    <FormItem label="备注">
                        <Input v-model="formItem.remarkName" placeholder="备注"></Input>
                    </FormItem>
                    <FormItem label="添加分组">
                        <Select v-model="formItem.groupId">
                            <Option v-for="item in privateGroup" :value="item.id" :key="item.id">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="验证信息">
                        <Input v-model="formItem.verification " type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="我是.."></Input>
                    </FormItem>
                    <FormItem>
                        <div style="width: 200px;margin: 0 auto;">
                            <Button type="primary" @click="addFriend">提交</Button>
                            <Button style="margin-left: 8px" @click="close">取消</Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>

<script>
  import protobuf from "protobufjs";
  import proto from "../../proto/proto";


  export default {
    name: "addFriend",
    props: ["friendId", 'addFriendShow'],
    data() {
      return {
        privateGroup: [],
        visible: false,
        addFriendIndex: 1003,
        formItem: {
          remarkName: "",
          group: "",
          verification: "我是.."
        }
      }
    }, created() {
      this.BaseMessage = proto.protocol.Message;
    },
    mounted() {
    },
    methods: {
      addFriend() {
        let requestContent = {
          remarkName: this.formItem.remarkName,
          groupId: this.formItem.groupId,
          verification: this.formItem.verification
        };
        let obj = {
          id: this.myUtils.getRandomCode(),
          code: 203,
          fromId: this.myUtils.getStore("personId"),
          toId: this.friendId,
          content: JSON.stringify(requestContent),
          sendTime: new Date().getTime(),
          messageType: this.chat.messageType.system,
          chatType: this.chat.chatType.privateChat,
          terminalType: this.chat.terminalType.webSocket,
          protocol: this.chat.protocol.webSocket,
          token: this.myUtils.getCookie("token"),
          data: null
        };
        if (window.mySocket != null) {
          let _this = this;
          this.axios({
            url: "/friend/add",
            method: "post",
            params: {
              personId: this.myUtils.getStore("personId"),
              fromId: this.myUtils.getStore("personId"),
              toId: this.friendId,
              content: this.formItem.verification,
              groupId: this.formItem.groupId,
              remarkName: this.formItem.remarkName,
              sendTime: new Date().getTime()
            }
          }).then(function(response) {
            let data = response.data;
            if (data.code === 200) {
              window.mySocket.send(_this.coverMessage(obj));
              _this.$Message.info("好友发送申请成功")
              _this.close();
            }
          });
        }
      },
      coverMessage(obj) {
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
      close() {
        this.$emit("close", false)
      },
      loadPersonGroup() {
        this.privateGroup = [];
        let _this = this;
        this.axios({
          url: "/group/findPersonGroup",
          method: "post"
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            data = data.data || [];
            data.map(function(item) {
              _this.privateGroup.push(item);
            })
          }
        });
      }
    },
    watch: {
      "addFriendShow": function(value) {
        this.visible = value;
        if (value) {
          this.loadPersonGroup();
        }
      }
    }
  }
</script>

<style scoped>
    .main {
        width: 100%;
    }
</style>