<template>
	<div class="container">
		<div class="header">
			<div class="head-title">
				<span class="title-headings">住院转诊   <span class="aftertext"></span></span>
			</div>
			<div class="head-search">
				<el-row>
					<div class="el-form-item mr40">
						<span class="demonstration" v-if="pageType=='self'">转入医院</span><!-- self出院 -->
            <span class="demonstration" v-if="pageType=='toSelf'">转出医院</span><!-- toSelf入院 -->
						<el-select v-model="transferHos" clearable placeholder="请选择" @change="selectHos" @clear="clearHos">
							<!-- <el-option value="" label="请选择"></el-option> -->
							<el-option v-for="(item,index) in GetTransferHosList" :key="index" :value="item.HospitalId" :label="item.HospitalName">
							</el-option>
						</el-select>
					</div>
					<div class="el-form-item mr40">
						<span class="demonstration">申请转入科室</span>
						<el-select v-model="applyTransDept" clearable placeholder="请选择" @visible-change="deptChange">
							<!-- <el-option value="" label="请选择"></el-option> -->
							<el-option v-for="(item,index) in getSectionByHospitalIDList" :key="index" :value="item.Id" :label="item.SectionName">
							</el-option>
						</el-select>
					</div>
					<div class="el-form-item mr40">
            <span class="demonstration">申请入住日期</span>
            <el-date-picker v-model="applyDate1" type="daterange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围" value-format="yyyy-MM-dd" @change="getApplyDate">
            </el-date-picker>
					</div>
					<div class="el-form-item mr40">
						<span class="demonstration">病人姓名</span>
						<el-input v-model="patientName" placeholder="请输入" class="el-icon--left"></el-input>
					</div>
				</el-row>
				<el-row>
					<div class="el-form-item mr40">
            <span class="demonstration">申请日期</span>
            <el-date-picker v-model="applyDateRange"  type="daterange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围" value-format="yyyy-MM-dd" @change="getApplyRange">
            </el-date-picker>
					</div>
					<div class="el-form-item mr40">
            <span class="demonstration">安排入住日期</span>
            <el-date-picker v-model="scheduleDate1" type="daterange" placeholder="选择日期范围" range-separator=" 至 " value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" @change="getScheduleDate">
            </el-date-picker>
					</div>

					<div class="el-form-item mr40">
						<span class="demonstration">安排入住科室</span>
						<el-select v-model="arrangeDept" clearable placeholder="请选择" @visible-change="deptChange">
							<!-- <el-option value="" label="请选择"></el-option> -->
							<el-option v-for="(item,index) in getSectionByHospitalIDList" :key="index" :value="item.Id" :label="item.SectionName">
							</el-option>
						</el-select>
					</div>
					<div class="el-form-item mr40">
						<span class="floatR">
            <el-button  type="" @click="clearPamas">清空</el-button>
          </span>
						<span class="floatR" style="margin-right: 20px;">
            <el-button   type="primary" @click="inquiry">查询</el-button>
          </span>
					</div>
				</el-row>
				<el-row>
					<div class="el-form-item mr40">
						<span class="demonstration">预约状态</span>
						<!-- <span class="orderStatusWrap"><span class="orderStatus" :class="{'orderStatusChecked':status==1}" @click="getData(1)">待审核</span><span class="superscript" v-show="status==1&&OneMore>0">{{OneMore}}</span></span> -->
						<span class="orderStatusWrap"><el-badge :value="OneMore<100?OneMore:'99+'" :hidden="OneMore<=0">
              <span class="orderStatus" :class="{'orderStatusChecked':status==1}" @click="getData(1, 'current')">待审核</span>
            </el-badge></span>
						<span class="orderStatusWrap"><!-- <el-badge :value="OneMore" :hidden="!(status==2&&OneMore>0)"> -->
              <span class="orderStatus" :class="{'orderStatusChecked':status==2}" @click="getData(2, 'current')">预住院</span>
            <!-- </el-badge> --></span>
						<span class="orderStatusWrap"><!-- <el-badge :value="OneMore" :hidden="!(status==3&&OneMore>0)"> -->
              <span class="orderStatus" :class="{'orderStatusChecked':status==3}" @click="getData(3, 'current')">已拒绝</span>
            <!-- </el-badge> --></span>
						<span class="orderStatusWrap"><!-- <el-badge :value="OneMore" :hidden="!(status==4&&OneMore>0)"> -->
              <span class="orderStatus" :class="{'orderStatusChecked':status==4}" @click="getData(4, 'current')">已取消</span>
            <!-- </el-badge> --></span>
						<span class="orderStatusWrap"><!-- <el-badge :value="OneMore" :hidden="!(status==5&&OneMore>0)"> -->
              <span class="orderStatus" :class="{'orderStatusChecked':status==5}" @click="getData(5, 'current')">已作废</span>
            <!-- </el-badge> --></span>
						<span class="orderStatusWrap"><!-- <el-badge :value="OneMore" :hidden="!(status==6&&OneMore>0)"> -->
              <span class="orderStatus" :class="{'orderStatusChecked':status==6}" @click="getData(6, 'current')">未入院</span>
            <!-- </el-badge> --></span>
						<span class="orderStatusWrap"><!-- <el-badge :value="OneMore" :hidden="!(status==7&&OneMore>0)"> -->
              <span class="orderStatus" :class="{'orderStatusChecked':status==7}" @click="getData(7, 'current')">已入院</span>
            <!-- </el-badge> --></span>
						<span class="orderStatusWrap"><!-- <el-badge :value="OneMore" :hidden="!(status==8&&OneMore>0)"> -->
              <span class="orderStatus" :class="{'orderStatusChecked':status==8}" @click="getData(8, 'current')">已出院</span>
            <!-- </el-badge> --></span>
						<span class="orderStatusWrap"><!-- <el-badge :value="OneMore" :hidden="!(status==9&&OneMore>0)"> -->
              <span class="orderStatus" :class="{'orderStatusChecked':status==9}" @click="getData(9, 'current')">补录</span>
            <!-- </el-badge> --></span>
					</div>
				</el-row>
			</div>
		</div>
		<div class="marbot20">
			<el-table class="table-content" :data="tableData" border stripe style="width: 100%">
				<el-table-column type="index" label="编号" width="70">
				</el-table-column>
				<el-table-column prop="PatientName" label="病人姓名" width="180">
				</el-table-column>
				<el-table-column label="时间" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="applyTimeCont" placement="bottom">
              <span v-text="status>2&&status<6?scope.row.LastUpdateTime:scope.row.CreateDate"></span>
            </el-tooltip>
          </template>
				</el-table-column>
				<el-table-column label="入住日期" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="planTimeCont" placement="bottom">
              <span v-text="status==2||status>4&&status<9?scope.row.SureHospitalzedDate:scope.row.AppointmentPlanDate"></span>
            </el-tooltip>
          </template>
				</el-table-column>
				<el-table-column label="转入科室" min-width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="sectionTimeCont" placement="bottom">
              <span v-text="status==2||status>4&&status<9?scope.row.SureAppointmentSectionName:scope.row.AppointmentSectionName"></span>
            </el-tooltip>
          </template>
				</el-table-column>
        <el-table-column :prop="hospitalValue" :label="hospitalType" min-width="120">
				</el-table-column>
				<el-table-column prop="ApplySectionName" label="转出科室" min-width="120">
				</el-table-column>
				<el-table-column prop="ApplyDoctorName" label="转出医院联系人" min-width="120">
				</el-table-column>
				<el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <section v-if="pageType=='self'">
              <el-button type="text" size="small" @click="goDetail(scope.row.Id,scope.row.PatientName)">
                <i class="el-icon-search"></i> 查看详情
              </el-button>
              <el-button type="text" size="small" @click="cancelOrder(scope.row.Id)" v-show="status==1||status==2">
                <i class="el-icon-delete"></i> 取消预约
              </el-button>
              <el-button type="text" size="small" @click="orderAgain(scope.row.Id,scope.row.PatientCardId)" v-show="status>2&&status<7">
                <i class="el-icon-ts-reject"></i> 重新预约
              </el-button>
            </section>
            <section v-if="pageType=='toSelf'">
              <el-button type="text" size="small" @click="goDetail(scope.row.Id,scope.row.PatientName)" v-show="status>1">
                <i class="el-icon-search"></i> 查看详情
              </el-button>
              <el-button type="text" size="small" @click="goReviewed(scope.row.Id,scope.row.PatientName)" v-show="status==1">
                <i class="el-icon-ts-watch"></i> 审核
              </el-button>
              <el-button type="text" size="small" @click="goHospital(scope.row.Id)" v-show="status==2">
                <i class="el-icon-ts-cehui"></i> 办理入院
              </el-button>
              <el-button type="text" size="small" @click="deleteHos(scope.row.Id)" v-show="status==2">
                <i class="el-icon-ts-X"></i> 作废
              </el-button>
              <el-button type="text" size="small" @click="outHos(scope.row.Id)" v-show="status==7">
                <i class="el-icon-ts-reject"></i> 出院
              </el-button>
            </section>
          </template>
				</el-table-column>
			</el-table>
      <div class="block textAlignRight pageBox" v-if="total>0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
		</div>
    
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
    <!-- 作废预约弹窗 -->
    <el-dialog title="作废预约" :visible.sync="refusedialog" width="500px" :before-close="handleClose">
      <section class="m-cancel-reason">
        <span>作废原因</span>
        <el-input type="textarea" :rows="2" placeholder="请输入作废预约原因" v-model="text">
        </el-input>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refusedialog = false">取 消</el-button>
        <el-button type="primary" @click="refuseCom">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 办理入院 -->
    <el-dialog title="办理入院" :visible.sync="hospitalVisible" width="500px" :before-close="handleClose">
      <section class="m-cancel-reason">
        <span>{{hosTitle}}</span>
        <el-input placeholder="请输入" v-model="hosValue">
        </el-input>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hospitalVisible = false">取 消</el-button>
        <el-button type="primary" @click="admisHos">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
