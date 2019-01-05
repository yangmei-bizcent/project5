<template>
  <ts-login :top-tab="toptab">
    <div class="ts-loginlabel username" style="margin-top:20px;">
      <input type="text" placeholder="请输入用户名" />
    </div>
    <div class="ts-loginlabel password">
      <input type="password" placeholder="请输入密码" />
    </div>
    <div class="ts-loginlabel">
      <el-checkbox v-model="checked">10天内自动登录</el-checkbox>
      <a class="ts-fogot" @click="$router.push('foget')">忘记密码？</a>
    </div>
    <div class="ts-loginlabel">
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </ts-login>
</template>
<script>
// import login from '@/components/logindiv'
export default {
  data() {
    return {
      checked: true,
      toptab: [{
        text: '账号登录'
      }]
    }
  },
  components: {
    // login
  },
  methods: {
    login() {
      this.$router.push('/introduction')
    }
  }
}
</script>