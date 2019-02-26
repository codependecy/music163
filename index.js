$(function() {
	$.get('./song.json').then(function(response){
		console.log(response)
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
				console.log(response)
				$li.text(response.content)
				$li.attr('data-dowloaded','yes')
			})
		}
		else if(index === 2){
			$.get('./page3.json').then((response)=>{
//				console.log(response)
//				$li.text(response.content)
				$li.attr('data-dowloaded','yes')
			})
		}
	})
	
	let timer = undefined
	$('input#searchSong').on('input',function(e){
		let $input = $(e.currentTarget)
		let value = $input.val().trim()
		if(value === ''){return}
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(function(){
			search(value).then((result)=>{
				timer = undefined
				if(result.length  !==0){
					$('#output').text(result.map((r)=>r.name).join(','))
				}else{
					$('#output').text('没有结果')
				}
			})
		},300)
	})
	
	function search(keyword){
		console.log('搜索'+keyword)
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
				console.log('搜到'+keyword+'的结果')
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
