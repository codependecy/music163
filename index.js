$(function() {
	$.get('./song.json').then(function(response){
		let items = response
		items.forEach((i)=>{
			let $li = $(`
				<a href="./song.html?id=${i.id}">
							<div>
								<div class="music-body">
									<h3>${i.name}</h3>
									<p>
										<svg class="icon">
											<use xlink:href="#icon-sq"></use>
										</svg>
										<span>${i.singer}</span>
									</p>
								</div>
								<div class="music-play">
									<svg class="icon">
										<use xlink:href="#icon-music-play"></use>
									</svg>
								</div>
							</div>
						</a>
			`)
			$('.new-music').append($li)
		})
	})
	$('.newNav>a').on('click',function(e){
		let $li = $(e.currentTarget).addClass('active')
		$li.siblings().removeClass('active')
		let index = $li.index()
		$li.trigger('tabChange',index)
		$('.tabItems>li').eq(index).addClass('active')
		.siblings().removeClass('active')
	})
	
	
	
	$('.newNav').on('tabChange',function(e,index){
		let $li = $('.tabItems>li').eq(index)
		if($li.attr('data-dowloaded') === 'yes'){
			return
		}
		if(index === 1){
			$.get('./page2.json').then((response)=>{
				let items = response
				items.forEach((i)=>{
					let $a = $(`
						<a href="./song.html?id=${i.id}">
							<div class="ranking">0${i.id}</div>
							<div class="hotMusic">
								<div class="music-body">
									<h3>${i.name}</h3>
									<p>
										<svg class="icon">
											<use xlink:href="#icon-sq"></use>
										</svg>
										<span>${i.singer}</span>
									</p>
								</div>
								<div class="music-play">
									<svg class="icon">
										<use xlink:href="#icon-music-play"></use>
									</svg>
								</div>
							</div>
						</a>
					`)
				$('#hot-list').append($a)
				
				$li.attr('data-dowloaded','yes')
				})
			})
		}
		else if(index === 2){
			$.get('./page3.json').then((response)=>{
				$("#searchSong").focus()
				console.log(1)
//				console.log(response)
//				$li.text(response.content)
				$li.attr('data-dowloaded','yes')
			})
		}
	})
	
	
	$('#closeIcon').on('click',function(){
		$('#default').addClass('active')
		$('#output').removeClass('active')
		$('#searchSong').val('')
		$('.holder').text('搜索歌曲、歌手、专辑')
		$('#closeIcon').hide()
		$('#output>ul').text('')
	})
	
	let timer = undefined
	$('input#searchSong').on('input',function(e){
		$('.holder').text('')
		$('#closeIcon').show()
		let $input = $(e.currentTarget)
		$('#default').removeClass('active')
		$('#output').addClass('active')
		$('#outputSearch').text($('input#searchSong').val())
		let value = $input.val().trim()
		if(value === ''){return}
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(function(){
			search(value).then((result)=>{
				timer = undefined
				if(result.length  !==0){
					create(result.map((r)=>r.name).join(','),$('#output>ul'))
//					$('#outputSearch').text(result.map((r)=>r.name).join(','))
				}else{
//					$('#output').text('没有结果')
				}
			})
		},300)
	})
	
	function create(val,object){
		let $li = $(`
			<li>
				<a href="javascript:;">
									<div class="ranking">
										<svg class="icon">
												<use xlink:href="#icon-search"></use>
											</svg>
									</div>
									<div class="hotMusic">
										<div class="music-body">
											<p><span>${val}</span></p>
										</div>
									</div>
								</a>
								</li>
								
			`)
		object.prepend($li)
	}
	
	
	
	
	
	function search(keyword){
		return new Promise((resolve,reject)=>{
			var db = [
				{"id":"1","name":"火星情报局"},
				{"id":"2","name":"Waiting For Love"},
				{"id":"3","name":"Wake Me Up"},
			]
			let result = db.filter(function(item){
				return item.name.indexOf(keyword)>=0
			})
			setTimeout(function(){
				resolve(result)
			},(Math.random()*200+1000))
		})
	}
	
})

		//		items.forEach((i)=>{
		//			let $li = $(`
		//					
		//			`)
		//			$('.new-music').append($li)
		//		})
//				<a href="./song.html">
//							<div>
//								<div class="music-body">
//									<h3>Dumb Blonde</h3>
//									<p>
//										<svg class="icon">
//											<use xlink:href="#icon-sq"></use>
//										</svg>
//										<span>Avril Lavigne / Nicki Minaj</span>
//									</p>
//								</div>
//								<div class="music-play">
//									<svg class="icon">
//										<use xlink:href="#icon-music-play"></use>
//									</svg>
//								</div>
//							</div>
//						</a>




//搜索框中输入文字的时候
//
//default隐藏
//
//output显示

