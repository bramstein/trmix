goog.provide('tr');

goog.require('tr.UserAgent');
goog.require('tr.Rasterizer');
goog.require('tr.Antialiasing');
goog.require('tr.dom');

var userAgent = tr.UserAgent.parse(goog.global.navigator.userAgent),
    rasterizer = tr.Rasterizer.get(userAgent),
    antialiasing = tr.Antialiasing.get(userAgent),
    antialiasingGuess = tr.Antialiasing.guess(userAgent);

tr.dom.addClass(goog.global.document.documentElement, 'tr-' + rasterizer);

if (antialiasing === tr.Antialiasing.UNKNOWN && antialiasingGuess !== tr.Antialiasing.UNKNOWN) {
  antialiasing = antialiasingGuess;
  tr.dom.addClass(goog.global.document.documentElement, 'tr-aa-unknown');
}

tr.dom.addClass(goog.global.document.documentElement, 'tr-aa-' + antialiasing);
