//渲染列表页数据
define(['jquery','template','js/util'],function($,Tpl,util){
	if(location.href.indexOf('list.html')==-1) return;
	var listDom = $('.hotel-lists');
	var hotelTpl = 
		'<% for(var i=0; i<hotel_list.length; i++){ %>'+
		'<dl class="clear" h_id="<%= hotel_list[i].hotel_id %>" distance="<%= hotel_list[i].distance %>" stars="<%= hotel_list[i].stars %>">'+
			'<dt><img src="../<%= hotel_list[i].image %>" alt=""></dt>'+
			'<dd>'+
				'<p class="hotel-name"><%= hotel_list[i].name %></p>'+
				'<p class="hotel-range">'+
					'<span class="left">'+
			 			'<em>3.6分</em>'+
						'<span class="promotion orange">礼</span>'+
						'<span class="promotion blue">促</span>'+
						'<span class="promotion red">返</span>'+
					'</span>'+
					'<span class="right hotel-price">￥<%= hotel_list[i].low_price/100 %>&nbsp;&nbsp;<sub>起</sub></span>'+
				'</p>'+
				'<p class="hotel-star">'+
				'	<span><%= hotel_list[i].stars %>级</span>'+
				'</p>'+
				'<p class="hotel-location">'+
					'<span class="left"><%= hotel_list[i].addr %></span>'+
					'<span class="right"><%= hotel_list[i].distance/1000 %>KM</span>'+
				'</p>'+
			'</dd>'+
		'</dl>'+
		'<% } %>';

	var render= Tpl.compile(hotelTpl);
	var tempData = null;
	util.startLoading(listDom[0]);
	$.when($.ajax('../data/hotel.json'))
	.then(function(data){
		console.log(data);	
		var str=render(data.result);
		tempData = data.result.hotel_list;
		listDom.html(str).trigger('rendered');
		//listDom.html(str)
	},function(err){
		console.log(err);
	});


	/*8.25报错*/
	
	/*var urlDate = util.getUrlParam();
	var tmpIndate = urlDate.indate.split('-');
	var tmpOutdate = urlDate.outdate.split('-');
	//渲染时间
	$('.in-date').html('入住：'+tmpIndate[1]+'月'+tmpIndate[2]+'日');
	$('.out-date').html('离店：'+tmpOutdate[1]+'月'+tmpOutdate[2]+'日');*/


	//底部导航
	var screenDom = $('.screen');
	$('.footer').on('click','span',function(){
		screenDom.show();
		//点击添加遮罩层
		var ml = $('body')[0].querySelector('.mask-layer');
		if(!ml){
			var dom = document.createElement('div');
			dom.setAttribute('class','mask-layer');
			$('body')[0].appendChild(dom);
		}else{
			$(ml).show();
		}

		if($(this).hasClass('high')){
			$(this).removeClass('high');
			screenDom.hide();
			$(ml).hide();
		}else{
			$(this).addClass('high').siblings().removeClass('high');
		}
		
		var idx = $(this).index();
		var width = screenDom.width();
		var screenWrapper = $('.screen-wrapper',screenDom);
		screenWrapper.css('margin-left',-idx*width+'px');
	})

	//排序、筛选功能
	//获取到所有列表
	listDom.on('rendered',function(){
		tempData.sort(function(a,b){
			/*if(Number(a.distance)>Number(b.distance)){
				return 1;
			}else if(Number(a.distance)<Number(b.distance)){
				return -1;
			}else{
				return 0;
			}*/
			if(a.distance>b.distance){
				return 1;
			}else if(a.distance<b.distance){
				return -1;
			}else{
				return 0;
			}
		});
		
	});

	//footer下的排序功能
	$('.distance',screenDom).on('click','span',function(){
		if($(this).hasClass('checked')){
			$(this).parent().siblings().find('.checkbox').removeClass('checked');
		}else{
			$(this).addClass('checked').parent().siblings().find('.checkbox').removeClass('checked');

			if($(this).prev().text() == '由远到近'){
				//arr = tempData.reverse();
				listDom.html(render({hotel_list:tempData.reverse()}));
				tempData.reverse();
			}else{
				listDom.html(render({hotel_list:tempData}));
			}
		}
	});


	//range 星级
	$('.range',screenDom).on('click','span',screenCheck);

	//price 价格
	$('.price',screenDom).on('click','span',screenCheck);

	//brand 品牌
	$('.brand',screenDom).on('click','span',screenCheck);

	function screenCheck(){
		//判断是否有no-limit
		if($(this).prev().hasClass('no-limit')){
			$(this).parent().siblings().find('.checkbox').removeClass('checked');
			$(this).addClass('checked');
		}else{
			$(this).parents('.screen-child').find('.no-limit').next().removeClass('checked');
			//判断是否checked
			if($(this).hasClass('checked')){
				$(this).removeClass('checked');
			}else{
				$(this).addClass('checked');
			}
		}

		//range
		var str="";
		$(this).parents('.range').find('.checked').each(function(i,v){
			//拼接[stars="二星"],[stars="三星"],[stars="四星"],[stars="五星"]
			if($(this).parent().attr('stars') == 0){
				str = '[stars],';
			}else{
				str += '[stars="'+$(this).parent().attr('stars')+'"],'
			}
		});
		$(this).parents('.brand').find('.checked').each(function(i,v){
			//拼接[name="二星"],[name="三星"],[name="四星"],[name="五星"]
			if($(this).parent().attr('name') == 0){
				str = '[name],';
			}else{
				str += '[name="'+$(this).parent().attr('name')+'"],'
			}
		});
		$(this).parents('.price').find('.checked').each(function(i,v){
			//拼接[stars="二星"],[stars="三星"],[stars="四星"],[stars="五星"]
			if($(this).parent().attr('stars') == 0){
				str = '[stars],';
			}else{
				str += '[stars="'+$(this).parent().attr('stars')+'"],'
			}
		});

		filter(str.substr(0,str.length-1));
	};

	function filter(str){
		var dls = $('.hotel-lists dl').show();
		console.log(dls);
		dls.not(str).hide();
	}


	//列表区域滚动事件的帧听
	$('.hotel-lists').on('scroll',function(){
		var scrHetght = $(this).scrollTop();
		var winHeight = $(this).height();
		var docHeight = $(this).children().height()*$(this).children().length;
		if(scrHetght>docHeight-30){
			console.log('到底了');
		}
	});


	//跳转到详情页
	//?$('.hotel-lists dl').on('click',function(){
	$('.hotel-lists').on('click','dl',function(){
		var _id=$(this).attr('h_id');
		location.href = 'detail.html?'+'hotel_id='+_id;
	})
	
}); 