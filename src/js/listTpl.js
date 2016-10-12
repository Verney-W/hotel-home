/*define([],function(){
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

		return {
			tpl:hotelTpl
		}
})*/