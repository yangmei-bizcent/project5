<template>
  <div class="ts-content wrapper-datepicker newcss">
    <main class="main-wrap">
			<el-steps :active="1">
				<el-step title="填写基本情况" description="" style="margin-left:15%;"></el-step>
				<el-step title="填写转诊预约" description=""></el-step>
				<el-step title="确认并完成申请" description="" style='width:auto;'></el-step>
			</el-steps>
			<br>
			<el-breadcrumb-item>病人基本信息</el-breadcrumb-item>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="clearfix worddisplay posrel">
      	<el-button type="info" class="read-id">读身份证</el-button>
        <el-form-item label="姓名" size="small" class='floatLeft'>张三
        </el-form-item>   
        <el-form-item label="年龄" class='floatLeft'>22岁
        </el-form-item>
        <el-form-item label="性别" class='floatLeft'>男
        </el-form-item>
	      <el-form-item label="身份证号" size="small" class='floatLeft'>3333333333333333</el-form-item>   
        <el-form-item label="手机号码" class='floatLeft'>188888888888</el-form-item>
        <el-form-item label="" class='floatLeft' style="height: 38px;">&nbsp;</el-form-item>
        <el-form-item label="紧急联系人类别" class='floatLeft'>父母</el-form-item>
        <el-form-item label="紧急联系人姓名" class='floatLeft'>陈尘</el-form-item>
        <el-form-item label="紧急联系人电话" class='floatLeft'>188888888888</el-form-item>
        <el-form-item label="居住地址" class='floatLeft'>河南省郑州市金水区XXX路XXX号XXX幢XX号</el-form-item>       
      </el-form>
			<el-breadcrumb-item>医保信息</el-breadcrumb-item>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="clearfix worddisplay">
        <el-form-item label="医保报销类别" size="small" class='floatLeft'>医保类型
        </el-form-item>   
        <el-form-item label="医生卡类型" class='floatLeft'>医保卡类型
        </el-form-item>
        <el-form-item label="**医保卡卡号" class='floatLeft'>9039090309309
        </el-form-item>
	      <el-form-item label="人群分类" size="small" class='floatLeft'>父母</el-form-item>     
      </el-form>
			<el-breadcrumb-item>签约信息</el-breadcrumb-item>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="clearfix worddisplay">
        <el-form-item label="人群分类" size="small" class='floatLeft'>医保类型
        </el-form-item>   
        <el-form-item label="签约机构" class='floatLeft'>XXXXXXXXX机构
        </el-form-item>
        <el-form-item label="签约医生" class='floatLeft'>李里里
        </el-form-item>
	      <el-form-item label="签约医生电话" size="small" class='floatLeft'>3333333333333333</el-form-item>   
        <el-form-item label="签约有效期" class='floatLeft'>2017-10-10</el-form-item>      
      </el-form>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="clearfix" style="border-top: 1px solid #ccc; padding-top: 20px;">
        <el-form-item class='floatLeft' label="出院诊断" style="width:100%;">
        	<!-- <el-row class="flex-align"> -->
		        <el-col :span="6" class='floatLeft'>
		          <el-select v-model="value" placeholder="选择省">
		            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
		            </el-option>
		          </el-select>
		        </el-col>
		        <el-input v-model="form.textarea" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入详细地址信息" style="margin-top:20px;width:80%;"></el-input>
		      <!-- </el-row> -->
        </el-form-item>  
        <el-form-item label="病人病情" style="width:82%;">
          <el-input v-model="form.textarea1" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 10}" placeholder="多行文字"></el-input>
        </el-form-item>   
        <el-form-item label="病人主诉" style="width:82%;">
          <el-input v-model="form.textarea1" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 10}" placeholder="多行文字"></el-input>
        </el-form-item>   
        <el-form-item label="其他说明" style="width:82%;">
          <el-input v-model="form.textarea1" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 10}" placeholder="多行文字"></el-input>
        </el-form-item>   
      </el-form>
		</main>
    <div class="page_footer">
    	<el-row :gutter="20" class="flex-align">
        <el-col :span="24">
		      <el-button type="primary">下一步</el-button>
        </el-col>
      </el-row>
    </div>
	</div>
</template>
<script>
	import '../../assets/sass/addtransfer.scss';
  import '../../assets/sass/patient.css';
	export default {
  data() {
    return {
      options: [{
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
      value: '',
    	radio: '1',
      radio1: '选中且禁用',
      form: {
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        textarea: '',
        textarea1:''
      },
      rules: {
        input5: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: this.checkWord, trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  mounted() {
    

  },
  methods: {
    checkWord(rule, value, callback) {
      if (value.length < 6) {
        callback(new Error("内容不能少于6个字符"));
      } else {
        callback();
      }
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    },
    handlePictureCardPreview(file) {
    // 图片格式上传
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    nexttransfer() {
      this.$router.push('/turnout/add/writetransfer')
    }
  }
}
</script>           
<style lang="scss" scoped>
</style>
             