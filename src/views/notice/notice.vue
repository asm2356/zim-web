<template>
    <div>
        <Modal draggable scrollable
               v-model="visible" @on-cancel="close" :z-index="noticeIndex"
               width="600" :footer-hide="true" title="通知">
            <div class="container">
                <Tabs>
                    <TabPane label="好友验证" name="person" style="height: 100%;">
                        <Table height="270" stripe :columns="personColumns" :data="personData">
                            <template slot-scope="{ row }" slot="opera">
                                <span v-if="row.agreeState===1">已同意</span>
                                <span v-if="row.agreeState===3 && row.toId!==personId">待验证</span>
                                <Button size="small" v-if="row.agreeState===3 && row.toId===personId"
                                        @click="agree(row)">同意
                                </Button>
                                <Button size="small" v-if="row.agreeState===3 && row.toId===personId"
                                        style="margin-left: 5px"
                                        @click="refuse(row)">拒绝
                                </Button>
                                <span v-if="row.agreeState===2">已拒绝</span>
                            </template>
                        </Table>
                    </TabPane>
                    <TabPane label="群消息">
                    </TabPane>
                </Tabs>
            </div>
        </Modal>
        <Modal draggable
               v-model="selectVisible" :z-index="selectIndex"
               width="300" :footer-hide="true" title="信息">
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
                <FormItem>
                    <div style="width: 100px;margin: 0 auto;">
                        <Button type="primary" @click="addFriend">提交</Button>
                    </div>
                </FormItem>
            </Form>
        </Modal>
        <Modal draggable
               v-model="refuseVisible" :z-index="refuseIndex"
               width="300" :footer-hide="true" title="信息">
            <Form :label-width="80">
                <FormItem label="拒绝原因">
                    <Input v-model="refuseContent" type="textarea" maxlength="10" show-word-limit
                           placeholder="拒绝原因"></Input>
                </FormItem>
                <FormItem>
                    <div style="width: 100px;margin: 0 auto;">
                        <Button type="primary" @click="refuseFriend">提交</Button>
                    </div>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
  export default {
    name: "notice",
    props: ['noticeVisible'],
    data() {
      return {
        privateGroup: [],
        noticeIndex: 1006,
        selectIndex: 1008,
        refuseIndex: 1008,
        visible: false,
        personId: this.myUtils.getStore("personId"),
        currentRow: '',
        selectVisible: false,
        refuseVisible: false,
        refuseContent: '',
        personColumns: [
          {
            title: '昵称',
            key: 'name'
          }, {
            title: '验证信息',
            key: 'content'
          },
          {
            title: '操作',
            slot: 'opera',
            key: 'opera'
          },
        ],
        personData: [],
        formItem: {
          remarkName: "",
          groupId: ""
        }
      }
    }, mounted() {
      this.loadNotice();

    },
    methods: {
      refuseFriend() {
        let _this = this;
        this.axios({
          url: "/friend/refuse",
          method: "post",
          params: {
            id: _this.currentRow.id,
            content: _this.refuseContent
          }
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            _this.refuseVisible = false;
            _this.loadNotice();
          }
        });
      },
      addFriend() {
        if (this.formItem.groupId === '') {
          this.Message.info("请选择分组");
          return;
        }
        let _this = this;
        this.axios({
          url: "/friend/agree",
          method: "post",
          params: {
            id: _this.currentRow.id,
            remarkName: _this.formItem.remarkName,
            groupId: _this.formItem.groupId
          }
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            _this.selectVisible = false;
            _this.loadNotice();
            _this.$store.commit('refreshGroup', _this.formItem.groupId);
          }
        });
      },
      loadPersonGroup() {
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
            });
            _this.selectVisible = false;
          }
        });
      },
      agree(row) {
        this.currentRow = row;
        this.selectVisible = true;
      },
      refuse(row) {
        this.currentRow = row;
        this.refuseVisible = true;
      },
      loadNotice() {
        this.personData = [];
        let _this = this;
        let params = {
          page: 1
        };
        this.axios({
          url: "/friend/loadAddFriendNotice",
          method: "post",
          params: params
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            data = data.data;
            data = data.records;
            for (let i = 0; i < data.length; i++) {
              if (_this.personId === data[i]["fromId"]) {
                _this.personData.push({
                  fromId: data[i]["fromId"],
                  toId: data[i]["toId"],
                  name: data[i]["remarkName"],
                  content: data[i]["content"],
                  agreeState: data[i]["agreeState"]
                })
              } else {
                _this.personData.push({
                  id: data[i]["id"],
                  fromId: data[i]["fromId"],
                  toId: data[i]["toId"],
                  name: data[i]["fromPerson"]["name"],
                  content: data[i]["content"],
                  agreeState: data[i]["agreeState"]
                })
              }
            }
          }
        });
      },
      close() {
        this.$emit("close", false);
      }
    }, watch: {
      "noticeVisible": function(value) {
        this.visible = value;
        if (value) {
          this.loadNotice();
          this.loadPersonGroup();
        }
      }
    }
  }
</script>

<style scoped>
    .container {
        height: 350px;
    }
</style>