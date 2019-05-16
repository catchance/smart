
function initScrollSpy () {
    var tocSelector = '.post-toc';
    var $tocElement = $(tocSelector);
    var activeCurrentSelector = '.active-current';

    $tocElement.on('activate.bs.scrollspy', function () {
            var $currentActiveElement = $(tocSelector + ' .active').last();

            removeCurrentActiveClass();
            $currentActiveElement.addClass('active-current');
        })
        .on('clear.bs.scrollspy', removeCurrentActiveClass);

    $('body').scrollspy({ target: tocSelector });

    function removeCurrentActiveClass () {
        $(tocSelector + ' ' + activeCurrentSelector)
            .removeClass(activeCurrentSelector.substring(1));
    }
}

function initTOCDimension () {
    var updateTOCHeightTimer;

    $(window).on('resize', function () {
        updateTOCHeightTimer && clearTimeout(updateTOCHeightTimer);

        updateTOCHeightTimer = setTimeout(function () {
            var tocWrapperHeight = document.body.clientHeight - 100;

            updateTOCHeight(tocWrapperHeight);
        }, 0);
    });

    // Initialize TOC Height.
    updateTOCHeight(document.body.clientHeight - 100);

    // Initialize TOC Width.
    var scrollbarWidth = getScrollbarWidth();
    $('.post-toc').css('width', 'calc(100% + ' + scrollbarWidth + 'px)');
}

function getScrollbarWidth () {
    var $div = $('<div />').addClass('scrollbar-measure').prependTo('body');
    var div = $div[0];
    var scrollbarWidth = div.offsetWidth - div.clientWidth;

    $div.remove();

    return scrollbarWidth;
}

function updateTOCHeight (height) {
    height = height || 'auto';
    $('.post-toc').css('max-height', height);
}

function initTocCss() {

    // 设置 class
    $('#TableOfContents ul').addClass('nav-child');
    $('#TableOfContents ul:first-child').removeClass('nav-child').addClass('nav');
    $('#TableOfContents li').addClass('nav-item');
    $('#TableOfContents a').addClass('nav-link nav-text');

}

$(document).ready(function () {

    initTocCss();
    initScrollSpy();
    initTOCDimension();

    var html = $('html');
    var TAB_ANIMATE_DURATION = 200;
    var hasVelocity = $.isFunction(html.velocity);

    $('.sidebar-nav li').on('click', function () {
        var item = $(this);
        var activeTabClassName = 'sidebar-nav-active';
        var activePanelClassName = 'sidebar-panel-active';
        if (item.hasClass(activeTabClassName)) {
            return;
        }

        var currentTarget = $('.' + activePanelClassName);
        var target = $('.' + item.data('target'));

        hasVelocity ?
            currentTarget.velocity('transition.slideUpOut', TAB_ANIMATE_DURATION, function () {
                target
                    .velocity('stop')
                    .velocity('transition.slideDownIn', TAB_ANIMATE_DURATION)
                    .addClass(activePanelClassName);
            }) :
            currentTarget.animate({ opacity: 0 }, TAB_ANIMATE_DURATION, function () {
                currentTarget.hide();
                target
                    .stop()
                    .css({'opacity': 0, 'display': 'block'})
                    .animate({ opacity: 1 }, TAB_ANIMATE_DURATION, function () {
                        currentTarget.removeClass(activePanelClassName);
                        target.addClass(activePanelClassName);
                    });
            });

        item.siblings().removeClass(activeTabClassName);
        item.addClass(activeTabClassName);
    });

    $('.post-toc a').on('click', function (e) {
        e.preventDefault();
        var targetSelector = escapeSelector(this.getAttribute('href'));
        var offset = $(targetSelector).offset().top;

        hasVelocity ?
            html.velocity('stop').velocity('scroll', {
                offset: offset  + 'px',
                mobileHA: false
            }) :
            $('html, body').stop().animate({
                scrollTop: offset
            }, 500);
    });
});

/**
 * Escape meta symbols in jQuery selectors.
 *
 * @param selector
 * @returns {string|void|XML|*}
 */
function escapeSelector (selector) {
    return selector.replace(/[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, '\\$&');
}