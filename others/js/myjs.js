$(function(){
	  var page = 1;
      var i = 6; //每版放6个图片


    // 点击向后按钮
    $("#spanright").click(function(){

        var $parent = $("#spanright").parents("#contentBottom01");//寻找当前元素的父元素
        var $v_out = $parent.find("#contentBottom01-1");//视频外围
        var $v_show = $parent.find("#contentBottom01-01");//视频播放区域
        var v_width = $v_out.width();//外围宽度
        var len = $v_show.find("a").length; //图片数量
        var page_count = Math.ceil(len / i) ; //页面数目
         if( !$v_show.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
              if( page == page_count ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
                $v_show.animate({ left : '0px'}, "slow"); //通过改变left值，跳转到第一个版面
                page = 1;
              }else{
                $v_show.animate({ left : '-='+v_width }, "slow");  //通过改变left值，达到每次换一个版面
                page++;
             }
         }

    });

    //点击向前按钮
    $("#spanleft").click(function(){
        var $parent = $(this).parent();//寻找当前元素的父元素
        var $v_out = $parent.find("div#contentBottom01-1");//视频外围
        var $v_show = $parent.find("div#contentBottom01-01");//视频播放区域
        var v_width = $v_out.width();
        var len = $v_show.find("a").length;
        var page_count = Math.ceil(len / i);
        if(!$v_show.is(":animated")){
            if (page == 1) {
                $v_show.animate({left : "-="+v_width*(page_count-1)},"slow");
                page = page_count;
            }else{
                $v_show.animate({left : '+='+v_width},"slow");
                page--;
            }
        }
    });


    var $imgrolls = $("#contentBottom01 div a");
    var len  = $imgrolls.length;
	var index = 0;
	var adTimer = null;  
	$imgrolls.mouseover(function(){
		index = $imgrolls.index(this);

		showImg(index);
	}).eq(0).mouseover();	
	//滑入 停止动画，滑出开始动画.
	$('#contentTop01-1').hover(function(){
			if(adTimer){ 
				clearInterval(adTimer);
			}
		 },function(){
			adTimer = setInterval(function(){
			    showImg(index);
				index++;
				if(index==len){index=0;}
			} , 5000);
	}).trigger("mouseleave");
});


//显示不同的幻灯片
function showImg(index){

    var $v_out = $(".beta03-1 #contentBottom01-1");
    var $v_show = $(".beta03-1 #contentBottom01-01");//视频播放区域
    var v_width = $v_out.width();
	var $rolllist = $v_show.find("a");
	var newhref = $rolllist.eq(index).attr("href");
	$("#JS_imgWrap").attr("href",newhref)
			 .find("img").eq(index).stop(true,true).fadeIn().siblings().fadeOut();

	if(index==6 && $v_show.css('left')=='0px'){			
		$v_show.animate({ left : '-='+v_width }, "slow"); 
	}
	if(index==0){
		$v_show.animate({ left : '0px'}, "slow");
	}
	var $span = $rolllist.find('span');	
	$span.eq(index).addClass('border').parent().siblings().children().removeClass('border');	 
}