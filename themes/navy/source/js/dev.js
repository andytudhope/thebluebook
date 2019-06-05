(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  $(document).ready(function ($) {
  
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  
    mobileMenu(w);
    mobileFooterMenu(w);
  
    $(window).on('resize', function (event) {
      w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      mobileMenu(w);
      mobileFooterMenu(w);
    });

    $('.inner .inline-links a, .inline-links a').on('click', function() {
      var id = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(id).offset().top + 5
      }, 500);
      return false;
  });
  
    function mobileMenu(w) {
      if (w < 1199) {
        $('header nav, header .btns').appendTo('.mobile-nav');
      } else {
        $('.mobile-nav nav, .mobile-nav .btns').insertBefore('.mobile-nav-trigger');
      }
    }
  
    function mobileFooterMenu(w) {
      if (w < 768) {
        $('footer .navigation h5 a').attr('aria-expanded', 'false').addClass('collapsed');
        $('footer .collapse').removeClass('show');
      } else {
        $('footer .navigation h5 a').attr('aria-expanded', 'true').removeClass('collapsed');
        $('footer .collapse').addClass('show');
      }
    }
  
    $('.mobile-nav-trigger-close, .mobile-nav-trigger, .backdrop').on('click', function (event) {
      event.preventDefault();
      $('body').toggleClass('nav-active');
    });
  
    try {
      highlight();
    } catch (err) {
      setTimeout(function () {
        highlight();
      }, 2500);
    }
  
    function highlight() {
      $('.editor-content pre code').each(function (i, block) {
        hljs.highlightBlock(block);
      });
    }
  
    $('.sidebar').stick_in_parent({
      offset_top: 30
    });
  
    $('.sidebar-mobile-trigger, .mobile-sidebar-trigger-close').on('click', function (event) {
      event.preventDefault();
      $('body').toggleClass('sidebar-active');
    });
  
    if ($('.quick-nav').length) {
      var quickNavOffset = $('.quick-nav').offset().top;
      $(window).on('resize', function () {
        quickNavOffset = $('.quick-nav').offset().top;
      });
      $(window).on('scroll', function () {
        var y = $(window).scrollTop();
        if (y > quickNavOffset) {
          $('.quick-nav, .quick-nav-sub').addClass('fixed');
        } else {
          $('.quick-nav, .quick-nav-sub').removeClass('fixed');
        }
      });
      $('.quick-nav-sub ul li a').on('click', function (event) {
        event.preventDefault();
        var id = $(this).attr('href');
        $('html, body').animate({
          scrollTop: $(id).offset().top - 100
        }, 300);
      });
    }
  
    if ($('.right-sub-navigation').length) {
      $('.editor-content h1, .editor-content h2, .editor-content h3').each(function (index, element) {
        var id = $(this).attr('id');
        var title = $(this).text();
        $('.right-sub-navigation ul').append('<li class="li-' + $(this)[0].nodeName.toLowerCase() + '"><a href="#' + id + '">' + title + '</a></li>');
      });
      $('.right-sub-navigation').stick_in_parent({
        offset_top: 30
      });
      $('.right-sub-navigation a').on('click', function () {
        var id = $(this).attr('href');
        $('html, body').animate({
          scrollTop: $(id).offset().top - 50
        }, 500);
        return false;
      });
    }
  
    function timeDifference(current, previous) {
  
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;
  
      var elapsed = current - previous;
  
      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
      } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
      } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
      } else {
        return Math.round(elapsed / msPerYear) + ' years ago';
      }
    }
  });
  
  },{}]},{},[1])
  //# sourceMappingURL=main.js.map
  