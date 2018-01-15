Page({
	data: {
		list:[
			{
				name:'标题一个',
			},
			{
				name:'标题二',
			},
			{
				name:'标题3',
			},
			{
				name:'标题第四个',
			},
			{
				name:'标题五',
			},
			{
				name:'标题六',
			},
			{
				name:'标题7',
			},
			{
				name:'标题一个',
			},
			{
				name:'标题二',
			},
			{
				name:'标题3',
			},
			{
				name:'标题第四个',
			},
			{
				name:'标题五',
			},
			{
				name:'标题六',
			},
			{
				name:'标题7',
			},
		],
		line:{
			width:40,
			left:0,
			oldActive:0,
			swipeIndex:0,
			scrLeft:0,
			timeOut:''
		}
	},
	onLoad: function () {
		var _this = this;
		_this.lineInfo(0)
	},
	swipeChange:function(res){
		var _this = this;
		if(res.detail.source == 'touch'){
			if(_this.data.line.timeOut){clearTimeout(_this.data.line.timeOut)}
			_this.data.line.timeOut = setTimeout(function(){
				_this.lineInfo(res.detail.current,true)
			},10)
		}
	},
	lineInfo:function(even,type){
		var _this = this;
		var index = even >= 0 ? even : even.currentTarget.id;
		index = parseInt(index);
		wx.getSystemInfo({
			success: function(info) {
				wx.createSelectorQuery().selectAll('.tabBtn').boundingClientRect(function(rect){
					wx.createSelectorQuery().select('#tabButtonAll').scrollOffset(function(res){
						var WinWidth = info.windowWidth;
						var width = rect[index].width;
						var left = rect[index].left;
						var scrLeft = res.scrollLeft;
						_this.setData({'line.width':width,'line.left':left + scrLeft})
						if(_this.data.line.oldActive == index){
						}else if(_this.data.line.oldActive < index){
							if(left + width + (WinWidth/750*72)> WinWidth){
								_this.setData({'line.scrLeft':rect[index-3].left + scrLeft})
							}
						}else{
							console.log(left)
							console.log(scrLeft)
							if(scrLeft > left + scrLeft - (WinWidth/750*72)){
								var i = index-1>0 ? rect[index-1].left + scrLeft : 0;
								_this.setData({'line.scrLeft':i})
							}
						}
						if(!type){
							_this.setData({'line.swipeIndex':index})
						}
						_this.setData({'line.oldActive':index})
					}).exec()
				}).exec()
			}
		})
	}
})
