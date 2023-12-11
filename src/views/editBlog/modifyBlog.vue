<template>
  <editBlog :sping="sping" :preBlog="blog" @modifyBlog="onContentChange">
    <Button slot="back-btn" @click="back">返回</Button>
    <Button slot="submit-btn" type="primary" @click="modify">保存</Button>
  </editBlog>
</template>

<script>
import editBlog from "@/common-components/editBLog";
import { modifyBlog, getSingleBlog } from "@/service";
export default {
  components: { editBlog },
  data() {
    return {
      blog: "",
      sping: true
    };
  },
  mounted() {
    this.getBlog();
  },
  methods: {
    getBlog() {
      let { blogId } = this.$route.params;
      this.sping = true;
      const params = { id: blogId };
      getSingleBlog(params)
        .then(res => {
          if (res.status === 200) {
            this.sping = false;
            this.blog = res.data;
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
      if (this.blog.title && this.blog.description && this.blog.content) {
        modifyBlog(this.blog)
          .then(res => {
            if (res.status === 200) {
              this.$Message.success({
                background: true,
                content: "修改成功！"
              });
              this.$router.go(-1);
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
          content: "内容不能为空！"
        });
      }
    },
    back() {
      this.$router.go(-1);
    },
    onContentChange(value) {
      this.blog = value;
    }
  }
};
</script>

<style>
</style>