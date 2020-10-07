<template>
    <div>
        <Modal
                draggable scrollable
                v-model="visible"
                width="300" :footer-hide="true">
            <div slot="header" style="" class="title">
                <img :src="getFileUrl(person.header)" class="header">
                <div class="" style="height: 40px;float: left;margin-left: 10px;">
                    <div style="margin-top: 5px;">{{person.name}}</div>
                    <div style="margin-top: 5px;">{{person.intro}}</div>
                </div>

            </div>
            <div class="container">
                <Tabs style="">
                    <TabPane label="联系人" name="personList" class="person-list-tab">
                        <div class="person-list">
                            <contacts :newUnReadId="newUnReadId" @chatDialog="chatDialog" v-for="group in groupList"
                                      :key="group.id"
                                      :groupId="group.id"
                                      :title="group.name"/>
                        </div>
                    </TabPane>
                    <TabPane label="群列表" name="name2">
                    </TabPane>
                </Tabs>
                <div>
                    <Row>
                        <Col span="4">
                            <Badge dot :count="noticeCount">
                                <Icon type="md-volume-up" class="footer-icon" @click="notice"/>
                            </Badge>
                        </Col>
                        <Col span="4">
                            <Badge :count="otherNotice">
                                <Icon type="ios-add-circle-outline" class="footer-icon"
                                      @click="searchDialogVisible = true"/>
                            </Badge>
                        </Col>
                        <Col span="4">
                            <Badge :count="otherNotice">
                                <Icon type="md-outlet" class="footer-icon" @click="friendMangerVisible = true"/>
                            </Badge>
                        </Col>
                        <Col span="4">
                            <Badge :count="otherNotice">
                                <Icon type="md-settings" class="footer-icon" @click="settingVisible = true"/>
                            </Badge>
                        </Col>
                        <Col span="4">
                            <Badge :count="otherNotice">
                                <Icon type="ios-log-in" class="footer-icon" @click="loginOut"/>
                            </Badge>

                        </Col>
                        <Col span="4">
                            <Badge :count="otherNotice">
                                <Icon type="ios-information-circle-outline" class="footer-icon" @click="info"/>
                            </Badge>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
        <chat-dialog @chatSend="chatSend"
                     :receiveMessage="receiveMessage"
                     @close="closeChatDialog"
                     :noOnlineState="noOnlineState"
                     :chatDialogVisible="chatDialogVisible"
                     :to-id="chatToId"/>
        <search-friend @close="closeSearchFriend" :searchDialogVisible="searchDialogVisible"/>
        <friend-manager @close="closeFriendManager" :friendMangerVisible="friendMangerVisible"/>
        <notice @close="closeNotice" :noticeVisible="noticeVisible"/>
        <setting :settingVisible="settingVisible" @close="closeSetting"/>
    </div>
</template>

