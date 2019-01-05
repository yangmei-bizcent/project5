<template>
    <div class="course_disease">
        <div v-if="docAdviceli.length!=0">
            <div class="course_disease_left">
              <ul v-for="(bing,index) in docAdviceli">
                  <li  @click="detailDocAdvice(bing.Id)">
                    {{bing.RecordDate}}<div>医嘱类型：{{bing.AdviceType}}</div>
                  </li>
                  
              </ul>
            </div>
            <div class="course_disease_right">
              <div class="x_title">医嘱期限：{{docAdviceDetail.AdviceStartTime}}-{{docAdviceDetail.AdviceEndTime}}<span>医嘱编号：{{docAdviceDetail.RecordNo}}</span></div>
              <div class="title"></div>
              <div class="cus_content">
                  {{docAdviceDetail.RecordContent}}
                  <div class="textAlignCenter" v-if="docAdviceDetail.RecordContent==null || docAdviceDetail.RecordContent==''|| docAdviceDetail.RecordContent=='null'">
                      <img src="../../assets/img/nodata.png" alt="">
                      <p>暂无数据</p>
                  </div>
              </div>
            </div>
        </div>
        <div class="textAlignCenter margintop30" v-if="docAdviceli.length==0">
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
      detailDocAdvice(id){
        this.$emit('clickDocAdvice',id)
      },
    },
    
	props:['docAdviceli','docAdviceDetail']
}
</script>