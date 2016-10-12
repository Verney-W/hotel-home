/*define([],function(){
	var iSwiper = function(cls){
		this.win = document.querySelector(cls);
		this.itemsWrap = this.win.querySelector('.iSwiper-wrap');
		console.log(this.itemsWrap);
		this.item = this.itemsWrap.querySelectorAll('.iSwiper-item');
		this.init();
		this.bindEvent();
	};

	iSwiper.prototype = {
		init : function(){
			this.winWidth = this.win.offsetWidth;
			//console.log(typeof this.item);
			//console.log(Object.prototype.toString.call(this.item));
			this.item.forEach(function(v,i){
				//console.log(i);
				//'url("'+v.getAttribute('dsrc')+'")'
				v.style.background = 'url("'+v.getAttribute('dsrc')+'")';
				v.style.backgroundSize = 'cover';
			})
		},
		bindEvent : function(){
			var that = this;
			that.histSpan = 0;
			that.index = 0;

			//touchstart
			this.itemsWrap.addEventListener('touchstart',function(e){
				that.initX = e.touches[0].clientX;

				that.itemsWrap.className = that.itemsWrap.className.replace('tst','');
			},false);

			//touchmove
			this.itemsWrap.addEventListener('touchmove',function(e){
				that.moveX = e.touches[0].clientX;
				that.spanX = that.moveX-that.initX;
				console.log(that.spanX);
				console.log(that.spanX+','+that.histSpan);
				that.itemsWrap.style.transform = 'translate3d('+(that.spanX+that.histSpan)+'px,0,0)';
			},false);
			
			//touchend
			this.itemsWrap.addEventListener('touchend',function(e){
				//console.log(getComputedStyle(that.itemsWrap).transform);

				if(Math.abs(that.spanX)>that.winWidth/4){
					that.index++;
				}	
				//console.log(that.index);
				that.itemsWrap.className = that.itemsWrap.className+'tst';
				that.itemsWrap.style.transform = 'translate3d('+(-that.winWidth*that.index)+'px,0,0)';
				
				that.histSpan = getComputedStyle(that.itemsWrap).transform.split(',')[4]*1;
				console.log(that.histSpan)
			},false);
		}
	};

	new iSwiper('.iSwiper',function(idx){
		console.log(idx)
	});
});*/