<template>
    <div class="edit-div"
         contenteditable="true"
         @input="inputEvent"
    >
        <!--<div id="special">
            <div class="file-download" v-for="file in inputFile" :key="file.id">
                <a>{{file.name}}</a>
            </div>
        </div>-->
    </div>
</template>

<script>
  export default {
    name: "EditDiv",
    props: ['text', 'inputFile'],
    data() {
      return {
        inputContent: ''
      }
    },
    mounted() {
      this.$el.innerHTML = this.text;
    },
    methods: {
      inputEvent(value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style scoped>
    .edit-div {
        position: relative;
        outline: none;
        border: 1px solid #EAECF1;
        padding: 5px 26px 5px 12px;
        border-radius: 2px;
        box-sizing: border-box;
        overflow: auto;
        word-break: break-all;
        user-select: text;
        text-align: left;
    }
</style>