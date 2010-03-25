function formFunc() {
	document.getElementById("submit_btn").disabled=false;	
	leaveWord();
	$("#textbox").focus();
	$("#textbox").keydown(function(){leaveWord()}).keyup(function(){leaveWord()}).keydown(function(event){
		if (event.ctrlKey && event.keyCode==13) {
			updateStatus();
		}
		});
	
	$(".submit_btn").click(function(){
		document.getElementById("submit_btn").disabled=true;	
	});
}

function leaveWord(num) {
	if (!num) num = 140;
	var leave = num-$("#textbox").val().length;
	if (leave < 0) {
		$("#tip").css("color","#CC0000");
		$("#tip b").css("color","#CC0000");
		$("#tip").html("<b>-" + (-leave) + "</b>");
	} else {
		$("#tip").css("color","#CCCCCC");
		$("#tip b").css("color","#CCCCCC");
		$("#tip").html("<b>" + leave + "</b>");
	}
}


function shortUrlDisplay(){
	
	var stringVar = "";
	stringVar = document.getElementById("textbox").value;
	
	if(stringVar.length == 0){
		document.getElementById('errortip').innerHTML = "文本框内容为空！";
	}else{
	
		var str=''; 
		//var regexp=/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\wㄱ-ㅎㅏ-ㅣ가-힣\;\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?)/g; 
		var regexp = /http(s)?:\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\%\!\|\&=\+\~\:\#\;\,]*)?/ig;
		var l_urls='';
		
		str = stringVar.match(regexp);
	
		if(str != null){
			for(idx=0; idx< str.length; idx++){
				regexp2=/(http:\/\/is.gd\/[a-z_A-Z0-9]+)|(http:\/\/bit.ly\/[a-z_A-Z0-9]+)/g;
				match_short = str[idx].match(regexp2);				
				if(!match_short){		
					l_urls+=str[idx]+"|";					
				}else document.getElementById('errortip').innerHTML = "文本框中没有找到任何需要被缩短的URL！";
				match_short = null;
			}	
			if(l_urls != ""){	
				document.getElementById('tip').innerHTML = "<span class='loading'>Loading...</span>";	
                $.post("api/shortUrl.php",{ long_urls: l_urls },function(data){
		getShortUrl(data);
  });			
			}
		}
	}
}
function getShortUrl(res)
{
	var retstr = res;	
	target_layer = 'textbox';

	var url_arry, s_url, l_url, part;
	var err_cnt=0;
	url_arry = retstr.split('^');
	for(i=0;i<url_arry.length;i++){
		part = url_arry[i].split('|');
		if(part.length == 2){
			s_url = part[0];
			l_url = part[1];
		}

		if(s_url.indexOf('http://is.gd') > -1){
			
			stringVar = document.getElementById(target_layer).value;
			
			stringVar = stringVar.replace(l_url, s_url);
			document.getElementById(target_layer).value = stringVar+ "";	
			leaveWord();		
			document.getElementById('errortip').innerHTML = "Well Done!<a href='http://twitter.com/home?status="+stringVar+"'>Send to Twitter</a>";
		}
		else if(l_url.indexOf('http://is.gd') > -1){
			document.getElementById('errortip').innerHTML = "文本框中的URL已为短地址，无需转换！";
			document.getElementById('tip').innerHTML = "";
			leaveWord();
		}
		else if(s_url.length > 0){
			err_cnt++;
		}
		
	}
	if(err_cnt<0){
		document.getElementById('errortip').innerHTML = "请稍候再试."+err_cnt;
	}		

}


$(function(){
	formFunc();
});