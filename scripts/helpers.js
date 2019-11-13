/* global hexo */

'use strict';

var join = require('path').join;
const { basename } = require('path');
var _ = require('lodash');
var cheerio = require('cheerio');
var lunr = require('lunr');
require('es6-promise').polyfill();
require('isomorphic-fetch');

var localizedPath = ['docs', 'api'];

function startsWith(str, start) {
  return str.substring(0, start.length) === start;
}

hexo.extend.helper.register('sidebar', function(path) {
  return `
    <ul class="sidebar-menu">
      ${genSidebarList.call(this, "", this.site.data.sidebar[path])}
    </ul>
      `
});
    
function genSidebarList(parent, entries) {
/* necessary due to changed context of map() */
let self = this
/* all languages except english needs a path prefix */
let lang = (self.page.lang != 'en' && parent == "") ?  self.page.lang : ''
return entries.map(entry => {
  /* normally path needs to be prefixed with lang and parent path */
  let fullPath = join('/', lang, parent, entry.path)
  /* sometimes paths are full URLs instead of sub-paths */
  if (entry.path.startsWith('http')) { fullPath = entry.path }
  /* path is active when it's the one we are on currently */
  let isActive = ('/'+self.path).startsWith(fullPath)
  return `
    <li class="${isActive ? "active" : ""}">
      <a href="..${fullPath}">${entry.title}</a>
      ${(entry.children != undefined) ? `
      <ul class="sidebar-submenu">
        ${genSidebarList.call(self, fullPath, entry.children)}
      </ul>
      ` : ''}
    </li>`
}).join('\n')
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

hexo.extend.helper.register('page_nav', function() {
  const sidebar = this.site.data.old_sidebar["docs"];
  const path = basename(this.path);
  const list = {};
  const prefix = 'old_sidebar.docs.';

  for (let i in sidebar) {
    for (let j in sidebar[i]) {
      list[sidebar[i][j]] = j;
    }
  }

  const keys = Object.keys(list);
  const index = keys.indexOf(path);
  let result = '';

  if (index > 0) {
    result += `<a href="${keys[index - 1]}" class="article-footer-prev" title="${this.__(prefix + list[keys[index - 1]])}"><i class="fa fa-chevron-left"></i><span>Previous</span></a>`;
  }

  if (index < keys.length - 1) {
    result += `<a href="${keys[index + 1]}" class="article-footer-next" title="${this.__(prefix + list[keys[index + 1]])}"><span>Next</span><i class="fa fa-chevron-right"></i></a>`;
  }

  return result;
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
