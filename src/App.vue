<!-- 思维导图编辑器 -->
<template>
  <div class="app">
    <div>
      <span>编辑：</span>
      <button @click="onMoveUp">移动到最上方</button>
      <button @click="onMoveDown">移动到最下方</button>
      <button @click="onRemoveNode">删除节点</button>
      <button @click="addImageNode">添加图片节点</button>
      <button @click="addNode">添加节点</button>
    </div>
    <div>
      <span>打开：</span>
      <input type='file' accept='text/plain' @change='openLocalFile' ref="input" />
      <button @click="saveLocalFile">保存为本地文件</button>
      <button @click="screenshot">保存为 png 图片</button>
    </div>
    <div>
      <span>风格：</span>
      <button @click="fontSize">字体大小</button>
      <button @click="fontColor">字体颜色</button>
      <button @click="bgColor">背景颜色</button>
      <button @click="bgImage">背景图片</button>
    </div>
    <div>
      <span>主题：</span>
        <select @change="set_theme" v-model="theme_value">
            <option value="">default</option>
            <option value="primary">primary</option>
            <option value="warning">warning</option>
            <option value="danger">danger</option>
            <option value="success">success</option>
            <option value="info">info</option>
            <option value="greensea" selected="selected">greensea</option>
            <option value="nephrite">nephrite</option>
            <option value="belizehole">belizehole</option>
            <option value="wisteria">wisteria</option>
            <option value="asphalt">asphalt</option>
            <option value="orange">orange</option>
            <option value="pumpkin">pumpkin</option>
            <option value="pomegranate">pomegranate</option>
            <option value="clouds">clouds</option>
            <option value="asbestos">asbestos</option>
        </select>
    </div>
    <div>
      <span>调节:</span>
      <button @click='zoomOut' ref="zoomOut">升高</button>
      <button @click='zoomIn' ref="zoomIn">降低</button>
    </div>
    <div>
      <span>选项：</span>
      <button @click='changeOption'>改变布局方向</button>
      设置快捷键添加子项<input @keyup="shortcutSet" :value="shortCutVal" onpaste = "return false"/>
    </div>
    <js-mind :values="mind" :options="options" ref="jsMind" height="1000px"></js-mind>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme_value:'',
      mind: {
        /* 元数据，定义思维导图的名称、作者、版本等信息 */
        meta: {
          name: "example",
          author: "906106844@qq.com",
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
      options: {
        // mode:'side'
      },
      shortCutVal:'',
      keyCode:''
    };
  },
  mounted() {
    this.jm= this.$refs.jsMind.jm
    this.jm.enable_edit()
  },
  methods:{
    addNode(){
      var selected_node = this.jm.get_selected_node(); // as parent of new node
        if(!selected_node){alert('please select a node first.');return;}

        var nodeid = jsMind.util.uuid.newid();
        var topic = 'new Node';
        var node = this.jm.add_node(selected_node, nodeid, topic);
    },
    onMoveUp(){
      var selected_id =this.jm.get_selected_node()
        if(!selected_id){alert('please select a node first.');return;}
        this.jm.move_node(selected_id,'_first_');
    },
    onMoveDown(){
      var selected_id = this.jm.get_selected_node();
        if(!selected_id){alert('please select a node first.');return;}

        this.jm.move_node(selected_id,'_last_');
    },
    onRemoveNode(){
      var selected_id = this.get_selected_nodeid();
      console.log(selected_id)
      if(!selected_id){alert('please select a node first.');return;}
      this.jm.remove_node(selected_id);
    },
    addImageNode(){
      var imageChooser = document.getElementById('image-chooser');
      const _this=this
      imageChooser.addEventListener('change', function (event) {
      // Read file here.
      var reader = new FileReader();
      reader.onloadend = (function () {
            var selected_node = _this.jm.get_selected_node();
            var nodeid = jsMind.util.uuid.newid();
            var topic = undefined;
            var data = {
                "background-image": reader.result,
                "width": "100",
                "height": "100"};
            var node = _this.jm.add_node(selected_node, nodeid, topic, data);
        });

        var file = imageChooser.files[0];
        if (file) {
            reader.readAsDataURL(file);
        };

      }, false);
      var selected_node = this.jm.get_selected_node(); // as parent of new node
      if(!selected_node){
          alert('please select a node first.');
          return;
      }

      imageChooser.focus();
      imageChooser.click();
    },
    openLocalFile(){
        var file_input = this.$refs.input;
        var files = file_input.files;
        const _this=this
        if(files.length > 0){
            var file_data = files[0];
            jsMind.util.file.read(file_data,function(jsmind_data, jsmind_name){
                var mind = jsMind.util.json.string2json(jsmind_data);
                if(!!mind){
                    _this.mind=mind
                    _this.jm.show(mind);
                }else{
                    alert('can not open this file as mindmap');
                }
            });
        }else{
            alert('please choose a file first')
        }
    },
    saveLocalFile(){    
      var mind_data = this.jm.get_data();
      var mind_name = mind_data.meta.name;
      var mind_str = jsMind.util.json.json2string(mind_data);
      jsMind.util.file.save(mind_str,'text/jsmind',mind_name+'.jm');
    },
    fontSize(){
      var selected_id = this.get_selected_nodeid();
      if(!selected_id){alert('please select a node first.');return;}
      this.jm.set_node_font_style(selected_id, 28);
    },
    fontColor(){
      var selected_id = this.get_selected_nodeid();
        if(!selected_id){alert('please select a node first.');return;}
        this.jm.set_node_color(selected_id, null, '#000');
    },
    bgColor(){
      var selected_id = this.get_selected_nodeid();
        if(!selected_id){alert('please select a node first.');return;}

        this.jm.set_node_color(selected_id, '#eee', null);
    },
    bgImage(){
       var selected_id = this.get_selected_nodeid();
        if(!selected_id){alert('please select a node first.');return;}
        this.jm.set_node_background_image(selected_id, 'ant.png', 100, 100);
    },
    set_theme(){
      this.jm.set_theme(this.theme_value);
    },
    zoomOut(){
      if(this.jm.view.zoomOut()){
        this.$refs.zoomOut.disabled = false
      }else{
        this.$refs.zoomOut.disabled = true
      }
    },
    zoomIn(){
     if(this.jm.view.zoomIn()){
        this.$refs.zoomIn.disabled = false
      }else{
        this.$refs.zoomIn.disabled = true
      }
    },
    screenshot(){
      this.jm.screenshot.shootDownload();
    },
    // 获取选中标签的 ID
    get_selected_nodeid(){
        var selected_node = this.jm.get_selected_node();
        if(!!selected_node){
            return selected_node.id;
        }else{
            return null;
        }
    },
    changeOption(){
      this.options={
        mode:'side'
      }
    },
    // 只支持绑定单个按键
    shortcutSet(value){
      if(value.key==='Backspace'||value.key==='Delete'){
        this.shortCutVal=this.shortCutVal.substring(0,this.shortCutVal.lastIndexOf('+'))
        this.keyCode=this.keyCode.substring(0,this.keyCode.lastIndexOf('+'))
        return
      }
      if(this.shortCutVal){
        this.shortCutVal+=' + '
        this.keyCode+='+'
      }
      this.shortCutVal+=value.key
      this.keyCode+=value.keyCode
      console.log('keyCode',this.keyCode)
      this.options={
        shortcut:{
           mapping: {
          // 快捷键映射
            addchild: this.keyCode, 
          }
        }
      }
    }
  }
}
</script>