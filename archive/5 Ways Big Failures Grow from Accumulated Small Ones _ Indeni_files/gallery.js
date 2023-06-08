function open_modal(){
	$('body').prepend('<div id="modal"><div id="mask"></div><div class="modal_window close_modal"></div></div>');
	$('#mask').fadeTo('fast', 0.9);
	$('#modal, .modal_window').fadeIn('fast');
	
}

function close_modal(){
	$('.gallery_item').removeClass('current_gallery_item');
	$('.gallery_item').removeClass('next_gallery_item');
	$('.gallery_item').removeClass('prev_gallery_item');
	$('#modal, #mask, .modal_window, .controls').fadeOut('fast', function(){ $('#modal').remove(); } );
}

var resizeGalleryImage = function() {
	var containerWidth=$('.modal_window').width();
	var containerHeight=$('.modal_window').height();
	$('.modal_window img').css("width","auto");
	$('.modal_window img').css("max-width","100%");
	$('.modal_window img').css("height","auto");
	$('.modal_window img').css("max-height","100%");
	$('.modal_window img').css("margin-top",(containerHeight - $('.modal_window img').height())/2);
	$('.modal_window img').css("margin-left",(containerWidth - $('.modal_window img').width())/2);
};

var positionControls = function() {
	var containerWidth=$('.modal_window').width();
	var containerHeight=$('.modal_window').height();
	var imageWidth=$('.modal_window img').width();
	var imageHeight=$('.modal_window img').height();
	$('.controls').css("width",imageWidth);
	$('.controls').css("height",imageHeight);
	$('.controls').css("margin-top",(containerHeight - imageHeight)/2);
	$('.controls').css("margin-left",(containerWidth - imageWidth)/2);
};

