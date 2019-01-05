<template>
  <div class="ts-content wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="85px" class="clearfix searchForm">
        <el-row>
          <el-col :span='6'>
            <el-form-item label="申请时间">
              <el-date-picker v-model="form.value" type="daterange" range-separator="至" placeholder="选择日期范围" :picker-options="form.pickerOptions" @change='datavalue'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="送转医院">
              <!-- <el-col :span='11'> -->
              <el-select v-model="form.value1" placeholder="请选择" @change="GetSectionByHospitalID" clearable>
                <el-option v-for="item in form.jzjg" :label="item.HospitalName" :value="item.HospitalId" :key="item.HospitalId">
                </el-option>
              </el-select>
              <!-- </el-col> -->
              <!-- <el-col :span='11'>
                        <el-select v-model="deptvalue" placeholder="请选择">
                          <el-option v-for="item in dept" :key="item.Id" :label="item.SectionName" :value="item.Id">
                          </el-option>
                        </el-select>
                      </el-col> -->
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="患者姓名">
              <el-input v-model="form.input1" placeholder="请输入患者姓名" style='border-radion:0;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='1' style='margin-right:15px;'>
            <el-form-item class='no_margin_left'>
              <el-button type="primary" @click="search()">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span='1'>
            <el-form-item class='no_margin_left'>
              <el-button type="info" @click="waitExport">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData.rows" stripe style="width: 100%" highlight-current-row>
        <el-table-column label="序号" width="65" type='index'></el-table-column>
        <el-table-column prop="ApplyHospitalName" label="送转医院" width="180"></el-table-column>
        <el-table-column prop="SectionName" label="送转科室" width="140"></el-table-column>
        <el-table-column prop="DoctorName" label="送转医生" width="140"></el-table-column>
        <el-table-column prop="PatientName" label="病人姓名" width="100"> </el-table-column>
        <!-- <el-table-column prop="AppointmentHospitalName" label="接诊机构" width="180"></el-table-column> -->
        <el-table-column prop="ApplyDateFormat" label="申请时间" width="140"> </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <span class="check_btn el-icon-check" @click="handleAgree(scope.$index, scope.row)">通过</span>&nbsp;
            <span class="cancel_btn el-icon-ts-X" @click="handleRefuse(scope.$index, scope.row)">拒绝</span>
            <span class="check_btn el-icon-ts-serch" @click='checkdetail(scope.row.Id,scope.row.AppointmentState,scope.row.PatientName)'>查看详情</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="AppointmentStateText" label="进度状态" width="140"> 
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="sizepage" layout="total, prev, pager, next, sizes" :total="tableData.total">
        </el-pagination>
      </div>
      <el-dialog class="el-width-25" title="提示" :visible.sync="passdialogFormVisible">
        <el-form :model="form">
          <p class="el-p">请选择接诊的医生</p>
          <el-select v-model="form.value8" placeholder="请选择" @change="changeDoc()">
            <el-option v-for="item in form.options" :label="item.Text" :value="item.Value" :key="item.Value">
            </el-option>
          </el-select>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="passdialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="agree()">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog class="el-width-25" title="拒绝理由" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-select v-model="form.value9" placeholder="请选择" @change="changeRefuse()">
            <el-option v-for="item in form.reason" :label="item.text" :value="item.text" :key="item.id">
            </el-option>
          </el-select>
          <el-input v-model="form.textarea8" type="textarea" :rows="3" placeholder="多行文字" v-if='form.value9=="其他"'></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="chanle()">取 消</el-button>
          <el-button type="primary" @click="refuse()">确 定</el-button>
        </div>
      </el-dialog>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import '../../assets/sass/patient.css';
