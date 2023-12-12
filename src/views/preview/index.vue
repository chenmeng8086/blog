<template>
  <contain :sping="sping" class="preview-container">
    <div slot="top-bar" class="top">
      <Button type="info" @click="modifyBlog" style="margin-right: 12px;">编辑</Button>
      <Button @click="back">返回</Button>
    </div>
    <div class="container-box">
      <div class="title">{{ blog.title }}</div>
      <div class="description">内容介绍：{{ blog.description }}</div>
      <div class="tag-box">
        标签：
        <Tag v-for="(el, index) in blog.tags" :key="index">{{ el }}</Tag>
      </div>
      <editor :onCreated="onCreated" :readOnly="true" :hideToolbar="true" />
    </div>
  </contain>
</template>

<script>
import contain from '@/common-components/contain';
import editor from '@/common-components/editor';
import { getSingleBlog } from '@/service';
export default {
  components: { contain, editor },
  data() {
    return {
      blog: {},
      sping: true,
      editor: null
    };
  },
  created() {
    this.getBlog();
  },
  methods: {
    getBlog() {
      this.sping = true;
      let { blogId } = this.$route.params;
      getSingleBlog({ id: blogId })
        .then(res => {
          if (res.status === 200) {
            this.sping = false;
            this.blog = res.data;
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
    back() {
      this.$router.go(-1);
    },
    modifyBlog() {
      let { blogId } = this.$route.params;
      this.$router.push(`/modify/${blogId}`);
    },
    onCreated(editor) {
      this.editor = editor;
    }
  }
};
</script>

<style scoped>
.preview-container {
  background-color: #f5f5f5;
}

.container-box {
  padding: 0 10px 10px 10px;
  max-width: 1000px;
  min-height: 100vh;
  margin: 0 auto;
  border-radius: 12px;

  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}

.title {
  margin: 0 -10px 0 -10px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 20px 12px;
  border-radius: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.description {
  font-size: 16px;
  font-weight: bold;
  color: #464c5b;
  margin-top: 12px;
}
.tag-box {
  margin: 12px 0;
}

.top {
  padding: 12px 24px;
  margin: 0 -24px;
  text-align: right;
  border-bottom: #e8e8e8 1px solid;
}
</style>
