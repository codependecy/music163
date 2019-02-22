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