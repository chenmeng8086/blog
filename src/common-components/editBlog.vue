<template>
  <contain :sping="sping">
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
        maxlength="100"
        v-model="blog.description"
        show-word-limit
        placeholder="请输入描述"
      />
    </div>
    <div class="title tag-box">
      <span class="info">标签：</span>
      <a-select v-model="blog.tags" mode="tags" placeholder="请输入或选择标签">
        <a-select-option
          v-for="item in tagList"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</a-select-option>
      </a-select>
    </div>
    <div id="editor"></div>
    <div class="edit-btn">
      <slot name="back-btn"></slot>
      <div class="space"></div>
      <slot name="submit-btn"></slot>
    </div>
  </contain>
</template>

<script>
import E from "wangeditor"; // 使用富文本编辑器
import contain from "@/common-components/contain";
import { uPimgUrl } from "@/service";
export default {
  components: { contain },
  props: ["preBlog", "sping"],
  data() {
    return {
      editor: new Object(),
      blog: new Object(),
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
  watch: {
    blog: {
      deep: true,
      handler() {
        this.$emit("modifyBlog", this.blog);
      }
    },
    preBlog() {
      this.blog = this.preBlog;

      const tagsVal = this.tagList.map(it => it.value);
      this.preBlog.tags.forEach(ele => {
        if (!tagsVal.includes(ele)) {
          this.tagList.push({
            value: ele,
            label: ele
          });
        }
      });

      this.editor.txt.html(this.blog.content);
    }
  },
  computed: {
    position() {
      return this.preBlog.classify;
    }
  },
  mounted() {
    this.editor = new E("#editor");
    this.editor.config.onchange = () => {
      this.blog.content = this.editor.txt.html();
    };
    this.editor.config.height = 500;
    this.editor.config.uploadImgShowBase64 = false;
    this.editor.config.uploadImgServer = uPimgUrl;
    this.editor.config.uploadFileName = "image";
    this.editor.create();
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 10px;
}

.info {
  display: inline-block;
}

.edit-btn {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}

.space {
  width: 30px;
}

.tag-box .ant-select {
  width: 100%;
  margin-left: -4px;
}
</style>