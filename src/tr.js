goog.provide('tr');

goog.require('tr.UserAgent');
goog.require('tr.Rasterizer');
goog.require('tr.Antialiasing');
goog.require('tr.dom');

var userAgent = tr.UserAgent.parse(goog.global.navigator.userAgent),
    rasterizer = tr.Rasterizer.get(userAgent),
    antialiasing = tr.Antialiasing.get(userAgent);

tr.dom.addClass(goog.global.document.documentElement, 'tr-' + rasterizer);
tr.dom.addClass(goog.global.document.documentElement, 'tr-aa-' + antialiasing);
