<template>
  <div class="outer">
    <div class="title">{{ formInline.operation === 'login' ? '登录' : '注册' }}</div>
    <Form class="inner" ref="formInline" :model="formInline" :rules="ruleInline" :inline="false">
      <FormItem prop="name">
        <Input type="text" v-model="formInline.name" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend" />
        </Input>
      </FormItem>
      <FormItem prop="chineseName" v-if="formInline.operation === 'register'">
        <Input type="text" v-model="formInline.chineseName" placeholder="中文名">
        <Icon type="ios-person-outline" slot="prepend" />
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="密码">
        <Icon type="ios-lock-outline" slot="prepend" />
        </Input>
      </FormItem>
      <FormItem>
        <Button v-if="formInline.operation === 'register'" :inline="false" type="primary"
          @click="submit('register')">注册</Button>
        <Button v-if="formInline.operation === 'login'" :inline="false" type="primary"
          @click="submit('login')">登录</Button>
        <span class="info" v-if="formInline.operation === 'register'" @click="() => { formInline.operation = 'login' }">
          去登录></span>
        <span class="info" v-if="formInline.operation === 'login'" @click="() => {
          formInline.operation = 'register';
          formInline.name = ''; formInline.password = ''
        }">去注册> </span>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import store from '@/store'
import { login } from '@/service'
export default {
  data() {
    return {
      formInline: {
        name: '',
        chineseName: '',
        password: '',
        role: 'other',
        operation: 'login'
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写用户密码.', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        chineseName: [
          { required: true, message: '请填写中文名', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submit(operation) {
      if (!this.formInline.name || !this.formInline.password || (!this.formInline.chineseName && this.formInline.operation === 'register')) {
        this.$Message.warning({
          background: true,
          content: '信息不完整'
        })
        return
      }
      this.formInline.operation = operation
      login(this.formInline).then(res => {
        if (res.status === 200) {
          store.isLogin = true
          sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          if (this.formInline.operation === 'login') {
            this.$router.push('/other')
          }
          this.$Message.success({
            background: true,
            content: res.msg
          })
        } else {
          this.$Message.warning({
            background: true,
            content: res.msg
          })
        }
      }).catch(err => {
        this.$Message.error({
          background: true,
          content: err
        })
      })
    }
  }
}
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(../../assets/bg-3.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.inner {
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.ivu-form-item {
  width: 250px;
  display: flex;
  justify-content: flex-end;
}

.title {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 400px;
  text-align: center;
  padding: 12px 0;
  font-size: 20px;
  font-weight: bold;
  color: #464c5b;
}

.title,
.inner {
  background-color: #fff;
  border: 1px #f0f0f0 solid;
}

.info {
  font-size: smaller;
  cursor: pointer;
}
</style>
