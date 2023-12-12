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
    <div style="margin-bottom: 48px;">
      <editor :onContentChange="onContentChange" :onCreated="onCreated" />
    </div>
    <div class="edit-btn">
      <slot name="back-btn"></slot>
      <div class="space"></div>
      <slot name="submit-btn"></slot>
    </div>
  </contain>
</template>

<script>
import contain from '@/common-components/contain';
import editor from '@/common-components/editor';
export default {
  components: { contain, editor },
  props: ['preBlog', 'sping'],
  data() {
    return {
      editor: new Object(),
      blog: new Object(),
      tagList: [
        {
          value: 'javascript',
          label: 'javascript'
        },
        {
          value: 'python',
          label: 'python'
        }
      ],
      selectedTags: []
    };
  },
  watch: {
    blog: {
      deep: true,
      handler() {
        this.$emit('modifyBlog', this.blog);
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
      this.editor.setHtml(this.blog.content);
    }
  },
  computed: {
    position() {
      return this.preBlog.classify;
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = editor;
    },
    onContentChange(value) {
      this.blog.content = value;
    }
  }
};
</script>

<style scoped>
.container {
  height: calc(100% - 48px);
}
.title {
  margin-bottom: 10px;
}

.info {
  display: inline-block;
}

.edit-btn {
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

.tag-box .ant-select {
  width: 100%;
  margin-left: -4px;
}
</style>