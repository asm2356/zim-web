<template>
    <div>
        <Modal draggable scrollable
               v-model="visible" @on-cancel="close" :z-index="searchFriendIndex"
               width="500" :footer-hide="true" title="搜索">
            <div>
                <Row style="margin-top: 10px;">
                    <Col span="20">
                        <Input v-model="searchInput" placeholder="请输入用户名"></Input>
                    </Col>
                    <Col span="4">
                        <Button @click="searchFriend" style="margin-left: 10px;">搜索</Button>
                    </Col>
                </Row>
                <div class="person-list">
                    <ul v-for="person in personList" :key="person.id">
                        <li style="border-top: 1px dashed #ccbfbc;">
                            <img style="display: inline-block" class="header" :src="getFileUrl(person.header)">
                            <div class="person-intro">
                                <div class="name">{{person.name}}</div>
                                <div class="intro">{{person.intro}}</div>
                            </div>
                            <div class="add-friend">
                                <Button class="btn-add" @click="addFriend(person.id)">添加</Button>
                            </div>
                        </li>
                    </ul>
                </div>
                <add-friend @close="closeAddFriend" :friendId="friendId" :addFriendShow="addFriendShow"/>
            </div>
        </Modal>
    </div>
</template>

<script>
  export default {
    name: "searchFriend",
    props: ["searchDialogVisible"],
    data() {
      return {
        searchInput: "",
        visible: false,
        searchFriendIndex: 1002,
        searchFriendShow: true,
        personList: [],
        addFriendShow: false,
        friendId: ''
      }
    }, created() {
    }
    , methods: {
      close() {
        this.$emit("close", false)
      },
      closeAddFriend() {
        this.addFriendShow = false;
      },
      addFriend(id) {
        let _this = this;
        this.friendId = id;
        this.axios({
          url: "/friend/exit",
          method: "post",
          params: {
            friendId: id
          }
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            _this.addFriendShow = true;
          }
        });
      },
      searchFriend() {
        //搜索好友
        let _this = this;
        this.personList = [];
        _this.axios({
          url: "/person/findPersonByUsername",
          method: "post",
          params: {
            username: _this.searchInput
          }
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            data = data.data;
            if (data != null) {
              _this.personList.push(data);
            }
          }
        })
      }
    }, watch: {
      "searchDialogVisible": function(newValue) {
        this.visible = newValue;
      }
    }
  }
</script>

<style scoped>
    .person-list {
        height: 300px;
        width: 100%;
        border: 1px solid #ccbfbc;
        margin-top: 10px;
        overflow-y: auto;
        margin-bottom: 15px;
    }

    .header {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        margin-left: 10px;
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

    ul li {
        width: 100%;
        padding: 5px;
    }

    ul li:hover {
        background-color: #f5f5f5;
    }

    .add-friend {
        float: right;
        margin-right: 10px;
        margin-top: 10px;
        height: 44px;
        line-height: 44px;
        text-align: center;
    }

    .add-friend .btn-add {
        line-height: 20px;
    }
</style>