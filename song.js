$(function(){
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
})