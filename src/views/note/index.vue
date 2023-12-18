<template>
  <contain :showSearch="false">
    <Row :wrap="false" class="container-row">
      <Col class="left-list" :xs="9" :sm="8" :md="7" :lg="6" :xl="5" :xxl="4">
        <sping v-if="listLoad"></sping>
        <div style="padding: 0 12px;">
          <Button type="primary" icon="md-add" @click="onAddBlog">新增</Button>
          <Input
            style="margin-top: 12px;"
            search
            placeholder="请搜索"
            @on-enter="e => getBlogList(e.target.value)"
          ></Input>
        </div>

        <List>
          <ListItem
            v-for="(it, index) in blogList"
            :key="index"
            :class="{ 'selected-item': selectedId === it.id }"
          >
            <ListItemMeta @click.native="() => onClickBlogItem(it)" :title="it.title">
              <span slot="avatar">
                <svg
                  t="1609063644144"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="9707"
                  width="32"
                  height="32"
                >
                  <path
                    d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
                    fill="#BDC3C7"
                    p-id="9708"
                  />
                  <path
                    d="M698.254222 773.688889H293.888V250.311111h404.366222a31.061333 31.061333 0 0 1 31.857778 30.151111v463.075556a31.061333 31.061333 0 0 1-31.857778 30.151111z"
                    fill="#6B7082"
                    p-id="9709"
                  />
                  <path
                    d="M301.169778 439.068444h421.546666V584.817778H301.169778z"
                    fill="#FABD6B"
                    p-id="9710"
                  />
                  <path
                    d="M642.844444 573.553778h79.985778v22.755555H642.844444zM301.169778 573.553778h283.534222v22.755555H301.169778zM301.169778 427.690667h283.534222v22.755555H301.169778zM642.844444 427.690667h79.985778v22.755555H642.844444z"
                    fill="#464C63"
                    p-id="9711"
                  />
                  <path
                    d="M642.844444 250.311111v523.377778h-58.140444V250.311111"
                    fill="#E1E1E6"
                    p-id="9712"
                  />
                  <path
                    d="M642.844444 785.066667h-58.140444a11.377778 11.377778 0 0 1-11.377778-11.377778V250.311111a11.377778 11.377778 0 0 1 22.755556 0v512h35.384889V250.311111a11.377778 11.377778 0 0 1 22.755555 0v523.377778a11.377778 11.377778 0 0 1-11.377778 11.377778z"
                    fill="#464C63"
                    p-id="9713"
                  />
                  <path
                    d="M698.254222 785.066667H293.888a11.377778 11.377778 0 0 1-11.377778-11.377778V250.311111a11.377778 11.377778 0 0 1 11.377778-11.377778h404.366222a42.439111 42.439111 0 0 1 43.235556 41.528889v463.075556a42.439111 42.439111 0 0 1-43.235556 41.528889z m-392.988444-22.755556h392.988444a19.683556 19.683556 0 0 0 20.48-18.773333v-463.075556a19.683556 19.683556 0 0 0-20.48-18.773333H305.265778z"
                    fill="#464C63"
                    p-id="9714"
                  />
                </svg>
              </span>
            </ListItemMeta>
            <template slot="action">
              <li class="delete-btn" @click="() => confirmDelete(it.id)">
                <Icon type="md-trash" />
              </li>
            </template>
          </ListItem>
        </List>
      </Col>
      <Col flex="auto" class="right-editor">
        <sping v-if="blogLoad"></sping>
        <Input
          size="large"
          :border="false"
          placeholder="请输入名称"
          v-model="selectedBlog.title"
          @on-change="onTitleChange"
        ></Input>
        <template v-if="showEditor">
          <div id="note-tool-bar"></div>
          <editor
            :hideToolbar="true"
            :onCreated="onEditorCreated"
            :onContentChange="onContentChange"
          />
        </template>
      </Col>
    </Row>
  </contain>
</template>
  
<script>
import contain from '@/common-components/contain.vue';
import editor from '@/common-components/editor.vue';
import sping from '@/common-components/Sping.vue';
import { createToolbar } from '@wangeditor/editor';
import {
  getBlogList,
  getSingleBlog,
  modifyBlog,
  addBlog,
  deleteBlog
} from '@/service';
import { debounce } from '@/utils';

