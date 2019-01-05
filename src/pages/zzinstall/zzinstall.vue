
<template>
  <div class="ts-content wrapper-datepicker newcss tablecheck nowidth">
    <main class="main-wrap">
      <el-form ref="form" label-width="100px" class="clearfix searchForm">
        <el-row>
          <el-col :span='15'>
            <el-form-item label="所属区域">
              <!-- <el-row class="flex-align"> -->
              <el-col :span="5" style='margin-right:15px;'>
                <el-select v-model="Provincevalue" clearable placeholder="选择省" @change='selectcityid(Provincevalue,City)' disabled>
                  <el-option v-for="item in Province.rows" :key="item.Code" :label="item.Name" :value="item.Code">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" style='margin-right:15px;'>
                <el-select v-model="Cityvalue" clearable placeholder="选择市" @change='selectareaid(Cityvalue,Area)'>
                  <el-option v-for="item in City.rows" :key="item.Code" :label="item.Name" :value="item.Code" >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" style='margin-right:15px;'>
                <el-select v-model="Areavalue" clearable placeholder="选择区县" @change='selectsqid(Areavalue,Area)'>
                  <el-option v-for="item in Area.rows" :key="item.Code" :label="item.Name" :value="item.Code">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-select v-model="Communityvalue" clearable placeholder="社区">
                  <el-option v-for="item in Community.rows" :key="item.Id" :label="item.HospitalName" :value="item.Id">
                  </el-option>
                </el-select>
              </el-col>
            <!-- </el-row> -->
            </el-form-item>
          </el-col>
          <el-col :span='9'>
            <el-col :span="20">
            <el-form-item label="社区名称">
                <el-input v-model="hospitalName" placeholder="请输入社区名称" style='border-radion:0;'></el-input>
            </el-form-item>
            </el-col>
            <el-col :span='4'>
              <el-form-item class='no_margin_left widthauto'>
                <el-button type="primary" @click='tablejk()'>查询</el-button>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" border stripe style="width: 100%" highlight-current-row @cell-click="tableCurrentChange" class='nopadding' @header-click='allchoose'>
        <el-table-column type="index" label="序号" width="80"> </el-table-column>
        <el-table-column prop="TransHospitalName" label="社区医院" width="180"> </el-table-column>
        <!-- <el-table-column type="selection" width="100" @change='aaa()'></el-table-column>
              <el-table-column type="selection" width="100"></el-table-column> -->
        <el-table-column label-class-name='' type='IsAppointmentTrans' label='建立上转关系' width="120" class-name='chooseallup'>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.IsAppointmentTrans" @change='checktalbe()' :disabled="IsAppointment==0">门诊预约</el-checkbox>
            <el-checkbox v-model="scope.row.IsCheckTransfer" @change='checktalbe()' :disabled="IsExaminationAppointment==0">检查检验预约</el-checkbox>
          </template>
        </el-table-column>
        <!-- <el-table-column type='IsAppointmentTrans' label='建立上转关系' width="100">
                <template  slot-scope="scope" class="aa" ref="aaCol" >
                  <el-checkbox v-model="scope.row.IsAppointmentTrans" @change='checktalbe()' class="ss"></el-checkbox>
                </template>          
              </el-table-column> -->
        <el-table-column type='IsDowmTransfer' label='建立下转关系' width="100" label-class-name='' class-name='choosealldown'>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.IsDowmTransfer" @change='checktalbe()'>向下转诊</el-checkbox>
          </template>
        </el-table-column>
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
import { apiurl } from '../../service/api.js'
import axios from 'axios';
import qs from 'qs';
export default {
  name: 'table',
  data() {
    return {
      aa: 'aa',
      Province: [],
      Provincevalue: '',
      City: [],
      Cityvalue: '',
      Area: [],
      Areavalue: '',
      Community: [],
      Communityvalue: '',
      hospitalName: '',
      radio: '',
      tableData: [],
      currentPage: 1,
      currentNum:10,
      total: 0,
      provinceid: '',
      cityid: '',
      flogclass: false,
      Id: '',
      TransHospitalId: '',
      TransHospitalName: "",
      IsAppointmentTrans: false,
      IsCheckTransfer: false,
      IsDowmTransfer: false,
      dataarr: [],
      allchooseflog: true,
      allchooseflog1: true,
      IsAppointment: 0,
      IsExaminationAppointment: 0
    }
  },
  computed: {
    ...mapGetters({
      idcard: 'idcard', patientid: 'patientid', province: 'province', provincename: 'provincename', city: 'city', cityname: 'cityname', area: 'area', area: 'areaname', token: 'token'
    })
  },
  Create(){
    var aaa=true;
  },
  mounted() {
    var self = this;
    console.log(self.province,'self')
    // self.Provincevalue=self.province;
    // self.Cityvalue=self.city;
    // self.Areavalue=self.area;
    axios.get(apiurl.GetRegions, {
      params: {
        code: ''
      }
    })
    .then(function(response) {
      self.Provincevalue=self.province;
      self.Province = response.data;
      console.log(self.Province, '省');
    })
    .catch(function(error) {
      console.log(error);
    });
      // this.$nextTick(function () {      
        
      //   console.log(self.Provincevalue);
      // });    
    // console.log($('thead th'))
    // 列表获取
    axios.get(apiurl.GetTransferHospitalList, {
      params: {
        province: self.provinceid,
        city: self.cityid,
        area: self.Areavalue,
        hospitalName: self.hospitalName,
        CommunityHospitalId: self.Communityvalue,
        page: self.currentPage,
        rows: self.currentNum,
        token: self.token
      }
    })
      .then(function(response) {
        var data = response.data.rows;
        self.tableData = data;
        data.forEach(function(v, i) {
          if (v.IsAppointmentTrans == false || v.IsCheckTransfer == false) {
            self.allchooseflog = false;
          }
          if (v.IsDowmTransfer == false) {
            self.allchooseflog1 = false
          }
        })
        if (self.allchooseflog == true) {
          $('thead th').eq(2).addClass('aa')
        }
        if (self.allchooseflog1 == true) {
          $('thead th').eq(3).addClass('aa')
        }
        self.total = response.data.total;

        axios.get(apiurl.GetHospitalIsAppointInfo, {
          params: {
            token: self.token
          }
        })
          .then(function(response) {
            self.IsAppointment = response.data.extra.IsAppointment;
            self.IsExaminationAppointment = response.data.extra.IsExaminationAppointment;
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  },  
  methods: {
    ...mapActions([
      'set_idcard', 'set_patientid'
    ]),
    //全选
    allchoose(val) {
      var self = this;
      self.coumb = val;
      if (val.label == "建立上转关系") {
        self.dataarr = [];
        if ($('thead th').eq(2).hasClass('aa')) {
          $('thead th').eq(2).removeClass('aa');
          if (self.IsAppointment != 0 || self.IsExaminationAppointment != 0) {
            $('.chooseallup').find('.el-checkbox__input').removeClass('is-checked');
          }
          self.tableData.forEach(function(v, i) {
            if (self.IsAppointment == 0 && self.IsExaminationAppointment != 0) {
              v.IsAppointmentTrans = v.IsAppointmentTrans;
              v.IsCheckTransfer = false;
              self.dataarr.push({ Id: v.Id, TransHospitalId: v.TransHospitalId, TransHospitalName: v.TransHospitalName, IsAppointmentTrans: v.IsAppointmentTrans, IsCheckTransfer: v.IsCheckTransfer, IsDowmTransfer: v.IsDowmTransfer });
            }
            if (self.IsAppointment != 0 && self.IsExaminationAppointment == 0) {
              v.IsAppointmentTrans = false;
              v.IsCheckTransfer = v.IsCheckTransfer;
              self.dataarr.push({ Id: v.Id, TransHospitalId: v.TransHospitalId, TransHospitalName: v.TransHospitalName, IsAppointmentTrans: v.IsAppointmentTrans, IsCheckTransfer: v.IsCheckTransfer, IsDowmTransfer: v.IsDowmTransfer });
            }
            if (self.IsAppointment == 0 && self.IsExaminationAppointment == 0) {
              v.IsAppointmentTrans = v.IsAppointmentTrans;
              v.IsCheckTransfer = v.IsCheckTransfer;
              self.dataarr.push({ Id: v.Id, TransHospitalId: v.TransHospitalId, TransHospitalName: v.TransHospitalName, IsAppointmentTrans: v.IsAppointmentTrans, IsCheckTransfer: v.IsCheckTransfer, IsDowmTransfer: v.IsDowmTransfer });
            }
            if(self.IsAppointment!=0&&self.IsExaminationAppointment!=0){
              v.IsCheckTransfer = false;
              v.IsAppointmentTrans = false;
              self.dataarr.push({ Id: v.Id, TransHospitalId: v.TransHospitalId, TransHospitalName: v.TransHospitalName, IsAppointmentTrans: v.IsAppointmentTrans, IsCheckTransfer: v.IsCheckTransfer, IsDowmTransfer: v.IsDowmTransfer });
            }
          })
          self.checktalbe();
          self.dataarr = [];
        } else {
          $('thead th').eq(2).addClass('aa');
          if (self.IsAppointment != 0 || self.IsExaminationAppointment != 0) {
            console.log('aaaaaaaaaa')
            $('.chooseallup').find('.el-checkbox__input').addClass('is-checked');
          }
          self.tableData.forEach(function(v, i) {
            if (self.IsAppointment == 0 && self.IsExaminationAppointment != 0) {
              v.IsAppointmentTrans = v.IsAppointmentTrans;
              v.IsCheckTransfer = true;
              self.dataarr.push({ Id: v.Id, TransHospitalId: v.TransHospitalId, TransHospitalName: v.TransHospitalName, IsAppointmentTrans: v.IsAppointmentTrans, IsCheckTransfer: v.IsCheckTransfer, IsDowmTransfer: v.IsDowmTransfer });
            }
            if (self.IsExaminationAppointment == 0 && self.IsAppointment != 0) {
              v.IsAppointmentTrans = true;
              v.IsCheckTransfer = v.IsCheckTransfer;
              self.dataarr.push({ Id: v.Id, TransHospitalId: v.TransHospitalId, TransHospitalName: v.TransHospitalName, IsAppointmentTrans: v.IsAppointmentTrans, IsCheckTransfer: v.IsCheckTransfer, IsDowmTransfer: v.IsDowmTransfer });
            }
            if(self.IsAppointment==0&&self.IsExaminationAppointment==0){
              v.IsAppointmentTrans = v.IsAppointmentTrans;
              v.IsCheckTransfer = v.IsCheckTransfer;
              self.dataarr.push({ Id: v.Id, TransHospitalId: v.TransHospitalId, TransHospitalName: v.TransHospitalName, IsAppointmentTrans: v.IsAppointmentTrans, IsCheckTransfer: v.IsCheckTransfer, IsDowmTransfer: v.IsDowmTransfer });
            }
            if(self.IsAppointment!=0&&self.IsExaminationAppointment!=0){
              v.IsCheckTransfer = true;
              v.IsAppointmentTrans = true;
              self.dataarr.push({ Id: v.Id, TransHospitalId: v.TransHospitalId, TransHospitalName: v.TransHospitalName, IsAppointmentTrans: v.IsAppointmentTrans, IsCheckTransfer: v.IsCheckTransfer, IsDowmTransfer: v.IsDowmTransfer });
            }
          })
          console.log(self.dataarr,'dataarr')
          self.checktalbe();
          self.dataarr = [];
        }
      } else if (val.label == "建立下转关系") {
        if ($('thead th').eq(3).hasClass('aa')) {
          $('thead th').eq(3).removeClass('aa');
          $('.choosealldown').find('.el-checkbox__input').removeClass('is-checked');
          self.tableData.forEach(function(v, i) {
            v.IsDowmTransfer = false;
            self.dataarr.push({ Id: v.Id, TransHospitalId: v.TransHospitalId, TransHospitalName: v.TransHospitalName, IsAppointmentTrans: v.IsAppointmentTrans, IsCheckTransfer: v.IsCheckTransfer, IsDowmTransfer: v.IsDowmTransfer });
          })
          self.checktalbe();
          self.dataarr = [];
        } else {
          $('thead th').eq(3).addClass('aa');
          $('.choosealldown').find('.el-checkbox__input').addClass('is-checked');
          self.tableData.forEach(function(v, i) {
            v.IsDowmTransfer = true;
            self.dataarr.push({ Id: v.Id, TransHospitalId: v.TransHospitalId, TransHospitalName: v.TransHospitalName, IsAppointmentTrans: v.IsAppointmentTrans, IsCheckTransfer: v.IsCheckTransfer, IsDowmTransfer: v.IsDowmTransfer });
          })
          self.checktalbe();
          self.dataarr = [];
        }
      }
    },
    tableCurrentChange(val) {
      var self = this;
      self.currentRow = val;
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
    //表格
    tablejk() {
      var self = this;
      console.log( self.provinceid,' self.provinceid')
      axios.get(apiurl.GetTransferHospitalList, {
        params: {
          province: self.Provincevalue,
          city: self.Cityvalue,
          area: self.Areavalue,
          hospitalName: self.hospitalName,
          CommunityHospitalId: self.Communityvalue,
          page: self.currentPage,
          rows: self.currentNum,
          token: self.token
        }
      })
        .then(function(response) {
          var data = response.data.rows;
          self.tableData = data;
          self.total = response.data.total;
          var flog = 0, flog1 = 0;
          data.forEach(function(v, i) {
            if (v.IsAppointmentTrans == true) {
              flog++;
            }
            if (v.IsCheckTransfer == true) {
              flog++;
            }
            if (v.IsDowmTransfer == true) {
              flog1++
            }
          })
          console.log(flog == (self.tableData.length * 2), (self.tableData.length * 2))
          if (flog >= (self.tableData.length * 2)) {
            self.allchooseflog = true;
          } else {
            self.allchooseflog = false;
          }
          if (flog1 >= (self.tableData.length)) {
            self.allchooseflog1 = true;
          } else {
            self.allchooseflog1 = false;
          }
          if (self.allchooseflog == true) {
            $('thead th').eq(2).addClass('aa');
          } else {
            $('thead th').eq(2).removeClass('aa');
          }
          if (self.allchooseflog1 == true) {
            $('thead th').eq(3).addClass('aa');
          } else {
            $('thead th').eq(3).removeClass('aa');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 市
    selectcityid(id) {
      var self = this;
      axios.get(apiurl.GetRegions, {
        params: {
          code: id
        }
      })
        .then(function(response) {
          self.City = response.data;
          self.Cityvalue=''
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 区
    selectareaid(id) {
      var self = this;
      axios.get(apiurl.GetRegions, {
        params: {
          code: id
        }
      })
        .then(function(response) {
          self.Area = response.data;
          self.Areavalue = '';
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 社区医院
    selectsqid(id) {
      var self = this;
      axios.get(apiurl.GetCommunityHospitalList, {
        params: {
          p_code:self.Provincevalue,
          c_code:self.Cityvalue,
          a_code:self.Areavalue,
          token: self.token
        }
      })
        .then(function(response) {
          self.Community = response.data;
          console.log(self.Communityvalue)
          self.Communityvalue='';
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // PC_新增或编辑可转诊医院
    checktalbe(e) {
      var self = this;
      console.log(self.tableData, 'tableData');
      var flog = 0, flog1 = 0;
      self.tableData.forEach(function(v, i) {
        if (v.IsAppointmentTrans == true) {
          flog++;
        }
        if (v.IsCheckTransfer == true) {
          flog++;
        }
        if (v.IsDowmTransfer == true) {
          flog1++
        }
      })
      console.log(flog == (self.tableData.length * 2), (self.tableData.length * 2))
      if (flog >= (self.tableData.length * 2)) {
        self.allchooseflog = true;
      } else {
        self.allchooseflog = false;
      }
      if (flog1 >= (self.tableData.length)) {
        self.allchooseflog1 = true;
      } else {
        self.allchooseflog1 = false;
      }
      if (self.allchooseflog == true) {
        $('thead th').eq(2).addClass('aa');
      } else {
        $('thead th').eq(2).removeClass('aa');
      }
      if (self.allchooseflog1 == true) {
        $('thead th').eq(3).addClass('aa');
      } else {
        $('thead th').eq(3).removeClass('aa');
      }
      if (self.dataarr.length <= 0) {
        self.Id = this.currentRow.Id;
        self.TransHospitalId = this.currentRow.TransHospitalId;
        self.TransHospitalName = this.currentRow.TransHospitalName;
        self.IsAppointmentTrans = this.currentRow.IsAppointmentTrans;
        self.IsCheckTransfer = this.currentRow.IsCheckTransfer;
        self.IsDowmTransfer = this.currentRow.IsDowmTransfer;
        self.dataarr.push({ Id: self.Id, TransHospitalId: self.TransHospitalId, TransHospitalName: self.TransHospitalName, IsAppointmentTrans: self.IsAppointmentTrans, IsCheckTransfer: self.IsCheckTransfer, IsDowmTransfer: self.IsDowmTransfer })
      }
      axios.post(apiurl.AddTransferHospital,qs.stringify({
        'transferHospitalArr':JSON.stringify(self.dataarr)
      }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': self.token
          }
        })
        .then(function(response) {
          self.dataarr = [];
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// 分页
.el-pagination {
  text-align: right;
  margin-top: 50px;
}

.el-pagination__sizes {
  margin-left: 20px;
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
</style>

            