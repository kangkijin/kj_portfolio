$(document).ready(function(){
    let smoothScroll = new SmoothScroll(0.07);
});

// 헤더 메뉴 반응형
function responsiveStyle() {

	var windowWidth = $(window).outerWidth();

	if (windowWidth < 1025) {
		//console.log('모바일,태블릿');
		
	} else {
		//console.log("PC");
		window.addEventListener("wheel", function(event) {
			var deltaY = event.deltaY;
		
			if (deltaY > 0) {
			// 아래로 스크롤
			$('body').addClass('scrolly');
			$('.header_wrap').removeClass('on');
			} else if (deltaY < 0) {
			// 위로 스크롤
			$('body').removeClass('scrolly');
			$('.header_wrap').addClass('on');
			}
		});
	}
		

		//TABLET,MOBILE 이벤트 제거

		//$('.header_wrap').on({
		//	'mouseenter focus':function(){
		//		$(this).addClass('on');
		//	},
		//	'mouseleave blur':function(){
		//		$(this).removeClass('on');
		//	}
		//});

}

var resizeTimer;
$( window ).on( 'resize', function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(resizeEnd, 1000);
} );

function resizeEnd() {
	responsiveStyle();
}

//별똥별 이벤트
function starEvent() {
	var container = $('#stars-container');
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	for (var i = 0; i < 100; i++) {
		createStar();
	}

	for (var e = 0; e < 10; e++) {
		createStar2();
	}

	function createStar() {
		var star = $('<div class="star"></div>');
		container.append(star);

		var initialX = Math.random() * windowWidth;
		var initialY = Math.random() * windowHeight - 20;

		star.css({
			top: initialY + 'px',
			left: initialX + 'px',
			//animation: 'star-fall 5s linear infinite',
			animationDelay: Math.random() + 's'
		});

		var isSecondHalf = Math.random() < 0.5; // 50%의 확률로 두 번째 절반에 속하도록 설정

		if (isSecondHalf) {
			star.addClass('second-half');
		} else {
			star.addClass('first-half');
		}
	}

	function createStar2() {
		var star2 = $('<div class="stardown"></div>');
		container.append(star2);

		var initialX2 = Math.random() * windowWidth;
		var initialY2 = Math.random() * windowHeight - 150;

		star2.css({
			top: initialY2 + 'px',
			left: initialX2 + 'px',
			//animation: 'star-fall 5s linear infinite',
			animationDelay: Math.random() + 's'
		});
		
		setTimeout(function() {
			star2.remove(); // 애니메이션 시간이 지난 후 별을 삭제
			createStar2(); // 새로운 별 생성
		}, 5000); // 5초 후에 실행
		
	}
}

//버튼 이벤트
function buttonCircle() {
	$(document).mousemove(function(e) {
        var mouseX = e.clientX;
        var mouseY = e.clientY;
        var follower = $('#follower');
		follower.addClass('on');
        
        // 효과를 부드럽게 하기 위해 transform 속성 사용
        follower.css({
          transform: "translate(-50%, -50%) translate3d(" + mouseX + "px, " + mouseY + "px, 0)"
        });

		$(".reserve_writebox, .schedule_area, .popup_detail").on({
			'mouseenter focusin' : function(){
				$('#follower').addClass('black');
			},
			'mouseleave focusout' : function(){
				$('#follower').removeClass('black');
			}
		});

		$(".click").on({
			'mouseenter focusin' : function(){
				$('#follower').addClass('click');
			},
			'mouseleave focusout' : function(){
				$('#follower').removeClass('click');
			}
		});

		$(".top").on({
			'mouseenter focusin' : function(){
				$('#follower').addClass('top');
			},
			'mouseleave focusout' : function(){
				$('#follower').removeClass('top');
			}
		});

		$(".hover").on({
			'mouseenter focusin' : function(){
				$('#follower').addClass('hover');
			},
			'mouseleave focusout' : function(){
				$('#follower').removeClass('hover');
			}
		});

    });
}

//리스트 이벤트
function listOpen() {
	var listShow = $('.list2');
	var andButton = $('.and_more');

	andButton.on('click', function() {
		listShow.css('display', 'grid');
		andButton.hide();

		setTimeout(function() {
			listShow.addClass('on');
		}, 100);
	});
}

// 스크롤 패럴럭스
function setScrollEffect(selector, extra) {
	checkVisibility();

	$(window).on('scroll resize', function() {
		checkVisibility();
	});

	function checkVisibility() {
		$(selector).each(function(){
			var target = $(this);
			var scrollTop = $(document).scrollTop();
			var minShow = target.offset().top - $(window).height() * extra;

			if ( scrollTop >= minShow ){
				target.addClass('on');
			}
		});
	}
}

// IE 버전 체크 (UserAgent)
var ua = navigator.userAgent.toLowerCase();
// IE7엔 브라우저 엔진명인 Trident가 없고 IE11엔 MSIE란 문자열이 없으므로 두 가지 경우를 모두 체크.
if( ua.indexOf( 'msie' ) != -1 || ua.indexOf( 'trident' ) != -1 ) {
	var version = 11;
	ua = /msie ([0-9]{1,}[\.0-9]{0,})/.exec( ua );
	if( ua )
	{
		version = parseInt( ua[ 1 ] );
	}
	var classNames = '';
	// 기존 방식에 is-ie 라는 클래스 추가
	classNames += ' is-ie';
	// 기존 방식에 현재 버전 클래스 추가
	classNames += ' ie' + version;
	for( var i = version + 1; i <= 11; i++ ) {
		classNames +=  ' lt-ie' + i;
	}
	// html 태그에 클래스 추가
	document.getElementsByTagName( 'html' )[ 0 ].className += classNames;
}

$(document).ready(function () {

	//gnb 메뉴 반응형 동작
	responsiveStyle();

	//별똥별 이벤트
	starEvent();

	//버튼 이벤트
	buttonCircle();

	//리스트 이벤트
	listOpen();

	// 스크롤 패럴럭스
	setScrollEffect('.fadeup', 1.1);
	setScrollEffect('.fadein', 1.1);
	//setScrollEffect('.faderight', 1.1);
	//setScrollEffect('.fadeleft', 1.1);


});

// $(window).on("load", function () {});

// outline 설정 - 키보드로 접근시엔 아웃라인을 보여주고 마우스로 접근할때는 아웃라인을 없애줌
(function (d) {
	var style_element = d.createElement('STYLE'),
		dom_events = 'addEventListener' in d,
		add_event_listener = function (type, callback) {
			// Basic cross-browser event handling
			if (dom_events) {
				d.addEventListener(type, callback);
			} else {
				d.attachEvent('on' + type, callback);
			}
		},
		set_css = function (css_text) {
			// Handle setting of <style> element contents in IE8
			!!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
		};

	d.getElementsByTagName('HEAD')[0].appendChild(style_element);

	// Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
	/*add_event_listener('mousedown', function () {
		set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
	});*/
	add_event_listener('keydown', function () {
		set_css(':focus{outline:dotted 1px #193296}::-moz-focus-inner{border:dotted 1px #193296;}');
	});
})(document);


