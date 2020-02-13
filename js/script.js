$(document).ready(function(){
	
	var xTaps = {
		tap1:0,
		tap2:-864,
		tap3:-1728,
		tap4:-2592
	};
	var href;
	var xType = 'tap1';
	var xOpened = 0;
	function xScroll(i, dur){
		href = $(i).attr('href');
		if(xType != href){
			$('.x-all').animate({
				marginLeft: xTaps[href]
			}, dur);
			xType = href;
		}
	}
	
	$('#menu-x a').on('click', function(e){
		e.preventDefault();
		if(xOpened == 1){
			if(!$(this).hasClass('active')){
				$(this).parent().parent().find('.active').removeClass('active');
				$(this).addClass('active');
				xScroll(this, 600);
			}
		}
	});
	$('#menu-x a').hover(function(){
		if(xOpened == 0){
			$('#x-block').animate({
				top:'162'
			}, 600);
			$(this).addClass('active');
			xScroll(this, 0);
			xOpened = 1;
		}
	});
	$('#header').hover('',function(){
		if(xOpened == 1){
			$('#x-block').animate({
				top:'0'
			}, 600);
			$(this).find('.active').removeClass('active');
			xOpened = 0;
		}
	});
	
	var ext, src, img;
	$('.x-block').hover(function(){
		img = $(this).find('img');
		src = $(img).attr('src');
		ext = src.split('.').pop();
		src = src.replace('.'+ext, '');
		src += "-h."+ext;
		img.attr('src', src);
	}, function(){
		img = $(this).find('img');
		src = $(img).attr('src');
		ext = src.split('.').pop();
		src = src.replace('-h.'+ext, '');
		src += "."+ext;
		img.attr('src', src);
	});
	
	// Модальное окно

	function openModal(e){
		e.preventDefault();
		$(".hidden").css("display", "block");
		$("html").css("overflow-y", "hidden");
		$("body").css("margin-left", "-17px");
	}
	$("#thatsok, #oops").on("click", function(){
		$(".hidden").css("display", "none");
		$("html").css("overflow-y", "auto");
		$("body").css("margin-left", "0px");
	});
	$(".button, .more-link").on("click", openModal);
	$("#navigation").find("a").on("click", openModal);
	$("#f-links").find("a").on("click", openModal);
	$(".xx").on("click", openModal);
	// Переводчик
	$(".lang, .f-lang").hover(function(){
		$(".l-s").css("display", "block");
	}, function(){
		$(".l-s").css("display", "none");
	});
	$.getJSON('../translate.json', function(lng){
		if($.cookie('lang') == null){
			$.cookie('lang', '0', { expires: 7 });
			console.log("Куки не существует!");
		}
		console.log($.cookie('lang'));
		$('[data-translate-key]').each(function(){
			if($.cookie('lang') == '0') $(this).html(lng[0][$(this).attr('data-translate-key')]);
			else {
				$(this).html(lng[1][$(this).attr('data-translate-key')]);
				$.get('../css/en.css', function(data) {
					var style = document.createElement('style'),
						head  = document.getElementsByTagName('head')[0] || document.documentElemen;
					style.type = "text/css";
					style.textContent = style.text = data;
					head.appendChild(style, head.firstChild); 
				});
			}
		});
	});
	$('.change-lang').on('click', function(){
		if($.cookie('lang') == 0) $.cookie('lang', '1', { expires: 7 });
		else $.cookie('lang', '0', { expires: 7 });
	});
	// Srcoll наверх
	$("#f-arr").on("click", function(){
		$('html, body').stop().animate({scrollTop : 0}, 750);
	});
});
