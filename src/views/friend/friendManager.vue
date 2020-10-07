<template>
    <div>
        <Modal draggable scrollable
               v-model="visible" @on-cancel="close" :z-index="zIndex"
               width="800" :footer-hide="true" title="好友管理">
            <div class="main">
                <Row>
                    <Col push="6" span="12">
                        <ButtonGroup>
                            <Button @click="showAddGroup">添加分组</Button>
                            <Button @click="removeGroup">删除分组</Button>
                        </ButtonGroup>
                    </Col>
                    <Col push="3" span="9">
                        <Input/>
                    </Col>
                </Row>
                <Row style="margin-top: 10px;">
                    <Col span="6">
                        <RadioGroup v-model="groupId" @on-change="groupChange">
                            <Radio v-for="group in groupList" class="private-group" :class="group.class"
                                   :label="group.id" :key="group.id">
                                <span>{{group.name}}</span>
                            </Radio>
                        </RadioGroup>
                    </Col>
                    <Col span="18">
                        <div>
                            <Table stripe :columns="columns" :data="friendList" height="250">
                                <template slot-scope="{ row }" slot="groupName">
                                    <Dropdown trigger="click">
                                        <a href="javascript:void(0)">
                                            <span v-html="row.groupName"></span>
                                            <Icon type="ios-arrow-down"></Icon>
                                        </a>
                                        <DropdownMenu slot="list">
                                            <DropdownItem @click.native="selectGroup(group.id,row)" :name="group.id"
                                                          v-for="group in groupList"
                                                          :label="group.id" :key="group.id">
                                                <span>{{group.name}}</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </template>
                                <template slot-scope="{ row }" slot="opera">
                                    <Button type="error" size="small" @click="removeFriend(row)">删除</Button>
                                    <Button type="info" style="margin-left: 5px;" size="small"
                                            @click="modifyRemarkName(row)">修改备注
                                    </Button>
                                </template>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
        <Modal draggable scrollable
               v-model="addGroupVisible" :z-index="addGroupIndex"
               width="400" :footer-hide="true" title="好友分组">
            <Input v-model="newGroupName" placeholder="请输入好友分组" style="margin-top: 5px;"/>
            <div style="width: 100px;margin: 8px auto 0;padding: 10px;">
                <Button type="primary" style="width: 100%;" @click="addGroup">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
  export default {
    name: "friendManager",
    props: ['friendMangerVisible'],
    data() {
      return {
        visible: false,
        addGroupVisible: false,
        zIndex: 1004,
        addGroupIndex: 1005,
        groupId: '',
        single: true,
        friendList: [],
        groupList: [],
        groupMap: {},
        newGroupName: '',
        columns: [
          {
            title: '账号',
            key: 'name',
            width: 120
          },

          {
            title: '备注',
            key: 'remarkName',
            width: 140
          }, {
            title: '分组',
            key: 'groupName',
            slot: 'groupName',
            width: 100
          },
          {
            title: '操作',
            slot: 'opera',
            key: 'opera',
            width: 180
          }
        ]
      }
    }, mounted() {
    }, methods: {
      close() {
        this.$emit("close", false)
      },
      selectGroup(newGroupId, row) {
        let _this = this;
        let friendId = row.personId;
        _this.axios({
          url: "/friend/move",
          method: "post",
          params: {
            groupId: newGroupId,
            friendId: friendId
          }
        }).then((response) => {
          let data = response.data;
          if (data.code === 200) {
            _this.loadFriend();
          }
        })
      },
      removeFriend(row) {
        let _this = this;
        let friendId = row.personId;
        this.axios({
          url: "/group/removeFriend",
          method: "post",
          params: {
            friendId: friendId
          }
        }).then((response) => {
          let data = response.data;
          if (data.code === 200) {
            _this.loadFriend();
          }
        })
      },

      modifyRemarkName(row) {
        let _this = this;
        this.axios.post("/group/modifyRemarkName", { friendId: row.friendId })
          .then((response) => {
            let data = response.data;
            if (data.code === 200) {
              _this.loadFriend();
            }
          });

      },
      removeGroup() {
        let _this = this;
        _this.axios({
          url: "/group/removeFriendGroup",
          method: "post",
          params: {
            groupId: _this.groupId
          }
        }).then((response) => {
          let data = response.data;
          if (data.code === 200) {
            _this.loadPersonGroup();
          }
        })
      },
      addGroup() {
        if (this.newGroupName === '') {
          this.$Message.error("请输入新的分组名");
          return;
        }
        let _this = this;
        this.axios({
          url: "/group/addPersonGroup",
          method: "post",
          params: {
            name: this.newGroupName
          }
        }).then((response) => {
          let data = response.data;
          if (data.code === 200) {
            _this.groupList.push(data.data);
            _this.$Message.info("添加成功");
            _this.addGroupVisible = false;
          }
        });
      },
      showAddGroup() {
        this.addGroupVisible = true;
      },
      loadFriend() {
        let _this = this;
        this.friendList = [];
        _this.axios({
          url: "/group/findGroupFriend",
          method: "post",
          params: {
            groupId: _this.groupId
          }
        }).then((response) => {
          let data = response.data;
          if (data.code === 200) {
            data = data.data || [];
            for (let i = 0; i < data.length; i++) {
              _this.friendList.push({
                name: data[i].person.name,
                groupName: _this.groupMap[data[i]["friendGroupId"]],
                groupId: data[i]["friendGroupId"],
                remarkName: data[i].remarkName,
                personId: data[i].friendId
              });
            }
          }
        });
      },
      groupChange() {
        this.loadFriend();
      },
      loadPersonGroup() {
        let _this = this;
        _this.groupList = [];
        this.axios({
          url: "/group/findPersonGroup",
          method: "post"
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            data = data.data;
            if (data != null) {
              for (let i = 0; i < data.length; i++) {
                _this.groupList.push(data[i]);
                _this.groupMap[data[i].id] = data[i].name;
              }
            }
          }
        });
      }
    }, watch: {
      "friendMangerVisible": function(value) {
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
        margin: 10px;
        width: 100%;
        height: 300px;
    }

    ul li {

    }

    .private-group {
        height: 30px;
        line-height: 30px;
        width: 100%;
        list-style: none;
        background-color: white;
    }

    .private-group:hover {
        background-color: #eeeeee;
    }


    .active {
        background-color: #2683f5;
    }
</style>