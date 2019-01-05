<template>
  <ts-login :top-tab="toptab">
    <a class="back" @click="back">返回上级</a>
    <el-steps class="ts-loginsteps" :active="active" style="margin-top:15px;">
      <el-step title="填写账号"></el-step>
      <el-step title="安全验证"></el-step>
      <el-step title="设置新密码"></el-step>
    </el-steps>
    <div class="ts-loginlabel username" style="margin-top:10%;">
      <input type="text" placeholder="请输入用户名" />
    </div>
    <div class="ts-loginlabel yzm hasbtn">
      <input type="text" placeholder="请输入密码" />
      <el-button type="info">发送验证码</el-button>
    </div>
    <div class="ts-loginlabel" style="margin-top:5%;">
      <el-button type="primary" @click="next">下一步</el-button>
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
        text: '忘记密码'
      }],
      active: 0
    }
  },
  components: {
  },
  methods: {
    next() {
      if (this.active < 3) {
        this.active++
      }
    },
    back() {
      if (this.active > 0) {
        this.active--
      }
    }
  }
}
</script>
<style lang="scss">
.back {
  position: absolute;
  right: 35px;
  top: 20px;
  color: #8f8f8f;
  background: none;
}
</style>
