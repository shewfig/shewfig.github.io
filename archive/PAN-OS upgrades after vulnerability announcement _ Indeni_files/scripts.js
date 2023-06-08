var intervalID = '';
$(document).ready( function(){
        jQuery("html").bind("mouseleave", function() {
            if ( jQuery(document).find('body#landing-page').length > 0 ) {
               jQuery('body').addClass('popup_load');
               jQuery('.lp-popup .lp-close').on('click',function(){
                   jQuery('body').removeClass('popup_load');
               });
            }
           jQuery("html").unbind("mouseleave");
    	});
    	equalheight('.cloudrail-help-list h3');
    	equalheight('.cloudrail-help-list-content');
    	equalheight('.cloudrail-team-plan-details');

    	$(".cloudrail-team-plan-btn a.btn").click(function(){
		 	event.preventDefault();	
		  	$(".cloudrail-help-price-chat-main-wrap").slideToggle();
		});
    	
        
        if ( jQuery(document).find('.home_page').length > 0 ) {
            jQuery('.lp-popup .lp-close').on('click',function(){
//                window.clearInterval(intervalID);
//                intervalID = window.setInterval(show_popup_load, 25000);
                jQuery('body').removeClass('popup_load');
            });
            jQuery('html').on('click',function() {
//                if ( jQuery('body').hasClass('popup_load') ) {
//                    window.clearInterval(intervalID);
//                    intervalID = window.setInterval(show_popup_load, 25000);
//                }
                jQuery('body').removeClass('popup_load');
            });

            jQuery('.lp-popup.blog-popup-new-wrap .lp-box').click(function(event){
                event.stopPropagation();
            });
//            intervalID = setInterval(show_popup_load, 25000);
        }

	jQuery('.video_iframe_wrap').each(function(i, v) {
	    var getSrc = jQuery(this).find('iframe').attr('src');
	    jQuery(this).find('iframe').attr('src', getSrc + '?autoplay=0&mute=1');
	});

	jQuery('.custom_video_play_btn').click(function() {
	    jQuery('.video_iframe_wrap').each(function(i, v) {
	        jQuery('.play_video_banner_wrap').show();
	        var getSrc = jQuery(this).find('iframe').attr('src');
	        jQuery(this).find('iframe').attr('src', getSrc.replace("autoplay=1", "autoplay=0"));
	    });
	    var getSrc = jQuery(this).parents('.video_iframe_wrap').find('iframe').attr('src');
	    jQuery(this).parents('.video_iframe_wrap').find('iframe').attr('src', getSrc.replace("autoplay=0", "autoplay=1"));
	    jQuery(this).parents('.video_iframe_wrap').find('.play_video_banner_wrap').hide();
	})
	
    jQuery(document).on('click','.scroll_btn',function(e){
        e.preventDefault();
        var urlHash = jQuery(this).attr('href').split("#")[1];
        if (urlHash && jQuery('#' + urlHash).length ){
            if ( jQuery(window).width() > '1180' ) {
                jQuery('html,body').animate({
                    scrollTop: jQuery('#' + urlHash).offset().top - jQuery(document).find('header').height() + 30
                }, 700);
            } else {
                jQuery('html,body').animate({
                    scrollTop: jQuery('#' + urlHash).offset().top + 30
                }, 700);
            }
        };
    });
	$('#filter-resource').on('click', function(e){
		e.preventDefault();
		var asset_type = [];
		var blog_check = 1;
		$.each($("input[name='asset_type']:checked"), function(){            
			asset_type.push($(this).val());
			
			if( $(this).val() == 'blog' ) {
				blog_check = 2;
			}
		});

		if( blog_check == 2 ){
			window.location = '/blog';
			console.log('redirect to blog');
			return;
		}
		
		var vendors = [];
		$.each($("input[name='vendors']:checked"), function(){            
			vendors.push($(this).val());
		});
		
		var url = $('#get_current_permalink').val();
		
		if ( (vendors === undefined || vendors.length == 0 ) && (asset_type === undefined || asset_type.length == 0) ) {
			console.log('both empty');
		} else if( (asset_type === undefined || asset_type.length == 0) && (vendors) ){
			url += '?vendors=' + vendors.join("|");
		} else if( (vendors === undefined || vendors.length == 0) && (asset_type) ){
			url += '?resource=' + asset_type.join("|");
		} else {
			url += '?vendors=' + vendors.join("|") + '&resource=' + asset_type.join("|");
		}
		
		window.location = url
		
	});
	
	var countLi = 1;
	$('.sidebar li').each( function(){
		if( $(this).hasClass('page_item_has_children') ){			
			var thisLI = $(this);
			$(this).append('<span class="toggle-menu menu-list-item-'+countLi+'"></span>');
			
			$(this).on('click', '.menu-list-item-'+countLi+'', function(){
				
				if($(this).prev('ul.children').is(':hidden') == true) {
					$(this).parent().addClass('show_child');
					$(this).prev('ul.children').slideDown(300 , function(){
						jQuery('.section > .wrapper > .equal-block').removeAttr('style');
						var grid_review_height1 = Math.max.apply(null, jQuery(".section > .wrapper > .equal-block").map(function (){ return jQuery(this).height(); }).get());
						jQuery(".section > .wrapper > .equal-block").height(grid_review_height1);
					});
				} else {
					$(this).parent().removeClass('show_child');
					$(this).prev('ul.children').slideUp(300, function(){
						jQuery('.section > .wrapper > .equal-block').removeAttr('style');
						var grid_review_height1 = Math.max.apply(null, jQuery(".section > .wrapper > .equal-block").map(function (){ return jQuery(this).height(); }).get());
						jQuery(".section > .wrapper > .equal-block").height(grid_review_height1);
					});
				}
				setTimeout( function(){
				
				}, 300);
			});
			
			countLi++;
		}		
	});
	$('.sidebar > ul > li.current_page_ancestor').addClass('show_child');
	$('.sidebar li.current_page_item').addClass('show_child');
	$('.sidebar li.current_page_parent').addClass('show_child'); 
	
	jQuery('#find-a-partner-btn').on('click', function(e){
		
		e.preventDefault();
		var LogoType = $('select[name="logo-type"]').val();
		var LogoProductSupported = $('select[name="logo-product-supported"]').val();
		var LogoLocation = $('select[name="logo-location"]').val();
		var LogoTrained = $('select[name="logo-trained"]').val();
		var LogoCounter = 1;
		
		if($('select[name="logo-type"]').length){} else{ LogoType = '-'; }
		if( $('select[name="logo-product-supported"]').length ){} else{ LogoProductSupported = '-'; }
		if($('select[name="logo-location"]').length){} else{ LogoLocation = '-'; }
		if($('select[name="logo-trained"]').length){} else{ LogoTrained = '-'; }
		
		jQuery('#logo-partners-list li').removeClass('filtered').css('display','none');
		jQuery('#logo-partners-list li').each( function(){
			//1234
			if( LogoType != '-' &&  LogoProductSupported != '-' &&  LogoLocation != '-' &&  LogoTrained != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-type*='"+LogoType+"']")
				.filter("[data-logo-prod-supp*='"+LogoProductSupported+"']")
				.filter("[data-logo-location*='"+LogoLocation+"']")
				.filter("[data-logo-trained*='"+LogoTrained+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('1234');
			//134
			} else if( LogoType != '-' &&  LogoLocation != '-' &&  LogoTrained != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-type*='"+LogoType+"']")
				.filter("[data-logo-location*='"+LogoLocation+"']")
				.filter("[data-logo-trained*='"+LogoTrained+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('134');
			//124
			} else if( LogoType != '-' &&  LogoProductSupported != '-' &&  LogoTrained != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-type*='"+LogoType+"']")
				.filter("[data-logo-prod-supp*='"+LogoProductSupported+"']")
				.filter("[data-logo-trained*='"+LogoTrained+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('124');
			//123
			} else if( LogoType != '-' &&  LogoProductSupported != '-' &&  LogoLocation != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-type*='"+LogoType+"']")
				.filter("[data-logo-prod-supp*='"+LogoProductSupported+"']")
				.filter("[data-logo-location*='"+LogoLocation+"']")
				.addClass('filtered').css('display','block');	
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('123');				
			
			//234
			} else if( LogoProductSupported != '-' &&  LogoLocation != '-' &&  LogoTrained != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-prod-supp*='"+LogoProductSupported+"']")
				.filter("[data-logo-location*='"+LogoLocation+"']")
				.filter("[data-logo-trained*='"+LogoTrained+"']")
				.addClass('filtered').css('display','block');	
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('234');
			//12
			}  else if( LogoType != '-' &&  LogoProductSupported != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-type*='"+LogoType+"']")
				.filter("[data-logo-prod-supp*='"+LogoProductSupported+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('12');
			
			//13
			} else if( LogoType != '-' &&  LogoLocation != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-type*='"+LogoType+"']")
				.filter("[data-logo-location*='"+LogoLocation+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('13');
			//14-41
			} else if( LogoType != '-' &&  LogoTrained != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-type*='"+LogoType+"']")
				.filter("[data-logo-trained*='"+LogoTrained+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('14');
			//23
			} else if( LogoProductSupported != '-' &&  LogoLocation != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-prod-supp*='"+LogoProductSupported+"']")
				.filter("[data-logo-location*='"+LogoLocation+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('23');
			//24
			} else if( LogoProductSupported != '-' && LogoTrained != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-prod-supp*='"+LogoProductSupported+"']")
				.filter("[data-logo-trained*='"+LogoTrained+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('24');
			//34
			} else if( LogoLocation != '-' &&  LogoTrained != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-location*='"+LogoLocation+"']")
				.filter("[data-logo-trained*='"+LogoTrained+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('34');
			//1
			} else if( LogoType != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-type*='"+LogoType+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('test');
				
			//2
			} else if( LogoProductSupported != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-prod-supp*='"+LogoProductSupported+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('2');
			//3
			} else if( LogoLocation != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-location*='"+LogoLocation+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('3');
			//4
			} else if( LogoTrained != '-' ){
				var thisFilter = jQuery(this)
				.filter("[data-logo-trained*='"+LogoTrained+"']")
				.addClass('filtered').css('display','block');
				if( thisFilter.is(':visible') ){ LogoCounter++;$('#logo-empty-response').css('display','none'); }
				console.log('4');
			} else{
				jQuery(this).css('display','block'); LogoCounter++;$('#logo-empty-response').css('display','none');
				console.log('----');
			}
		});
		
		if( LogoCounter == 1 ){
			$('#logo-empty-response').css('display','block');
		}
		
		jQuery('.logo.item > .img').removeAttr('style');
		var grid_review_height1 = Math.max.apply(null, jQuery(".logo.item > .img").map(function (){ return jQuery(this).height(); }).get());
		jQuery(".logo.item > .img").height(grid_review_height1);
		
		jQuery('#carousel .carousel-logo').slick('destroy').slick({
			speed: 300,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true,
			centerPadding: '60px',
			prevArrow: '#carousel .carousel-button-prev',
			nextArrow: '#carousel .carousel-button-next',
			responsive: [
				{
				  breakpoint: 680,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth : false,
					centerMode: false
				  }
				}
			]
		});
	});
	
	
	$('#community_search').on('submit', function(){
		 $.ajax({
				type: "post",
				url: "//community.indeni.com/search",
				data: { 
					expanded: true,
					q: "test"
				},
				success: function(data) {
					console.log(data);
				}
		});
		return false;
	});
	
    $('.nav_menu ul li').each(function(i, val) {
        $(this).find('a').attr('href', '#chap-' + i + '');
    });

    $('.chapter').each(function(i, val) {
        $(this).attr('id', 'chap-' + i + '');
    });

    $('.nav_menu .nav ul li a').on('click', function(e) {
        e.preventDefault();
        $('.nav_menu .nav ul li a').parent().removeClass('active');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 10
        }, 500, 'linear');
        $(this).parent().addClass('active');
        $(this).parents('.nav_menu .nav ul').addClass('active');
    });

    $(window).scroll(function() {
        var scrolltop = $(window).scrollTop();
        $('.chapter').each(function(e) {
            var sectiontop = $(this).offset().top - 20;
            var tab = $(this).attr("id");
            if (scrolltop > sectiontop) {
                $('.nav_menu .nav ul li').removeClass('active');
                $('.nav_menu .nav ul li').find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
                $('.nav_menu .nav ul li').find('a[href="#' + $(this).attr('id') + '"]').parents('.nav_menu .nav ul').addClass('active');
            }
        });
    });

    if (window.matchMedia("(max-width: 1400px)").matches) {
        $('.nav_menu .nav').before('<div class="bars_toggle"><i class="fa fa-bars" aria-hidden="true"></i></div>');
        $('.bars_toggle').click(function() {
            $(this).parents('.nav_menu').toggleClass('show');
        });

        $('.nav_menu .nav ul li a').click(function() {
            $(this).parents('.nav_menu').removeClass('show');
        });

    }
});
$(window).scroll((function() {
    var t = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
    $(".bar-long").addClass("show");
    $(".bar-long").css("width", t + "%")
}));
jQuery(window).load(function () {
    sameheight('.strip_box a.cta_button');
    jQuery(".nav_menu .nav").mCustomScrollbar({});
    if ( jQuery(document).find('.home_page').length > 0 ) {
        setTimeout(function(){
            show_popup_load();
        },25000);
//        intervalID = setInterval(show_popup_load, 25000);
    }
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function show_popup_load(){
    var check_cookie = getCookie('show_blog_popup');
    if ( !check_cookie ) { 
        jQuery('body').addClass('popup_load'); 
    }
}

jQuery(window).resize(function () {
    sameheight('.strip_box a.cta_button');
    equalheight('.cloudrail-help-list h3');
    equalheight('.cloudrail-help-list-content');
    equalheight('.cloudrail-team-plan-details');
});
function sameheight(clsaaName) {
    var highest = null;
    var hi = 0;
    jQuery(clsaaName).each(function () {
        var h = jQuery(this).outerHeight();
        if (h > hi) {
            hi = h;
            highest = jQuery(this);
        }
    });
    jQuery(clsaaName).css('height', hi);
}
$(window).load(function(){
  $(".partner_form_wrap form").submit(function() {
    $('.partner_form_wrap .hbspt-form .hs-form-field').each(function(){
           var $this = $(this);
           setTimeout(function(){ 
              var length = $this.find('.invalid').length;
                console.log(length)
                if ( length > 0 ) {
                    if ($this.find('.required_field').length < 1) {
                      $this.find('.hs-form-required').after('<span class="required_field">Required Field</span>');
                    }
                } else {
                  $this.find('.required_field').remove();
              }
           }, 450);
        });
  });

    jQuery(document).on('change focusout','.partner_form_wrap .hbspt-form .hs-input', function() {
       var $this = $(this).parents('.hs-form-field');
       setTimeout(function(){ 
          var length = $this.find('.invalid').length;
            if ( length > 0 ) {
                if ($this.find('.required_field').length < 1) {
                  $this.find('.hs-form-required').after('<span class="required_field">Required Field</span>');
                }
            } else {
              $this.find('.required_field').remove();
          }
       }, 450);
    });
     equalheight('.cloudrail-help-list h3');
     equalheight('.cloudrail-help-list-content');
     equalheight('.cloudrail-team-plan-details');
});

equalheight = function(container){

var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}
