<template>
  <div class="ts-content wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" :model="form" label-width="85px" class="clearfix searchForm">
        <el-row>
          <el-col :span='6'>
            <el-form-item label="申请时间">
              <!-- <el-col :span="24"> -->
              <el-date-picker v-model="form.value" type="daterange" align="right" placeholder="选择日期范围" :picker-options="form.pickerOptions" @change='datavalue' range-separator="至">
              </el-date-picker>
              <!-- </el-col> -->
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item label="接诊机构">
              <!-- <el-col :span="24"> -->
              <el-select v-model="form.Hospitalselect" placeholder="请选择" clearable>
                <el-option v-for="item in form.jzjg" :key="item.HospitalId" :label="item.HospitalName" :value="item.HospitalId">
                </el-option>
              </el-select>
              <!-- </el-col> -->
            </el-form-item>
          </el-col>
          <el-col :span='9'>
            <el-form-item label="患者姓名">
              <!-- <el-col :span="24"> -->
              <el-input v-model="form.patientName" placeholder="请输入患者姓名" style='border-radion:0;'></el-input>
              <!-- </el-col> -->
            </el-form-item>
          </el-col>
          <el-col :span='1' style='margin-right:15px;'>
            <el-form-item class='no_margin_left' style='margin-right:10px;'>
              <el-button type="primary" @click='tabledata()'>查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span='1'>
            <el-form-item class='no_margin_left'>
              <el-button type="info" @click='exportexl()'>导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="65"> </el-table-column>
        <el-table-column prop="AppointmentHospitalName" label="接诊机构" width="180"></el-table-column>
        <el-table-column prop="PatientName" label="病人姓名" width="100"> </el-table-column>
        <!-- <el-table-column prop="ApplyHospitalName" label="送转医院" width="180"></el-table-column> -->
        <el-table-column prop="SectionName" label="送转科室" width="140"></el-table-column>
        <el-table-column prop="DoctorName" label="送转医生" width="140"></el-table-column>
        <el-table-column prop="TransferTreatmentReason" label="送转原因" width="140"></el-table-column>
        <el-table-column prop="ApplyDateFormat" label="申请时间" width="140"> </el-table-column>
        <el-table-column label="操作" width="140" style='background:#fff;'>
          <template slot-scope="scope">
            <span class="check_btn el-icon-ts-serch" @click='checkdetail(scope.row.Id,scope.row.AppointmentState,scope.row.PatientName)'>查看详情</span>
            <span class="cancel_btn el-icon-ts-X" @click='cancelbtn(scope.row.Id,scope.row.PatientName,scope.row.ApplyDateFormat)'>取消</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="AppointmentStateText" label="进度状态" width="100">
          <template slot-scope="scope">
            <div v-if='scope.row.AppointmentState==0' class="tag_text1">待接收
              <b></b>
            </div>
            <div v-if='scope.row.AppointmentStateText=="已接收"' class="tag_text2">已接收
              <b></b>
            </div>
            <div v-if='scope.row.AppointmentStateText=="已取消"' class="tag_text3">已取消
              <b></b>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import { mapGetters, mapActions } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js';
import axios from 'axios';
export default {
  name: 'table',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      currentNum: 10,
      total: 0,
      sqdata: '',
      form: {
        jzjg: [],
        Hospitalselect: '',
        patientName: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value: ''
      },
      newdatavalue: ''
    };
  },
  computed: {
    ...mapGetters({
      token: 'token', seedpatiendid: 'seedpatiendid', waitid: 'waitid', waitstate: 'waitstate'
    })
  },
  mounted() {
    var self = this;
    // 接诊机构下拉框
    axios.get(apiurl.GetCooperateHospitalList, {
      params: {
        token: self.token
      }
    })
      .then(function(response) {
        var data = response.data.rows;
        self.form.jzjg = data;
      })
      .catch(function(error) {
        console.log(error);
      });
    // 表格
    axios.get(apiurl.GetPatientToReceiveList, {
      params: {
        page: self.currentPage,
        rows: self.currentNum,
        applyDate: '',
        hospitalId: self.form.Hospitalselect,
        patientName: self.form.patientName,
        token: self.token
      }
    })
      .then(function(response) {
        var data = response.data.rows;
        self.tableData = data;
        self.total = response.data.total;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    ...mapActions([
      'set_waitid', 'set_waitstate'
    ]),
    datavalue(val) {
      var self = this;
      self.newdatavalue = val;
    },
    handleSizeChange(val) {
      var self = this;
      self.currentNum = val;
      self.tabledata();
      console.log(self.sqdata);
    },
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.tabledata();
      console.log(`当前页: ${val}`);
    },
    cancelbtn(ttb_id, pname, adata) {
      var self = this;
      this.$confirm('取消' + pname + adata + '此条转诊申请？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          if (action == 'confirm') {
            console.log(ttb_id, action);
            axios.post(apiurl.CancelPatientToReceive + '?ttb_id=' + ttb_id, {
              // ttb_id:ttb_id,
              // token:'9022cc3ae471497e9b7766bc04c7ffda'
            }, {
                headers: {
                  'token': self.token
                }
              })
              .then(function(response) {
                console.log(response);
                self.tabledata();
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
      });
    },
    tabledata() {
      var self = this;
      axios.get(apiurl.GetPatientToReceiveList, {
        params: {
          page: self.currentPage,
          rows: self.currentNum,
          applyDate: self.newdatavalue,
          hospitalId: self.form.Hospitalselect,
          patientName: self.form.patientName,
          token: self.token
        }
      })
        .then(function(response) {
          var data = response.data.rows;
          self.tableData = data;
          self.total = response.data.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkdetail(waitid, waitstate,name) {
      var self = this;
      self.set_waitid(waitid);
      self.set_waitstate(waitstate);
      var param = {};
      param.method = "addTab";
      param.title = name+'-待接收';
      param.url = linkUrl + 'invaliddetail/invaliddetail?token='+self.token + "&ttb_id=" + waitid + '&waitstate' + waitstate+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push('/invaliddetail/invaliddetail');
      console.log(self.waitstate)
    },
    // 导出
    exportexl() {
      var self = this;
      if (self.newdatavalue == undefined) {
        self.newdatavalue = ''
      }
      if (self.form.Hospitalselect == undefined) {
        self.form.Hospitalselect = ''
      }
      if (self.form.patientName == undefined) {
        self.form.patientName = ''
      }
      self.hrefvalue = apiurl.ExportPatientToReceive + '?applyDate=' + self.newdatavalue + '&hospitalId=' + self.form.Hospitalselect + '&patientName=' + self.form.patientName + '&token=' + self.token;
      window.open(self.hrefvalue, '_blank');
    }
  }
};
</script>    
<style scoped>
.el-date-editor--daterange.el-input {
  width: 100%;
}
</style>
      