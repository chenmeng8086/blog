<template>
  <div class="container" :style="editorStyle">
    <div
      id="toolbar-container"
      :style="{ display: hideToolbar ? 'none' : 'block', top: fullScreen ? '0' : '48px' }"
    ></div>
    <div id="editor-container"></div>
  </div>
</template>

<script>
import { createEditor, createToolbar } from '@wangeditor/editor';
export default {
  props: {
    onCreated: {
      type: Function,
      default: new Function()
    },
    onContentChange: {
      type: Function,
      default: new Function()
    },
    onBlur: {
      type: Function,
      default: new Function()
    },
    initailHtml: {
      type: String,
      default: () => ''
    },
    readOnly: {
      type: Boolean,
      default: () => false
    },
    hideToolbar: {
      type: Boolean,
      default: () => false
    },
    editorStyle: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      toolbar: null,
      editor: null,
      fullScreen: false
    };
  },
  mounted() {
    const editorConfig = {
      placeholder: this.readOnly ? '' : '请输入...',
      readOnly: this.readOnly,
      onChange: editor => {
        this.onContentChange(editor.getHtml());
      },
      onBlur: () => {
        this.onBlur();
      },
      MENU_CONF: {
        uploadImage: {
          base64LimitSize: 10 * 1024, // 10kb以下走base64
          server: '/api/blog/upload_image',
          maxFileSize: 10 * 1024 * 1024, // 10M
          fieldName: 'file',
          // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
          allowedFileTypes: [],
          timeout: 30 * 1000
        }
      }
    };
    this.editor = Object.seal(
      createEditor({
        selector: '#editor-container',
        html: this.initailHtml,
        config: editorConfig,
        mode: 'default' // or 'simple'
      })
    );
    const toolbarConfig = {};
    window.editor = this.editor;
    this.editor.on('fullScreen', () => {
      this.fullScreen = true;
    });
    this.editor.on('unFullScreen', () => {
      this.fullScreen = false;
    });
    this.toolbar = createToolbar({
      editor: this.editor,
      selector: '#toolbar-container',
      config: toolbarConfig,
      mode: 'default' // or 'simple'
    });
    this.onCreated(this.editor, this.toolbar);
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
.container {
  z-index: 99;
  overflow: auto;
}

#toolbar-container {
  border: 1px #f0f0f0 solid;
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
}

#editor-container {
  min-height: 400px;
}
</style>