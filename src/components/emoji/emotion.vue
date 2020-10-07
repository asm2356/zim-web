<template>
    <div>
        <div class="emotion-box" :style="{height: height + 'px',width:width + 'px' }">
            <div class="ly-emotion" v-for="(item, i) in list" :key="i" @click="clickHandler(item)" id="emoji">
                <img :src="require(`../../assets/img/emoji/qq/${(i+1)}.gif`)" alt="">
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      height: {
        type: Number,
        default: 200,
      },
      width: {
        type: Number,
        default: 200,
      }
    },
    data() {
      return {
        list: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮',
          '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢',
          '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕',
          '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑',
          '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓',
          '可怜'],
      }
    },
    methods: {
      clickHandler(i) {
        let emotion = `#${i};`;
        this.$emit('emotion', emotion)
      }
    }
  }
</script>
<style scoped>
    .ly-emotion {
        display: inline-block;
    }

    .ly-emotion img {
        display: inline-block;
        height: 25px;
        width: 25px;
    }

    .emotion-box {
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
        padding: 5px;
        border: 1px solid #b4b4b4;
        overflow: hidden;
        overflow-y: auto;
    }
</style>