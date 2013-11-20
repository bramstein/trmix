goog.provide('tr');

goog.require('tr.UserAgent');
goog.require('tr.Rasterizer');
goog.require('tr.Antialiasing');
goog.require('tr.dom');

var userAgent = tr.UserAgent.parse(goog.global.navigator.userAgent),
    rasterizer = tr.Rasterizer.get(userAgent),
    antialiasing = tr.Antialiasing.get(userAgent),
    antialiasingGuess = tr.Antialiasing.guess(userAgent),
    documentElement = goog.global.document.documentElement;

tr.dom.addClass(documentElement, 'tr-' + rasterizer);

if (antialiasing === tr.Antialiasing.UNKNOWN && antialiasingGuess !== tr.Antialiasing.UNKNOWN) {
  antialiasing += '-' + antialiasingGuess;
}

tr.dom.addClass(documentElement, 'tr-aa-' + antialiasing);
