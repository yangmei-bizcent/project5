<template>
  <div class="ts-content wrapper-datepicker">
    <main class="main-wrap">
      <el-breadcrumb-item>服务包管理</el-breadcrumb-item>
      <div class="addservice_btn">添加服务包</div>
      <el-row :gutter="24">
        <ul class="service_ul clearfix">
          <el-col :sm="8" :md="6" :lg="6">
          <li class="service_li service_green">
            <span class="service_title">基础服务包</span>
            <span class="service_people">100人</span>
            <span class="service_pro">一般人群使用，含基本公共卫生服务项目，签约等业务。</span>
            <div class="service_k">
              <span class="service_text">抽血化验抽血化验抽血化验抽血化验抽血化验</span>
              <span class="service_text">血常规18项</span>
              <span class="service_text">血常规18项</span>
              <span class="service_text">......</span>
            </div>            
            <span class="service_price">&yen;199</span>
            <el-button type="primary">查看详情</el-button>
          </li>
          </el-col>
          <el-col :sm="8" :md="6" :lg="6">
          <li class="service_li">
            <span class="service_title">基础服务包</span>
            <span class="service_people">100人</span>
            <span class="service_pro">一般人群使用，含基本公共卫生服务项目，签约等业务。</span>
            <div class="service_k">
              <span class="service_text">抽血化验抽血化验抽血化验抽血化验抽血化验</span>
              <span class="service_text">血常规18项</span>
              <span class="service_text">血常规18项</span>
              <span class="service_text">......</span>
            </div>            
            <span class="service_price">&yen;199</span>
            <el-button type="primary">查看详情</el-button>
          </li>
          </el-col>
          <el-col :sm="8" :md="6" :lg="6">
          <li class="service_li">
            <span class="service_title">基础服务包</span>
            <span class="service_people">100人</span>
            <span class="service_pro">一般人群使用，含基本公共卫生服务项目，签约等业务。</span>
            <div class="service_k">
              <span class="service_text">抽血化验抽血化验抽血化验抽血化验抽血化验</span>
              <span class="service_text">血常规18项</span>
              <span class="service_text">血常规18项</span>
              <span class="service_text">......</span>
            </div>            
            <span class="service_price">&yen;199</span>
            <el-button type="primary">查看详情</el-button>
          </li>
          </el-col>
          <el-col :sm="8" :md="6" :lg="6">
          <li class="service_li">
            <span class="service_title">基础服务包</span>
            <span class="service_people">100人</span>
            <span class="service_pro">一般人群使用，含基本公共卫生服务项目，签约等业务。</span>
            <div class="service_k">
              <span class="service_text">抽血化验抽血化验抽血化验抽血化验抽血化验</span>
              <span class="service_text">血常规18项</span>
              <span class="service_text">血常规18项</span>
              <span class="service_text">......</span>
            </div>            
            <span class="service_price">&yen;199</span>
            <el-button type="primary">查看详情</el-button>
          </li>
          </el-col>
        </ul>
      </el-row>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/service.scss';
import { apiurl } from '../../service/api.js';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>