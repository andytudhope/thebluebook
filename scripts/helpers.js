/* global hexo */

'use strict';

var pathFn = require('path');
var _ = require('lodash');
var cheerio = require('cheerio');
var lunr = require('lunr');
require('es6-promise').polyfill();
require('isomorphic-fetch');

var localizedPath = ['docs', 'api'];

function startsWith(str, start) {
  return str.substring(0, start.length) === start;
}

hexo.extend.helper.register('sidebar', function(type) {
    
  var self = this,
      path = this.page.path,
      sidebar = this.site.data.sidebar[type],
      result = '<ul class="sidebar-menu">';

  _.each(sidebar, function(menu, category) {
      var title = generateSidebarTitle(category);
      if(typeof menu[category] === 'undefined'){
        title = self.__(title);
      }else{
        title = generateSidebarTitle(menu[category]);
      }
      if(category == 'tangled-bank'){
        result += '<li class="'+ checkIfActive(path, category+'/') +'"><a href="/'+ category + '/index.html">' + title + '</a>';
      }else{
        result += '<li class="'+ checkIfActive(path, category+'/') +'"><a href="/'+ category + '/">' + title + '</a>';
      }
      if(typeof menu == 'object'){
          result += '<ul class="sidebar-submenu">';
          _.each(menu, function(title, link) {
              if(menu[category] != title){
                var href = '';
                href = '/'+ category +'/'+ link +'.html';
                if(title.startsWith("..")){
                  href = title.replace("..","");
                  href = href.substring(0, href.indexOf(' '));
                }else if(title.startsWith("http")){
                  href = title;
                  href = href.substring(0, href.indexOf(' '));
                }
                title = generateSidebarTitle(title);
                result += '<li class="'+ checkIfActive(path, category+'/'+link+'.html') +'"><a href="'+ href +'">' + title + '</a></li>';
              }
          });
          result += '</ul>';
      }
  });

  result += '</ul>';
  return result;
});

function generateSidebarTitle(string){
  var s = string.substring(
      string.lastIndexOf("(") + 1, 
      string.lastIndexOf(")")
  );
  if(s == ''){
    s = string.replace(/_/g, " ");
    s = s.replace(/.html/g, "");
    s = toTitleCase(s);
  }
  return s;
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function checkIfActive(path, link){
  if(path.indexOf(link)){
      return '';
  }else{
      return 'active';
  }
}

hexo.extend.helper.register('header_menu', function(className) {
  var menu = this.site.data.menu;
  var result = '';
  var self = this;
  var lang = this.page.lang;
  var isEnglish = lang === 'en';

  _.each(menu, function(path, title) {
    if (!isEnglish && ~localizedPath.indexOf(title)) path = lang + path;

    result += '<a href="' + self.url_for(path) + '" class="' + className + '-link">' + self.__('menu.' + title) + '</a>';
  });

  return result;
});

hexo.extend.helper.register('page_nav', function(lang) {
  return;
});

hexo.extend.helper.register('url_for_lang', function(path) {
  var lang = this.page.lang;
  var url = this.url_for(path);

  if (lang !== 'en' && url[0] === '/') url = '/' + lang + url;

  return url;
});

hexo.extend.helper.register('raw_link', function(path) {
  return 'https://github.com/andytudhope/thebluebook/edit/develop/source/' + path;
});

hexo.extend.helper.register('page_anchor', function(str) {
  var $ = cheerio.load(str, {decodeEntities: false});
  var headings = $('h1, h2, h3, h4, h5, h6');

  if (!headings.length) return str;

  headings.each(function() {
    var id = $(this).attr('id');

    $(this)
      .addClass('article-heading')
      .append('<a class="article-anchor" href="#' + id + '" aria-hidden="true"></a>');
  });

  return $.html();
});

hexo.extend.helper.register('lunr_index', function(data) {
  var index = lunr(function() {
    this.field('name', {boost: 10});
    this.field('tags', {boost: 50});
    this.field('description');
    this.ref('id');

    _.sortBy(data, 'name').forEach((item, i) => {
      this.add(_.assign({ id: i }, item));
    });
  });

  return JSON.stringify(index);
});

hexo.extend.helper.register('canonical_path_for_nav', function() {
  var path = this.page.canonical_path;

  if (startsWith(path, 'docs/') || startsWith(path, 'api/')) {
    return path;
  }
  return '';

});

hexo.extend.helper.register('lang_name', function(lang) {
  var data = this.site.data.languages[lang];
  return data.name || data;
});

hexo.extend.helper.register('disqus_lang', function() {
  var lang = this.page.lang;
  var data = this.site.data.languages[lang];

  return data.disqus_lang || lang;
});

hexo.extend.helper.register('hexo_version', function() {
  return this.env.version;
});

function generateMenu(){
  return fetch('https://raw.githubusercontent.com/status-im/status-global-elements/master/dist/html/header.html')
  .then(function(response) {
      return response.text();
    })
  .then(function(response) {
      console.log('t2')
      return 'abc';
  })
  .catch(error => console.error(`Fetch Error =\n`, error));
}

hexo.extend.helper.register('global_header', function() {
  generateMenu().then(function(response){
    console.log(response);
    return response;
  });
  return 'asd';
});
