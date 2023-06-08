$(document).ready(function() {
	window.onscroll = function() {myFunction()};
	var container = document.getElementById("container");
	var header = document.getElementById("header");
	var bg = container.offsetTop;
	function myFunction() {
            if ( header !== null ) {
                if (window.pageYOffset > bg) {
                        header.classList.add("bg");
                } else {
                    header.classList.remove("bg");
                }
            }
	}
	
	$('#nav_btn').click(function(e) {
		if($('#nav').is(':hidden') == true) {
			$(this).addClass("active");
			$('#nav').removeClass("toggle");
		} else {
			$(this).removeClass("active");
			$('#nav').addClass("toggle");
		} 
		e.preventDefault();
	});
	
	$('#search_btn').click(function(e) {
		if($('#searchform').is(':hidden') == true) {
			$(this).addClass("active");
			$('#searchform').removeClass("toggle_search");
		} else {
			$(this).removeClass("active");
			$('#searchform').addClass("toggle_search");
		} 
		e.preventDefault();
	});
	
	$('.dropdown_btn').bind('click', function(e) {
		var clickedbtn = $(this);
		if( $(this).next().is(':visible') ) {
			$(this).removeClass('active').next().slideUp('fast', 'swing');
		}
		if( $(this).next().is(':hidden') ) {
			if( $('#header ul.menu .active').next().is(':visible') ) {
				$('#header ul.menu .active').next().slideUp('fast', 'swing', function(){
					$('#header ul.menu .active').removeClass('active');
					$(clickedbtn).toggleClass('active').next().slideDown('fast', 'swing');
				});
			} else {
				$(this).toggleClass('active').next().slideDown('fast', 'swing');
			}
		}
		e.preventDefault();
	});
	
});