import "../../assets/sass/addtransfer.scss";
import { mapGetters, mapActions } from "vuex";
import { linkUrl, apiurl } from "../../service/api.js";
import httpUrl from "../../util/http_url.js";
import axios from "axios";
export default {
  name: "",

  data() {
    return {
      hosId: '',
      fullHeight: 450,
      total: 0,
      OneMore:null,
      pageSize: 10,
      nowpage: 1,
      currentPage: 1,
      GetTransferHosList: [], //转入医院列表
      getSectionByHospitalIDList: [], //科室列表
      form: {
        applyCheckinTime: [], //申请入住有效时间范围
        applyTime: [], //申请有效时间范围
        arrangeCheckinTime: [], //安排入住有效时间范围
        beginTime: "",
        endTime: ""
      },
      tableData: [],
      applyDate: '',//申请入住日期
      applyDate1:'',


      applyDateRange: '',//申请日期
      applyRange: '',

      scheduleDate1:'',
      scheduleDate: '',//安排入住日期
      transferHos: '',//转入医院
      applyTransDept: '',//申请转入科室
      arrangeDept: '',//安排转入科室
      patientName: '',//病人姓名
      applyTimeCont: '申请时间',
      planTimeCont: '申请入住日期',
      sectionTimeCont: '申请转入科室',
      cancelVisible: false,
      cancelReason: '',
      transferId: '',
      status: 1,
      hospitalVisible: false,
      hosTitle: '',
      hosValue: '',
      refusedialog:false,
      deletId:'',
      text:'',
      refuseOrder:{
        token:'',
        transferId:'',
        reason:''
      },
      OutHosp:{
        token:'',
        transferId:'',
      }
    }
  },
  computed: {
    ...mapGetters({
      hosptialid: 'hosptialid'
    }),
    token() {
      return this.$route.query.token
    },
    pageType() {
      return this.$route.query.type
    },
    hospitalType() {
      let type = '';
      if(this.$route.query.type=='self'){
        type = '转入医院';
      }else{
        type = '转出医院';
      }
      return type;
    },
    hospitalValue() {    
      let type = '';
      if(this.$route.query.type=='self'){
        type = 'AppointmentHospitalName';
      }else{
        type = 'ApplyHospitalName';
      }
      return type;
    }
  },
  methods: {
    //获取转入医院列表 lnp
    getTransferHosList() {
      axios
        .get(apiurl.GetTransferHosList, {
          params: {
            type: this.pageType,
            token: this.token
          }
        })
        .then(res => {
          if (res.data.suc == true) {
            this.GetTransferHosList = res.data.rows;
          }
        });
    },
    //获取科室列表
    getSectionByHospitalID() {
      let params = {
        token: this.token
      }
      if(this.pageType == 'toSelf'){
        params.hospitalID = this.hosptialid;
      }else{
        params.hospitalID = this.hosId;
      }
      axios
        .get(apiurl.GetSectionByHospitalID, { params })
        .then(res => {
          if (res.data.suc == true) {
            this.getSectionByHospitalIDList = res.data.rows;
          }
        });
    },
    //查询转诊列表
    getTransferList(num, status) {
      this.nowpage = num;
      this.currentPage = num;
      status = status || 1;
      let cont = {
        HospitalizedState: status
      }
      if(this.applyRange!=''){
        cont.CreateDate = this.applyRange;
      }
      if(this.hosId!=''){
        cont.AppointmentHospitalId = this.hosId;
      }
      if(this.applyDate!=''){
        cont.AppointmentPlanDate = this.applyDate;
      }
      if(this.applyTransDept!=''){
        cont.AppointmentSectionId = this.applyTransDept;
      }
      if(this.patientName!=''){
        cont.PatientName = this.patientName;
      }
      if(this.scheduleDate!=''){
        cont.SureHospitalzedDate = this.scheduleDate;
      }
      if(this.arrangeDept!=''){
        cont.SureAppointmentSectionId = this.arrangeDept;
      }
      cont.type = this.pageType;
      cont.token = this.token,
      cont.page = this.currentPage,
      cont.rows = this.pageSize,
      // cont = JSON.stringify(cont);
      httpUrl.GetTransferListGet(cont).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.tableData = res.data.rows;
          this.OneMore = res.data.OneMore;
          this.total = res.data.total;
        }
      })
    },
    selectHos(value) {
      this.hosId = value;
      if(this.pageType == 'self'){
        this.getSectionByHospitalID();
      }
    },
    clearHos() {
      if(this.pageType=='self'){
        this.applyTransDept = '';
        this.arrangeDept = '';
        this.getSectionByHospitalIDList = [];
      }
    },
    deptChange(flag) {
      if(flag==true&&this.getSectionByHospitalIDList.length==0&&this.pageType=='self'){
        this.$message('请选择医院');
      }
    },
    inquiry() {
      this.getData(this.status, 'current');
    },
    getApplyDate(value) {
      this.applyDate = value;
    },
    getApplyRange(value) {
      this.applyRange = value;
    },
    getScheduleDate(value) {
      this.scheduleDate = value
    },
    goDetail(id, PatientName) {
      var param = {};
      param.method = "closeThisTab";
      window.parent.postMessage(JSON.stringify(param), '*');
      param.method = "addTab";
      if(this.status==1){
        param.title = PatientName + "-待审核详情";
      }else if(this.status==2){
        param.title = PatientName + "-预住院详情";
      }else if(this.status==3){
        param.title = PatientName + "-已拒绝详情";
      }else if(this.status==4){
        param.title = PatientName + "-已取消详情";
      }else if(this.status==5){
        param.title = PatientName + "-已作废详情";
      }else if(this.status==6){
        param.title = PatientName + "-未入院详情";
      }else if(this.status==7){
        param.title = PatientName + "-已入院详情";
      }else if(this.status==8){
        param.title = PatientName + "-已出院详情";
      }else if(this.status==9){
        param.title = PatientName + "-补录详情";
      }
      param.url = linkUrl + 'zhuanZhenInfo/zhuanzhenHop?token=' + this.token
      +'&transferId='+ id+ '&type=' + this.pageType + '&hosType=1'+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
    },
    cancelOrder(id) {
      this.cancelVisible = true;
      this.transferId = id;
      this.cancelReason = '';
    },
    handleClose(done) {
      done();
    },
    cancelRefer() {
      if(this.cancelReason==''){
        this.$message.error('请填写取消原因');
        return;
      }
      let pama = { token: this.token, transferId: this.transferId, reason: this.cancelReason }
      httpUrl.CancerOrderPost(pama).then(res=>{
        if(res.data.suc){
          this.cancelVisible = false;
          this.$message({
            type: 'success',
            message: '取消预约成功!',
          });
          this.getData(this.status);
        }
      })
    },
    getData(s, str){
      this.status = s;
      if(str=='current'){
        this.currentPage = 1;
      }
      this.getTransferList(this.currentPage, s);
      switch(s) {
        case 3:
          this.applyTimeCont = '拒绝时间';
          break;
        case 4:
          this.applyTimeCont = '取消时间';
          break;
        case 5:
          this.applyTimeCont = '作废时间';
          break;
        default:
          this.applyTimeCont = '申请时间';
      }
      if(s>4&&s<9||s==2){
        this.planTimeCont = '安排入住日期';
        this.sectionTimeCont = '安排转入科室';
      }else{
        this.planTimeCont = '申请入住日期';
        this.sectionTimeCont = '申请转入科室';
      }
    },
    orderAgain(id, idCard) {
      var param = {};
      param.method = "addTab";
      param.title = '住院转诊申请';
      param.url = linkUrl + 'turnoutlist/hosptlrefrrapply?token='+this.token
        +'&TransferId='+id+'&id='+idCard+'&type='+this.$route.query.type+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // console.log(id,idCard,'aaaaaaa')
      // this.$router.push({
      //   path: '/turnoutlist/hosptlrefrrapply',
      //   TransferId: id,
      //   id: idCard,
      //   type: this.$route.query.type
      // })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData(this.status, 'current');
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData(this.status);
    },
    goReviewed(id, PatientName) {
      this.goDetail(id, PatientName);
    },
    goHospital(id) {
      let HosType = '';
      this.transferId = id;
      httpUrl.GetShowDialog(this.token).then(res=>{
        if(res.data.suc==true){
          HosType = res.data.rows.HospitalizedFieldType;
          if(HosType==1||HosType==0){
            this.$confirm('是否确定该病人办理入院？', '办理入院', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let pama = { token: this.token, transferId: this.transferId, condition: '' };
              httpUrl.InHospitalPost(pama).then(res=>{
                if(res.data.suc) {
                  this.getData(this.status);
                  this.$message({
                    type: 'success',
                    message: '办理入院成功!',
                  });
                }
              })
            }).catch(() => {});
          }else{
            this.hosValue = '';
            this.hospitalVisible = true;
            if(HosType==2){
              this.hosTitle = '住院号'
            }else{
              this.hosTitle = '病历号'
            }
          }
        }
      })
    },
    clearPamas() {
      this.hosId = '';
      this.applyRange = '';
      this.applyDate1 = '';
      this.applyDate = '';
      this.applyTransDept = '';
      this.patientName = '';
      this.scheduleDate = '';
      this.scheduleDate1 = '';
      
      this.arrangeDept = '';
      this.transferHos = '';
      this.applyDateRange = '';
    },
    admisHos() {
      if(this.hosValue==''){
        this.$message('请填写'+this.hosTitle);
        return;
      }
      let pama = { token: this.token, transferId: this.transferId, condition: this.hosValue };
      httpUrl.InHospitalPost(pama).then(res=>{
        if(res.data.suc==true){
          this.hospitalVisible = false;
          this.getData(this.status);
          this.$message({
            type: 'success',
            message: '成功办理入院！',
          });
        }
      })
    },
    deleteHos(id) {
      this.text = '';
      this.refusedialog=true;
      this.deletId=id;
    },
    refuseCom(){
        if(this.text==''){
          this.$message.error('请填写作废原因');
          return;
        }
        this.refuseOrder.reason=this.text;
        this.refuseOrder.transferId=this.deletId;
        this.refuseOrder.token = this.token

        httpUrl.DeleteOrder(this.refuseOrder).then(d => {
          if(d.data.suc) {
            this.refusedialog=false;
            this.getData(this.status);
            this.$message({
              type: 'success',
              message: '已作废',
            });
          }
        })
    },
    outHos(id) {
      this.$confirm('是否确定该病人出院？', '出院', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.OutHosp.transferId=id;
          this.OutHosp.token=this.token;
          httpUrl.OutHospital(this.OutHosp).then(d => {
            if(d.data.suc) {
              this.getData(this.status);
              this.$message({
                type: 'success',
                message: '办理出院成功!',
              });
            }
          })
        }).catch(() => {});
    }
  },
  mounted() {
    this.getTransferHosList();
    this.getData(this.status, 'current');
    if(this.$route.query.type=='toSelf'){
      this.getSectionByHospitalID();
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: rgba(42, 63, 84, 0.04);
  padding: 0 20px;
  margin-bottom: 20px;
  .head-title {
    height: 58px;
    line-height: 58px;
    border-bottom: 1px solid #e6e6e6;
    .title-headings {
      font-size: 18px;
      color: #73879c;
      margin-right: 5px;
      .aftertext {
        font-size: 12px;
        color: #999999;
      }
    }
    .title-intr {
      font-size: 12px;
      color: #999999;
    }
  }
  .head-search {
    height: 210px;
    padding-top: 16px;
    .el-form {
      float: right;
    }
    .el-form-item {
      float: left;
    }
    .el-input, .el-select {
      width: 220px;
    }
    .el-date-editor--daterange{
      width: 220px;
    }
    .p-radio {
      margin-left: 20px;
      margin-top: 5px;
    }
  }
  .demonstration {
    font-size: 14px;
    color: #73879c;
    margin-right: 5px;
  }
  .orderStatusWrap {
    position: relative;
    margin-right: 23px;
    .orderStatus {
      background: #ffffff;
      border: 1px solid #cccccc;
      border-radius: 12px;
      font-size: 12px;
      color: #666666;
      padding: 3px 10px;
      cursor: pointer;
    }
    .orderStatusChecked {
      background: #ffffff;
      border: 1px solid #02856f;
      border-radius: 12px;
      font-size: 12px;
      color: #02856f;
      padding: 3px 10px;
    }
    .superscript {
      font-family: ArialMT;
      font-size: 12px;
      color: #ffffff;
      text-align: center;
      background: #db524b;
      border-radius: 100px;
      position: absolute;
      right: -7px;
      top: -10px;
      padding: 1px 3px;
    }
  }
}

.floatR {
  float: right;
}

.mt10 {
  margin-top: 10px;
}

.mr10 {
  margin-right: 10px;
}

.mr40 {
  margin-right: 40px;
}

.mt17 {
  margin-top: 17px;
}

.marbot20 {
  margin-bottom: 20px;
}

.popoverbtn {
  text-align: center;
  height: 40px;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
}

.qrcode {
  width: 140px;
  height: 140px;
  margin-left: 60px;
}

.qr-text {
  margin-top: 15px;
  display: block;
  font-size: 14px;
  color: #73879c;
  text-align: center;
}

.qr-text2 {
  display: block;
  font-size: 12px;
  color: #73879c;
  text-align: center;
}

.pub-box {
  line-height: 24px;
  .rightpoint {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    margin-left: 10px;
    position: relative;
    top: -2px;
  }
  .yes {
    background: #58b957;
  }
  .no {
    background: #539cdb;
  }
}
.m-cancel-reason{
  display: flex;
  span{
    display: block;
    width: 80px;
  }
}
textarea{
  resize: none;
}
</style>
<style lang="scss">
.epop {
  padding: 0;
  min-width: 110px;
}

.epop {
  .popoverbtn {
    cursor: pointer;
  }
  .popoverbtn:hover {
    background: #fafafa;
  }
}

.dialogwidth {
  width: 300px;
  min-width: 300px;
}
</style>