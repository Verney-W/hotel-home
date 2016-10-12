//动画
define([],function(){
    return {
        transitionEnd:function (){
            var ele = document.createElement('bootstrap');
            var obj = {
                WebkitTransform : 'webkitTransitionEnd',
                MozTransform : 'TransitionEnd',
                MsTransform : 'msTransitionEnd',
                OTransform : 'oTransitionEnd',
                Transform : 'transitionEnd'
            };

            for(var i in obj){
                if(ele.style[i] !== undefined ){
                    return obj[i];
                }
            }

        }(),
        inArray : function(target, arr){
            if(typeof target=='object' || typeof target=='function' || typeof target== 'NaN' || typeof target== 'null' || typeof target == 'undefined'){
                return false
            }else{
                for(var i=0; i<arr.length; i++){
                    if(target == arr[i]){
                        return true
                    }
                }
            }
            return false;
        },
        getUrlParam: function(){
            //解码 decodeURI
            var url = decodeURI(location.search);
            //取到?city=北京&indate=2016-8-18&outdate=2016-9-30;

            //拆分字符串 去掉?
            var str = url.substr(1);
            //转换成数组
            var arr = str.split('&');
            var obj = {};
            arr.forEach(function(v,i){
                var arr2 = v.split('=');
                obj[arr2[0]] = arr2[1];
            });
            //console.log(obj);
            return obj;
        },
        startLoading:function(parent){
            /*var str = '<div class="mask-layer"></div>'+
            <div class="loading">
                <img src="../img/loading.png">
            </div>';*/
            var wrap = parent || document.body;
            var ml = wrap.querySelector('.mask-layer');
            //console.log(ml);
            if(!ml){
                var dom = document.createElement('div');
                dom.setAttribute('class','mask-layer');
                wrap.appendChild(dom);
            }
            var dom2 = document.createElement('div');
            dom2.innerHTML = '<img src="../img/loading.png">';
            dom2.setAttribute('class','loading');
            wrap.appendChild(dom2);
        }/*,
        endLoading:function{
            document.querySelector('.loading');
        };*/
    }
});