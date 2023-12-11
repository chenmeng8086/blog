<template>
  <contain>
    <div class="bg-img" :style="{backgroundImage: `url(${randomImg})`}">
      {{randomWord}}
    </div>
  </contain>
</template>

<script>
import uploadImg from '@/common-components/upload.vue'
import contain from '@/common-components/contain.vue'
import {getWord} from '@/service'
export default {
  name: 'home',
  components: {contain, uploadImg},
  data () {
    return {
      loopImgs: [
        'http://47.111.176.133/imgs/bg-5.jpg',
        'http://47.111.176.133/imgs/bg-4.jpg',
        'http://47.111.176.133/imgs/bg-1.jpg',
        'http://47.111.176.133/imgs/bg-3.jpg',
        'http://47.111.176.133/imgs/bg-2.jpg'
      ],
      randomWord: '',
      randomImg: 'https://tva1.sinaimg.cn/large/87c01ec7gy1frmrx49dasj21hc0u0wnm.jpg',
      timer: null,
    }
  },
  created () {
    this.getWord()
  },

  mounted () {
    this.loopGetWordAndImg()
  },

  beforeDestroy () {
    this.timer  = null
  },

  methods: {
    getWord () {
      const params = {
        target: 'word',
      }
      getWord(params).then(res => {
        this.randomWord = JSON.parse(res.data).data
      })
      let imgId = (Math.random()*1000).toFixed()
      let types = ['png', 'jpg']
      let imgType = types[Math.floor(Math.random()*types.length)]
      this.randomImg = `https://api.66mz8.com/api/bing.php?idx=${imgId}&format=${imgType}`
    },

    loopGetWordAndImg () {
      this.timer = setInterval(() => {
        this.getWord()
      }, 60000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-img{
  font-size: 20px;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: #fff; */
}
</style>
