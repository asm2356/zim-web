<template>
    <div>
        <Modal draggable scrollable
               v-model="visible" @on-cancel="close" :z-index="settingIndex"
               width="400" :footer-hide="true" title="设置">
            <Row style="margin-top: 10px;">
                <Col span="5">
                    <img :src="getFileUrl(person.header)" alt="" id="imgHeader" class="header" @click="clickHeader">
                </Col>
                <Col span="19">
                    <Form ref="from" :model="person">
                        <FormItem prop="name">
                            <input type="file" @change="changeHeader" id="imgFile" style="display: none" ref="imgFile">
                            <Input type="text" v-model="person.name" placeholder="昵称">
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input type="text" v-model="person.intro" placeholder="个人介绍">
                            </Input>
                        </FormItem>
                        <FormItem>
                            <div style="width: 100px; margin: 0 auto;">
                                <Button type="primary" @click="handleSubmit">提交</Button>
                            </div>
                        </FormItem>
                    </Form>
                </Col>
            </Row>

        </Modal>
    </div>
</template>

<script>
  export default {
    name: "Setting",
    props: ['settingVisible'],
    data() {
      return {
        visible: false,
        settingIndex: 1005,
        person: {
          name: "",
          intro: "",
          header: ""
        }
      }
    },
    created() {
    },
    methods: {
      handleSubmit() {
        if (this.person.name === '') {
          this.Message.info("请填写昵称");
          return;
        }
        let _this = this;
        this.axios.post("/person/changeInfo", JSON.stringify(this.person))
          .then(function(response) {
            let data = response.data;
            if (data.code === 200) {
              _this.close();
            }
          });
      },
      close() {
        this.$emit("close", false);
      },
      clickHeader() {
        this.$refs.imgFile.click();
      },
      changeHeader() {
        let _this = this;
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        let formData = new FormData();
        let fileDom = document.getElementById("imgFile");
        if (fileDom && fileDom.files.length > 0) {
          let file = fileDom.files[0];
          if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
            this.$Message.info("必须上传的是图片");
            return false;
          }
          formData.append("file", file);
        }
        this.axios.post('/person/changeHeader', formData, config)
          .then(function(response) {
            let data = response.data;
            if (data.code === 200) {
              document.getElementById("imgHeader").src = data.data;
              _this.$set(_this.person, "header", data.data);
            }
          });
      },
      loadPersonInfo() {
        let _this = this;
        this.axios({
          url: "/person/findPersonalInfo",
          method: "post"
        }).then(function(response) {
          let data = response.data;
          if (data.code === 200) {
            data = data.data;
            _this.person = data;
          }
        });
      }
    },
    watch: {
      "settingVisible": function(value) {
        this.visible = value;
        if (value) {
          this.loadPersonInfo();
        }
      }
    }
  }
</script>

<style scoped>
    .header {
        margin: 0 auto;
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border:1px #090707 dashed;
    }
</style>