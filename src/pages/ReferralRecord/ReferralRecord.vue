<template>
  <section class="ReferralRecordIndex" style="padding: 10px 17px;border: 1px solid #E6E9ED;min-height: 550px;">
    <div style="margin-bottom:20px;padding: 10px;background-color: #f7f7f7;border: 1px solid #DADDE3;">
      <el-dropdown size="small" @command="handleCommand">
        <el-button type="primary" style="padding:10px 21px;">
          申请转诊
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">门诊转诊</el-dropdown-item>
          <el-dropdown-item command="2">检查转诊</el-dropdown-item>
          <el-dropdown-item command="4">住院转诊</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-table class="table-content" :data="tableData.rows" border stripe style="width: 100%;"  v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column type="index" label="编号" width="50"></el-table-column>
      <el-table-column prop="PatientName" label="病人姓名" min-width="80"></el-table-column>
      <el-table-column prop="PatientPhone" label="联系方式" min-width="110"></el-table-column>
      <el-table-column prop="ApplyDoctorName" label="送转医生" min-width="80"></el-table-column>
      <el-table-column prop="ApplyDateFormat" label="转诊日期" min-width="120"></el-table-column>
      <el-table-column prop="AppointmentDateFormat" label="预约就诊日期" min-width="120"></el-table-column>
      <el-table-column prop="AppointmentHospitalName" label="接诊医院" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="AppointmentSectionName" label="接诊科室" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="AppointmentDoctorName" label="接诊医生／机器" min-width="120"></el-table-column>
      <el-table-column prop="AppointmentStateText" label="签约状态" min-width="80">
        <template slot-scope="scope">
          <span>{{scope.row.AppointmentStateText}}</span>
          <!-- <i :class="{state_no:scope.row.AppointmentStateText=='已取消',state_ok:scope.row.AppointmentStateText=='已成功'}"></i> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)" type="text" v-show="scope.row.ckdetailbtnflog"><i class="el-icon-ts-serch" ></i>&nbsp;查看详情</el-button>
          <el-button type="text" @click="Rescheduling(scope.row)" v-show="scope.row.btnflog == 1"><i class="el-icon-ts-reject"></i>&nbsp;重新预约</el-button>
          <el-button type="text" @click="Cancelbtn(scope.row)" v-show="scope.row.btnflog == 2 || (scope.row.AppointmentType ==1 && newdata < new Date(scope.row.AppointmentDate).getTime()) || (scope.row.AppointmentType == 2 && newdata < new Date(scope.row.AppointmentDate).getTime())"><i class="el-icon-ts-reject"></i>&nbsp;取消预约</el-button>
          <el-button type="text" @click=" showDetail(scope.row)" v-show="scope.row.btnflog == 3"><i class="el-icon-ts-reject"></i>&nbsp;审核</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:24px;" v-show="tableData.total!=0">
      <div class="block" style="float:right;">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="diaTitle" :visible.sync="dialogVisible1" center class="mymzDial" ref="printContent1">
      <el-breadcrumb-item>送转信息</el-breadcrumb-item>
      <el-form v-model="mzDetails" label-width="100px" class="clearfix worddisplay">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="预约号：">{{mzDetails.TransferNo}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="预约医院：">{{mzDetails.AppointmentHospitalName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="预约科室：">{{mzDetails.AppointmentSectionName}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="预约专家：">{{mzDetails.AppointmentDoctorName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="就诊时间：">{{mzDetails.AppointmentDate}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="就诊序号：">{{mzDetails.RegClass=="1"?"上午":"下午"}}/{{mzDetails.RegNo}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="送转医院：">{{mzDetails.ApplyHospitalName}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="送转科室：">{{mzDetails.ApplySectionName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="送转医生：">{{mzDetails.ApplyDoctorName}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="联系电话：">{{mzDetails.CreatePhone}}</el-form-item>
          </el-col>
        </el-row>
        <el-breadcrumb-item>患者信息</el-breadcrumb-item>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="患者姓名：">{{mzDetails.PatientName}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="性别：">{{mzDetails.PatientSex}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="证件号码：">{{mzDetails.PatientCardId}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="年龄：">{{mzDetails.PatientAge}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="联系方式：">{{mzDetails.PatientPhone}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="地址：">{{mzDetails.DetailedAddress}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="初步诊断：" style="width:100%">{{mzDetails.Diagnose}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="病情描述：" style="width:100%">{{mzDetails.PatientCondition}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="病情体征：" style="width:100%">{{mzDetails.PatientComplaint}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="检验检查：" style="width:100%">{{mzDetails.OthersRemark}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h4>温馨提示</h4>
      <div style="margin-bottom: 20px;" class="tipsDiv">
        <p class="mzzz-tip">1.凭此预约单，携带本人身份证或就诊卡于就诊当日到门诊自助机或挂号收费窗口取号；</p>
        <p class="mzzz-tip">2.请在就诊开始时间前取号，取消预约请在前一天24点前联系送转医院；</p>
        <p class="mzzz-tip">3.如遇专家门诊时间改变，请关注手机短信通知或专家医院公布的门诊排班表；</p>
      </div>
      <span slot="footer" class="dialog-footer1">
        <el-button type="primary" @click="printBtn1">打 印</el-button>
      </span>
    </el-dialog>
    <!-- 检查检验 -->
    <el-dialog :title="diaTitle2" :visible.sync="dialogVisible2" center class="mymzDial" ref="printContent">
      <el-breadcrumb-item>送转信息</el-breadcrumb-item>
      <el-form v-model="mzDetails2" label-width="100px" class="clearfix worddisplay">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="预约号：">{{mzDetails2.TransferNo}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="预约序号：">{{mzDetails2.RegNo}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="预约医院：">{{mzDetails2.AppointmentHospitalName}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="就诊日期：">{{mzDetails2.AppointmentDate}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="就诊时间：">{{mzDetails2.ClinicTime}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="检查单号：">{{mzDetails2.ExaminationId}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="检查项目：">{{mzDetails2.ExaminationItemName}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="检查设备：">{{mzDetails2.ExaminationDeviceName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="检查地址：">{{mzDetails2.ExaminationDeviceAddress}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="送转医院：">{{mzDetails2.ApplyHospitalName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="送转科室：">{{mzDetails2.ApplySectionName}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="送转医生：">{{mzDetails2.ApplyDoctorName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="联系电话：">{{mzDetails2.ApplyDoctorPhone}}</el-form-item>
          </el-col>
        </el-row>
        <el-breadcrumb-item>患者信息</el-breadcrumb-item>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="患者姓名：">{{mzDetails2.PatientName}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="性别：">{{mzDetails2.PatientSex}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="证件号码：">{{mzDetails2.PatientCardId}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="年龄：">{{mzDetails2.PatientAge}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="联系方式：">{{mzDetails2.PatientPhone}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="地址：">{{mzDetails2.Address}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="初步诊断：" style="width:100%">{{mzDetails2.Diagnose}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="病情描述：" style="width:100%">{{mzDetails2.PatientCondition}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="病情体征：" style="width:100%">{{mzDetails2.PatientComplaint}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="检验检查：" style="width:100%">{{mzDetails2.OthersRemark}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h4>温馨提示</h4>
      <div style="margin-bottom: 20px;" class="tipsDiv">
        <p class="mzzz-tip">1.凭此检查单，携带本人身份证或医保卡于检查当日到缴费；</p>
        <p class="mzzz-tip">2.请在就诊开始时间前缴费，取消预约请在前一天24点前联系送转医院；</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="printBtn">打 印</el-button>
      </span>
    </el-dialog>
    <!-- 取消原因 -->
    <el-dialog title="取消原因" :visible.sync="cancelVisible" width="500px" :before-close="handleClose">
      <section class="m-cancel-reason">
        <span>取消原因</span>
        <el-input type="textarea" :rows="2" placeholder="请输入取消原因" v-model="cancelReason">
        </el-input>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancelRefer">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
  import '../../assets/sass/referralRecord.scss';
  import { mapGetters, mapActions } from 'vuex';
  import { apiurl,linkUrl } from '../../service/api.js'
  import axios from 'axios';
  import axion from '@/util/http_url.js'
  import qs from 'qs';

  export default {
    name: 'referralRecord',
    data() {
      return{
        tableData: "",
        currentPage4:1,
        pagesize:10,
        dialogVisible1: false,
        dialogVisible2:false,
        mzDetails: [],
        mzDetails2:[],
        diaTitle: "",
        diaTitle2:'',
        isbool:false,
        loading:true,
        btnflog:0,//1 重新预约 2 取消预约 3 审核 4 办理入院和作废 5 出院
        ckdetailbtnflog: true,
        cancelVisible: false,
        cancelReason: '',
        newdata: new Date().getTime()
      }
    },
    created() {
      this.GetList();
      this.isModeJurisdiction();
    },
        
    computed: {
      ...mapGetters({
        token: 'token',
        zzpower: 'zzpower'
      }),
    },
    mounted() {
      console.log(this.zzpower)
    },
    methods: {
      showDetail(data) {
        console.log(data);
        let vm=this;          
        if(data.AppointmentType==1){
          $(".dialog-footer1").show();
          this.dialogVisible1 = true;
          this.diaTitle = data.ApplyHospitalName + '  转诊单';
          axion.GetOutPatientAppointmentView({
              id: data.Id,
              token: vm.token
          }).then(d => {
              this.mzDetails = d.data.extra;
          })
        }else if(data.AppointmentType==4){
          var param = {};
          let PatientName=data.PatientName;
          // param.method = "closeThisTab";
          // window.parent.postMessage(JSON.stringify(param), '*');
          param.method = "addTab";
          if(data.AppointmentState==1){
              param.title = PatientName + "-待审核详情";
          }else if(data.AppointmentState==2){
              param.title = PatientName + "-预住院详情";
          }else if(data.AppointmentState==3){
              param.title = PatientName + "-已拒绝详情";
          }else if(data.AppointmentState==4){
              param.title = PatientName + "-已取消详情";
          }else if(data.AppointmentState==5){
              param.title = PatientName + "-已作废详情";
          }else if(data.AppointmentState==6){
              param.title = PatientName + "-未入院详情";
          }else if(data.AppointmentState==7){
              param.title = PatientName + "-已入院详情";
          }else if(data.AppointmentState==8){
              param.title = PatientName + "-已出院详情";
          }else if(data.AppointmentState==9){
              param.title = PatientName + "-补录详情";
          }
          param.url = linkUrl + 'zhuanZhenInfo/zhuanzhenHop?token=' + this.token
          +'&transferId='+ data.Id+ '&type=' + "self" + '&hosType=1'+'&ModelUrl='+this.$route.query.ModelUrl;
          window.parent.postMessage(JSON.stringify(param), '*');
          // this.$router.push({ path: "/zhuanZhenInfo/zhuanzhenHop?token=" + this.token+"&id="+ data.PatientCardId+ '&TransferId=' + data.Id});   
        }else if(data.AppointmentType==2){
          $(".dialog-footer").show();
          this.dialogVisible2 = true;
          this.diaTitle2 = data.ApplyHospitalName + '  转诊单';
          axion.GetInspectAppointment({
            transferId: data.Id,
            token: vm.token
          }).then(d => {
            this.mzDetails2 = d.data.extra;
          })
        }else if(data.AppointmentType==3){
          this.checkdetail(data);
        }
          
      },
      //查看详情
      checkdetail(data){
        let PatientName=data.PatientName;
        var param = {};
        // param.method = "closeThisTab";
        // window.parent.postMessage(JSON.stringify(param), '*');
        param.method = "addTab";
        if(data.AppointmentState==0){
          param.title = PatientName + "-待审核详情";
        }else if(data.AppointmentState==1){
          param.title = PatientName + "-已接收详情";
        }else if(data.AppointmentState==2){
          param.title = PatientName + "-已拒绝详情";
        }else if(data.AppointmentState==3){
          param.title = PatientName + "-已取消详情";
        }else if(data.AppointmentState==4){
          param.title = PatientName + "-补录详情";
        }
        param.url = linkUrl + 'zhuanZhenInfo/zhuanzhenHop?token=' + this.token
        +'&transferId='+data.Id + '&type=toSelf'+ '&hosType=2' +'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');
      },
      GetList(){
        let vm=this;
        axios.get(apiurl.PatientArchivesGetTransferList,{
          params:{
            // patientId:'33117',
            patientId:vm.$route.query.patientId,
            page:vm.currentPage4,
            rows:vm.pagesize,
            token: vm.token
          }
        }).then(function(res){
          vm.loading=false;
          console.log(res)
          if(res.status==200){
            //门诊检查：(1成功2拒绝3取消4已就诊5已检查6已停诊7待审核)
            //社区：(0待接收 1已接收 2拒绝 3取消 4补录)
            //住院：(1：待审核2：预住院3：已拒绝4：已取消5：已作废6：未入院7：已入院8：已出院9：补录)",
            //取消预约   btnflog 1 重新预约 2 取消预约
            //转诊类型（1门诊转诊 2检查转诊 3社区转诊 4住院转诊）
            res.data.rows.forEach((v,i) => {
              if(v.AppointmentType == 1 || v.AppointmentType == 2){
                if(v.AppointmentState == 1 || v.AppointmentState == 7){
                  console.log('走这里才对')
                  v.ckdetailbtnflog = false;
                  v.btnflog = 2;
                }else if(v.AppointmentState == 2 || v.AppointmentState == 3 || v.AppointmentState == 6){
                  v.ckdetailbtnflog = true;
                  v.btnflog = 1;
                }else{
                  v.ckdetailbtnflog = true;
                  v.btnflog = 0;
                }
              }else if(v.AppointmentType == 3){
                if(v.AppointmentState == 0){
                  if(vm.zzpower == 10){
                    v.ckdetailbtnflog == false;
                  }                  
                  v.btnflog = 3;
                }else{
                  v.ckdetailbtnflog = true;
                  v.btnflog = 0;
                }
              }else if(v.AppointmentType == 4){
                if(v.AppointmentState == 1 || v.AppointmentState == 2){
                  v.ckdetailbtnflog = true;
                  v.btnflog = 2;
                }else if(v.AppointmentState == 3 || v.AppointmentState == 4 || v.AppointmentState == 5 || v.AppointmentState == 6){
                  v.ckdetailbtnflog = true;
                  v.btnflog = 1;
                }else{
                  v.ckdetailbtnflog = true;
                  v.btnflog = 0;
                }
              }
            })
            vm.tableData=res.data;
            console.log(vm.tableData.rows,'++++++s')
          }else{
            vm.$message.error(res.data.mes, '提示', )
          }
            
        }).catch(function(err){
          vm.loading=false;
            console.log(err)
        });
      },
      //门诊检查：(1成功2拒绝3取消4已就诊5已检查6已停诊7待审核)
      //社区：(0待接收 1已接收 2拒绝 3取消 4补录)
      //住院：(1：待审核2：预住院3：已拒绝4：已取消5：已作废6：未入院7：已入院8：已出院9：补录)",
      //取消预约   //转诊类型（1门诊转诊 2检查转诊 3社区转诊 4住院转诊）
      Cancelbtn(data) {
        if(data.AppointmentType == 4){
          this.cancelVisible = true;
          this.transferId = data.Id;
          this.cancelReason = '';
          console.log('aaaaaaaaa+++++',data)
        }else if(data.AppointmentType == 1){
          
          this.mzCancel(data.Id,data.PatientName,data.AppointmentDate)
        }else if(data.AppointmentType == 2){
          
          this.jcCancel(data.Id,data.PatientName,data.CreateDate);
        }
        
      },
      handleClose(done) {
        done();
      },
      // 住院取消
      zyCancel() {
        if(this.cancelReason==''){
          this.$message.error('请填写取消原因');
          return;
        }
        let pama = { token: this.token, transferId: this.transferId, reason: this.cancelReason }
        axion.CancerOrderPost(pama).then(res=>{
          if(res.data.suc){
            this.cancelVisible = false;
            this.$message({
              type: 'success',
              message: '取消预约成功!',
            });
            this.GetList();
          }
        })
      },
      //检查取消
      jcCancel(id, name, date) {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('p', null, '取消' + name + date + '的预约申请？')
          ]),
          showCancelButton: true,
          confirmButtonText: '是',
          cancelButtonText: '否',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              console.log(id)
              axion.CancelInspectAppointment({
                transferId: id,
                token: this.token
              }).then(res => {
                if (res.data.suc == true) {
                  this.$message({
                    type: 'success',
                    message: res.data.mes
                  });
                  this.GetList()
                } else {
                  this.$alert(res.data.mes, '提示', )
                }
              })
            } else {
              done();
            }
          }
        }).then(action => {

        });
      },
      // 门诊取消
      mzCancel(id, PatientName, AppointmentDate) {
        this.$confirm('取消' + PatientName + AppointmentDate + '的预约申请？', '提示', {
          confirmButtonText: '确定',
          concelButtonText: '取消',
          callback: action => {
            console.log(action)
            if (action === 'confirm') {
              axion.CancelAppointment({
                id: id,
                token: this.token
              }).then(d => {
                if (d.data.suc == true) {
                  this.$message({
                    type: 'success',
                    message: d.data.mes
                  });
                  this.GetList();
                }else{
                  this.GetList();
                }
              })
            } else {
            }
          }
        })
      },
      cancelRefer() {
        this.zyCancel();
      },
      //审核
      Auditingbtn(data) {
        var param = {};
        param.method = "addTab";
        param.title = PatientName + "-待审核详情";
        param.url = linkUrl + 'zhuanZhenInfo/zhuanzhenHop?token=' + this.token
        +'&transferId='+ data.id + '&type=toSelf'+ '&hosType=2' +'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');
      },
      //重新预约
      Rescheduling(data){
        this.funYuyue(data,2);
      },
      funYuyue(data,num){
        let vm=this;
        axios.get(apiurl.GetLoginInfo,{
          params:{
            token: vm.token
          }
        }).then(function(res){
          // console.log(res)
          if(res.status==200){
            if(res.data.extra.HealthOrgInfo.Area=="330104"){
              window.open("ClinicReservate://");       
            }else{
              if(vm.isbool){
                if(num==1){
                  vm.goRouterZZ(data);
                }else if(num==2){
                  vm.openLink(data); 
                }
              }else{
                vm.$alert('还没开通此功能，联系客服电话0571-24752375进行开通', '暂无开通', {
                  confirmButtonText: '确定',
                  callback: action => {
                      console.log(action)
                  }
                });
              }
            }
          }else{
            vm.$message.error(res.data.mes, '提示', )
          }              
        }).catch(function(err){
            console.log(err)
        });
      },
      openLink(data){//1门诊转诊 2检查转诊 3社区转诊 4住院转诊
        if(data.AppointmentType==1){
          this.goParentLink('门诊转诊','sign-person-list/mzzzsqsr?token=',data);
        }else if(data.AppointmentType==2){
          this.goParentLink('检查转诊','sign-person-list/yyjyjcsr?token=',data);
        }else if(data.AppointmentType==4){
          this.goParentLink('住院转诊','turnoutlist/hosptlrefrrapply?token=',data);
        }
          
      },
      goParentLink(str,url,data){
        let vm=this;
        let param = {};
        param.method = "addTab";
        param.title = str;
        param.url = linkUrl +url  + vm.token + '&id=' + data.PatientCardId + '&TransferId='+ data.Id +'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');
        // this.$router.push({ path: "/"+url + this.token+"&id="+ data.PatientCardId+ '&TransferId=' + data.Id});          
      },
      openLink2(str,url){
        let vm=this;
        let param = {};
        param.method = "addTab";
        param.title = str;
        param.url = linkUrl +url  + vm.token +'&ModelUrl='+this.$route.query.ModelUrl + '&id=' + this.$route.query.cardId;
        window.parent.postMessage(JSON.stringify(param), '*');
      },
      isModeJurisdiction(){
        let vm=this;
        axios.get(apiurl.GetUserJurisdiction,{
          params:{
            token: vm.token
          }
        }).then(function(res){
          if(res.status==200){
            if(res.data.extra.ReferralJurisdiction>0){
              vm.isbool= true;
            }else{
              vm.isbool= false;
            }
          }else{
            vm.$message.error(res.data.mes, '提示', )
          }            
        }).catch(function(err){
          console.log(err)
        });
      },
      handleCommand(data){
        this.funYuyue(data,1);
        //  console.log(data);
      },
      goRouterZZ(data){
        if(data==1){
          this.openLink2('门诊转诊','sign-person-list/mzzzsqsr?token=');
          //  this.$router.push({ path: "/sign-person-list/mzzzsqsr?token=" + this.token+"&id="+ this.$route.query.cardId});
          // this.$router.push({'name':'mzzzsqsr'});
        }else if(data==2){
          this.openLink2('检查转诊','sign-person-list/yyjyjcsr?token=');
          // this.$router.push({ path: "/sign-person-list/yyjyjcsr?token=" + this.token+"&id="+ this.$route.query.cardId});
          // this.$router.push({'name':'hosptlrefrrapply'});
        }else if(data==4){
          this.openLink2('住院转诊','turnoutlist/hosptlrefrrapply?token=');
          // this.$router.push({ path: "/turnoutlist/hosptlrefrrapply?token=" + this.token+"&id="+ this.$route.query.cardId});
          //  this.$router.push({'name':'yyjyjcsr'});
        }
      },
      handleSizeChange(val) {
        this.pagesize=val;
        console.log(`每页 ${val} 条`);
        this.GetList();
      },
      handleCurrentChange(val) {
        this.currentPage4=val;
        console.log(`当前页: ${val}`);
        this.GetList();
      },
      printBtn1() {
        var self = this;
        $(".dialog-footer1").hide();
        this.dialogVisible1 = false;
        let newWindow = window.open("_blank");   //打开新窗口
        let codestr = self.$refs.printContent1.$el.innerHTML;   //获取需要生成pdf页面的div代码
        newWindow.document.write(`<style>
            .el-row,el-col{border-box;overflow:hidden}
            .el-col-12 {float:left;width: 49%;overflow:hidden}
            h2 {font-size: 18px;text-align: center;font-weight: 500;margin-top: 60px;}
            .el-breadcrumb__item{display:block; height: 44px; width: 100%; line-height: 44px; margin-bottom: 10px; margin-top: 20px; border-bottom:1px solid black;clear:both;}
            .el-form-item {float:left;display:inline-block;padding-right: 10px; box-sizing:border-box;overflow:hidden; }
            .el-form-item__label{float:left;width:100px;text-align: right;vertical-align: middle;font-size: 16px;line-height: 1; padding: 11px 12px 11px 0;box-sizing: border-box;}
            .el-form-item__content {line-height: 20px;font-size: 14px;margin-top: 10px;}
            h4,.tipsDiv{display:block;float:left; width:100% }</style>`
        );
        newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
        newWindow.document.close();     //关闭document的输出流, 显示选定的数据
        newWindow.print();   //打印当前窗口
        console.log(self.$refs.printContent1)
        newWindow.close();
        return true;
      },
      printBtn() {
        var self = this;
        $(".dialog-footer").hide();
        self.dialogVisible2 = false;
        let newWindow = window.open("_blank");   //打开新窗口
        let codestr = self.$refs.printContent.$el.innerHTML;   //获取需要生成pdf页面的div代码
        newWindow.document.write(`<style>
            .el-row,el-col{border-box;overflow:hidden}
            .el-col-12 {float:left;width: 49%;overflow:hidden}
            h2 {font-size: 18px;text-align: center;font-weight: 500;margin-top: 60px;}
            .el-breadcrumb__item{display:block; height: 44px; width: 100%; line-height: 44px; margin-bottom: 10px; margin-top: 20px; border-bottom:1px solid black;clear:both;}
            .el-form-item {float:left;display:inline-block;padding-right: 10px; box-sizing:border-box;overflow:hidden; }
            .el-form-item__label{float:left;width:100px;text-align: right;vertical-align: middle;font-size: 16px;line-height: 1; padding: 11px 12px 11px 0;box-sizing: border-box;}
            .el-form-item__content {line-height: 20px;font-size: 14px;margin-top: 10px;}
            h4,.tipsDiv{display:block;float:left; width:100% }</style>`
        );
        newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
        newWindow.document.close();     //关闭document的输出流, 显示选定的数据
        newWindow.print();   //打印当前窗口
        console.log(self.$refs.printContent)
        newWindow.close();
        return true;
      },          
    }
  }


</script>
<style lang="scss">
  .table-content{
    .el-table__header,.el-table__body-wrapper{
      .cell{
        color: #73879C;
      }
    }
  }
</style>


