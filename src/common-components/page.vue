<template>
  <contain class="page" :sping="sping" :isHaveData="isHaveData" :search="getBlogList">
    <div style="text-align: right;">
      <Button type="primary" @click="addBlog">创建</Button>
    </div>
    <List>
      <ListItem v-for="(blogObj, index) in blog_arr" :key="index">
        <ListItemMeta
          @click.native="previewBlog(blogObj['id'])"
          :description="blogObj['description']"
        >
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
          <span slot="title">
            <Tooltip placement="top" :content="blogObj['title']">
              <span class="title">{{ blogObj['title'] }}</span>
            </Tooltip>
            <template v-for="(el, index) in blogObj.tags">
              <Tag v-if="index < 5" :key="index">{{ el }}</Tag>
            </template>
          </span>
        </ListItemMeta>

        <div class="like-finger" @click="() => changeLikeNum(blogObj, index)">
          <span class="svg-box">
            <svg
              t="1609058419482"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2742"
              width="100%"
              height="100%"
            >
              <path
                d="M998.958545 471.738182l-0.930909-3.258182c-0.558545-1.768727-1.117091-3.258182-1.349818-4.375273-13.405091-52.782545-46.917818-74.612364-72.610909-83.688727a168.727273 168.727273 0 0 0-53.992727-8.843636h-0.930909c-31.837091-0.186182-63.906909-0.186182-95.883637-0.186182l-69.911272 0.093091h-23.552c2.513455-15.266909 4.887273-29.882182 7.726545-44.497455 9.588364-48.965818 7.866182-91.741091-5.585454-130.699636-8.285091-24.203636-17.547636-48.314182-26.391273-71.540364l-9.774546-25.739636c-11.031273-29.463273-30.813091-50.269091-58.647272-61.998546a153.879273 153.879273 0 0 0-135.912728 4.235637c-36.072727 18.897455-55.482182 51.106909-54.411636 90.670545 0.325818 13.125818 0.651636 26.530909 0.884364 39.517091 0.465455 22.016 0.837818 44.823273 1.861818 67.304727a17.92 17.92 0 0 1-2.420364 10.798546c-7.959273 13.870545-16.151273 27.834182-24.017454 41.565091-18.618182 32.488727-37.934545 66.234182-57.902546 98.210909C286.254545 435.2 225.28 442.181818 225.28 442.181818H101.794909C58.414545 442.181818 23.272727 477.323636 23.272727 520.750545v401.408c0 43.426909 35.141818 78.568727 78.522182 78.568728h269.824-0.139636 1.210182c57.623273 0 115.898182-0.232727 173.66109-0.232728 36.864 0 73.634909 0.232727 109.847273 0.232728H758.690909c23.133091 0 50.501818-1.536 78.568727-10.705455 58.461091-19.083636 96.209455-66.746182 100.770909-127.394909a171.566545 171.566545 0 0 0-2.792727-50.082909c18.432-28.811636 26.717091-59.252364 24.715637-90.670545a128.837818 128.837818 0 0 0-4.794182-26.53091c17.594182-26.158545 25.972364-54.178909 25.227636-83.502545a147.921455 147.921455 0 0 0-5.352727-32.302545c10.053818-14.848 17.361455-31.185455 21.504-48.686546l4.235636-5.585454v-47.941819l-1.768727-5.585454z m-774.981818 450.466909H101.841455v-401.454546h122.228363v401.408z m698.181818-418.071273l-2.048 8.517818a70.283636 70.283636 0 0 1-10.146909 23.04l-20.619636 30.394182 10.146909 35.374546c1.303273 4.468364 2.094545 9.169455 2.420364 13.870545 0.186182 12.567273-3.630545 24.203636-11.915637 36.538182l-20.48 30.533818 10.333091 35.234909a42.216727 42.216727 0 0 1 1.768728 9.728c0.744727 14.382545-3.258182 28.439273-12.660364 42.961455l-17.221818 27.275636 5.771636 27.461818h-9.495273 9.495273l0.837818 3.723637c1.861818 8.750545 2.420364 17.687273 1.536 26.530909l-0.093091 0.651636v0.651636c-1.117091 14.196364-5.585455 26.391273-13.405091 36.305455a68.747636 68.747636 0 0 1-33.419636 22.341818c-17.547636 5.818182-36.398545 6.795636-54.178909 6.795637H656.290909c-18.013091 0-36.119273-0.232727-54.458182-0.232728l-55.389091-0.093091c-51.944727 0-113.105455 0.325818-173.893818 0.325819H302.871273l0.884363-422.958546c33.140364-16.104727 59.857455-39.377455 78.010182-68.049454l0.093091-0.232728 0.093091-0.186182c20.433455-32.768 39.842909-66.56 58.600727-99.281454l0.744728-1.210182 0.139636-0.093091 0.093091-0.139636c4.887273-8.610909 10.146909-17.687273 15.173818-26.391273 2.792727-4.887273 5.678545-9.681455 8.378182-14.522182 9.821091-16.663273 14.289455-35.653818 13.032727-54.877091-0.930909-20.573091-1.349818-41.890909-1.675636-62.370909v-1.861818c-0.325818-14.941091-0.558545-27.601455-0.884364-40.122182-0.232727-6.656 1.536-9.495273 2.094546-10.472727a25.367273 25.367273 0 0 1 10.24-8.424727c11.636364-6.097455 23.272727-9.076364 35.374545-9.076364 10.752 0 22.248727 2.513455 33.885091 7.354182 6.516364 2.699636 11.450182 6.516364 15.36 17.082182 3.304727 8.657455 6.702545 17.501091 9.960727 26.205091 9.821091 25.6 17.873455 47.010909 25.553455 69.073454 8.704 25.506909 9.681455 54.923636 2.699636 89.972364a1502.021818 1502.021818 0 0 0-8.285091 47.010909l-15.034182 91.322182h115.851637c11.450182 0 22.993455 0 34.676363-0.093091h35.234909c28.16 0 61.44 0 95.232 0.325818l0.558546-0.139636 0.512-0.093091h0.465454c9.588364 0 19.083636 1.629091 28.253091 4.561454 8.610909 3.165091 17.221818 9.076364 22.248728 28.858182 0.558545 2.234182 1.768727 4.328727 1.768727 6.050909v14.894546z"
                p-id="2743"
                fill="#f4ea2a"
              />
            </svg>
          </span>
          <span>{{ blogObj.like }}</span>
        </div>
        <template slot="action">
          <li>
            <a @click="modifyBlog(blogObj['id'])">编辑</a>
          </li>
          <li>
            <a @click="confirm(blogObj['id'])">删除</a>
          </li>
        </template>
      </ListItem>
    </List>
  </contain>
