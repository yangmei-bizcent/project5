<template>
  <div class="ts-content  wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" v-model="form" label-width="250px" class="clearfix">
        <el-row>
          <el-col :span="9">
            <el-form-item label="签约成功通知中联系电话设定">
              <el-select v-model="form.telvalue" placeholder="请选择" clearable @change='dataChange'>
              <el-option v-for="item in form.teldata" :key="item.Id" :label="item.Name" :value="item.Id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>   
          <el-col :span="9">
            <el-form-item label="签约协议中联系电话社区">
              <el-select v-model="form.telvalue1" placeholder="请选择" clearable @change='dataChange1'>
              <el-option v-for="item in form.teldata1" :key="item.Id" :label="item.Name" :value="item.Id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>            
        </el-row>
      </el-form>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import { mapGetters, mapActions } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js';
import axios from 'axios';
import qs from 'qs';
export default {
  data() {
    return {
      datavalue1: '2018',
      form: {
        teldata:[],
        telvalue:'',
        teldata1:[],
        telvalue1:'',
      }, 
    }
  },
  created() {
  },
  mounted() {
    this.getqypzmess();
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    //设置签约相关配置信息
    dataChange(val) {
      this.ChangeSetRegisterConfig(this.form.telvalue,this.form.telvalue1)
    },
    dataChange1(val) {
      this.ChangeSetRegisterConfig(this.form.telvalue,this.form.telvalue1)
    },
    ChangeSetRegisterConfig(qysusscsval,qyxyval) {
      console.log(qysusscsval,qyxyval)
      axios.post(apiurl.SetRegisterConfig, qs.stringify({
        'RegisterSendPhoneType':qysusscsval,
        'RegisterAgreementPhoneType':qyxyval
      }), 
      {
        headers: {
          'token': this.token
        }
      })
      .then(function(response) {
        if (response.data.suc == true) {  
          console.log(response) 
        } else {
          self.$alert(response.data.mes, '提示', )
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    // 获取签约配置信息
    getqypzmess() {
      var self = this;
      axios.get(apiurl.GetRegisterConfig, {
        params:{
          token:self.token
        }
      }).then(function (res) {
        if(res.data.suc == true){
          self.form.telvalue=res.data.extra.RegisterSendPhoneType;
          self.form.telvalue1=res.data.extra.RegisterAgreementPhoneType;
          self.getqyxl();
          console.log(res)
        } else {
          self.$alert(res.data.mes, '提示', )
        }
      }).catch(function(error) {
          console.log(error);
      }); 
    },
    getqyxl() {
      var self = this;
      axios.get(apiurl.GetRegisterSendPhoneType, {
        params:{
          // Id:self.form.telvalue,
          // token:self.token
        }
      }).then(function (res) {
        if(res.data.suc == true){
          self.form.teldata=res.data.rows;
          self.form.teldata1=res.data.rows;
          console.log(res,'111')
        } else {
          self.$alert(res.data.mes, '提示', )
        }
      }).catch(function(error) {
          console.log(error);
      }); 
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    GetExport() {
      
    }
  }
}
</script>