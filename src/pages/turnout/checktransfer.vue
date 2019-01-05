<template>
	<div class="ts-content wrapper-steps clearfix newcss">
		<main class="main-wrap clearfix">
      <el-steps :active="3">
        <el-step title="填写病人信息" description="" style="margin-left:15%;"></el-step>
        <el-step title="填写转诊信息" description=""></el-step>
        <el-step title="信息核实" description="" style='width:auto;'></el-step>
      </el-steps>
      <br>
      <el-breadcrumb-item>病人基本信息</el-breadcrumb-item>
      <ul class="con_ul">
        <li class="con_li">          
          <span class="con_title">姓名</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li">          
          <span class="con_title">出生日期</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li">          
          <span class="con_title">性别</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li">          
          <span class="con_title">身份证号</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li">          
          <span class="con_title">年龄</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li">          
          <span class="con_title">手机号码</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li">          
          <span class="con_title">居住地址</span>
          <span class="con_con">张三</span>
        </li>
      </ul>
      <el-breadcrumb-item>医生信息</el-breadcrumb-item>
      <ul class="con_ul">
        <li class="con_li">          
          <span class="con_title">医生姓名</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li">          
          <span class="con_title">医生电话</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li" style="width:100%;">          
          <span class="con_title">出院诊断</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li" style="width:100%;">          
          <span class="con_title">出院记录</span>
          <div class="con_record">
            <ul class="record_ul clearfix">
              <li class="record_li">
                <span class="record_title">姓名</span>
                <span class="record_text">姓名</span>
              </li>
              <li class="record_li">
                <span class="record_title">性别</span>
                <span class="record_text">性别</span>
              </li>
              <li class="record_li">
                <span class="record_title">出生日期</span>
                <span class="record_text">出生日期</span>
              </li>
               <li class="record_li">
                <span class="record_title">姓名</span>
                <span class="record_text">姓名</span>
              </li>
              <li class="record_li">
                <span class="record_title">性别</span>
                <span class="record_text">性别</span>
              </li>
              <li class="record_li">
                <span class="record_title">出生日期</span>
                <span class="record_text">出生日期</span>
              </li> <li class="record_li">
                <span class="record_title">姓名</span>
                <span class="record_text">姓名</span>
              </li>
              <li class="record_li">
                <span class="record_title">性别</span>
                <span class="record_text">性别</span>
              </li>
              <li class="record_li">
                <span class="record_title">出生日期</span>
                <span class="record_text">出生日期</span>
              </li> <li class="record_li">
                <span class="record_title">姓名</span>
                <span class="record_text">姓名</span>
              </li>
              <li class="record_li">
                <span class="record_title">性别</span>
                <span class="record_text">性别</span>
              </li>
              <li class="record_li">
                <span class="record_title">出生日期</span>
                <span class="record_text">出生日期</span>
              </li> <li class="record_li">
                <span class="record_title">姓名</span>
                <span class="record_text">姓名</span>
              </li>
              <li class="record_li">
                <span class="record_title">性别</span>
                <span class="record_text">性别</span>
              </li>
              <li class="record_li">
                <span class="record_title">出生日期</span>
                <span class="record_text">出生日期</span>
              </li> <li class="record_li">
                <span class="record_title">姓名</span>
                <span class="record_text">姓名</span>
              </li>
              <li class="record_li">
                <span class="record_title">性别</span>
                <span class="record_text">性别</span>
              </li>
              <li class="record_li">
                <span class="record_title">出生日期</span>
                <span class="record_text">出生日期</span>
              </li> <li class="record_li">
                <span class="record_title">姓名</span>
                <span class="record_text">姓名</span>
              </li>
              <li class="record_li">
                <span class="record_title">性别</span>
                <span class="record_text">性别</span>
              </li>
              <li class="record_li">
                <span class="record_title">出生日期</span>
                <span class="record_text">出生日期</span>
              </li>
            </ul>
            <span class="record_more">查看更多</span>
          </div>
        </li>
         <li class="con_li">          
          <span class="con_title">图片</span>
          <div class="img_con">
            <ul class="img_ul">
              <li class="img_li">
                <img src="../../assets/img/default/logoewm.png" alt="" class="con_img">
              </li>
            </ul>
          </div>          
        </li>
      </ul>
      <el-breadcrumb-item>转诊信息</el-breadcrumb-item>
      <ul class="con_ul">
        <li class="con_li">          
          <span class="con_title">医院</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li">          
          <span class="con_title">科室</span>
          <span class="con_con">张三</span>
        </li>
        <li class="con_li">          
          <span class="con_title">医生</span>
          <span class="con_con">张三</span>
        </li>
      </ul>
    </main>    
      <div class="page_footer">
        <el-row :gutter="20" class="flex-align">
          <el-col :span="24"> 
            <el-button @click='provtransfer()'>上一步</el-button>
            <el-button type="primary" style="width:78px;" @click='open'>提交</el-button>
          </el-col>
        </el-row>
      </div>
	</div>
</template>
<script>
  import '../../assets/sass/addtransfer.scss';
  export default {
  data() {
    return {
     
    }
  },
  mounted() {
  },
  methods: {
    open() {
      this.$alert('提交成功', '成功', {
        confirmButtonText: '确定',
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${action}`
          // });
        }
      });
    },
    provtransfer(){
      this.$router.push('/turnout/add/writetransfer');
    }
  }
}
</script>
<style scoped>
  .el-select{
    width: 100%;
  }
  .ts-notice{
    margin-left: 20px;
  }
  .map_title{
    color: #73879C;
    margin-left: 23px;
  }
  .con_li{
    width: 50%;
    float: left;
    margin-bottom: 16px;
  }
  .con_title{
    width: 80px;
    display: inline-block;
  }
  .con_record{
    position: relative;width: 900px;
    height: 267px;
    border: 1px solid #ddd;
    margin: -20px 0 0 85px;
    border-radius: 5px;
    padding-top: 17px;
  }
  .record_ul{
    height: 225px;
    overflow: hidden;
  }
  .record_li{
    width: 30%;
    float: left;
    margin-bottom: 20px;
  }
  .record_title{
    width: 56px;
    margin-right: 20px;
  }
  .record_text{
    width: 591px;
  }
  .record_more{
    color: #539CDB;
    position: absolute;
    right: 80px;
    font-size: 12px;
    top: 225px;
  }
  .img_con{
    margin: -20px 0 0 43px;
    width: 150px;
    height: 150px;
    border-radius: 5px;
  }
  .el-notification{
    top:50%!important;
    left: 50%!important;
  }
  .el-notification__title{
    font-size: 50px;
  }
</style>