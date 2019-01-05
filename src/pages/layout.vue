<template>
  <div class="ts-wrapper" :class="{hideSidebar:isCollapse}">
    <ts-sidebar :collapsevalue="isCollapse" :routeMenu="routeMenu" :logo="logo" :simpleLogo="simplelogo"></ts-sidebar>
    <ts-navbar :userInfo="userInfo" :userMenu="userMenu" :topMenu="topMenu" :default-active="activeIndex" @sidebarHide="hideside" @userItemClick="useritemclick" @menuItemClick="menuitemclick">
      <router-view :style="{minHeight:height}"></router-view>
    </ts-navbar>
  </div>
</template>
<script>
import { sideRoutes } from '@/router/routes.js'
import userphoto from '@/assets/img/default/photo-user.png'
import logo from '@/assets/img/default/logo.png'
import simplelogo from '@/assets/img/default/simplelogo.png'

export default {
  data() {
    return {
      isCollapse: false,
      routeMenu: sideRoutes,
      userInfo: {
        userphoto: userphoto,
        username: '个人中心'
      },
      userMenu: [{
        text: '首页'
      }, {
        text: '项目git地址'
      }, {
        text: '退出登录'
      }],
      topMenu: [{
        title: '掌上医院',
        index: '1'
      }, {
        title: '互联网医院',
        index: '2'
      }, {
        title: '双向转诊',
        index: '3'
      }],
      activeIndex: '1',
      logo,
      simplelogo,
      height: ''
    }
  },
  mounted() {
    let ahei = document.documentElement.clientHeight - 96;
    this.height = `${ahei}px`
  },
  methods: {
    hideside(isCollapse) {
      this.isCollapse = isCollapse
    },
    useritemclick(i) {
      this.$message(`您选择了${i.text}`)
      if (i.text == '退出登录') {
        this.$router.push('/')
      }
      if (i.text == '项目git地址') {
        window.open('http://192.168.0.116/LiuYang/Tesla-UI-Demo')
      }
    },
    menuitemclick(i) {
      this.$notify({
        title: '这是自定义方法',
        message: `已为您切换至${i.title}`,
        type: 'success'
      })
    }
  }
}
</script>
