$(function() {

	let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)
	$.get('./song.json').then(function(response) {
		let songs = response
		let song = songs.filter(s=>s.id == id)[0]
		let {url} = song
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
	})
	//从json中获取歌词
	$.get('lyric.json').then(function(object) {
		let {
			lyric
		} = object
		let array = lyric.split('\n')
		let $lyric = $('.scroll-lyric')
		for(var i = 0; i < array.length; i++) {
			let newArr = array[i].split(']')
			let $p = $("<p></p>")
			$p.text(newArr[1])
			$p.appendTo($lyric)
		}
	})

	//控制播放按钮显示与否
	$('.disc-container').click(function() {

	})

})