</template>

<script>
import contain from "@/common-components/contain";
import { mapState } from "vuex";
import { getBlogList, deleteBlog, changeLikeNum } from "@/service";
export default {
  components: { contain },
  data() {
    return {
      blog_arr: [],
      position: "",
      sping: false,
      isHaveData: false,
      likeNum: 0,
      like: true,
      likeIndex: 0
    };
  },
  mounted() {
    const searchKey = this.common.searchKey;
    this.getBlogList(searchKey);
  },
  computed: {
    ...mapState({
      common: store => store.common
    })
  },
  methods: {
    getBlogList(searchKey) {
      this.position = this.$route.path.replace("/", "");
      let path = "";
      if (this.position === "backend") {
        path = "python";
      } else if (this.position === "frontend") {
        path = "js";
      } else {
        path = "other";
      }
      this.sping = true;
      const params = {
        classify: path
      };
      if (searchKey) {
        params.searchKey = searchKey;
      }
      if (this.$route.query.searchAll === "true") {
        params.searchAll = true;
      }

      getBlogList(params)
        .then(res => {
          if (res.status === 200) {
            this.blog_arr = res.data || [];
            this.sping = false;
            this.isHaveData = this.blog_arr.length > 0;
          }
        })
        .catch(err => {
          this.isHaveData = false;
          this.$Message.error({
            background: true,
            content: err
          });
        })
        .finally(() => {
          this.sping = false;
        });
    },
    addBlog() {
      this.$router.push(`/add/${this.position}`);
    },
    confirm(blogId) {
      this.$Modal.confirm({
        title: "删除博客",
        content: "确定删除该条博客？",
        onOk: () => {
          this.removeBlog(blogId);
        },
        onCancel: () => {
          this.$Message.info({
            background: true,
            content: "取消删除"
          });
        }
      });
    },
    removeBlog(id) {
      deleteBlog({ id: id })
        .then(res => {
          if (res.status === 200) {
            this.$Message.info({
              background: true,
              content: "删除成功！"
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
    modifyBlog(id) {
      this.$router.push(`/modify/${id}`);
    },
    previewBlog(blogId) {
      this.$router.push({
        path: `/preview/${blogId}`
      });
    },
    changeLikeNum(blogObj, index) {
      if (this.likeIndex !== index) {
        this.likeIndex = index;
        this.like = true;
      }

      if (this.like) {
        this.blog_arr[index].like++;
      } else {
        this.blog_arr[index].like =
          this.blog_arr[index].like - 1 < 0 ? 0 : this.blog_arr[index].like - 1;
      }

      this.like = !this.like;
      const params = {
        id: blogObj.id,
        like: this.blog_arr[index].like
      };
      changeLikeNum(params)
        .then(res => {})
        .catch(err => {
          this.$Message.error({
            background: true,
            content: err
          });
        });
    }
  }
};
</script>

<style scoped>
.title {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 10px;
}

.tag-box {
  flex: 1;
}

.like-finger {
  cursor: pointer;
  width: 40px;
  display: flex;
  justify-content: space-between;
}

.like-finger .svg-box {
  display: inline-block;
  height: 18px;
  width: 18px;
}

.ivu-list-item {
  padding: 12px;
  border-radius: 12px;
}

.ivu-list-item-meta {
  cursor: pointer;
}

.ivu-list-item:hover {
  background-color: rgba(92, 173, 255, 0.1);
}
</style>