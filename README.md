## Type Rendering Mix

[Type Rendering Mix website](http://www.typerendering.com)

Type Rendering Mix detects your browser’s text rasterizer and antialiasing method by parsing the user agent string. It will then add two classes to your HTML element. One class will describe the text rasterizer and the other the antialiasing method it is using:

    <html class="tr-coretext tr-aa-subpixel">

The text rasterizer class name can take the following values:

* `tr-coretext` for OS X and iOS;
* `tr-gdi` for Windows XP and Windows Vista SP1;
* `tr-directwrite` for Windows Vista SP2 and above;
* `tr-freetype` for Android and Linux.

The antialiasing method class name will be one of the following:

* `tr-aa-none` when no antialiasing is applied;
* `tr-aa-grayscale` when grayscale antialiasing is applied;
* `tr-aa-subpixel` when subpixel antialiasing is applied.

If Type Rendering Mix can’t determine the antialiasing method with absolute certainty it will attempt to guess. In this case `unknown` will be added to the class name:

* `tr-aa-unknown-none` when no antialiasing is guessed;
* `tr-aa-unknown-grayscale` when grayscale antialiasing is guessed;
* `tr-aa-unknown-subpixel` when subpixel antialiasing is guessed.

When it is impossible to determine or guess the text rasterizer and antialiasing method `tr-unknown` and `tr-aa-unknown` will be used to indicate an unknown text rasterizer and antialiasing method.

## Usage

Download the latest version at http://www.typerendering.com and include it in your page:

    <script src="trmix.js"></script>

If you are using [Bower](http://bower.io/) you can install Type Rendering Mix using:

    bower install trmix

## Copyright and License

This library is licensed under the two-clause BSD license. Copyright 2013 Tim Brown, Bram Stein. All rights reserved.
