$(function(){
	//从json中获取歌词
	$.get('lyric.json').then(function(object){
		let {lyric} = object
		let array = lyric.split('\n')
		let $lyric = $('.scroll-lyric')
		for(var i = 0;i<array.length;i++){
			let newArr = array[i].split(']')
			let $p = $("<p></p>")
			$p.text(newArr[1])
			$p.appendTo($lyric)
			console.log(newArr[1])
		}
	})
	let audio = document.createElement('audio')
	audio.src = "http://dl.stream.qqmusic.qq.com/C400003NktbO34AYJN.m4a?guid=4805131930&vkey=1E9975118C8D16BBEED1C361816A86A2ECE666E7D0FFDC627B8A7F545AFD30F9C62B5ED59FC7175D2DB9AE93F788F584DF502506CD7B94E4&uin=0&fromtag=38"
    audio.oncanplay = function(){
    	audio.play()
		$('.disc-container').addClass('playing')
    }
    $('.icon-pause').on('click',function(){
    	audio.pause()
    	$('.disc-container').removeClass('playing')
    })
    $('.icon-play').on('click',function(){
    	audio.play()
    	$('.disc-container').addClass('playing')
    })
	//控制播放按钮显示与否
	$('.disc-container').click(function(){
		
	})
	

		
		
		
		
})