jQuery(document).ready(function(){
	$('a.gallery_item').live('click', function(e){
		open_modal();
		
		$('.controls').remove();
		$('.modal_window').html('<div class="loader close_modal">Loading...</div>');
		
		var img_url = $(this).attr('href');
		var img = new Image();
		$(img).load(function(){
			$('.modal_window').append(img);
			resizeGalleryImage();
			$('.modal_window img').css("display","none");
			$('.modal_window .loader').fadeOut(500, function(){ $('.modal_window .loader').remove(); } );
			$('.modal_window img').delay(500).fadeIn(500);
			
			$('#modal').append('<div class="controls" style="display: none;"><div class="wrap"><nav class="btns"><span class="close_modal"><a href="#">&#10006;</a></span></nav></div></div>');
			positionControls();
			
			$('.controls').delay(500).fadeIn(500);
			
		}).attr('src',img_url).attr('class', 'gallery_img').attr('alt','');
		e.preventDefault();
	});
	
	$('.gallery_item a').live('click', function(e){
		open_modal();
		
		$('.controls').remove();
		$('.modal_window').html('<div class="loader close_modal">Loading...</div>');
		$(this).parent().prev().addClass('prev_gallery_item');
		$(this).parent().next().addClass('next_gallery_item');
		
		var img_url = $(this).attr('href');
		var img = new Image();
		$(img).load(function(){
			$('.modal_window').append(img);
			resizeGalleryImage();
			$('.modal_window img').css("display","none");
			$('.modal_window .loader').fadeOut(500, function(){ $('.modal_window .loader').remove(); } );
			$('.modal_window img').delay(500).fadeIn(500);
			
			$('#modal').append('<div class="controls" style="display: none;"><div class="wrap"><nav class="btns"><span class="close_modal"><a href="#">&#10006;</a></span></nav></div></div>');
			$('.controls .btns').prepend('<span class="prev_btn disabled">&larr;</span>');
		    $('.controls .btns').append('<span class="next_btn disabled">&rarr;</span>');
			positionControls();
				
			var prev = $('.prev_gallery_item a').clone();
			$(prev).html(function(index) { return '&larr;'; });
			if ($(prev).length ) {
				$(prev).removeAttr( 'style' );
				$('.controls .btns .prev_btn').html('');
				$('.controls .btns .prev_btn').removeClass('disabled');
				$('.prev_btn').delay(500).append(prev);
			};
				
			var next = $('.next_gallery_item a').clone();
			$(next).html(function(index) { return "&rarr;"; });
			if ($(next).length ) {
				$(next).removeAttr( 'style' );
				$('.controls .btns .next_btn').html('');
				$('.controls .btns .next_btn').removeClass('disabled');
				$('.next_btn').delay(500).append(next);
			};
			
			$('.controls').delay(500).fadeIn(500);
			
		}).attr('src',img_url).attr('class', 'gallery_img').attr('alt','');
		e.preventDefault();
	});
	
	$('.next_btn a').live('click', function(e){
		$('.modal_window').empty();
		$('.controls').remove();
		$('.modal_window').html('<div class="loader close_modal">Loading...</div>');
		
		$('.gallery_item').removeClass('current_gallery_item');
		$('.next_gallery_item').addClass('current_gallery_item');
		$('.gallery_item').removeClass('next_gallery_item');
		$('.gallery_item').removeClass('prev_gallery_item');
		
		$('.current_gallery_item').prev().addClass('prev_gallery_item');
		$('.current_gallery_item').next().addClass('next_gallery_item');
		
		var img_url = $(this).attr('href');
		var img = new Image();
		$(img).load(function(){
			$('.modal_window').append(img);
			resizeGalleryImage();
			$('.modal_window img').css("display","none");
			$('.modal_window .loader').fadeOut(500, function(){ $('.modal_window .loader').remove(); } );
			$('.modal_window img').delay(500).fadeIn(500);
			
			$('#modal').append('<div class="controls" style="display: none;"><div class="wrap"><nav class="btns"><span class="close_modal"><a href="#">&#10006;</a></span></nav></div></div>');
			$('.controls .btns').prepend('<span class="prev_btn disabled">&larr;</span>');
		    $('.controls .btns').append('<span class="next_btn disabled">&rarr;</span>');
			positionControls();
				
			var prev = $('.prev_gallery_item a').clone();
			$(prev).html(function(index) { return '&larr;'; });
			if ($(prev).length ) {
				$(prev).removeAttr( 'style' );
				$('.controls .btns .prev_btn').html('');
				$('.controls .btns .prev_btn').removeClass('disabled');
				$('.prev_btn').delay(500).append(prev);
			};
				
			var next = $('.next_gallery_item a').clone();
			$(next).html(function(index) { return "&rarr;"; });
			if ($(next).length ) {
				$(next).removeAttr( 'style' );
				$('.controls .btns .next_btn').html('');
				$('.controls .btns .next_btn').removeClass('disabled');
				$('.next_btn').delay(500).append(next);
			};
			
			$('.controls').delay(500).fadeIn(500);
			
		}).attr('src',img_url).attr('class', 'gallery_img').attr('alt','');
		e.preventDefault();
	});
	
	$('.prev_btn a').live('click', function(e){
		$('.modal_window').empty();
		$('.controls').remove();
		$('.modal_window').html('<div class="loader close_modal">Loading...</div>');
		
		$('.gallery_item').removeClass('current_gallery_item');
		$('.prev_gallery_item').addClass('current_gallery_item');
		$('.gallery_item').removeClass('next_gallery_item');
		$('.gallery_item').removeClass('prev_gallery_item');
		
		$('.current_gallery_item').prev().addClass('prev_gallery_item');
		$('.current_gallery_item').next().addClass('next_gallery_item');
		
		var img_url = $(this).attr('href');
		var img = new Image();
		$(img).load(function(){
			$('.modal_window').append(img);
			resizeGalleryImage();
			$('.modal_window img').css("display","none");
			$('.modal_window .loader').fadeOut(500, function(){ $('.modal_window .loader').remove(); } );
			$('.modal_window img').delay(500).fadeIn(500);
			
			$('#modal').append('<div class="controls" style="display: none;"><div class="wrap"><nav class="btns"><span class="close_modal"><a href="#">&#10006;</a></span></nav></div></div>');
			$('.controls .btns').prepend('<span class="prev_btn disabled">&larr;</span>');
		    $('.controls .btns').append('<span class="next_btn disabled">&rarr;</span>');
			positionControls();
				
			var prev = $('.prev_gallery_item a').clone();
			$(prev).html(function(index) { return '&larr;'; });
			if ($(prev).length ) {
				$(prev).removeAttr( 'style' );
				$('.controls .btns .prev_btn').html('');
				$('.controls .btns .prev_btn').removeClass('disabled');
				$('.prev_btn').delay(500).append(prev);
			};
				
			var next = $('.next_gallery_item a').clone();
			$(next).html(function(index) { return "&rarr;"; });
			if ($(next).length ) {
				$(next).removeAttr( 'style' );
				$('.controls .btns .next_btn').html('');
				$('.controls .btns .next_btn').removeClass('disabled');
				$('.next_btn').delay(500).append(next);
			};
			
			$('.controls').delay(500).fadeIn(500);
			
		}).attr('src',img_url).attr('class', 'gallery_img').attr('alt','');
		e.preventDefault();
	});
	
	$('.close_modal').live('click', function(e){ 
		$('.controls').remove();
		$('.modal_window').empty();
		close_modal();
		e.preventDefault();
    });
});

$(window).resize(function() {
	resizeGalleryImage();
	positionControls();
});