<template >
  <div v-loading="loading" class="ts-content  wrapper-datepicker newcss nowidth">
    <main  class="main-wrap agreement" >
      <div class="agreement_title">家庭医生签约服务协议书</div>
  <el-row>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">甲方（医院）</label>
  <div class="el-form-item__content underline">{{xycon.PartyA}}</div>
  </div>
  </el-col>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">乙方</label>
  <div class="el-form-item__content underline">{{xycon.PartyB}}</div>
  </div>
  </el-col>
</el-row>
  <el-row>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">签约责任医生</label>
  <div class="el-form-item__content underline">{{headerVal.PartyA_DoctorName}}</div>
  </div>
  </el-col>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">乙方证件号码</label>
  <div class="el-form-item__content">{{headerVal.PartyB_PatientIdCard}}</div>
  </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">签约责任医生服务电话</label>
  <div class="el-form-item__content underline">{{headerVal.PartyA_DoctorPhone}}</div>
  </div>
  </el-col>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">乙方电话</label>
  <div class="el-form-item__content">{{headerVal.PartyB_PatientPhone}}</div>
  </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">签约时效</label>
  <div class="el-form-item__content underline">{{headerVal.PartyA_SignStartDate}}——{{headerVal.PartyA_SignEndDate}}</div>
  </div>
  </el-col>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">乙方住址</label>
  <div class="el-form-item__content">{{headerVal.PartyB_PatientAddress}}</div>
  </div>
  </el-col>
</el-row>
<el-row v-if="PartyA_IsDoctorInTeam">
  <el-col :span="24">
  <div class="agreement_top">
  <label class="el-form-item__label">团队成员</label>
  <div class="el-form-item__content underline">{{headerVal.PartyA_TeamDoctorName}}</div>
  </div>
  </el-col>
</el-row>
<el-row >
  <el-col :span="24" >
  <div class="agreement_top">
  <label class="el-form-item__label">签约服务包</label>
  <div class="el-form-item__content underline">{{xycon.ServicePackInfo.ServicePackName}}</div>
  </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="24">
  <div class="agreement_top">
  <label class="el-form-item__label">甲乙双方现共同确定</label>
 <div v-if="PartyA_IsDoctorInTeam==true" class="el-form-item__content underline">{{xycon.PartyA}}社区卫生服务站{{headerVal.PartyA_TeamName}}团队，为乙方的家庭医生团队。</div>
  <div v-if="PartyA_IsDoctorInTeam==false" class="el-form-item__content underline">{{headerVal.PartyA_DoctorName==""?"":headerVal.PartyA_DoctorName+"医生，为乙方的家庭医生"}}。</div>
  </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="24"><div class="protocol">经双方协议，签订此协议并接受以下条款的约定：</div></el-col>
</el-row>
<el-row>
  <el-col :span="24"><div class="protocol_content">
          <el-input
          type="textarea" maxlength='5000'
          :autosize="{ minRows:3, maxRows: 10}"
          placeholder="请输入协议内容"
          v-model="editorRemark.content">
      </el-input>
    <!-- <quill-editor 
                            v-model="editorRemark.content"
                            ref="otherEditor"
                            > 
                            
                        </quill-editor>-->
</div></el-col>
</el-row>
<el-row style="text-align:right">

  <el-col :span="24" >
    <el-button class="" @click="viewContent" >取消</el-button>
     <el-button type="primary" @click="saveQianYueContent">保存</el-button>
  </el-col>
</el-row>

<el-row>
  <el-col :span="24"><div class="protocol">本协议书一式两份，甲方、乙方各执一份,自双方签字之日起生效，有效期为一年。期满后如需解约,乙方需告知甲方,双方签字确认。不提出解约视为自动续约。</div></el-col>
</el-row>
<el-row>
  <el-col :span="8">
  <div class="agreement_bottom">
  <label class="el-form-item__label">甲方签字</label>
  <div class="el-form-item__content"></div>
  </div>
  </el-col>
  <el-col :span="8"><div class="agreement_bottom"><label class="el-form-item__label"></label><div class="el-form-item__content"></div></div></el-col>
  <el-col :span="8">
  <div class="agreement_bottom">
  <label class="el-form-item__label">乙方签字</label>
  <div class="el-form-item__content"></div>
  </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="8">
  <div class="agreement_bottom">
  <label class="el-form-item__label">签字日期：</label>
  <div class="el-form-item__content">{{footerVal.PartyA_SignDate}}</div>
  </div>
  </el-col>
  <el-col :span="8"><div class="agreement_bottom"><label class="el-form-item__label"></label><div class="el-form-item__content"></div></div></el-col>
  <el-col :span="8">
  <div class="agreement_bottom">
  <label class="el-form-item__label">签字日期：</label>
  <div class="el-form-item__content">{{footerVal.PartyB_SignDate}}</div>
  </div>
  </el-col>
