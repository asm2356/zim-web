<template>
    <div>
        <div class="group">
            <Icon type="ios-arrow-forward" @click.stop="show=!show" v-show="!show"/>
            <Icon type="ios-arrow-down" @click.stop="show=!show" v-show="show"/>
            <span class="group-title" @click.stop="show=!show" v-html="title">
            </span>
            <ul v-show="show" v-for="friend in friendList" :key="friend.id">
                <li @dblclick="chat(friend.friendId,friend.noOnlineState)">
                    <div>
                        <img style="display: inline-block" :class="{'no-online':friend.noOnlineState}" class="header"
                             :src="getFileUrl(friend.person.header)" alt="头像">
                        <div class="person-intro">
                            <div class="name">{{friend.remarkName}}</div>
                            <div class="intro">{{friend.person.intro}}</div>
                        </div>
                        <div class="message-count" v-show="friend.countShow">
                            <div class="count">{{friend.unReadCount}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import myUtils from "../../common/myUtils";

    export default {
        name: "contacts",
        props: ['title', "groupId", 'newUnReadId'],
        data() {
            return {
                show: false,
                friendList: [],
                toId: ""
            }
        },
        created() {
            this.friendList = [];
        },
        methods: {
            findPrivateUnReadCount() {
                let _this = this;
                this.axios({
                    url: "/message/findPrivateUnReadCount",
                    method: "post"
                }).then(function (response) {
                    let data = response.data;
                    if (data.code === 200) {
                        data = data.data;
                        for (let i = 0; i < _this.friendList.length; i++) {
                            for (let key in data) {
                                if (_this.friendList[i].friendId === key) {
                                    _this.$set(_this.friendList[i], 'unReadCount', data[key]);
                                    _this.$set(_this.friendList[i], 'countShow', true);
                                    break;
                                }
                            }
                        }
                    }
                });
            },
            chat(id, noOnlineState) {
                this.toId = id;
                for (let i = 0; i < this.friendList.length; i++) {
                    if (this.friendList[i].friendId === id) {
                        this.$set(this.friendList[i], 'countShow', false);
                        this.$set(this.friendList[i], 'unReadCount', 0);
                        break;
                    }
                }
                this.$emit("chatDialog", id, noOnlineState);

            },
            loadFriend(groupId) {
                let _this = this;
                _this.friendList = [];
                _this.axios({
                    url: "/group/findGroupFriend",
                    method: "post",
                    params: {
                        groupId: groupId
                    }
                }).then((response) => {
                    let data = response.data;
                    if (data.code === 200) {
                        data = data.data;
                        for (let i = 0; i < data.length; i++) {
                            data[i].noOnlineState = true;
                            _this.friendList.push(data[i])
                        }
                        _this.getOnlinePersonIds();
                        _this.findPrivateUnReadCount();
                    }
                });
            },
            getOnlinePersonIds() {
                let _this = this;
                _this.axios({
                    url: "/person/getOnlinePersonIds",
                    method: "post",
                    params: {
                        groupId: this.groupId
                    }
                }).then((response) => {
                    let data = response.data;
                    if (data.code === 200) {
                        data = data.data;
                        for (let i = 0; i < data.length; i++) {
                            for (let j = 0; j < this.friendList.length; j++) {
                                if (this.friendList[j].friendId === data[i]) {
                                    this.friendList[j].noOnlineState = false;
                                    break;
                                }
                            }
                        }
                    }
                });
            },
            loadUnReadBod(value) {
                //加载未读小圆点
                for (let i = 0; i < this.friendList.length; i++) {
                    let friend = this.friendList[i];
                    if (friend.friendId === value) {
                        if (!friend.unReadCount || window.isNaN(friend.unReadCount)) {
                            friend.unReadCount = 0;
                        }
                        this.$set(this.friendList[i], 'unReadCount', friend.unReadCount + 1);
                        this.$set(this.friendList[i], 'countShow', true);
                        break;
                    }
                }
            }
        },
        computed: {
            groupChange() {
                return this.$store.state.currentChangeGroupId
            },
            unReadCountState() {
                return this.$store.state.unReadCount
            }, onlinePersonId() {
                return this.$store.state.onlinePersonId;
            }, offlinePersonId() {
                return this.$store.state.offlinePersonId;
            }
        },
        watch: {
            "show": function (expend) {
                if (expend && this.friendList.length === 0) {
                    this.loadFriend(this.groupId);
                }
            }, "groupChange": function (value) {
                if (value != null) {
                    let groupId = this.$store.state.currentChangeGroupId;
                    this.loadFriend(groupId);
                    this.$store.commit('noRefreshGroup');
                }
            },
            "unReadCountState": function (value) {
                this.loadUnReadBod(this.newUnReadId);
            }, "onlinePersonId": function (value) {
                if (value === "") {
                    return;
                }
                for (let i = 0; i < this.friendList.length; i++) {
                    if (this.friendList[i].friendId === value) {
                        let friend = this.friendList[i];
                        friend.noOnlineState = false;
                        this.$set(this.friendList, i, friend);
                        break;
                    }
                }
                this.$store.commit("online", '');
            }, "offlinePersonId": function (value) {
                if (value === "") {
                    return;
                }
                for (let i = 0; i < this.friendList.length; i++) {
                    if (this.friendList[i].friendId === value) {
                        let friend = this.friendList[i];
                        friend.noOnlineState = true;
                        this.$set(this.friendList, i, friend);
                        break;
                    }
                }
                this.$store.commit("offline", '');
            }
        }
    }
</script>

<style scoped>
    .group {
        user-select: none;
        position: relative;
    }

    .group ul {
        position: relative;
        left: 5px;
    }

    .group ul li {
        list-style: none;
        background-color: white;
    }

    .header {
        width: 44px;
        height: 44px;
        border-radius: 50%;
    }

    .person-intro {
        display: inline-block;
        margin-left: 10px;
        position: relative;
    }

    .name {
        font-size: 1.5em;
        color: black;
    }

    .intro {
        position: relative;
        bottom: 5px;
    }

    ul li:hover {
        background-color: #f5f5f5;
    }

    .no-online {
        -webkit-filter: grayscale(100%);
    }

    .message-count {
        float: right;
        position: relative;
        right: 10px;
        top: 15px;
        height: 44px;
        line-height: 44px;
        text-align: center;
    }

    .message-count .count {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: red;
        color: white;
        line-height: 20px;
        font-size: 12px;
    }

</style>