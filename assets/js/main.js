jQuery(function($) {

    'use strict';

    var _Blog = window._Blog || {};

    _Blog.prettify = function() {
        $('pre').addClass('prettyprint linenums').attr('style', 'overflow:auto;');
        $('pre').addClass('prettyprint linenums').attr('style', 'white-space: pre-wrap;');
        window.prettyPrint && prettyPrint();
    };

    _Blog.externalUrl = function() {
        $.expr[':'].external = function(obj) {
            return !obj.href.match(/^mailto\:/) &&
                (obj.hostname != location.hostname);
        };
        $('a:external').addClass('external');
        $(".external").attr('target', '_blank');

    }

    _Blog.changeTitle = function() {
        var currentTitle = document.title;
        window.onblur = function() {
            document.title = '叮咚~~ 你有新的消息（＞﹏＜）';
        }
        window.onfocus = function() {
            document.title = currentTitle;
        }
    };

    _Blog.toggleTheme = function() {
        const currentTheme = window.localStorage && window.localStorage.getItem('theme')
        const isDark = currentTheme === 'dark'
        $('body').toggleClass('dark-theme', isDark)
        $('.theme-switch').on('click', () => {
            $('body').toggleClass('dark-theme');
            var theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            window.localStorage && window.localStorage.setItem('theme', theme);
            if(theme === 'dark'){
                $('.theme-switch i').removeClass("far fa-moon").addClass("fas fa-sun");
            }else{
                $('.theme-switch i').removeClass("fas fa-sun").addClass("far fa-moon");
            }
        })
    }

    _Blog.toggleMobileMenu = function() {
        $('.menu-toggle').on('click', () => {
            $('.menu-toggle').toggleClass('active')
            $('#mobile-menu').toggleClass('active')
        })
    }

    _Blog.toggleServerWork = function() {
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
    }

    $(document).ready(function() {
        _Blog.prettify()
        _Blog.changeTitle()
        _Blog.toggleTheme()
        _Blog.toggleMobileMenu()
        _Blog.toggleServerWork()
    });
});