export default {
  name: 'home',
  components: { contain, editor, sping },
  data() {
    return {
      blogList: [],
      listLoad: false,
      blogLoad: false,
      selectedId: null,
      selectedBlog: {},
      editor: null,
      showEditor: true
    };
  },
  mounted() {
    this.getBlogList('', data => {
      if (!data[0]) {
        return;
      }
      this.selectedId = data[0].id;
      this.getBlog(this.selectedId);
    });
  },
  methods: {
    onEditorCreated(editor) {
      this.editor = editor;
      createToolbar({
        editor,
        selector: '#note-tool-bar',
        config: {
          excludeKeys: ['fullScreen']
        },
        mode: 'default'
      });
    },
    getBlogList(searchKey, callback) {
      this.listLoad = true;
      getBlogList({ searchKey })
        .then(res => {
          if (res.status === 200) {
            this.blogList = res.data || [];
            callback(this.blogList);
          }
        })
        .catch(err => {
          this.$Message.error({
            background: true,
            content: err
          });
        })
        .finally(() => {
          this.listLoad = false;
        });
    },
    getBlog(id) {
      this.blogLoad = true;
      this.showEditor = false;
      getSingleBlog({ id })
        .then(res => {
          if (res.status === 200) {
            this.selectedBlog = res.data;
            this.showEditor = true;
            this.$nextTick(() => {
              this.editor.setHtml(this.selectedBlog.content);
            });
          } else {
            this.$Message.error({
              background: true,
              content: res.msg
            });
          }
        })
        .finally(() => {
          this.blogLoad = false;
        });
    },
    onClickBlogItem(item) {
      if (this.selectedBlog.id === item.id) {
        return;
      }
      this.selectedId = item.id;
      this.getBlog(item.id);
    },
    onContentChange(value) {
      if (value === this.selectedBlog.content) {
        return;
      }
      this.selectedBlog.content = value;
      if (!this.selectedId) {
        return;
      }
      this.saveBlog();
    },
    onTitleChange() {
      this.saveBlog();
    },
    saveBlog: debounce(function() {
      modifyBlog(this.selectedBlog)
        .then(res => {
          if (res.status === 200) {
            this.blogList.forEach(it => {
              if (it.id === this.selectedBlog.id) {
                it.title = this.selectedBlog.title;
                it.content = this.selectedBlog.content;
              }
            });
          }
        })
        .catch(err => {
          this.$Message.error({
            background: true,
            content: err
          });
        });
    }, 1000),
    onAddBlog() {
      const blog = {
        title: '无标题笔记',
        content: ''
      };
      addBlog(blog)
        .then(res => {
          if (res.status === 200) {
            this.selectedId = res.data.id;
            this.getBlogList();
            this.getBlog(this.selectedId);
          }
        })
        .catch(err => {
          this.$Message.error({
            background: true,
            content: err
          });
        });
    },
    confirmDelete(id) {
      this.$Modal.confirm({
        title: '删除笔记',
        content: '确定删除？',
        onOk: () => {
          deleteBlog({ id: id })
            .then(res => {
              if (res.status === 200) {
                this.$Message.info({
                  background: true,
                  content: '删除成功！'
                });
                this.getBlogList();
              }
            })
            .catch(err => {
              this.$Message.error({
                background: true,
                content: err
              });
            });
        },
        onCancel: () => {
          this.$Message.info({
            background: true,
            content: '取消删除'
          });
        }
      });
    }
  }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-row {
  height: calc(100vh - 96px);
}

.left-list {
  border-right: 1px solid #f0f0f0;
  position: relative;
  flex-grow: 0;
  padding-right: 10px;
}

.right-editor {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.right-editor #note-tool-bar {
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.ivu-list {
  height: calc(100% - 76px);
  overflow: auto;
}

.selected-item {
  border-radius: 4px;
  background-color: #f0f0f0;
}

.ivu-list-item {
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
}

.ivu-list-item:hover {
  background-color: #f1f1f1;
}

.delete-btn {
  display: none;
}

.ivu-list-item:hover .delete-btn {
  display: block;
}
</style>
<style>
.ivu-list-container {
  height: calc(100% - 57px) !important;
}
</style>