</el-row>
 
    <!-- <el-button type="primary" class="agreement_save">打印</el-button> -->

    </main>
  </div>
</template>

<script>
import "../../assets/sass/addtransfer.scss";
import "../../assets/sass/agreement.scss";
import { apiurl } from "../../service/api.js";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
       xycon: {},
      headerVal:{},
      footerVal:{},
      editorRemark: {
        content: "",
        id: 0
      },
     registerRecordId:0,	//协议记录id
     registerDoctorId:0,  //医生id
     isOrNoEdit:1,        //是否可编辑
     isOrNoPrint:0,       //是否可打印协议内容
     PartyA_IsDoctorInTeam:false,//是否团队医生
     loading:true,
    };
  },
  created() {},
  //获取session对象
  computed: {
    ...mapGetters({
      hosptialid: "hosptialid",
      hosptialname: "hosptialname",
      province: "province",
      provincename: "provincename",
      city: "city",
      cityname: "cityname",
      area: "area",
      area: "areaname",
      token: "token"
    })
  },

  //mounted
  mounted() {
    this.QianYueGetHeaderAndFooter();
    this.getContent();
    this.GetUrlParam();
  },
  //
  methods: {
    //获取签约协议头部和尾部
    QianYueGetHeaderAndFooter() {
      var self = this;
      axios
        .get(apiurl.QianYueGetHeaderAndFooter, {
          params: {
            registerRecordId:self.registerRecordId,
            registerDoctorId: self.registerDoctorId
          },
          headers: {
            //self.token
            token:self.token
          }
        })
        .then(function(res) {
          if (res.data.suc == true) {
            self.loading=false;
            self.xycon = res.data.extra;
            self.headerVal=self.xycon.Header;
            self.footerVal=self.xycon.Footer
            self.PartyA_IsDoctorInTeam= res.data.extra.Header.PartyA_IsDoctorInTeam;
          }
        });
    },
    //获取所在医院的协议内容
    getContent: function() {
      var self = this;
      axios
        .get(apiurl.QianYueGetContent+"?registerRecordId="+self.registerRecordId, {
          headers: {
            token: self.token
          }
        })
        .then(function(res) {
          if (res.data.suc == true) {
            self.editorRemark.content = res.data.extra.Content;
            self.editorRemark.id = res.data.extra.Id;
          }
        })
        .catch(function(error) {});
    },
    //保存签约内容
    saveQianYueContent: function() {
      var self = this;
      axios
        .post(
          apiurl.QianYueAddOrUpdateContent,
          {
            Id: self.editorRemark.id,
            Content: self.editorRemark.content
          },
          {
            headers: {
              //self.token
              token: self.token
            }
          }
        )
        .then(function(res) {
          if (res.data.suc == true) {
            self.$message({
              type: "success",
              message: res.data.mes
            });
            self.viewContent();
          } else {
            self.$message({
              type: "warning",
              message: res.data.mes
            });
          }
        });
    },
     //查看
    viewContent()
    {
      var self = this;
      // var param = {};
      // param.method = "addTab";
      // param.title = '查看签约页';
      // param.url = linkUrl + 'qianyueagreement/agreementpage?token='+this.token+'&registerRecordId='+self.registerRecordId+'&registerDoctorId='+self.registerDoctorId;
      // window.parent.postMessage(JSON.stringify(param), '*');
        this.$router.push({
             path:'/qianyueagreement/agreementpage?registerRecordId='+self.registerRecordId+"&registerDoctorId="+self.registerDoctorId+"&edit="+self.isOrNoEdit+"&print="+self.isOrNoPrint+'&ModelUrl='+this.$route.query.ModelUrl
        });
    },
    //获取url参数值
    GetUrlParam()
    {
      var self=this;
      self.registerRecordId= this.$route.query.registerRecordId;
      self.registerDoctorId= this.$route.query.registerDoctorId;
      self.isOrNoEdit=this.$route.query.edit;//1可编辑0不可
      self.isOrNoPrint=this.$route.query.print;
    }
  }
};
</script>