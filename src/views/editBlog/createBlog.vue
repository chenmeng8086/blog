<template>
  <contain>
    <span slot="path">
      <BreadcrumbItem>{{ position }}</BreadcrumbItem>
    </span>
    <div class="title">
      <span class="info">标题：</span>
      <Input maxlength="30" v-model="blog.title" show-word-limit placeholder="请输入标题" />
    </div>
    <div class="title">
      <span class="info">简述：</span>
      <Input
        type="textarea"
        maxlength="50"
        v-model="blog.description"
        show-word-limit
        placeholder="请输入描述"
      />
    </div>
    <div class="title">
      <span class="info">标签：</span>
      <a-select v-model="blog.tags" mode="tags" placeholder="请输入标签">
        <a-select-option
          v-for="item in tagList"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</a-select-option>
      </a-select>
    </div>
    <div id="editor"></div>
    <div class="creat-btn">
      <Button slot="back-btn" @click="back">返回</Button>
      <div class="space"></div>
      <Button type="primary" @click="addBlog">保存</Button>
    </div>
  </contain>
</template>

<script>
import E from "wangeditor"; // 使用富文本编辑器
import contain from "@/common-components/contain";
import { addBlog, uPimgUrl } from "@/service";
export default {
  components: { contain },
  data() {
    return {
      position: this.$route.params.position,
      blog: {
        id: "",
        classify: (() => {
          if (this.$route.params.position === "frontend") {
            return "js";
          } else if (this.$route.params.position === "backend") {
            return "python";
          } else {
            return "other";
          }
        })(),
        title: "",
        description: "",
        content: "",
        tags: []
      },
      tagList: [
        {
          value: "javascript",
          label: "javascript"
        },
        {
          value: "python",
          label: "python"
        }
      ],
      selectedTags: []
    };
  },

  mounted() {
    const editor = new E("#editor");
    editor.config.onchange = () => {
      this.blog.content = editor.txt.html();
    };
    editor.config.uploadImgShowBase64 = false;
    editor.config.uploadImgServer = uPimgUrl;
    editor.config.uploadFileName = "image";
    editor.config.height = 500;
    editor.create();
  },

  methods: {
    addBlog() {
      if (this.blog.title && this.blog.description && this.blog.content) {
        addBlog(this.blog)
          .then(res => {
            if (res.status === 200) {
              this.$Message.success({
                background: true,
                content: "创建成功！"
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
    }
  }
};
</script>

<style scoped>
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
}

.space {
  width: 20px;
}

.ant-select {
  width: 100%;
}
</style>