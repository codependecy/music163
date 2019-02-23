$(function() {

	let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)
	$.get('./song.json').then(function(response) {
		let songs = response
		let song = songs.filter(s=>s.id == id)[0]
		let {url,name,lyric} = song
		
		initPlayer.call(undefined,url)
		initText(name,lyric)
	})
	
	
	function initText(name,lyric){
		$('.song-lyric > h1').text(name)
		parseLyric(lyric)
	}
	
	function initPlayer(url){
		let audio = document.createElement('audio')
		audio.src = url
		audio.oncanplay = function() {
			audio.play()
			$('.disc-container').addClass('playing')
		}
		$('.icon-pause').on('click', function() {
			audio.pause()
			$('.disc-container').removeClass('playing')
		})
		$('.icon-play').on('click', function() {
			audio.play()
			$('.disc-container').addClass('playing')
		})
		
		//	歌词滚动效果
		//	获取当前播放进度(时间)
		//	然后根据data-time 来和时间进行比对
		//	只要播放进度超过了data-time,就进行位移
	
		var time = setInterval(function(){
			let seconds = audio.currentTime
			let minutes = ~~(seconds/60)
			let left = seconds - minutes*60
			let times = `${pad(minutes)}:${pad(left)}`
			
			let $whichLine
			let $p = $('.scroll-lyric > p')
			for (let i = 0;i<$p.length;i++) {
				let currentLineTime = $p.eq(i).attr('data-time')
				let nextLineTime = $p.eq(i+1).attr('data-time')
				if($p.eq(i+1).length !==0 && currentLineTime < times && nextLineTime > times){
					$whichLine = $p.eq(i)
					break
				}
			}
			
			if($whichLine){
				let top = $whichLine.offset().top
				let LinesTop = $('.scroll-lyric').offset().top
				let delta = top - LinesTop - $('.lyric-body').height()/3
				$('.scroll-lyric').css('transform',`translateY(-${delta}px)`)
			}
		},300)
	}
	
	function pad(number){
		return number>= 10 ? number + '' : '0' + number
	}
	
	
	
	function parseLyric(lyric){
		let array = lyric.split('\n')
		let regex = /^\[(.+)\](.*)$/
		array = array.map(function(string,index){
			let matches = string.match(regex)
			if(matches){
				return {time: matches[1],words:matches[2]}
			}
		})
		let $lyric = $('.scroll-lyric')
		array.map(function(object){
			if(!object){return}
			let $p = $('<p/>')
			$p.attr('data-time',object.time).text(object.words)
			$p.appendTo($lyric)
		})
	}
	
	//从json中获取歌词
//	$.get('lyric.json').then(function(object) {
//		let {lyric} = object
//		let array = lyric.split('\n')
//		let $lyric = $('.scroll-lyric')
//		for(var i = 0; i < array.length; i++) {
//			let newArr = array[i].split(']')
//			let $p = $("<p></p>")
//			$p.text(newArr[1])
//			$p.appendTo($lyric)
//		}
//	})
	
	

	
	
	

	//控制播放按钮显示与否
	$('.disc-container').click(function() {

	})

})