<template>
  <div class="ts-content out-width">
    <div class="titleStyle">信息详情</div>
    <main class="main-wrap">
      <el-form ref="form" label-width="108px" class="clearfix">
        <el-row>
          <el-col :span="8">
            <el-form-item 
                prop="phase"
                label="期数"
                required>
              <div class="inline-span">{{form.Phase}}</div>
            </el-form-item>
          </el-col>   
          <el-col :span="8">
            <el-form-item 
                prop="anchor"
                label="主讲人"
                required>
                <div class="inline-span">{{form.Anchor}}</div>
            </el-form-item>
          </el-col>  
          <el-col :span="8">
            <el-form-item 
            prop="position"
            label="主讲人职称"
            required>
              <div class="inline-span">{{form.Appellation}}</div>
            </el-form-item>
          </el-col>              
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item 
            prop="title"
            label="标题"
            required>
              <div class="inline-span">{{form.Title}}</div>
            </el-form-item>
          </el-col>   
          <el-col :span="8">
            <el-form-item 
            prop="link"
            label="链接地址"
            required>
              <div class="inline-span">{{form.LiveLink}}</div>
            </el-form-item>
          </el-col>  
          <el-col :span="8">
            <el-form-item 
            prop="dataValue"
            label="直播时间"
            required>
              <div class="inline-span">{{form.dataValue}}</div>
            </el-form-item>
          </el-col>              
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="头像">
                <img :src="form.HeadPortrait" class="img" v-if='form.HeadPortrait!=null'>
                <span v-if='form.HeadPortrait==null' style="margin-top:2px;display:inline-block;">无</span>
            </el-form-item>
          </el-col>   
          <el-col :span="8">
            <el-form-item label="banner图">
                <img :src="form.Banner" alt="默认图片" class="img" v-if='form.Banner!=null'>  
                <span v-if='form.Banner==null'style="margin-top:2px;display:inline-block;">无</span>         
            </el-form-item>
          </el-col>             
        </el-row>
        <el-row>
            <el-form-item 
                prop="desc"
                label="主讲人简介" 
                required>
                <div class="inline-span">{{form.Profile}}</div>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item>
                <el-button type="primary" @click="backList()">返回</el-button>
            </el-form-item> 
        </el-row>             
      </el-form>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js';
export default {
    data() {
      return {
        form :{
           Phase:'',
           Anchor:'',
           Appellation:'',
           Title:'',
           LiveLink:'',
           StartTime:'',
           EndTime:'',
           Banner:'',
           HeadPortrait:'',
           Profile:'',
           Id:'',
           dataValue: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        token: 'token'
      })
    },
    mounted () {
      this.getInfo();
    },
    methods: {
      //获取详情
      getInfo() {
        var id = this.$route.query.transeId;
        axios.get(apiurl.BroadcastFill, {
          params: {
            'id': id
          },
          headers: {
            'token': this.token
          }
        }).then((response)=>{
          if(response.status === 200) {
            var datas = response.data.extra;
            this.form = Object.assign({},this.form,datas);
            console.log(this.form)
            this.form.dataValue = this.form.StartTime+'  到  '+this.form.EndTime;
          //  form.Phase = datas.Phase;
          //  form. = datas.Anchor;
          //  form. = datas.Appellation;
          //  form. = datas.Title;
          //  form. = datas.LiveLink;
          //  form. = datas.StartTime;
          //  form. = datas.EndTime;
          //  form. = datas.Banner;
          //  form. = datas.HeadPortrait;
          //  form.Profile = datas.Profile;
          //  form. = datas.Id;

          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //返回列表
      backList() {
        // this.$router.push({
        //     path: 'livepage'
        // })
        var param = {};
        param.method = "addTab";
        param.title = '直播列表页';
        param.url = linkUrl + 'livebroadcast/livepage?token='+this.token+'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');        
      },
    }
}
</script>

<style>
    .out-width {
        min-width: 980px;       
    }
    .inline-span {
      line-height: 38px;
      word-break: break-word;
    }
    .titleStyle {
        font-size: 18px;
        color: #425B77;
        padding-bottom: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #E6E6E6;
    }
    .main-wrap .el-form-item {
        margin-right: 10px;
    }
    .img {
        height: 180px;
        width: 180px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
    }
</style>

