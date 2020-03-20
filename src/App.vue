<!-- 思维导图编辑器 -->
<template>
  <div class="app">
      <js-mind :values="mind" :options="options" ref="jsMind" height="1000px"></js-mind>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mind: {
        /* 元数据，定义思维导图的名称、作者、版本等信息 */
        meta: {
          name: "example",
          author: "hizzgdev@163.com",
          version: "0.2"
        },
        /* 数据格式声明 */
        format: "node_array",
        /* 数据内容 */
        data: [
          { id: "root", isroot: true, topic: "jsMind" },

          { id: "easy", parentid: "root", topic: "Easy", direction: "left" },
          { id: "easy1", parentid: "easy", topic: "Easy to show" },
          { id: "easy2", parentid: "easy", topic: "Easy to edit" },
          { id: "easy3", parentid: "easy", topic: "Easy to store" },
          { id: "easy4", parentid: "easy", topic: "Easy to embed" },

          {
            id: "open",
            parentid: "root",
            topic: "Open Source",
            expanded: false,
            direction: "right"
          },
          { id: "open1", parentid: "open", topic: "on GitHub" },
          { id: "open2", parentid: "open", topic: "BSD License" },

          {
            id: "powerful",
            parentid: "root",
            topic: "Powerful",
            direction: "right"
          },
          {
            id: "powerful1",
            parentid: "powerful",
            topic: "Base on Javascript"
          },
          { id: "powerful2", parentid: "powerful", topic: "Base on HTML5" },
          { id: "powerful3", parentid: "powerful", topic: "Depends on you" }
        ]
      },
      options: {},
      mian:{}
    };
  },
  mounted() {
    this.jm= this.$refs.jsMind.jm
  },
};
</script>
<style scoped>
</style>