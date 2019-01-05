<template>
<div>
    <div class="course_disease" v-if="bingInfoli.length!=0">
      <div class="course_disease_left">
      <ul>
          <li @click="detailInfor(bing.Id)"  v-for="(bing,index) in bingInfoli">
            {{bing.Title}}<div>医生姓名：{{bing.DoctorName}}<span>{{bing.RecordDate}}</span></div>
          </li>
          
      </ul>
      </div>
      <div class="course_disease_right">
      <div class="x_title">{{inforDetail.Title}}<span>病程编号：{{inforDetail.RecordNo}}</span></div>
      <div class="cus_content">{{inforDetail.RecordDetail}}</div>
      <div class="textAlignCenter" v-if="inforDetail.RecordDetail==null || inforDetail.RecordDetail==''|| inforDetail.RecordDetail=='null'">
                <img src="../../assets/img/nodata.png" alt="">
                <p>暂无数据</p>
            </div>
      </div>
    </div>
    <div class="textAlignCenter margintop30" v-if="bingInfoli.length==0">
            <img src="../../assets/img/nodata.png" alt="">
            <p>暂无数据</p>
        </div>
</div>
     
</template>
<script>
export default {
    data() {
      return {
          
      }
    },
    methods: {
      detailInfor(id){
        this.$emit('clickDetail',id)
      },
    },
    
	props:['bingInfoli','inforDetail']
}
</script>