import { apiurl,linkUrl } from '../../service/api.js';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
const token = localStorage.getItem("tokenL");
export default {
  name: 'table',
  data() {
    return {
      newdatavalue: '',
      value: '',
      tableData: [],
      currentVal: '',
      hospitalID: '',
      applySectionId: '',
      applyHospitalId: '',
      RefuseCode: '',
      othertext: false,
      dept: [],
      deptvalue: null,
      form: {
        value: '',
        jzjg: [],
        options: [],

        reason: [],
        value1: null,
        input1: '',
        value8: '',
        value9: '',
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

      },
      rules: {
        input5: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: this.checkWord, trigger: 'blur' }
        ]
      },
      page: 1,
      rows: 10,
      sizepage: 0,
      passdialogFormVisible: false,
      AppointmentDoctorId: '',
      TransferTreatmentBaseId: '',
      //table
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
    };
  },
  computed: {
    ...mapGetters({
      hosptialid: 'hosptialid', hosptialname: 'hosptialname', token: 'token'
    }),
  },
  watch: {
    '$route'() {
      this.$router.go(0);
    }
  },
  mounted() {
    var self = this;
    // 下拉框医院
    self.GetHospitalList()
    // 接诊医生
    self.GetTreatmentDoctorList()
    // 列表
    self.GetWaitlist()
    //拒绝原因
    self.GetRefuseReasons();
    // console.log(this.hosptialid)
    // this.form.value1=this.hosptialname;
  },
  methods: {
    ...mapActions([
      'set_waitid', 'set_waitstate'
    ]),
    //显示的日期
    datavalue(val) {
      var self = this;
      self.newdatavalue = val;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      val = parseInt(val)
      this.sizepage = val;
      this.rows = val;
      this.GetWaitlist()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      val = parseInt(val)
      console.log(val)
      this.currentVal = val - 1;
      this.page = val
      this.GetWaitlist()
    },
    //查询
    search() {
      console.log(this.form.value)
      this.GetWaitlist()
    },
    //查看详情
    checkdetail(waitid, waitstate, name) {
      var self = this;
      self.set_waitid(waitid);
      self.set_waitstate(waitstate);
      console.log(name, 'name')
      var param = {};
      param.method = "addTab";
      param.title = name + "-待接收";
      param.url = linkUrl + 'invaliddetail/invaliddetail?token=' + self.token + "&ttb_id=" + waitid + '&waitstate' + waitstate +'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      console.log(name, param, 'param')
      // this.$router.push('/invaliddetail/invaliddetail');
    },
    // 列表
    GetWaitlist() {
      var self = this;
      axios.get(apiurl.GetWaitTreatmentPatientList, {
        params: {
          token: token,
          page: self.page,
          rows: self.rows,
          applyHospitalId: this.form.value1,
          applySectionId: '',
          applyDate: self.newdatavalue,
          patientName: self.form.input1
        }
      })
        .then(function(response) {
          self.tableData = response.data;
        })
        .then(function(response) {
          self.tableData = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 医院token
    GetHospitalList() {
      var self = this;
      axios.get(apiurl.GetIsDowmTransferHigherHospitalList, {
        params: {
          token: token
        }
      })
        .then(function(response) {
          self.form.jzjg = response.data.rows;
          console.log(self.form.jzjg, 'reason')
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //接诊医生
    GetTreatmentDoctorList() {
      var self = this;
      axios.get(apiurl.GetTreatmentDoctorList, {
        params: {
          token: token
        }
      })
        .then(function(response) {
          console.log(response)
          self.form.options = response.data.rows;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 科室下拉
    GetSectionByHospitalID(val) {
      var self = this;
      self.applyHospitalId = val;
      console.log(val, 'val')
      axios.get(apiurl.GetSectionByHospitalID, {
        params: {
          token: token,
          hospitalID: val
        }
      }).then(function(response) {
        self.dept = response.data.rows;
        console.log(self.dept, 'self.form.dept');
      })
        .catch(function(error) {
          console.log(error);
        });
    },
    //拒绝原因整合
    GetRefuseReasons() {
      var self = this;
      axios.get(apiurl.GetRefuseReasons, {
        params: {
          token: token,
        }
      })
        .then(function(response) {
          self.form.reason = response.data.rows;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 同意转诊
    AgreeTurnDown() {
      var self = this;
      axios.post(apiurl.AgreeTurnDownTreatment, {

        AppointmentDoctorId: this.AppointmentDoctorId,
        TransferTreatmentBaseId: this.TransferTreatmentBaseId
      }, {
          headers: {
            token: token,
          }
        })
        .then(function(response) {
          self.GetWaitlist()
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 拒绝转诊
    RefuseTurnDownTreatment() {
      var self = this;
      if (this.form.value9 == '其他') {
        this.RefuseReason = this.form.textarea8;
      }
      axios.post(apiurl.RefuseTurnDownTreatment, {
        RefuseReason: this.RefuseReason,
        // RefuseCode:this.RefuseCode,
        TransferTreatmentBaseId: this.TransferTreatmentBaseId
      }, {
          headers: {
            token: token,
          }
        })
        .then(function(response) {
          self.GetWaitlist()
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeRefuse(val) {
      console.log(this.form.value9, 'val')
      // this.RefuseCode = this.form.value9;
      this.RefuseReason = this.form.value9;
    },
    changeDoc() {
      console.log(this.form.value8)
      this.AppointmentDoctorId = this.form.value8;
    },
    changeDept() {
      console.log(this.form.value2)
      this.applySectionId = this.form.value2;
    },
    // changeVal(val){
    //   var self=this;
    //     console.log(val,'改变后获得的值')
    //     // this.hospitalID = val;
    //     self.applyHospitalId = val;
    //     self.GetSectionByHospitalID(val)
    // },
    //同意转诊
    handleAgree(index, row) {
      console.log(index, row);
      console.log(row.Id);
      this.TransferTreatmentBaseId = row.Id
      this.passdialogFormVisible = true;
    },
    // 拒绝转诊
    handleRefuse(index, row) {
      console.log(index, row);
      console.log(row.Id);
      this.TransferTreatmentBaseId = row.Id
      this.dialogFormVisible = true;
    },
    agree() {
      if (this.AppointmentDoctorId) {
        this.AgreeTurnDown()
        this.GetWaitlist()
        this.passdialogFormVisible = false;
        this.form.value8 = '';
        this.GetWaitlist();
      } else {
        this.$alert('请选择医生', '提示', {
        });
        this.passdialogFormVisible = true;
      }

    },
    refuse() {
      console.log(this.RefuseCode, 'aaaa')
      if (this.form.value9 != '其他') {
        this.RefuseTurnDownTreatment()
        this.dialogFormVisible = false;
        this.GetWaitlist();
        this.form.value9 = '';
        this.form.textarea8 = '';
      } else {
        if (this.form.textarea8) {
          this.RefuseTurnDownTreatment()
          this.dialogFormVisible = false;
          this.GetWaitlist();
          this.form.value9 = '';
          this.form.textarea8 = '';
        } else {
          this.$alert('请完善拒绝理由', '提示', {
          });
          this.dialogFormVisible = true;
        }
      }
    },
    chanle() {
      this.dialogFormVisible = false;
      this.form.value9 = '';
      this.form.textarea8 = '';
    },
    //待转诊导出
    ExportPatientToReceive() {
      var self = this;
      axios.get(apiurl.ExportPatientToReceive, {
        params: {
          token: token,
          hospitalId: self.applyHospitalId,
          applyDate: self.newdatavalue,
          patientName: self.form.input1
        }
      })
        .then(function(response) {
          // self.tableData=response.data;
        })
        .then(function(response) {
          // self.tableData=response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    waitExport() {
      var self = this;
      if (self.newdatavalue == undefined) {
        self.newdatavalue = ''
      }
      if (self.applyHospitalId == undefined) {
        self.applyHospitalId = ''
      }
      if (self.form.input1 == undefined) {
        self.form.input1 = ''
      }
      self.hrefvalue = apiurl.ExportWaitTreatmentPatient + '?applyDate=' + self.newdatavalue + '&applyHospitalId=' + self.applyHospitalId + '&patientName=' + self.form.input1 + '&token=' + token;
      window.open(self.hrefvalue, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.main-wrap {
  padding: 0;
}

.check_btn,
.cancel_btn,
.angin_btn {
  font-size: 12px;
  color: #539CDB;
  cursor: pointer;
}

.el-date-editor--daterange.el-input {
  width: auto;
}

.wrapper-datepicker {
  .el-form-item {
    width: auto;
  }
  .demonstration {
    display: inline-block;
    width: 65px;
    margin-right: 20px;
    text-align: right;
  }
  .select_option {
    width: 200px;
    height: 34px;
  }
  .el-table th {
    background-color: #FFFFFF !important;
  }

  .el-table__footer-wrapper thead div,
  .el-table__header-wrapper thead div {
    background-color: #FFFFFF !important;
  }

  .el-table tr {
    background-color: #F7F7F7 !important;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #FFFFFF none repeat scroll 0 0 padding-box;
  }
  .tag_text1 b,
  .tag_text2 b,
  .tag_text3 b {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
    margin-left: 5px;
  }
  .tag_text1 b {
    background: #539CDB;
  }
  .tag_text2 b {
    background: #58B957;
  }
  .tag_text3 b {
    background: #455667;
  } // 分页
  .pag-ul {
    padding: 0;
    list-style: none;
    overflow: hidden;
    .pag-li {
      text-align: center;
      float: left;
      width: 50%;
    }
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    line-height: 44px;
    margin-bottom: 10px;
  }
  .block {
    padding-left: 185px;
    margin-bottom: 60px;
  }
  .block-add {
    margin-top: 16px;
  }
  .el-pagination {
    text-align: right;
    margin-top: 50px;
  }
  .el-pagination__sizes {
    margin-left: 20px;
  }
}

.el-p {
  height: 40px;
}
</style>
