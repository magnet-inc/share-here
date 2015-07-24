var queryString = require('query-string');

var shareHere = function(options, to) {
  shareHere[to](options);
};

shareHere.defaultOptions = function(options) {
  if(!options.text) {
    var title = document.getElementsByTagName('title')[0];
    options.text = title.innerText;
  }

  if(!options.url) {
    var url = location.href;
    var canonicalLinks = document.getElementsByTagName('link');
    for(var i = 0; i < canonicalLinks.length; i++) {
      if(canonicalLinks[i].getAttribute('rel') == 'canonical') {
        url = canonicalLinks[i].getAttribute('href');
        break;
      }
    }
    options.url = url;
  }

  return options;
};

shareHere.twitter = function(options) {
  options = shareHere.defaultOptions(options);
  var query = {};
  query.text = options.text;
  query.url = options.url;

  return "https://twitter.com/share?" + queryString.stringify(query);
};

shareHere.facebook = function(options) {
  options = shareHere.defaultOptions(options);

  var query = {
    u: options.text
  };

  if(options.url) {
    if(query.u.length > 0) { query.u += ' '; }
    query.u += options.url;
  };

  return "https://www.facebook.com/sharer/sharer.php?" + queryString.stringify(query);
};

shareHere.line = function(options) {
  var url = options.text || '';
  if(url.length > 0) { url += ' '; }
  url += options.url || '';

  return "http://line.me/R/msg/text/?" + encodeURIComponent(url);
};

module.exports = shareHere;
