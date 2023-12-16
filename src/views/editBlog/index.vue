<template>
  <contain>
    <div class="editor-con">
      <Input class="title" maxlength="80" v-model="blog.title" show-word-limit placeholder="请输入标题" />
      <Select class="title" v-model="blog.tags" filterable multiple allow-create @on-create="onCreateTag"
        placeholder="请输入标签" @on-change="onTagsChange">
        <Option v-for="item in tagList" :value="item.value" :key="item.value">
          {{ item.label }}
        </Option>
      </Select>
      <editor :onContentChange="onContentChange" :onCreated="onCreated" />
    </div>
    <div class="creat-btn">
      <Button slot="back-btn" @click="back">返回</Button>
      <div class="space"></div>
      <Button type="primary" @click="onSubmit">保存</Button>
    </div>
  </contain>
</template>

<script>
import contain from '@/common-components/contain';
import editor from '@/common-components/editor';
import { addBlog, modifyBlog, getSingleBlog } from '@/service';
export default {
  components: { contain, editor },
  data() {
    return {
      editor: null,
      blog: {
        id: '',
        title: '',
        description: '',
        content: '',
        tags: []
      },
      tagList: [
        {
          value: 'javascript',
          label: 'javascript'
        },
        {
          value: 'python',
          label: 'python'
        }
      ]
    };
  },

  mounted() {
    const { blogId } = this.$route.params;
    if (blogId) {
      this.getBlog(blogId);
    }
  },

  methods: {
    onSubmit() {
      if (this.$route.params.blogId) {
        this.modify();
        return;
      }
      this.addBlog();
    },
    addBlog() {
      if (this.blog.title && this.blog.content) {
        addBlog(this.blog)
          .then(res => {
            if (res.status === 200) {
              this.$Message.success({
                background: true,
                content: '创建成功！'
              });
              this.back();
            }
          })
          .catch(err => {
            this.$Message.error({
              background: true,
              content: err
            });
          });
      } else {
        this.$Message.warning({
          background: true,
          content: '内容不能为空！'
        });
      }
    },
    getBlog(blogId) {
      this.sping = true;
      const params = { id: blogId };
      getSingleBlog(params)
        .then(res => {
          if (res.status === 200) {
            this.sping = false;
            this.blog = res.data;
            this.blog.tags.forEach(el => {
              if (!this.tagList.some(it => it.value === el)) {
                this.tagList.push({
                  label: el,
                  value: el
                });
              }
            });
            this.editor.setHtml(this.blog.content);
          }
        })
        .catch(err => {
          this.sping = false;
          this.$Message.error({
            background: true,
            content: err
          });
        });
    },
    modify() {
      if (this.blog.title && this.blog.content) {
        modifyBlog(this.blog)
          .then(res => {
            if (res.status === 200) {
              this.$Message.success({
                background: true,
                content: '修改成功！'
              });
              this.back();
            }
          })
          .catch(err => {
            this.$Message.error({
              background: true,
              content: err
            });
          });
      } else {
        this.$Message.warning({
          background: true,
          content: '内容不能为空！'
        });
      }
    },
    onContentChange(value) {
      this.blog.content = value;
    },
    back() {
      this.$router.go(-1);
    },
    onCreated(editor) {
      this.editor = editor;
    },
    onCreateTag(value) {
      if (this.tagList.some(it => it.value === value)) {
        return;
      }
      this.tagList.push({
        label: value,
        value
      });
    },
    onTagsChange() {
      if (this.blog.tags.length > 10) {
        this.$Message.error('最多允许设置10个标签');
        this.blog.tags.pop();
      }
    },
  }
};
</script>

<style scoped>
.editor-con {
  margin-top: 40px;
  margin-bottom: 57px;
}

.title {
  margin-bottom: 10px;
}

.info {
  display: inline-block;
  flex-shrink: 0;
  text-align: right;
}

.creat-btn {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;

  padding: 12px 24px;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
}

.space {
  width: 12px;
}

.ant-select {
  width: 100%;
}
</style>