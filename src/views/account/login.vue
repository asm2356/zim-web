<template>
    <div id="login" class="container">
        <Card class="card">
            <Form :model="form">
                <FormItem prop="username">
                    <Input type="text" autocomplete="off" v-model="form.username" placeholder="用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" autocomplete="off" v-model="form.password" placeholder="密码"
                           @keypress.enter.native="handleSubmit">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button class="login" type="primary" @click="handleSubmit">登录</Button>
                    <div class="register">
                        <a @click="goToRegister">没有账号?去注册</a>
                    </div>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: "",
          password: ""
        }
      };
    },
    mounted() {
      this.myUtils.removeStore("personId");
      this.myUtils.removeCookie("token");
    },
    methods: {
      handleSubmit() {
        let _this = this;
        if (this.form.username === "") {
          _this.$Message.error("请输入用户名");
          return;
        }
        if (this.form.password === "") {
          _this.$Message.error("请输入密码");
          return;
        }
        _this.axios({
          url: "/login",
          method: "post",
          params: {
            username: _this.form.username,
            pwd: _this.form.password,
            terminalType:_this.chat.terminalType.webSocket
          }
        }).then((response) => {
          let data = response.data;
          if (data.code === 200) {
            data = data.data;
            _this.personId = data.personId;
            _this.myUtils.setStore("personId", data.personId);
            _this.myUtils.setCookie("token", data.token, data["expireTime"]);
            _this.messageObj.token = data.token;
            _this.$router.push("/");
          }
        });
      },
      goToRegister() {
        this.$router.push({ path: "/register" });
      }
    }
  };
</script>

<style scoped>
    .container {
        height: 100vh;
        /*background-image: url("../../assets/img/app/324593.jpg") ;*/
        background-size: 100% 100%;
    }

    .card {
        width: 300px;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .login {
        width: 100%;
        margin: 0 auto;
    }

    .register {
        text-align: center;
        width: 100%;
        margin-top: 10px;
    }
</style>