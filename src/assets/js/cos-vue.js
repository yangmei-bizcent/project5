var config = {
    AppId: '1251304050',
    Bucket: 'pacs',
    Region: 'sh',
    Folder: '/files/',
    Url: 'http://diagnose.zwjk.com'
};

/**
 * 
 * @param file 要上传的file对象
 * @param successCallBack 
 * @param progressCallBack
 */
function startUploadCos(file, successCallBack, progressCallBack, errorCallBack) {
	var cos = new CosCloud({
	    appid: config.AppId,// APPID 必填参数
	    bucket: config.Bucket,//bucketName 必填参数
	    region: config.Region,//地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
	    getAppSign: function (callback) {//获取签名 必填参数
	        //下面简单讲一下获取签名的几种办法
			//1.搭建一个鉴权服务器，自己构造请求参数获取签名，推荐实际线上业务使用，优点是安全性好，不会暴露自己的私钥
			this.$axios({
				method: "POST",
				url: config.Url + '/cos/getSign.htm'				
			}).then(function(res){
				alert("1");
			}).catch(function(err){
				alert("请求cos签名出现错误")
			})


	        // $.post(, "", function(json, status) {
	        // 	if(status != "success") {
	        // 		layer.msg(status + "，请求cos签名出现错误");
	        // 	} else {
	        // 		callback(json.sign);
	        // 	}
	        // }).error(function(){
	        // 	layer.msg("请求cos签名出现错误");
	        // });
	    }
	});
	
    var successCallBack = successCallBack || function (result) {
        console.log('upload success...');
        console.log(JSON.stringify(result));
        //$("#result").val(JSON.stringify(result));
        //$url.val(result.data.access_url);
    };

    var errorCallBack = errorCallBack || function (result) {
        result = result || {};
        console.log('upload error...');
        layer.alert(result.responseText || 'upload error', {icon: 0});
    };

    var progressCallBack = progressCallBack || function (curr) {
    	console.log("upload progress : " + curr);
    };
    
    //开启cos上传
	var name = file.name;
	cos.uploadFile(successCallBack, errorCallBack, progressCallBack, 
			config.Bucket, 
			config.Folder + new Date().getTime() + name, 
			file, 1);//insertOnly==0 表示允许覆盖文件 1表示不允许
}