<template>
    <div>
        <div class="send" v-if="message.type==1">
            <div class="send-header">
                <img :src="getFileUrl(sendHeadImg)"/>
            </div>
            <div class="content ">
                <div class="send-content ">
                    <img class="jiao-right" src="../../assets/img/sys/jiao_right.jpg">
                    <div class="message-content">
                        <div v-if="message.messageCategory == 1">
                            <span v-html="message.content"></span>
                        </div>
                        <div v-if="message.messageCategory == 2">
                            <div v-if="message.messageFile===null">
                                <span style="color: red;">文件已失效</span>
                            </div>
                            <div v-else>
                                <div v-if="myUtils.isPictrue(message.messageFile.suffix)">
                                    <img class="content-img" :src="getFileUrl(message.messageFile.url)" @load="imgLoad"
                                         alt="文件过期或失效">
                                </div>
                                <div v-else>
                                    <a target="_blank" style="color: white" :href="getFileUrl(message.messageFile.url)">{{message.messageFile.fileName}}</a>
                                    <span style=""> ( {{myUtils.formatSize(message.messageFile.size)}} )</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="loading" style="float: right" v-show="message.loading"></div>
            </div>
        </div>
        <div class="receive" v-if="message.type==2">
            <div class="receive-header">
                <img :src="getFileUrl(receiveHeadImg)">
            </div>
            <div>
                <div class="receive-content">
                    <img class="jiao-left" src="../../assets/img/sys/jiao_left.jpg">
                    <div class="message-content">
                        <div v-if="message.messageCategory == 1">
                            <span v-html="message.content"></span>
                        </div>
                        <div v-if="message.messageCategory == 2">
                            <div v-if="message.messageFile===null">
                                <span style="color: red;">文件已失效</span>
                            </div>
                            <div v-else>
                                <div v-if="myUtils.isPictrue(message.messageFile.suffix)">
                                    <img class="content-img" :src="getFileUrl(message.messageFile.url)" @load="imgLoad"
                                         alt="文件过期或失效">
                                </div>
                                <div v-else>
                                    <a target="_blank" style="color: blue" :href="getFileUrl(message.messageFile.url)">{{message.messageFile.fileName}}</a>
                                    <span style=""> ( {{myUtils.formatSize(message.messageFile.size)}} )</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "SendContent",
    //type ==1 为发送  type ==2 为接收
    props: ["message", "sendHeadImg", "receiveHeadImg"],
    data() {
      return {
        downloadFile: {
          baseUrl: '/message/loadMessageFile',
          url: '',
          name: '',
          size: 0
        },
        showFileContent: {
          url: '',
          name: '',
          size: 0
        }
      }
    },
    methods: {
      imgLoad() {
        this.$emit("imgLoad");
      }
    },
    computed: {}
  };
</script>

<style scoped>
    .content-img {
        position: relative;
        width: 200px;
        min-height: 100px;
        height: 100%;
    }

    .send-header {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        margin-left: 7px;
        float: right;
    }

    .send-header img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        float: right;
    }


    .send-content {
        max-width: 540px;
        word-wrap: break-word;
        width: auto;
        height: auto;
        font-size: 14px;
        position: relative;
        background: #2683f5;
        padding: 10px 10px;
        border-radius: 10px;
        margin: 4px 4px 4px 4px;
        float: right;
        color: #fff;
    }

    .send-content:after {
        content: "";
        height: 0;
        clear: both;
        overflow: hidden;
        display: block;
        visibility: hidden;
    }

    .send-content .jiao-right {
        position: absolute;
        right: -8px;
        top: 10px;

    }

    .send-content img:after {
        content: url('../../assets/img/app/header.jpg');
        display: block;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
    }

    .send {
        height: 100%;
    }

    .receive-header {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        margin-left: 5px;
        float: left;
    }

    .receive-header img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        float: left;
    }

    .receive-header .jiao-left {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        float: left;
    }

    .receive-content {
        max-width: 540px;
        word-wrap: break-word;
        width: auto;
        height: auto;
        min-height: 40px;
        background: #eee;
        padding: 10px 10px;
        line-height: 20px;
        font-size: 14px;
        border-radius: 10px;
        margin: 4px 4px 4px 12px;
        position: relative;
        float: left;
        color: #000000;
    }

    .receive-content .jiao-left {
        position: absolute;
        left: -8px;
        top: 10px;
    }

    .receive {
        height: 100%;
    }

    .message-content {
        min-height: 15px;
        min-width: 15px;
    }

    .content {
        position: relative;
        margin: 0 auto;
    }

    .loading {
        position: relative;
        top: 14px;
        width: 22px;
        height: 22px;
        border: 2px solid #333;
        border-bottom: #aaa 2px solid;
        border-radius: 50%;
        animation: load-data-v-500638be 1.1s infinite linear;
        -webkit-animation: load-data-v-500638be 1.1s infinite linear;
        -moz-animation: load-data-v-500638be 1.1s infinite linear;
        -o-animation: load-data-v-500638be 1.1s infinite linear;
    }

    @keyframes load {
        from {
            transform: rotate(0deg);
            -ms-transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
            -ms-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes load {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    @-moz-keyframes load {
        from {
            -moz-transform: rotate(0deg);
        }
        to {
            -moz-transform: rotate(360deg);
        }
    }

    @-o-keyframes load {
        from {
            -o-transform: rotate(0deg);
        }
        to {
            -o-transform: rotate(360deg);
        }
    }
</style>