<template>
  <contain :sping="sping" class="preview-container">
    <div slot="top-bar" class="top">
      <span>
        <span>字体大小：</span>
        <Select v-model="fontSize" style="width: 66px">
          <Option v-for="size in fontSizes" :value="size" :key="size">{{ size }}px</Option>
        </Select>
        <Divider type="vertical" />
        <span>字体类型：</span>
        <Select v-model="fontType" style="width: 74px">
          <Option
            v-for="(family, index) in fontTypes"
            :value="family"
            :key="family"
          >类型{{ index + 1 }}</Option>
        </Select>
      </span>
      <div>
        <Button type="info" @click="modifyBlog" style="margin-right: 12px;">编辑</Button>
        <Button @click="back">返回</Button>
      </div>
    </div>
    <div class="container-box">
      <div class="title">{{ blog.title }}</div>
      <div class="description">内容介绍：{{ blog.description }}</div>
      <div class="tag-box">
        标签：
        <Tag v-for="(el, index) in blog.tags" :key="index">{{ el }}</Tag>
      </div>
      <div
        class="content"
        :style="{ 'font-size': fontSize + 'px', 'font-family': fontType }"
        v-html="blog.content"
      ></div>
    </div>
  </contain>
</template>

<script>
import contain from "@/common-components/contain";
import { getSingleBlog } from "@/service";
export default {
  components: { contain },
  data() {
    return {
      blog: {},
      sping: true,
      fontSizes: [12, 14, 16, 18, 20],
      fontSize: 16,
      fontTypes: [
        "cursive",
        "fantasy",
        "'Courier New', Courier, monospace",
        "'Comic Sans MS', cursive"
      ],
      fontType: "cursive"
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
    }
  }
};
</script>

<style scoped>
.preview-container {
  background-color: #f4f5f5;
}

.container-box {
  background-color: aliceblue;
  padding: 0 10px 10px 10px;
  max-width: 860px;
  min-height: 100vh;
  margin: 0 auto;
  border-radius: 12px;
}

.title {
  margin: 0 -10px 0 -10px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding-top: 10px 0;
  background-color: beige;
  color: #464c5b;
  padding: 10px;
  border-radius: 12px;
}

.description {
  font-size: 16px;
  font-weight: bold;
  color: #464c5b;
  padding: 10px 0;
}

.content {
  color: #657180;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e8eaec;
}

.top {
  padding: 10px 24px;
  margin: 0 -24px;
  display: flex;
  justify-content: space-between;
}
</style>
