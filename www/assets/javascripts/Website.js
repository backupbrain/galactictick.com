function GalacticTickWebsite() {
	this.animationSpeed_ms = 600; // 0.6s
	this.init();
	console.log("GalacticTickWebsite loaded");
}

GalacticTickWebsite.prototype.init = function() {
	pageID = $("body").attr("id");


	this.linkNavigation(pageID);

	this.initParallax();
	this.initMenuBar();
}


GalacticTickWebsite.prototype.initParallax = function() {
	$( window ).scroll(function() {
		$("header").css("background-position", "" + window.scrollY/150 + "em "+ " center");
		$("#about:before").css("transform","rotate(" + window.scrollY/50 + "deg)");
		$("#galaxy").css("transform", "rotate(" + window.scrollY / 50 + "deg)");
	
	});
}


GalacticTickWebsite.prototype.initMenuBar = function() {
	var smallMenuClass = "floating";
	var scrollChangePosition = 50;
	var isSmallMenu = $("nav").hasClass(smallMenuClass);
	$(window).scroll(function() {
		var scrollPosition = $(window).scrollTop();
		if (scrollPosition > scrollChangePosition) {
			if (!isSmallMenu) {
				$("#top_bar").addClass(smallMenuClass);
			}
		} else {
			if (!isSmallMenu) {
				$("#top_bar").removeClass(smallMenuClass);
			}
		}
	});
}

GalacticTickWebsite.prototype.navScroll = function(event, element) {

	var $root = $('html, body');
		event.preventDefault();
		var href = $.attr(element, 'href');

		var scrollValue = 0;
		if (href != "#") {
			scrollValue = $(href).offset().top;
		}

//		$("nav").toggle();
//		$("nav").slideUp(this.animationSpeed_ms);
		nav = $("nav");
		if (nav.hasClass("open")) {
			nav.slideUp();
			nav.removeClass("open");
		}

		$root.animate({
			scrollTop: scrollValue
		}, 500, function () {
			//window.location.hash = href;
		});
}
GalacticTickWebsite.prototype.linkNavigation = function(pageID) {
	var self = this;
	$("#collapse_menu a").click(function(event) {
		event.preventDefault();
		nav = $("nav");
		if (nav.is(":visible")) {
			nav.slideUp();
			nav.removeClass("open");
		} else {
			nav.slideDown();
			nav.addClass("open");
		}
//		$("nav").toggle();

	});

	// animate scroll from nav click,
	// cache links and update URL
	// http://stackoverflow.com/a/7717572
	var $root = $('html, body');
	$('nav a[href^="#"]').click(function(event) {
		self.navScroll(event, this);
	});

	$('button[href^="#"]').click(function(event) {
		self.navScroll(event, this);
	});


	// update nav menu when scrolling over sections
	// http://codetheory.in/change-active-state-links-sticky-navigation-scroll/
	var sections = $('section')
		, nav = $('nav')
		, nav_height = nav.outerHeight();

	$(window).on('scroll', function () {
		var cur_pos = $(this).scrollTop();

		sections.each(function() {
			var top = $(this).offset().top - nav_height,
			bottom = top + $(this).outerHeight();

			if (cur_pos >= top && cur_pos <= bottom) {
				nav.find('li').removeClass('active');
				sections.removeClass('active');

				$(this).addClass('active');
				navmenuitem = nav.find('a[href="#'+$(this).attr('id')+'"]').closest('li');
				if (navmenuitem.length) {
					navmenuitem.addClass('active');
				} else {
					nav.find('a[href="#"]').closest('li').addClass('active');
				}
			} else {

			}
		});
	});
}

GalacticTickWebsite.prototype.linkButtons = function() {
	$("button").each(function(index, b) {
		var button = $(b);
		var href = button.attr("href");
		button.click(function() {
			window.location.href = href;
		});
	});
}

GalacticTickWebsite.prototype.isIE = function() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}