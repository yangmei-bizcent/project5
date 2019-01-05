<template>
	<div class="ts-content wrapper-steps clearfix newcss">
		<div class="ewm_title">
			<span class="pagetitle">机构转诊宣传二维码</span>
			<el-button type="info"  @click='printRegister'>打印图片</el-button>
			<el-button type="info" @click='imgbigupload()' :disabled='suc==false'>下载图片</el-button>
			<el-button type="info" @click='exportexl()' :disabled='suc==false'>下载二维码</el-button>
		</div>		
		<div class="ewmk" id="printBody" ref='printContent' style="position: relative;left:50%;margin-left:-245px;">
			<img src="../../assets/img/ewmsmal.png" alt="" class="smallimg" style="width: 491px;height: 695px;">
			<img :src="imgurl" alt="" class="smallewm" style="width:154px;height:154px;position: absolute;left: 169px;bottom: 92px;" crossorigin="anonymous">
			<!-- <img src="../../assets/img/ewmsmal.png" alt="" class="smallewm" style="width:154px;height:154px;position: absolute;left: 169px;bottom: 92px;"> -->
		</div>
	</div>
</template>
<script>
import '../../assets/sass/addtransfer.scss';
import '../../assets/jquery/jquery.jqprint-0.3.js';
import '../../assets/js/html2canval/html2canvas.min.js';
// import '../../assets/js/html2canval/html2canvas.svg.js'

import { mapGetters,mapActions } from 'vuex';
import {apiurl} from '../../service/api.js';
import axios from 'axios';
	export default{
		data(){
			return{
				imgurl:'',
				suc:false
			}
		},
	  computed: {
	     ...mapGetters({
	         token:'token'
	      }),
	  },
		mounted(){
			var self = this;
			axios.get(apiurl.GetHospitalTwoDimensionCode, {
        params: {
          token:self.token
        }   
      })
      .then(function (response) {
      	self.imgurl=response.data.extra.url;
      	self.suc=response.data.suc;
      })
      .catch(function (error) {
        console.log(error);
      });
		},
		methods:{		
			imgbigupload(){
				var self=this;
				console.log('aaaaaaaa',)
				self.hrefvalue= apiurl.DownloadTransferTreatmentPic + '?token='+self.token;
	      if(self.suc==true){
	      	window.open(self.hrefvalue,'_blank');
	      }
			},
			getNowFormatDate() {
		    var date = new Date();
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		            + " " + date.getHours() + seperator2 + date.getMinutes()
		            + seperator2 + date.getSeconds();
		    return currentdate;
			} ,
			// 下载图片
			uploadimg(){
				var self=this;
				html2canvas($("#printBody"), {
	        height: $("#printBody").outerHeight() + 10,
	        onrendered: function (canvas) {
	          var url = canvas.toDataURL();
	          //以下代码为下载此图片功能
	          var triggerDownload = $("<a>").attr("href", url).attr("download", self.getNowFormatDate() + "二维码.png").appendTo("body");
	          triggerDownload[0].click();
	          triggerDownload.remove();
	        }
	    	});
			},
	    // 下载二维码
	    exportexl(){		
	      var self=this;
	      self.hrefvalue = apiurl.DownloadTwoDimensionCode+'?token='+self.token;
	      if(self.suc==true){
	      	window.open(self.hrefvalue,'_blank');
	      }
	    },
	    //打印图片
	    printRegister() {
	    	var self=this;
	    	// let newWindow = window.open("self");   //打开新窗口
      //   let codestr = self.$refs.printContent;   //获取需要生成pdf页面的div代码
	    	// console.log(codestr)
        $('#printBody').jqprint({
          debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
          importCSS: false, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
          printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
          operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
        });
      }
		}

	}
</script>