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
										<span>Avril Lavigne / Nicki Minaj</span>
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
