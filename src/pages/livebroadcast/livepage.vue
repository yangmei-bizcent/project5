<template>
  <div class="ts-content  wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" :model="form" label-width="76px" class="clearfix">
        <el-row>
          <el-col :span="6">
            <el-form-item label="直播期数">
              <el-input placeholder="请输入数字" type="number" v-model.number="form.phase" clearable></el-input>
            </el-form-item>
          </el-col>   
          <el-col :span="6">
            <el-form-item label="主讲人">
              <el-input placeholder="请输入姓名" v-model="form.anchor" clearable></el-input>
            </el-form-item>
          </el-col>  
          <el-col :span="6">
            <el-form-item label="直播标题">
              <el-input placeholder="请输入文字" v-model="form.title" clearable></el-input>
            </el-form-item>
          </el-col>  
          <el-col :span='6'>
            <el-button type="success" class='el-button--primary' @click='searchContent()'>查询</el-button>      
            <el-button type="primary" class='el-button--info' @click="handleAdd()">新增</el-button>          
          </el-col>                
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row element-loading-text="数据加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" slot="empty" :border='true'>
        <el-table-column type='index' label="序号" width="60"> </el-table-column>
        <el-table-column prop="Phase" label="期数" width="60"> </el-table-column>
        <el-table-column prop="Title" label="直播标题" width="110"> </el-table-column>
        <el-table-column prop="Anchor" label="主讲人" width="90"> </el-table-column>
        <el-table-column prop="StartTime" label="直播时间" width="175"> 
          <template slot-scope="props">
            <span>{{props.row.StartTime}}</span>至<span>{{props.row.EndTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="IsEnabled" label="状态" width="60"> 
          <template slot-scope="props">
            <span v-if="props.row.IsEnabled == 1">开启</span>
            <span v-else-if="props.row.IsEnabled == 0">关闭</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="props">
            <span class="check_btn el-icon-ts-serch" @click="handleLook(props.row.Id)">查看</span>
            <span class="check_btn el-icon-ts-bianji" @click="handleEdit(props.row.Id)">编辑</span>
            <span class="angin_btn el-icon-ts-shanchu" @click='deleteData(props.row.Id)'>删除</span>
            <span v-if="props.row.IsEnabled == 1" class="check_btn el-icon-ts-pass" @click="changeBroadcastState(props.row)">关闭</span>
            <span v-else-if="props.row.IsEnabled == 0" class="check_btn el-icon-ts-pass" @click="changeBroadcastState(props.row)">开启</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination 
           @size-change="handleSizeChange" 
           @current-change="handleCurrentChange" 
           :current-page.sync="currentPage" 
           :page-sizes="[10, 20, 30, 40]" 
           :page-size="currentNum" 
           layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import axios from 'axios';
import { mapGetters } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js';
export default {
  data() {
    return {
      datavalue1: '',
      form: {
        phase: "",
        anchor: "",
        title: ""
      },      
      value:'',
      tableData: [],
      currentPage:1,
      currentNum:10,
      total:0,
      loading: true,
    }
  },
  computed: {
    ...mapGetters({
      token:'token'
    })
  },
  created() {
  },
  mounted () {
    this.getTableLists();
  },
  methods: {
    getTableLists() {
      console.log('123',apiurl.BroadcastLink)
      var vm = this;
      axios({
        method: 'get',
        url: apiurl.BroadcastLink,
        params: {
          'anchor': vm.form.anchor||'',
          'title': vm.form.title||'',
          'phase': Number(vm.form.phase)||0,
          'page': vm.page||1,
          'rows': vm.currentNum,
        },
        headers: {
          'token': vm.token
        }
      }).then(function(response){
        if(response.status == 200 && response.data.code == 200){
          //获取表格每行的内容
          vm.tableData = response.data.rows;
          //条数
          vm.total = response.data.total;
          console.log(vm.total);
        }
      }).catch(function(err){
        console.log(err);
      });
      // axios.get(apiurl.BroadcastLink,
      //   {params: {
      //     'anchor': anchor||'',
      //     'title': title||'',
      //     'phase': Number(phase)||0,
      //     'page': page||1,
      //     'rows': vm.currentNum,
      //     'token': vm.token
      //   }
      //   })

    },
    //查找
    searchContent() {
      this.getTableLists();
    },
    //设置每页条数
    handleSizeChange(val) {
      this.currentNum = val;
      this.getTableLists();
      console.log(`每页 ${val} 条`);
    },
    //当前第几页
    handleCurrentChange(val) {
      this.page = val;
      this.getTableLists();
      console.log(`当前页: ${val}`);
    },
    //新增
    handleAdd(){
      var param = {};
      param.method = "addTab";
      param.title = '新增直播页';
      param.url = linkUrl + 'livebroadcast/livepageAddAndEdit?token='+this.token+'&transeId='+0+'&state=add'+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push({
      //     path: 'livepageAddAndEdit',
      //     query: {
      //       transeId: 0,
      //       state: 'add'
      //     }
      //   })
    },
    //查看
    handleLook(transeId) {
      var param = {};
      param.method = "addTab";
      param.title = '查看直播页';
      param.url = linkUrl + 'livebroadcast/livepageLook?token='+this.token+'&transeId='+transeId+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push({
      //     path: 'livepageLook',
      //     query: {
      //       transeId: transeId
      //     }
      //   })
    },
    //编辑
    handleEdit(transeId) {
      var param = {};
      param.method = "addTab";
      param.title = '编辑直播页';
      param.url = linkUrl + 'livebroadcast/livepageAddAndEdit?token='+this.token+'&transeId='+transeId+'&state=edit'+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push({
      //     path: 'livepageAddAndEdit',
      //     query: {
      //       transeId: transeId,
      //       state: 'edit'
      //     }
      //   })      
    },
    //删除
    deleteData(transeId) {
      var self = this;
      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('p', null, '确定删除此条直播？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            done();
            console.log(transeId)
            axios.post(apiurl.BroadcastDelete,
            {              
              "id": transeId
            },
            {
              headers: {
                "token": self.token
              }
            }
            )
            .then(function(response) {
              if (response.data.suc == true) {  
                self.$message({
                  type: 'success',
                  message: response.data.mes
                });
                self.getTableLists();
              } else {
                self.$alert(response.data.mes, '提示', )
              }
            })
            .catch(function(error) {
              console.log(error);
            });
          } else {
            done();
          }
        }
      }).then(action => {
          done();
      });
    },
    //开启或者关闭
    changeBroadcastState(row) {
      var id = row.Id;
      var IsEnabled = row.IsEnabled;
      var showCancelButton = true;
      var stateFont = "";
      var titleFont = "";
      if(IsEnabled==0){
        titleFont = '开启';
        stateFont = '确定开启此条直播？'
      }else if(IsEnabled==1){
        titleFont = '关闭'
        stateFont = '确定关闭此条直播？'
      }
      var self = this;
      //请求数据，并把返回内容填入提示变量中
      axios.post(apiurl.BroadcastChange+'?id='+id, {},
      {
        headers: {
          "token": self.token
        }
      })
      .then(function(response) {
        if (!response.data.suc) {
            // self.getTableLists();
            showCancelButton = false;
            stateFont = response.data.mes;
        }else {
            showCancelButton = true;
        }
        
        //定义弹窗
        const h = self.$createElement;
        self.$msgbox({
          title: titleFont,
          message: h('p', null, [
            h('p', null, stateFont)
          ]),
          showCancelButton: showCancelButton,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            // debugger
            if (action === 'confirm') {
              if(titleFont == '开启'&&showCancelButton) {
                self.getTableLists();
                done();
                // setTimeout(()=>{
                //   done();
                // },1000)
              }else if(titleFont == '关闭'){
                self.getTableLists();
                done();
              }else {
                done();
              }
            } else {
              //通过X关闭窗口
              done();
              console.log('取消、X')
            }
            
          }
        }).then(action => {

        });
      })
      .catch(function(error) {
        console.log('err',error);
      });


      // //创建弹窗
      // const h = this.$createElement;
      // this.$msgbox({
      //   title: titleFont,
      //   message: h('p', null, [
      //     h('p', null, stateFont)
      //   ]),
      //   showCancelButton: showCancelButton,
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   beforeClose: (action, instance, done) => {
      //     // debugger
      //     if (action === 'confirm') {
      //       if(!showCancelButton) {
      //         self.getTableLists();
      //         done();
      //         // setTimeout(()=>{
      //         //   done();
      //         // },1000)
      //       }
      //     } else {
      //       //通过X关闭窗口
      //       done();
      //       console.log('取消、X')
      //     }
          
      //   }
      // }).then(action => {

      // });
    },
  }
}
</script>