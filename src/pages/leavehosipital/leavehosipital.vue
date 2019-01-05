<template>
  <div class="ts-content wrapper-datepicker newcss">
    <main class="main-wrap tableellipsis">
      <el-form ref="form" :model="form" :rules="rules" label-width="85px" class="clearfix">
        <el-form-item class='floatLeft no_margin_left'>
          <el-dropdown @command="handleCommand">
            <el-button type="info">
              手动新增转诊
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command='门诊转诊'>门诊转诊</el-dropdown-item>
              <el-dropdown-item command='检查检验转诊'>检查检验转诊</el-dropdown-item> -->
              <el-dropdown-item command='住院转诊'>住院转诊</el-dropdown-item>
              <el-dropdown-item command='社区转诊'>社区转诊</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item class='floatLeft' label="出院日期">
          <el-col :span="24">
            <el-select v-model="form.datavalue" placeholder="请选择" @change='datachange()'>
              <el-option v-for="item in form.dataselect" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item class='floatRight 
        '>
          <el-button type="primary" @click='tablejk()'>查询</el-button>
        </el-form-item>
        <el-form-item class='floatRight'>
          <el-col :span="24">
            <el-select v-model="form.namevalue" placeholder="请选择" style='width:30%;position:relative;top:2px;' @change='namechange()'>
              <el-option v-for="item in form.nameselect" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="form.selectinputvalue" placeholder="请输入" style='border-radion:0;width:65%;' @change='selectinput()'></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item class='floatLeft' >
              <el-col :span="24">
                <el-select v-model="form.datavalue" placeholder="请选择" @change='datachange()'>
                  <el-option v-for="item in form.dataselect" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>  -->

      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="tableCurrentChange">
        <el-table-column type='index' label="序号" width="65"> </el-table-column>
        <el-table-column prop="PatientName" label="病人姓名" width="100"> </el-table-column>
        <el-table-column prop="PatientSex" label="性别" width="60"></el-table-column>
        <el-table-column prop="PatientAge" label="年龄" width="65"></el-table-column>
        <el-table-column prop="PatientCardId" label="身份证号码" width="180"></el-table-column>
        <el-table-column prop="PatientPhone" label="手机号码 " width="120"> </el-table-column>
        <el-table-column prop="Diagnose" label="出院诊断" width="150"> </el-table-column>
        <el-table-column prop="DischargeDate" label="出院日期" width="120"></el-table-column>
        <!-- <el-table-column prop="TransferTreatmentNum" label="转诊记录" width="80">
          <template slot-scope="scope">
            <div v-if='scope.row.TransferTreatmentNum<=0' class="tag_text1">无</div>
            <div v-if='scope.row.TransferTreatmentNum>0' class="tag_text2" @click='zzrecord(scope.row.Id,scope.row.PatientCardId)'>查看</div>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="150">          
          <template slot-scope="scope">
            <el-button type="text" class="padding0X fontsize-2" @click="handleCheck_zyzz(scope.row.PatientCardId)">
              <i class="marginright5"></i>住院转诊
            </el-button>
            <span class="check_btn" @click='seedzz(scope.row.Id)'>社区转诊</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total='total'>
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import { mapGetters, mapActions } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js'
import axios from 'axios';
export default {
  name: 'table',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      currentNum:10,
      total:0,
      form: {
        dataselect: [{
          value: 'oneMonth',
          label: '近一月'
        }, {
          value: 'halfMonth',
          label: '近半月'
        }, {
          value: 'oneWeek',
          label: '近一周'
        }],
        nameselect: [{
          value: 'xm',
          label: '病人姓名'
        }, {
          value: 'dz',
          label: '出院诊断'
        }],
        namevalue: '病人姓名',
        datavalue: '近一月',
        selectinputvalue: '',
        searchType: '',
        seachKey: '',
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
      rules: {
        input5: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: this.checkWord, trigger: 'blur' }
        ]
      },

    };
  },
  created() {

  },
  computed: {
    ...mapGetters({
      idcard: 'idcard', patientid: 'patientid', token: 'token', seedpatiendid: 'seedpatiendid'
    }),
  },
  mounted() {
    var self = this;
    axios.get(apiurl.GetList, {
      params: {
        page: self.currentPage,
        rows: self.currentNum,
        dateUnit: 'oneMonth',
        searchType: 'xm',
        seachKey: '',
        token: self.token
      }
    })
      .then(function(response) {
        var data = response.data.rows
        self.tableData = data;
        self.total = response.data.total;
        self.tableData.forEach(function(v, i) {
          v.PatientSex == 1 ? v.PatientSex = '男' : v.PatientSex = '女';
          // v.DischargeDate = new Date(v.DischargeDate).getFullYear() + '-' + ((new Date(v.DischargeDate).getMonth() + 1) > 10 ? (new Date(v.DischargeDate).getMonth() + 1) : '0' + (new Date(v.DischargeDate).getMonth() + 1)) + '-' + ((new Date(v.DischargeDate).getDate()) > 10 ? (new Date(v.DischargeDate).getDate()) : '0' + (new Date(v.DischargeDate).getDate()));
          // console.log(v.DischargeDate)
        })
        // console.log(self.tableData,response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    ...mapActions([
      'set_idcard', 'set_patientid', 'set_seedpatiendid','set_resend1'
    ]),    
    handleCommand(command) {
      console.log(command)
      this.set_seedpatiendid(0);
      if(command == '社区转诊'){
        var param = {};
        param.method = "addTab";
        param.title = '社区转诊申请';
        param.url =linkUrl + 'turnout/addtransfer?token='+this.token +'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');
        console.log(window.location)

      // this.$router.push('/turnout/addtransfer');
      }else if(command == '住院转诊'){
        var param = {};
        param.method = "addTab";
        param.title = '住院转诊申请';
        param.url = linkUrl + 'turnoutlist/hosptlrefrrapply?token=' + this.token+'&type='+this.$route.query.type+'&handAdd=true'+'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');
        // this.$router.push({
        //   path: '/turnoutlist/hospitalone'
        // })
      }
    },
    addtransfer(){
      var self=this;
      self.set_seedpatiendid(0);
      self.set_resend1(0);
      var param = {};
      param.method = "addTab";
      param.title = '社区转诊申请';
      param.url = linkUrl + 'turnout/addtransfer?token='+self.token+'&id=0'+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push('/turnout/addtransfer');
    },
    zzrecord(patientid, idcard) {
      var self = this;
      self.set_patientid(patientid)
      self.set_idcard(idcard)
      var param = {};
      param.method = "addTab";
      param.title = '转诊记录';
      param.url = linkUrl + 'leavehosipital/zzrecord?token='+self.token+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // self.$router.push('/leavehosipital/zzrecord');
    },
    handleCheck_zyzz(id) {
      var param = {};
      param.method = "addTab";
      param.title = '住院转诊申请';
      param.url = linkUrl + 'turnoutlist/hosptlrefrrapply?token=' + this.token + '&id=' + id+'&type='+this.$route.query.type+'&handAdd=true'+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push({
      //   path: '/turnoutlist/hosptlrefrrapply',
      //   query: {
      //     id: id
      //   }
      // })
    },
    tableCurrentChange(val) {
      this.currentRow = val;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleSizeChange(val) {
      var self = this;
      self.currentNum = val;
      self.tablejk();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.tablejk();
      console.log(`当前页: ${val}`);
    },
    datachange() {
      var self = this;
      self.dateUnit = self.form.datavalue;
    },
    namechange() {
      var self = this;
      self.searchType = self.form.namevalue;
    },
    selectinput() {
      var self = this;
      console.log(self.form.selectinputvalue)
      self.seachKey = self.form.selectinputvalue;
    },
    tablejk() {
      var self = this;
      console.log(self.token,'self.token')
      axios.get(apiurl.GetList, {
        params: {
          page: self.currentPage,
          rows: self.currentNum,
          dateUnit: self.dateUnit == undefined ? 'oneMonth' : self.dateUnit,
          searchType: self.searchType == undefined ? 'xm' : self.searchType,
          seachKey: self.seachKey == undefined ? '' : self.seachKey,
          token: self.token
        }
      })
        .then(function(response) {
          var data = response.data.rows
          self.tableData = data;
          self.tableData.forEach(function(v, i) {
            v.PatientSex == 1 ? v.PatientSex = '男' : v.PatientSex = '女';
            // v.DischargeDate = new Date(v.DischargeDate).getFullYear() + '-' + ((new Date(v.DischargeDate).getMonth() + 1) > 10 ? (new Date(v.DischargeDate).getMonth() + 1) : '0' + (new Date(v.DischargeDate).getMonth() + 1)) + '-' + ((new Date(v.DischargeDate).getDate()) > 10 ? (new Date(v.DischargeDate).getDate()) : '0' + (new Date(v.DischargeDate).getDate()));
            // console.log(v.DischargeDate)
          })

          // console.log(self.tableData,response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 发起转诊
    seedzz(id) {
      var self = this;
      self.set_seedpatiendid(id);
      self.set_resend1(2)
      console.log(self.seedpatiendid)
      var param = {};
      param.method = "addTab";
      param.title = '社区转诊申请';
      param.url =linkUrl + 'turnout/addtransfer?token='+self.token+'&id='+self.seedpatiendid+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      console.log(window.location)

      // this.$router.push('/turnout/addtransfer');
    }
  }
};
</script>


<style lang="scss" scoped>
* {
  font-size: 12px;
}

.check_btn,
.cancel_btn,
.angin_btn {
  font-size: 12px;
  color: #539CDB;
  cursor: pointer;
}

.main-wrap {
  padding: 0;
}

.el-date-editor--daterange.el-input {
  width: 200px;
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
  } // .el-date-editor{
  //   .el-input__icon{
  //     left:0;
  //   }
  // }  
  // .el-input__inner{
  //   padding-left: 35px;
  //   padding-right: 0;
  // }
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
  } // 分页
  .tag_text2 {
    color: #539CDB;
    cursor: pointer;
  }
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
</style>