<template>
  <div  class="ts-content  wrapper-datepicker newcss nowidth">
    <main  class="main-wrap">
      <div class="agreement_title">家庭医生签约服务协议书</div>
        
<el-form v-model="xycon" label-width="143px"  class="clearfix worddisplay">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="甲方（医院）" style="margin-top:5px">
             <span style="padding-top:15px">石岐区东港湾社区卫生服务站</span> 
              
              </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="乙方">施建辉</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="签约责任医生">某某某</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="乙方证件号码">532326199411033018</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="签约责任医生服务电话">23322658</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="乙方电话">13800138001</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="签约责任医生服务电话">23322658</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="乙方电话">13800138001</el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span='12'>
            <el-form-item label="签约时效">2017年10月1日——2018年9月30日</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="乙方住址">广东省中山市中山市市辖区石岐区刚好回家 </el-form-item>
          </el-col>
        </el-row>

         <el-row>
          <el-col :span='24'>
            <el-form-item label="甲乙双方现共同确定">xxx社区卫生服务站xxx团队，为乙方的家庭医生团队。</el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span='24'>
           经双方协议，签订此协议并接受以下条款的约定：
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span='24'>
             <quill-editor 
                            v-model="editorRemark.content"
                            ref="otherEditor"
                            :options="editorOption">
                            
                        </quill-editor>
                        <span ref="spanContent" style="display:none">
      一、甲方作为服务的提供者，在提供基本医疗和基本公共卫生服务的基础上，向乙方及其家庭成员提供以下个性化服务：<br/>
     1.为签约家庭成员建立健康档案，并实施健康动态管理。<br/>
     2.为签约家庭提供合理膳食、控制体重、限盐、控烟、限酒、控制药物依赖等健康生活方式和可干预危险因素等健康教育。<br/>
     3.为签约家庭中65岁以上老人每年体检一次，体检项目（包括：血脂、血糖、血常规、尿常规、肝功能、肾功能、心电图）。<br/>
     4.为高血压、糖尿病等慢性病和高危人群进行用药指导和随访服务。<br/>
     5.为育龄妇女提供优生优育、避孕节育、孕期保健指导和产后访视服务。<br/>
     6.为0-6岁儿童建立儿童保健手册和开展新生儿访视服务。<br/>
     7.每季度为签约家庭成员的健康状况进行电话或上门跟踪随访,实时制定健康生活指导方案。<br/>
     8.按签约家庭需要,可提前预约就诊,建立转介、转诊绿色通道服务。<br/>
     9.为签约家庭定期指导整理家庭药箱。<br/>
     10.其他:   <br/>

    二、乙方及其家庭成员自愿接受以上所选服务,将自己的身体健康状况及变化情况首先及时告知甲方,并保证相关信息、资料的真实性、合法性,并沟通畅通，积极配合甲方的服务。<br/>
    三、甲方给乙方提供服务的过程中,因乙方对甲方隐瞒病史信息或不执行甲方制定的防治方案、不听从指导意见而影响到服务质量,其产生的后果由乙方承担。甲方给乙方提供服务中,因乙方病情超出甲方诊疗水平和能力而造成不良后果的,甲方应及时转诊或会诊,以保证患者及时、合理诊治。<br/>
    四、以上9类服务为基本服务项目,不收取费用。如涉及基本公共卫生服务以外的收费项目,则按照有关规定执行。
                        </span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span='12'>
            <el-form-item label=""></el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item>
              <el-button>取消</el-button>
              <el-button type="primary" >确定</el-button>
    
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span='24'>
             本协议书一式两份，甲方、乙方各执一份,自双方签字之日起生效，有效期为一年。期满后如需解约,乙方需告知甲方,双方签字确认。不提出解约视为自动续约。
          </el-col>
        </el-row>
           
            <el-row>
          <el-col :span='12'>
            <el-form-item label="甲方签字"></el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="乙方签字"></el-form-item>
          </el-col>
        </el-row>

         <el-row>
          <el-col :span='12'>
            <el-form-item label="签字日期：">&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="签字日期：">&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日</el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </main>
  </div>
</template>

<script>
import "../../assets/sass/addtransfer.scss";
import "../../assets/sass/agreement.scss";
export default {
  data() {
    return {
      xycon: [],
      editorOption: {},
      editorRemark: {
        content: "22222"
      }
    };
  },
  created() {},

  methods: {}
};
</script>