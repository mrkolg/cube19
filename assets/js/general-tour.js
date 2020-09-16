var isMobile;
(function($) {
    
    $(document).on('ready', function (e) {
		initVideo();
		initTouchDetect();
		animateBlock();
		initScrollSections();
		initAnchors();
		initRetinaCover();
		initMobileNav();
		initBrowserDetect(true, false);
		jQuery("#pardot-form").validate();
		jQuery("#piEmailPrefEmail").focus();
		initJCF();
		initMobMenu();
		initRegionDrop();
    });
    
    $(window).on('load', function (e) {
		
    });
	
	$(window).on('scroll load', function () {
		headerScroll();
	});

	function initRegionDrop(){
		if ($('#region-drop').length){
			$('#region-drop').on('change', function(){
				window.location.href = $(this).val();
			});
		}
	}
	
	function headerScroll() {
		var scrolltop = jQuery(window).scrollTop();
		var header = jQuery('.main-header');

		if (scrolltop > 2) {
			header.addClass('sticky-header')
		} else {
			header.removeClass('sticky-header')
		}
	}

	function initMobMenu() {
		$('#toggle').on('click', function () {
			$(this).toggleClass('active');
			if ($(this).hasClass('active')) {
				$('body').addClass('active-m-menu');
			} else {
				$('body').removeClass('active-m-menu');
			}
		});

		jQuery(window).on('resize', function () {
			if (window.matchMedia('(min-width: 768px)').matches) {
				jQuery('body').removeClass('active-m-menu');
				jQuery('#toggle').removeClass('active');
			}
		})
	}

	function initJCF() {
		jcf.setOptions('Select', {
			wrapNative: false,
			wrapNativeOnMobile: false,
			fakeDropInBody: false
		});
		jcf.replaceAll();
	}

	jQuery("#nav a").click(function(e) {
		e.preventDefault();
		jQuery("body").removeClass('nav-active');
	})

	function animateBlock() {
		jQuery('.animate').addClass('a-hidden').viewportChecker({
		  classToAdd: 'a-visible animated fadeInUp', // Class to add to the elements when they are visible
		  offset: 0
	  });
	}

	function initVideo(){
		jQuery('.jquery-background-video').bgVideo({fadeIn: 2000});
	}


	function initTouchDetect() {
		isMobile = {
			hasTouch: function () {
				return 'ontouchstart' in document.documentElement;
			},
			Android: function () {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function () {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function () {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			iPhone: function () {
				return navigator.userAgent.match(/iPhone/i);
			},
			Opera: function () {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function () {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function () {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			},
			ismobi: function () {
				return navigator.userAgent.match(/Mobi/i);
			}
		};
	}


	// mobile menu init
	function initMobileNav() {
		jQuery('body').mobileNav({
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener'
		});
	}

	function initScrollSections(){
		if (jQuery('#fullpage').length && !isMobile.hasTouch()){
			jQuery('#fullpage').fullpage({
				scrollBar: true
			});
		}
	}

	function initRetinaCover() {
		jQuery('.bg-stretch').retinaCover();
	}

	// initialize smooth anchor links
	function initAnchors() {
		new SmoothScroll({
			anchorLinks: '#nav a',
			extraOffset: 0,
			activeClasses: 'link',
			wheelBehavior: 'none'
		});
	}
    
})(jQuery);



/*
 * Simple Mobile Navigation
 */
;(function($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function() {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function() {
			var self = this;

			if(activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function(e) {
				if(self.isOpened()) {
					var target = $(e.target);
					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function(e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function() {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function() {
			this.container.addClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function() {
			this.container.removeClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function() {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function() {
		var win = $(window),
			doc = $('html'),
			resizeClass = 'resize-active',
			flag, timer;
		var removeClassHandler = function() {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function() {
			if(!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function() {
			var $container = jQuery(this);
			var instance = $container.data('MobileNav');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$container.data('MobileNav', new MobileNav($.extend({
					container: this
				}, opt)));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery));


/*
 * Browser Detect script
 */
function initBrowserDetect(addVersionOS, addBrowserMinorVersion) {
	window.BrowserDetect = (function() {
		// script settings
		var options = {
			osVersion: addVersionOS,
			minorBrowserVersion: addBrowserMinorVersion
		};

		// browser data
		var browserData = {
			browsers: {
				edge: uaMatch(/ Edge\/([0-9\.]*)/),
				chrome: uaMatch(/Chrome\/([0-9\.]*)/),
				firefox: uaMatch(/Firefox\/([0-9\.]*)/),
				safari: uaMatch(/Version\/([0-9\.]*).*Safari/),
				opera: uaMatch(/Opera\/.*Version\/([0-9\.]*)/, /Opera\/([0-9\.]*)/),
				msie: uaMatch(/MSIE ([0-9\.]*)/, /Trident.*rv:([0-9\.]*)/)
			},
			engines: {
				edgehtml: uaContains(' Edge\/'),
				webkit: uaContains('AppleWebKit'),
				trident: uaMatch(/(MSIE|Trident)/),
				gecko: uaContains('Gecko'),
				presto: uaContains('Presto')
			},
			platforms: {
				win: uaMatch(/Windows NT ([0-9\.]*)/),
				mac: uaMatch(/Mac OS X ([0-9_\.]*)/),
				linux: uaContains('X11', 'Linux')
			}
		};

		// perform detection
		var ua = navigator.userAgent;
		var detectData = {
			platform: detectItem(browserData.platforms),
			browser: detectItem(browserData.browsers),
			engine: detectItem(browserData.engines)
		};

		// private functions
		function uaMatch() {
			var regs = Array.prototype.slice.apply(arguments);
			return function() {
				for (var i = 0, result; i < regs.length; i++) {
					result = regs[i].exec(ua);
					if (result) {
						return result[1];
					}
				}
			};
		}
		function uaContains(word) {
			var words = Array.prototype.slice.apply(arguments);
			return function() {
				for(var i = 0; i < words.length; i++) {
					if(ua.indexOf(words[i]) < 0) {
						return;
					}
				}
				return true;
			};
		}
		function detectItem(items) {
			var detectedItem = null, itemName, detectValue;
			for(itemName in items) {
				if(items.hasOwnProperty(itemName)) {
					detectValue = items[itemName]();
					if(detectValue) {
						return {
							name: itemName,
							value: detectValue
						};
					}
				}
			}
		}

		// add classes to root element
		(function() {
			// helper functions
			var addClass = function(cls) {
				var html = document.documentElement;
				html.className += (html.className ? ' ' : '') + cls;
			};
			var getVersion = function(ver) {
				return typeof ver === 'string' ? ver.replace(/\./g, '_') : 'unknown';
			};

			// add classes
			if(detectData.platform) {
				addClass(detectData.platform.name);
				if(options.osVersion) {
					addClass(detectData.platform.name + '-' + getVersion(detectData.platform.value));
				}
			}
			if(detectData.engine) {
				addClass(detectData.engine.name);
			}
			if(detectData.browser) {
				addClass(detectData.browser.name);
				addClass(detectData.browser.name + '-' + parseInt(detectData.browser.value, 10));
				if(options.minorBrowserVersion) {
					addClass(detectData.browser.name + '-' + getVersion(detectData.browser.value));
				}
			}
		}());

		// export detection information
		return detectData;
	}());
}


/*
 * jQuery retina cover plugin
 */
;(function($) {
	'use strict';

	var styleRules = {};
	var templates = {
		'2x': [
			'(-webkit-min-device-pixel-ratio: 1.5)',
			'(min-resolution: 192dpi)',
			'(min-device-pixel-ratio: 1.5)',
			'(min-resolution: 1.5dppx)'
		],
		'3x': [
			'(-webkit-min-device-pixel-ratio: 3)',
			'(min-resolution: 384dpi)',
			'(min-device-pixel-ratio: 3)',
			'(min-resolution: 3dppx)'
		]
	};

	function addSimple(imageSrc, media, id) {
		var style = buildRule(id, imageSrc);

		addRule(media, style);
	}

	function addRetina(imageData, media, id) {
		var currentRules = templates[imageData[1]].slice();
		var patchedRules = currentRules;
		var style = buildRule(id, imageData[0]);

		if (media !== 'default') {
			patchedRules = $.map(currentRules, function(ele, i) {
				return ele + ' and ' + media;
			});
		}

		media = patchedRules.join(',');

		addRule(media, style);
	}

	function buildRule(id, src) {
		return '#' + id + '{background-image: url("' + src + '");}';
	}

	function addRule(media, rule) {
		var $styleTag = styleRules[media];
		var styleTagData;
		var rules = '';

		if (media === 'default') {
			rules = rule + ' ';
		} else {
			rules = '@media ' + media + '{' + rule + '}';
		}

		if (!$styleTag) {
			styleRules[media] = $('<style>').text(rules).appendTo('head');
		} else {
			styleTagData = $styleTag.text();
			styleTagData = styleTagData.substring(0, styleTagData.length - 2) + ' }' + rule + '}';
			$styleTag.text(styleTagData);
		}
	}

	$.fn.retinaCover = function() {
		return this.each(function() {
			var $block = $(this);
			var $items = $block.children('[data-srcset]');
			var id = 'bg-stretch' + Date.now() + (Math.random() * 1000).toFixed(0);

			if ($items.length) {
				$block.attr('id', id);

				$items.each(function() {
					var $item = $(this);
					var data = $item.data('srcset').split(', ');
					var media = $item.data('media') || 'default';
					var dataLength = data.length;
					var itemData;
					var i;

					for (i = 0; i < dataLength; i++) {
						itemData = data[i].split(' ');

						if (itemData.length === 1) {
							addSimple(itemData[0], media, id);
						} else {
							addRetina(itemData, media, id);
						}
					}
				});
			}

			$items.detach();
		});
	};
}(jQuery));


/*!
 * SmoothScroll module
 */
;(function($, exports) {
	// private variables
	var page,
		win = $(window),
		activeBlock, activeWheelHandler,
		wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll');

	// animation handlers
	function scrollTo(offset, options, callback) {
		// initialize variables
		var scrollBlock;
		if (document.body) {
			if (typeof options === 'number') {
				options = {
					duration: options
				};
			} else {
				options = options || {};
			}
			page = page || $('html, body');
			scrollBlock = options.container || page;
		} else {
			return;
		}

		// treat single number as scrollTop
		if (typeof offset === 'number') {
			offset = {
				top: offset
			};
		}

		// handle mousewheel/trackpad while animation is active
		if (activeBlock && activeWheelHandler) {
			activeBlock.off(wheelEvents, activeWheelHandler);
		}
		if (options.wheelBehavior && options.wheelBehavior !== 'none') {
			activeWheelHandler = function(e) {
				if (options.wheelBehavior === 'stop') {
					scrollBlock.off(wheelEvents, activeWheelHandler);
					scrollBlock.stop();
				} else if (options.wheelBehavior === 'ignore') {
					e.preventDefault();
				}
			};
			activeBlock = scrollBlock.on(wheelEvents, activeWheelHandler);
		}

		// start scrolling animation
		scrollBlock.stop().animate({
			scrollLeft: offset.left,
			scrollTop: offset.top
		}, options.duration, function() {
			if (activeWheelHandler) {
				scrollBlock.off(wheelEvents, activeWheelHandler);
			}
			if ($.isFunction(callback)) {
				callback();
			}
		});
	}

	// smooth scroll contstructor
	function SmoothScroll(options) {
		this.options = $.extend({
			anchorLinks: 'a[href^="#"]', // selector or jQuery object
			container: null, // specify container for scrolling (default - whole page)
			extraOffset: null, // function or fixed number
			activeClasses: null, // null, "link", "parent"
			easing: 'swing', // easing of scrolling
			animMode: 'duration', // or "speed" mode
			animDuration: 800, // total duration for scroll (any distance)
			animSpeed: 1500, // pixels per second
			anchorActiveClass: 'anchor-active',
			sectionActiveClass: 'section-active',
			wheelBehavior: 'stop', // "stop", "ignore" or "none"
			useNativeAnchorScrolling: false // do not handle click in devices with native smooth scrolling
		}, options);
		this.init();
	}
	SmoothScroll.prototype = {
		init: function() {
			this.initStructure();
			this.attachEvents();
			this.isInit = true;
		},
		initStructure: function() {
			var self = this;

			this.container = this.options.container ? $(this.options.container) : $('html,body');
			this.scrollContainer = this.options.container ? this.container : win;
			this.anchorLinks = jQuery(this.options.anchorLinks).filter(function() {
				return jQuery(self.getAnchorTarget(jQuery(this))).length;
			});
		},
		getId: function(str) {
			try {
				return '#' + str.replace(/^.*?(#|$)/, '');
			} catch (err) {
				return null;
			}
		},
		getAnchorTarget: function(link) {
			// get target block from link href
			var targetId = this.getId($(link).attr('href'));
			return $(targetId.length > 1 ? targetId : 'html');
		},
		getTargetOffset: function(block) {
			// get target offset
			var blockOffset = block.offset().top;
			if (this.options.container) {
				blockOffset -= this.container.offset().top - this.container.prop('scrollTop');
			}

			// handle extra offset
			if (typeof this.options.extraOffset === 'number') {
				blockOffset -= this.options.extraOffset;
			} else if (typeof this.options.extraOffset === 'function') {
				blockOffset -= this.options.extraOffset(block);
			}
			return {
				top: blockOffset
			};
		},
		attachEvents: function() {
			var self = this;

			// handle active classes
			if (this.options.activeClasses && this.anchorLinks.length) {
				// cache structure
				this.anchorData = [];

				for (var i = 0; i < this.anchorLinks.length; i++) {
					var link = jQuery(this.anchorLinks[i]),
						targetBlock = self.getAnchorTarget(link),
						anchorDataItem = null;

					$.each(self.anchorData, function(index, item) {
						if (item.block[0] === targetBlock[0]) {
							anchorDataItem = item;
						}
					});

					if (anchorDataItem) {
						anchorDataItem.link = anchorDataItem.link.add(link);
					} else {
						self.anchorData.push({
							link: link,
							block: targetBlock
						});
					}
				};

				// add additional event handlers
				this.resizeHandler = function() {
					if (!self.isInit) return;
					self.recalculateOffsets();
				};
				this.scrollHandler = function() {
					self.refreshActiveClass();
				};

				this.recalculateOffsets();
				this.scrollContainer.on('scroll', this.scrollHandler);
				win.on('resize load orientationchange refreshAnchor', this.resizeHandler);
			}

			// handle click event
			this.clickHandler = function(e) {
				self.onClick(e);
			};
			if (!this.options.useNativeAnchorScrolling) {
				this.anchorLinks.on('click', this.clickHandler);
			}
		},
		recalculateOffsets: function() {
			var self = this;
			$.each(this.anchorData, function(index, data) {
				data.offset = self.getTargetOffset(data.block);
				data.height = data.block.outerHeight();
			});
			this.refreshActiveClass();
		},
		toggleActiveClass: function(anchor, block, state) {
			anchor.toggleClass(this.options.anchorActiveClass, state);
			block.toggleClass(this.options.sectionActiveClass, state);
		},
		refreshActiveClass: function() {
			var self = this,
				foundFlag = false,
				containerHeight = this.container.prop('scrollHeight'),
				viewPortHeight = this.scrollContainer.height(),
				scrollTop = this.options.container ? this.container.prop('scrollTop') : win.scrollTop();

			// user function instead of default handler
			if (this.options.customScrollHandler) {
				this.options.customScrollHandler.call(this, scrollTop, this.anchorData);
				return;
			}

			// sort anchor data by offsets
			this.anchorData.sort(function(a, b) {
				return a.offset.top - b.offset.top;
			});

			// default active class handler
			$.each(this.anchorData, function(index) {
				var reverseIndex = self.anchorData.length - index - 1,
					data = self.anchorData[reverseIndex],
					anchorElement = (self.options.activeClasses === 'parent' ? data.link.parent() : data.link);

				if (scrollTop >= containerHeight - viewPortHeight) {
					// handle last section
					if (reverseIndex === self.anchorData.length - 1) {
						self.toggleActiveClass(anchorElement, data.block, true);
					} else {
						self.toggleActiveClass(anchorElement, data.block, false);
					}
				} else {
					// handle other sections
					if (!foundFlag && (scrollTop >= data.offset.top - 1 || reverseIndex === 0)) {
						foundFlag = true;
						self.toggleActiveClass(anchorElement, data.block, true);
					} else {
						self.toggleActiveClass(anchorElement, data.block, false);
					}
				}
			});
		},
		calculateScrollDuration: function(offset) {
			var distance;
			if (this.options.animMode === 'speed') {
				distance = Math.abs(this.scrollContainer.scrollTop() - offset.top);
				return (distance / this.options.animSpeed) * 1000;
			} else {
				return this.options.animDuration;
			}
		},
		onClick: function(e) {
			var targetBlock = this.getAnchorTarget(e.currentTarget),
				targetOffset = this.getTargetOffset(targetBlock);

			e.preventDefault();
			scrollTo(targetOffset, {
				container: this.container,
				wheelBehavior: this.options.wheelBehavior,
				duration: this.calculateScrollDuration(targetOffset)
			});
			this.makeCallback('onBeforeScroll', e.currentTarget);
		},
		makeCallback: function(name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		},
		destroy: function() {
			var self = this;

			this.isInit = false;
			if (this.options.activeClasses) {
				win.off('resize load orientationchange refreshAnchor', this.resizeHandler);
				this.scrollContainer.off('scroll', this.scrollHandler);
				$.each(this.anchorData, function(index) {
					var reverseIndex = self.anchorData.length - index - 1,
						data = self.anchorData[reverseIndex],
						anchorElement = (self.options.activeClasses === 'parent' ? data.link.parent() : data.link);

					self.toggleActiveClass(anchorElement, data.block, false);
				});
			}
			this.anchorLinks.off('click', this.clickHandler);
		}
	};

	// public API
	$.extend(SmoothScroll, {
		scrollTo: function(blockOrOffset, durationOrOptions, callback) {
			scrollTo(blockOrOffset, durationOrOptions, callback);
		}
	});

	// export module
	exports.SmoothScroll = SmoothScroll;
}(jQuery, this));


/*! Picturefill - v3.0.1 - 2015-09-30
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<41&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){z[b]=!1,aa()},d.onload=function(){z[b]=1===d.width,aa()},d.src=c,"pending"}function f(){L=!1,O=a.devicePixelRatio,M={},N={},s.DPR=O||1,P.width=Math.max(a.innerWidth||0,y.clientWidth),P.height=Math.max(a.innerHeight||0,y.clientHeight),P.vw=P.width/100,P.vh=P.height/100,r=[P.height,P.width,O].join("-"),P.em=s.getEmValue(),P.rem=P.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===A.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||_(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),W.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):X.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):W.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(S),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(T),m>=l)return n;g=c(U),h=[],","===g.slice(-1)?(g=g.replace(V,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=function(){},u=b.createElement("img"),v=u.getAttribute,w=u.setAttribute,x=u.removeAttribute,y=b.documentElement,z={},A={algorithm:""},B="data-pfsrc",C=B+"set",D=navigator.userAgent,E=/rident/.test(D)||/ecko/.test(D)&&D.match(/rv\:(\d+)/)&&RegExp.$1>35,F="currentSrc",G=/\s+\+?\d+(e\d+)?w/,H=/(\([^)]+\))?\s*(.+)/,I=a.picturefillCFG,J="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",K="font-size:100%!important;",L=!0,M={},N={},O=a.devicePixelRatio,P={px:1,"in":96},Q=b.createElement("a"),R=!1,S=/^[ \t\n\r\u000c]+/,T=/^[, \t\n\r\u000c]+/,U=/^[^ \t\n\r\u000c]+/,V=/[,]+$/,W=/^\d+$/,X=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Y=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},Z=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},$=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=Z(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in M))if(M[b]=!1,d&&(e=b.match(a)))M[b]=e[1]*P[e[2]];else try{M[b]=new Function("e",c(b))(P)}catch(f){}return M[b]}}(),_=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},aa=function(a){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),R=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}};o=a.console&&console.warn?function(a){console.warn(a)}:t,F in u||(F="src"),z["image/jpeg"]=!0,z["image/gif"]=!0,z["image/png"]=!0,z["image/svg+xml"]=b.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in u,s.supSizes="sizes"in u,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){u.srcset="data:,a",a.src="data:,a",s.supSrcset=u.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=A,s.supSrcset&&(s.sel+=",img["+C+"]"),s.DPR=O||1,s.u=P,s.types=z,q=s.supSrcset&&!s.supSizes,s.setSize=t,s.makeUrl=Z(function(a){return Q.href=a,Q.href}),s.qsa=function(a,b){return a.querySelectorAll(b)},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?$(a):!0},s.calcLength=function(a){var b=$(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?z[a]:!0},s.parseSize=Z(function(a){var b=(a||"").match(H);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=y.style.cssText,e=a.style.cssText;c.style.cssText=J,y.style.cssText=K,a.style.cssText=K,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),y.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in N)||A.uT){var b=s.calcLength(n(a));N[a]=b?b:P.width}return N[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)_(b[c],a.sizes)}return b},s.setRes.res=_,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[F],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=E&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=v.call(a,"src"),j.src?w.call(a,B,j.src):x.call(a,B)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=v.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:v.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&G.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g),h&&s.supSrcset&&!j.supported&&(e?(w.call(a,C,e),a.srcset=""):x.call(a,C)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!R||L||O!==a.devicePixelRatio)&&f()},s.supPicture?(aa=t,s.fillImg=t):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=y.clientHeight,i=function(){L=Math.max(a.innerWidth||0,y.clientWidth)!==P.width||y.clientHeight!==h,h=y.clientHeight,L&&s.fillImgs()};Y(a,"resize",g(i,99)),Y(b,"readystatechange",e)}(),s.picturefill=aa,s.fillImgs=aa,s.teardownRun=t,aa._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(A[b]=a[0],R&&s.fillImgs({reselect:!0}))}};for(;I&&I.length;)a.picturefillCFG.push(I.shift());a.picturefill=aa,"object"==typeof module&&"object"==typeof module.exports?module.exports=aa:"function"==typeof define&&define.amd&&define("picturefill",function(){return aa}),s.supPicture||(z["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);



/**
 * jQuery-viewport-checker - v1.8.8 - 2017-09-25
 * https://github.com/dirkgroenen/jQuery-viewport-checker
 *
 * Copyright (c) 2017 Dirk Groenen
 * Licensed MIT <https://github.com/dirkgroenen/jQuery-viewport-checker/blob/master/LICENSE>
 */

!function(a){a.fn.viewportChecker=function(b){var c={classToAdd:"visible",classToRemove:"invisible",classToAddForFullView:"full-visible",removeClassAfterAnimation:!1,offset:100,repeat:!1,invertBottomOffset:!0,callbackFunction:function(a,b){},scrollHorizontal:!1,scrollBox:window};a.extend(c,b);var d=this,e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()};return this.checkElements=function(){var b,f;c.scrollHorizontal?(b=Math.max(a("html").scrollLeft(),a("body").scrollLeft(),a(window).scrollLeft()),f=b+e.width):(b=Math.max(a("html").scrollTop(),a("body").scrollTop(),a(window).scrollTop()),f=b+e.height),d.each(function(){var d=a(this),g={},h={};if(d.data("vp-add-class")&&(h.classToAdd=d.data("vp-add-class")),d.data("vp-remove-class")&&(h.classToRemove=d.data("vp-remove-class")),d.data("vp-add-class-full-view")&&(h.classToAddForFullView=d.data("vp-add-class-full-view")),d.data("vp-keep-add-class")&&(h.removeClassAfterAnimation=d.data("vp-remove-after-animation")),d.data("vp-offset")&&(h.offset=d.data("vp-offset")),d.data("vp-repeat")&&(h.repeat=d.data("vp-repeat")),d.data("vp-scrollHorizontal")&&(h.scrollHorizontal=d.data("vp-scrollHorizontal")),d.data("vp-invertBottomOffset")&&(h.scrollHorizontal=d.data("vp-invertBottomOffset")),a.extend(g,c),a.extend(g,h),!d.data("vp-animated")||g.repeat){String(g.offset).indexOf("%")>0&&(g.offset=parseInt(g.offset)/100*e.height);var i=g.scrollHorizontal?d.offset().left:d.offset().top,j=g.scrollHorizontal?i+d.width():i+d.height(),k=Math.round(i)+g.offset,l=g.scrollHorizontal?k+d.width():k+d.height();g.invertBottomOffset&&(l-=2*g.offset),k<f&&l>b?(d.removeClass(g.classToRemove),d.addClass(g.classToAdd),g.callbackFunction(d,"add"),j<=f&&i>=b?d.addClass(g.classToAddForFullView):d.removeClass(g.classToAddForFullView),d.data("vp-animated",!0),g.removeClassAfterAnimation&&d.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){d.removeClass(g.classToAdd)})):d.hasClass(g.classToAdd)&&g.repeat&&(d.removeClass(g.classToAdd+" "+g.classToAddForFullView),g.callbackFunction(d,"remove"),d.data("vp-animated",!1))}})},("ontouchstart"in window||"onmsgesturechange"in window)&&a(document).bind("touchmove MSPointerMove pointermove",this.checkElements),a(c.scrollBox).bind("load scroll",this.checkElements),a(window).resize(function(b){e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()},d.checkElements()}),this.checkElements(),this}}(jQuery);
//# sourceMappingURL=jquery.viewportchecker.min.js.map