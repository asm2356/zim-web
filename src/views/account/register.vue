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
                    <Input type="password" autocomplete="off" v-model="form.password1" placeholder="密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" autocomplete="off" v-model="form.password2" placeholder="密码" @keypress.enter.native="handleSubmit">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button class="register" type="primary" @click="handleSubmit">注册</Button>
                    <div class="login">
                        <a @click="goToLogin">已有账号?去登录</a>
                    </div>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        form: {
          username: "",
          password1: "",
          password2: ""
        }
      };
    },
    methods: {
      handleSubmit() {
        let _this = this;
        if (_this.form.username === "") {
          _this.$Message.error("请输入用户名");
          return;
        }
        if (_this.form.password1 === "") {
          _this.$Message.error("请输入密码");
          return;
        }
        if (_this.form.password2 === "") {
          _this.$Message.error("请再次输入密码");
          return;
        }
        if (_this.form.password1 !== _this.form.password2) {
          _this.$Message.error("两次密码输入不一致");
        } else {
          _this.axios({
            url: "/register",
            method: "post",
            params: {
              username: _this.form.username,
              pwd: _this.form.password1
            }
          }).then((response) => {
            var data = response.data;
            if (data.code === 200) {
              _this.$Message.success("注册成功");
            }
          });
        }
      },
      goToLogin() {
        this.$router.push("login")
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

    .register {
        width: 100%;
        margin: 0 auto;
    }

    .login {
        text-align: center;
        width: 100%;
        top: 10px;
        position: relative;
    }
</style>