<script>
    import protobuf from "protobufjs";
    import proto from "../../proto/proto";
    import Setting from "../setting/setting";

    export default {
        name: "list",
        data() {
            return {
                chatDialogVisible: false,
                noticeVisible: false,
                searchDialogVisible: false,
                friendMangerVisible: false,
                settingVisible: false,
                otherNotice: 0,
                visible: true,
                groupList: [],
                noOnlineState: false,
                chatToId: "",
                newUnReadId: null,//新的未读通知好友Id
                person: {
                    name: " ",
                    intro: " ",
                    header: "",
                },
                receiveMessage: null,
                BaseMessage: null,
                noticeCount: 0,
                loginCount: 0
            }
        },
        created() {
            this.groupList = [];
            this.BaseMessage = proto.protocol.Message;
            this.initSocket();
            //this.heartCheck();
        },
        mounted() {
            this.loadPersonInfo();
            this.loadPersonGroup();
        },
        methods: {
            reLogin() {
                if (this.loginCount > 4) {
                    console.log("尝试三次登录失败");
                    this.$router.push("/login")
                } else {
                    setTimeout(function () {
                        console.log("开始重新连接");
                        this.initSocket();
                    }, 2000);
                }
            },
            closeSearchFriend(value) {
                this.searchDialogVisible = value;
            },
            closeFriendManager(value) {
                this.friendMangerVisible = value;
                this.loadPersonGroup();
            },
            closeNotice() {
                this.noticeVisible = false;
            },
            closeSetting() {
                this.settingVisible = false;
                this.loadPersonInfo();
            },
            closeChatDialog(value) {
                this.chatDialogVisible = value;
            },
            notice() {
                this.noticeCount = 0;
                this.noticeVisible = true;
            },
            loginOut() {
                let _this = this;
                this.axios({
                    url: "/loginOut",
                    method: "post"
                }).then(function (response) {
                    let data = response.data;
                    if (data.code === 200) {
                        window.mySocket = null;
                        clearInterval(_this.serverHeart);
                        _this.$router.push("/login")
                    }
                })
            },
            info() {
            },
            chatDialog(toId, noOnlineState) {
                this.chatToId = toId;
                this.chatDialogVisible = true;
                this.noOnlineState = noOnlineState;
            },
            loadPersonInfo() {
                let _this = this;
                this.axios({
                    url: "/person/findPersonalInfo",
                    method: "post"
                }).then(function (response) {
                    let data = response.data;
                    if (data.code === 200) {
                        data = data.data;
                        _this.person = data;
                    }
                });
            },
            loadPersonGroup() {
                let _this = this;
                _this.groupList = [];
                this.axios({
                    url: "/group/findPersonGroup",
                    method: "post"
                }).then(function (response) {
                    let data = response.data;
                    if (data.code === 200) {
                        data = data.data;
                        for (let i = 0; i < data.length; i++) {
                            _this.groupList.push(data[i])
                        }
                    }
                });
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
            heartCheck() {
                //心跳检测避免nginx超时断开
                let _this = this;
                this.serverHeart = setInterval(function () {
                    let obj = _this.messageObj;
                    obj.id = _this.myUtils.getRandomCode();
                    obj.messageType = _this.chat.messageType.system;
                    obj.code = 207;
                    obj.fromId = _this.myUtils.getStore("personId");
                    obj.sendTime = new Date().getTime();
                    obj.token = _this.myUtils.getCookie("token");
                    window.mySocket.send(_this.coverMessage(obj));
                }, _this.heartTime)
            },
            login() {
                let obj = this.messageObj;
                obj.id = this.myUtils.getRandomCode();
                obj.messageType = this.chat.messageType.system;
                obj.code = 202;
                obj.fromId = this.myUtils.getStore("personId");
                obj.sendTime = new Date().getTime();
                obj.token = this.myUtils.getCookie("token");
                console.log("开始登录");
                window.mySocket.send(this.coverMessage(obj));
                this.loginCount++;
            },
            initSocket() {
                /**
                 * Socket.readyState，0 - 表示连接尚未建立，1 - 表示连接已建立，可以进行通信，
                 * 2 - 表示连接正在进行关闭，3 - 表示连接已经关闭或者连接不能打开
                 **/
                let _this = this;
                if (!window.WebSocket) {
                    this.$Message.error("不支持websocket");
                    return;
                }
                if (!window.mySocket || window.mySocket.readyState === 3) {
                    window.mySocket = new WebSocket(this.webSocketUrl);
                }
                window.mySocket.onmessage = function (event) {
                    if (event.data instanceof ArrayBuffer) {
                        console.log("二进制数据");
                    } else {
                        console.log("普通文本数据");
                    }
                    let receiveReader = new FileReader();
                    receiveReader.readAsArrayBuffer(event.data);
                    receiveReader.onload = function () {
                        let buf = new Uint8Array(receiveReader.result);
                        let message = _this.BaseMessage.decode(buf);
                        _this.messageReceive(message);
                    };
                };
                window.mySocket.onopen = function (event) {
                    console.log("建立连接");
                    _this.login();
                };
                window.mySocket.onclose = function (event) {
                    console.log("连接断开");
                    // _this.reLogin();
                };
                window.onbeforeunload = function () {
                    window.mySocket.close();
                };
            },
            messageReceive(netMessage) {
                this.receiveMessage = netMessage;
                if (netMessage.messageType === this.chat.messageType.system) {
                    if (netMessage.code === 201) {
                        console.log("登录成功");
                        this.loginCount = 0;
                    } else if (netMessage.code === 206) {
                        console.log("登录失败");
                        this.loginCount++;
                    } else if (netMessage.code === 203) {
                        console.log("好友请求");
                    } else if (netMessage.code === 204) {
                        console.log("上线通知");
                        this.$store.commit("online", netMessage.fromId);
                    } else if (netMessage.code === 205) {
                        console.log("下线通知");
                        this.$store.commit("offline", netMessage.fromId);
                    } else if (netMessage.code === 206) {
                        console.log("登录失败")
                    } else if (netMessage.code === 207) {
                        console.log("心跳检测")
                    } else if (netMessage.code === 208) {
                        console.log("账号冲突被迫下线");
                        this.$Message.info("账号冲突被迫下线");
                        this.$router.push("/login");
                    } else if (netMessage.code === 209) {
                        console.log("正常下线");
                        this.$router.push("/login");
                    }
                } else {
                    let fromId = netMessage.fromId;
                    if (!(fromId === this.chatToId && this.chatDialogVisible)) {
                        console.log("未读通知来了");
                        this.newUnReadId = fromId;
                        this.$store.commit("increaseUnRead");
                    }
                }
            },
            chatSend(netMessage) {
                window.mySocket.send(this.coverMessage(netMessage));
            }
        },
        computed: {
            title: function () {
                return this.person.name + this.person.intro;
            }
        },
        watch: {}
    }
</script>
<style>
    .ivu-modal-body {
        padding-top: 0;
        padding-bottom: 0;
    }
</style>
<style scoped>

    .title {
        height: 40px;
        width: 100%;
    }

    .header {
        height: 40px;
        width: 40px;
        float: left;
        border-radius: 50%;

    }


    .footer-icon {
        margin: 0 auto;
        width: 100%;
        font-size: 22px;
        cursor: pointer;
    }

    .container {
        height: 490px;
    }

    .person-list-tab {
        height: 100%;
    }

    .person-list {
        overflow-x: hidden;
        overflow-y: auto;
        height: 410px;
    }


</style>