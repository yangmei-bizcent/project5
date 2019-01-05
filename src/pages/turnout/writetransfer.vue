<template>
	<div class="ts-content wrapper-steps clearfix newcss">
		<main class="main-wrap">
      <el-steps :active="2">
        <el-step title="填写病人信息" description="" style="margin-left:15%;"></el-step>
        <el-step title="填写转诊信息" description=""></el-step>
        <el-step title="信息核实" description="" style='width:auto;'></el-step>
      </el-steps>
      <br>
      <el-breadcrumb-item>病人基本信息2</el-breadcrumb-item>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="clearfix">        
        <el-form-item class='floatLeft' label="选择机构" style="width:100%;">
          <el-col :span="8">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in mechanism" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span='16'>
            <p class="ts-notice">
              <i class="el-icon-ts-mark2"></i>
              <span>该病人在201710-31由xxx社区卫生服务中心转入我院</span>
            </p>     
          </el-col>
        </el-form-item> 
        <el-form-item class='floatLeft' label="转诊原因" style="width:100%;">
          <el-col :span="8" class='floatLeft'>
            <el-select v-model="value1" placeholder="请选择">
              <el-option v-for="item in reason" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>  
        <el-breadcrumb-item>距离该病人居住地址最近的社区卫生服务中心是</el-breadcrumb-item>     
        <b class="map_title">丰产路社区卫生服务中心</b>
      </el-form>
    </main>
    <div class="page_footer">
      <el-row :gutter="20" class="flex-align">
        <el-col :span="24">
          <el-button @click='provtransfer()'>上一步</el-button>
          <el-button type="primary" @click='nexttransfer()'>下一步</el-button>
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
      mechanism: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value:'',
      reason: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value1:'',
      form: {
      },
      rules: {
        input5: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: this.checkWord, trigger: 'blur' }
        ]
      },
    }
  },
  mounted() {
    

  },
  methods: {
    nexttransfer() {
      this.$router.push('/turnout/add/checktransfer')
    },
    provtransfer(){
      this.$router.push('/turnout/add/addtransfer');
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
</style>