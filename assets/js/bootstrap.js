var sidebarToggleLines = {
    lines: [],
    push: function (line) {
        this.lines.push(line);
    },
    init: function () {
        this.lines.forEach(function (line) {
            line.init();
        });
    },
    arrow: function () {
        this.lines.forEach(function (line) {
            line.arrow();
        });
    },
    close: function () {
        this.lines.forEach(function (line) {
            line.close();
        });
    }
};

function SidebarToggleLine(settings) {
    this.el = $(settings.el);
    this.status = $.extend({}, {
        init: {
            width: '100%',
            opacity: 1,
            left: 0,
            rotateZ: 0,
            top: 0
        }
    }, settings.status);
}

SidebarToggleLine.prototype.init = function () {
    this.transform('init');
};
SidebarToggleLine.prototype.arrow = function () {
    this.transform('arrow');
};
SidebarToggleLine.prototype.close = function () {
    this.transform('close');
};
SidebarToggleLine.prototype.transform = function (status) {
    this.el.velocity('stop').velocity(this.status[status]);
};

var sidebarToggleLine1st = new SidebarToggleLine({
    el: '.sidebar-toggle-line-first',
    status: {
        arrow: {width: '50%', rotateZ: '-45deg', top: '2px'},
        close: {width: '100%', rotateZ: '-45deg', top: '5px'}
    }
});
var sidebarToggleLine2nd = new SidebarToggleLine({
    el: '.sidebar-toggle-line-middle',
    status: {
        arrow: {width: '90%'},
        close: {opacity: 0}
    }
});
var sidebarToggleLine3rd = new SidebarToggleLine({
    el: '.sidebar-toggle-line-last',
    status: {
        arrow: {width: '50%', rotateZ: '45deg', top: '-2px'},
        close: {width: '100%', rotateZ: '45deg', top: '-5px'}
    }
});

sidebarToggleLines.push(sidebarToggleLine1st);
sidebarToggleLines.push(sidebarToggleLine2nd);
sidebarToggleLines.push(sidebarToggleLine3rd);

function showSidebar () {

    sidebarToggleLines.close();

    $('.sidebar').velocity('stop').velocity({
            width: SIDEBAR_WIDTH
        }, {
            display: 'block',
            duration: SIDEBAR_DISPLAY_DURATION,
            begin: function () {
                // $('.sidebar .motion-element').velocity(
                //     'transition.slideRightIn',
                //     {
                //         stagger: 50,
                //         drag: true,
                //         complete: function () {
                //             $('.sidebar').trigger('sidebar.motion.complete');
                //         }
                //     }
                // );

            },
            complete: function () {
                $('.sidebar').addClass('sidebar-active');
            }
        }
    );

    $('.sidebar').find('.motion-element').velocity('stop').velocity({
        opacity: 1,
        translateX: 0,
        translateZ: 0
    }, {
        display: 'block',
        easing: "easeOutCirc",
        duration: 1000,
        begin: function () {
        },
        complete: function () {
        }
    });

}

function hideSidebar () {
    $('body').velocity('stop').velocity({paddingRight: 0});
    $('.sidebar').velocity('stop').velocity({width: 0}, {display: 'none'});

    sidebarToggleLines.init();

    $('.sidebar').removeClass('sidebar-active');

    //在 post 页面下按下隐藏 sidebar 时如果当前选中的是“站点概览”，将 toc 去除 motion 效果
    //防止再次打开时会出现在“站点概览”下的 bug
    if (!!$('.post-toc-wrap')) {
        if ($('.site-overview').css('display') === 'block') {
            $('.post-toc-wrap').removeClass('motion-element');
        }
    }

    $('.sidebar').find('.motion-element').velocity('stop').velocity({
            opacity: 0,
            translateX: 20,
            translateZ: 0
    },{
        display: 'block',
        easing: "easeInCirc",
        duration: 200,
    });

}

var SIDEBAR_WIDTH = '320px';

var SIDEBAR_DISPLAY_DURATION = 200;

var isSidebarVisible = false;

$(document).ready(function () {

    $(".sidebar-toggle").on('mouseenter', function(){
      if (isSidebarVisible) {
          return;
      }
      sidebarToggleLines.arrow();
    });

    $(".sidebar-toggle").on('mouseleave', function(){
        if (isSidebarVisible) {
            return;
        }
      sidebarToggleLines.init();
    });

    $(".sidebar-toggle").on('click', function(){
        isSidebarVisible ? hideSidebar() : showSidebar();
        isSidebarVisible = !isSidebarVisible;
    });

    /* 添加监听器监听鼠标离开sider 隐藏 */
    $(".sidebar").on('mouseleave', function(){
        hideSidebar();
        isSidebarVisible = !isSidebarVisible;
    });

    // serviceWorker
    // 检查浏览器是否对 serviceWorker 有原生支持
    if ('serviceWorker' in navigator) {
        console.log('Service Worker start Register');
        // 有原生支持时，在页面加载后开启新的 Service Worker 线程，从而优化首屏加载速度
        window.addEventListener('load', function() {
            // register 方法里第一个参数为 Service Worker 要加载的文件；第二个参数 scope 可选，用来指定 Service Worker 控制的内容的子目录
            navigator.serviceWorker.register('/service-worker.js', {scope: '/'}).then(function(registration) {
                // Service Worker 注册成功
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function (err) {
                // Service Worker 注册失败
                console.log('ServiceWorker registration failed:', err);
            });

            navigator.serviceWorker.ready.then(function(registration) {
                    console.log('Service Worker Ready');
            });
        });
    }
});




/************************utils.js*********************************/

function isMobile () {
    return window.screen.width < 767 && this.hasMobileUA();
}




















