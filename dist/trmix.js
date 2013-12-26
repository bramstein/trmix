/* Type Rendering Mix JS - (c) 2013 Tim Brown, Bram Stein. License: new BSD */(function(){// Input 0
var COMPILED = !0, goog = goog || {};
goog.global = window;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.provide = function $goog$provide$($name$$) {
  if (!COMPILED) {
    if (goog.isProvided_($name$$)) {
      throw Error('Namespace "' + $name$$ + '" already declared.');
    }
    delete goog.implicitNamespaces_[$name$$];
    for (var $namespace$$ = $name$$;($namespace$$ = $namespace$$.substring(0, $namespace$$.lastIndexOf("."))) && !goog.getObjectByName($namespace$$);) {
      goog.implicitNamespaces_[$namespace$$] = !0;
    }
  }
  goog.exportPath_($name$$);
};
goog.setTestOnly = function $goog$setTestOnly$($opt_message$$) {
  if (COMPILED && !goog.DEBUG) {
    throw $opt_message$$ = $opt_message$$ || "", Error("Importing test-only code into non-debug environment" + $opt_message$$ ? ": " + $opt_message$$ : ".");
  }
};
COMPILED || (goog.isProvided_ = function $goog$isProvided_$($name$$) {
  return!goog.implicitNamespaces_[$name$$] && !!goog.getObjectByName($name$$);
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function $goog$exportPath_$($name$$, $opt_object$$, $cur_opt_objectToExportTo$$) {
  $name$$ = $name$$.split(".");
  $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$ || goog.global;
  $name$$[0] in $cur_opt_objectToExportTo$$ || !$cur_opt_objectToExportTo$$.execScript || $cur_opt_objectToExportTo$$.execScript("var " + $name$$[0]);
  for (var $part$$;$name$$.length && ($part$$ = $name$$.shift());) {
    !$name$$.length && goog.isDef($opt_object$$) ? $cur_opt_objectToExportTo$$[$part$$] = $opt_object$$ : $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$[$part$$] ? $cur_opt_objectToExportTo$$[$part$$] : $cur_opt_objectToExportTo$$[$part$$] = {};
  }
};
goog.getObjectByName = function $goog$getObjectByName$($name$$, $opt_obj$$) {
  for (var $parts$$ = $name$$.split("."), $cur$$ = $opt_obj$$ || goog.global, $part$$;$part$$ = $parts$$.shift();) {
    if (goog.isDefAndNotNull($cur$$[$part$$])) {
      $cur$$ = $cur$$[$part$$];
    } else {
      return null;
    }
  }
  return $cur$$;
};
goog.globalize = function $goog$globalize$($obj$$, $opt_global$$) {
  var $global$$ = $opt_global$$ || goog.global, $x$$;
  for ($x$$ in $obj$$) {
    $global$$[$x$$] = $obj$$[$x$$];
  }
};
goog.addDependency = function $goog$addDependency$($path$$, $provides_require$$, $requires$$) {
  if (!COMPILED) {
    var $j_provide$$;
    $path$$ = $path$$.replace(/\\/g, "/");
    for (var $deps$$ = goog.dependencies_, $i$$ = 0;$j_provide$$ = $provides_require$$[$i$$];$i$$++) {
      $deps$$.nameToPath[$j_provide$$] = $path$$, $path$$ in $deps$$.pathToNames || ($deps$$.pathToNames[$path$$] = {}), $deps$$.pathToNames[$path$$][$j_provide$$] = !0;
    }
    for ($j_provide$$ = 0;$provides_require$$ = $requires$$[$j_provide$$];$j_provide$$++) {
      $path$$ in $deps$$.requires || ($deps$$.requires[$path$$] = {}), $deps$$.requires[$path$$][$provides_require$$] = !0;
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function $goog$require$($errorMessage_name$$) {
  if (!COMPILED && !goog.isProvided_($errorMessage_name$$)) {
    if (goog.ENABLE_DEBUG_LOADER) {
      var $path$$ = goog.getPathFromDeps_($errorMessage_name$$);
      if ($path$$) {
        goog.included_[$path$$] = !0;
        goog.writeScripts_();
        return;
      }
    }
    $errorMessage_name$$ = "goog.require could not find: " + $errorMessage_name$$;
    goog.global.console && goog.global.console.error($errorMessage_name$$);
    throw Error($errorMessage_name$$);
  }
};
goog.basePath = "";
goog.nullFunction = function $goog$nullFunction$() {
};
goog.identityFunction = function $goog$identityFunction$($opt_returnValue$$, $var_args$$) {
  return $opt_returnValue$$;
};
goog.abstractMethod = function $goog$abstractMethod$() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function $goog$addSingletonGetter$($ctor$$) {
  $ctor$$.getInstance = function $$ctor$$$getInstance$() {
    if ($ctor$$.instance_) {
      return $ctor$$.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = $ctor$$);
    return $ctor$$.instance_ = new $ctor$$;
  };
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function $goog$inHtmlDocument_$() {
  var $doc$$ = goog.global.document;
  return "undefined" != typeof $doc$$ && "write" in $doc$$;
}, goog.findBasePath_ = function $goog$findBasePath_$() {
  if (goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else {
    if (goog.inHtmlDocument_()) {
      for (var $scripts$$ = goog.global.document.getElementsByTagName("script"), $i$$ = $scripts$$.length - 1;0 <= $i$$;--$i$$) {
        var $src$$ = $scripts$$[$i$$].src, $l_qmark$$ = $src$$.lastIndexOf("?"), $l_qmark$$ = -1 == $l_qmark$$ ? $src$$.length : $l_qmark$$;
        if ("base.js" == $src$$.substr($l_qmark$$ - 7, 7)) {
          goog.basePath = $src$$.substr(0, $l_qmark$$ - 7);
          break;
        }
      }
    }
  }
}, goog.importScript_ = function $goog$importScript_$($src$$) {
  var $importScript$$ = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[$src$$] && $importScript$$($src$$) && (goog.dependencies_.written[$src$$] = !0);
}, goog.writeScriptTag_ = function $goog$writeScriptTag_$($src$$) {
  if (goog.inHtmlDocument_()) {
    var $doc$$ = goog.global.document;
    if ("complete" == $doc$$.readyState) {
      if (/\bdeps.js$/.test($src$$)) {
        return!1;
      }
      throw Error('Cannot write "' + $src$$ + '" after document load');
    }
    $doc$$.write('<script type="text/javascript" src="' + $src$$ + '">\x3c/script>');
    return!0;
  }
  return!1;
}, goog.writeScripts_ = function $goog$writeScripts_$() {
  function $visitNode$$($path$$) {
    if (!($path$$ in $deps$$.written)) {
      if (!($path$$ in $deps$$.visited) && ($deps$$.visited[$path$$] = !0, $path$$ in $deps$$.requires)) {
        for (var $requireName$$ in $deps$$.requires[$path$$]) {
          if (!goog.isProvided_($requireName$$)) {
            if ($requireName$$ in $deps$$.nameToPath) {
              $visitNode$$($deps$$.nameToPath[$requireName$$]);
            } else {
              throw Error("Undefined nameToPath for " + $requireName$$);
            }
          }
        }
      }
      $path$$ in $seenScript$$ || ($seenScript$$[$path$$] = !0, $scripts$$.push($path$$));
    }
  }
  var $scripts$$ = [], $seenScript$$ = {}, $deps$$ = goog.dependencies_, $i$$5_path$$;
  for ($i$$5_path$$ in goog.included_) {
    $deps$$.written[$i$$5_path$$] || $visitNode$$($i$$5_path$$);
  }
  for ($i$$5_path$$ = 0;$i$$5_path$$ < $scripts$$.length;$i$$5_path$$++) {
    if ($scripts$$[$i$$5_path$$]) {
      goog.importScript_(goog.basePath + $scripts$$[$i$$5_path$$]);
    } else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function $goog$getPathFromDeps_$($rule$$) {
  return $rule$$ in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[$rule$$] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function $goog$typeOf$($value$$) {
  var $s$$ = typeof $value$$;
  if ("object" == $s$$) {
    if ($value$$) {
      if ($value$$ instanceof Array) {
        return "array";
      }
      if ($value$$ instanceof Object) {
        return $s$$;
      }
      var $className$$ = Object.prototype.toString.call($value$$);
      if ("[object Window]" == $className$$) {
        return "object";
      }
      if ("[object Array]" == $className$$ || "number" == typeof $value$$.length && "undefined" != typeof $value$$.splice && "undefined" != typeof $value$$.propertyIsEnumerable && !$value$$.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == $className$$ || "undefined" != typeof $value$$.call && "undefined" != typeof $value$$.propertyIsEnumerable && !$value$$.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == $s$$ && "undefined" == typeof $value$$.call) {
      return "object";
    }
  }
  return $s$$;
};
goog.isDef = function $goog$isDef$($val$$) {
  return void 0 !== $val$$;
};
goog.isNull = function $goog$isNull$($val$$) {
  return null === $val$$;
};
goog.isDefAndNotNull = function $goog$isDefAndNotNull$($val$$) {
  return null != $val$$;
};
goog.isArray = function $goog$isArray$($val$$) {
  return "array" == goog.typeOf($val$$);
};
goog.isArrayLike = function $goog$isArrayLike$($val$$) {
  var $type$$ = goog.typeOf($val$$);
  return "array" == $type$$ || "object" == $type$$ && "number" == typeof $val$$.length;
};
goog.isDateLike = function $goog$isDateLike$($val$$) {
  return goog.isObject($val$$) && "function" == typeof $val$$.getFullYear;
};
goog.isString = function $goog$isString$($val$$) {
  return "string" == typeof $val$$;
};
goog.isBoolean = function $goog$isBoolean$($val$$) {
  return "boolean" == typeof $val$$;
};
goog.isNumber = function $goog$isNumber$($val$$) {
  return "number" == typeof $val$$;
};
goog.isFunction = function $goog$isFunction$($val$$) {
  return "function" == goog.typeOf($val$$);
};
goog.isObject = function $goog$isObject$($val$$) {
  var $type$$ = typeof $val$$;
  return "object" == $type$$ && null != $val$$ || "function" == $type$$;
};
goog.getUid = function $goog$getUid$($obj$$) {
  return $obj$$[goog.UID_PROPERTY_] || ($obj$$[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.removeUid = function $goog$removeUid$($obj$$) {
  "removeAttribute" in $obj$$ && $obj$$.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete $obj$$[goog.UID_PROPERTY_];
  } catch ($ex$$) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function $goog$cloneObject$($obj$$) {
  var $clone_type$$ = goog.typeOf($obj$$);
  if ("object" == $clone_type$$ || "array" == $clone_type$$) {
    if ($obj$$.clone) {
      return $obj$$.clone();
    }
    var $clone_type$$ = "array" == $clone_type$$ ? [] : {}, $key$$;
    for ($key$$ in $obj$$) {
      $clone_type$$[$key$$] = goog.cloneObject($obj$$[$key$$]);
    }
    return $clone_type$$;
  }
  return $obj$$;
};
goog.bindNative_ = function $goog$bindNative_$($fn$$, $selfObj$$, $var_args$$) {
  return $fn$$.call.apply($fn$$.bind, arguments);
};
goog.bindJs_ = function $goog$bindJs_$($fn$$, $selfObj$$, $var_args$$) {
  if (!$fn$$) {
    throw Error();
  }
  if (2 < arguments.length) {
    var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
    return function() {
      var $newArgs$$ = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply($newArgs$$, $boundArgs$$);
      return $fn$$.apply($selfObj$$, $newArgs$$);
    };
  }
  return function() {
    return $fn$$.apply($selfObj$$, arguments);
  };
};
goog.bind = function $goog$bind$($fn$$, $selfObj$$, $var_args$$) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function $goog$partial$($fn$$, $var_args$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 1);
  return function() {
    var $newArgs$$ = Array.prototype.slice.call(arguments);
    $newArgs$$.unshift.apply($newArgs$$, $args$$);
    return $fn$$.apply(this, $newArgs$$);
  };
};
goog.mixin = function $goog$mixin$($target$$, $source$$) {
  for (var $x$$ in $source$$) {
    $target$$[$x$$] = $source$$[$x$$];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date;
};
goog.globalEval = function $goog$globalEval$($script$$) {
  if (goog.global.execScript) {
    goog.global.execScript($script$$, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval($script$$);
      } else {
        var $doc$$ = goog.global.document, $scriptElt$$ = $doc$$.createElement("script");
        $scriptElt$$.type = "text/javascript";
        $scriptElt$$.defer = !1;
        $scriptElt$$.appendChild($doc$$.createTextNode($script$$));
        $doc$$.body.appendChild($scriptElt$$);
        $doc$$.body.removeChild($scriptElt$$);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function $goog$getCssName$($className$$, $opt_modifier$$) {
  var $getMapping$$ = function $$getMapping$$$($cssName$$) {
    return goog.cssNameMapping_[$cssName$$] || $cssName$$;
  }, $rename_renameByParts$$ = function $$rename_renameByParts$$$($cssName$$1_parts$$) {
    $cssName$$1_parts$$ = $cssName$$1_parts$$.split("-");
    for (var $mapped$$ = [], $i$$ = 0;$i$$ < $cssName$$1_parts$$.length;$i$$++) {
      $mapped$$.push($getMapping$$($cssName$$1_parts$$[$i$$]));
    }
    return $mapped$$.join("-");
  }, $rename_renameByParts$$ = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? $getMapping$$ : $rename_renameByParts$$ : function($a$$) {
    return $a$$;
  };
  return $opt_modifier$$ ? $className$$ + "-" + $rename_renameByParts$$($opt_modifier$$) : $rename_renameByParts$$($className$$);
};
goog.setCssNameMapping = function $goog$setCssNameMapping$($mapping$$, $opt_style$$) {
  goog.cssNameMapping_ = $mapping$$;
  goog.cssNameMappingStyle_ = $opt_style$$;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function $goog$getMsg$($str$$, $opt_values$$) {
  var $values$$ = $opt_values$$ || {}, $key$$;
  for ($key$$ in $values$$) {
    var $value$$ = ("" + $values$$[$key$$]).replace(/\$/g, "$$$$");
    $str$$ = $str$$.replace(RegExp("\\{\\$" + $key$$ + "\\}", "gi"), $value$$);
  }
  return $str$$;
};
goog.getMsgWithFallback = function $goog$getMsgWithFallback$($a$$, $b$$) {
  return $a$$;
};
goog.exportSymbol = function $goog$exportSymbol$($publicPath$$, $object$$, $opt_objectToExportTo$$) {
  goog.exportPath_($publicPath$$, $object$$, $opt_objectToExportTo$$);
};
goog.exportProperty = function $goog$exportProperty$($object$$, $publicName$$, $symbol$$) {
  $object$$[$publicName$$] = $symbol$$;
};
goog.inherits = function $goog$inherits$($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.superClass_ = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$;
  $childCtor$$.prototype.constructor = $childCtor$$;
};
goog.base = function $goog$base$($me$$, $opt_methodName$$, $var_args$$) {
  var $caller$$ = arguments.callee.caller;
  if ($caller$$.superClass_) {
    return $caller$$.superClass_.constructor.apply($me$$, Array.prototype.slice.call(arguments, 1));
  }
  for (var $args$$ = Array.prototype.slice.call(arguments, 2), $foundCaller$$ = !1, $ctor$$ = $me$$.constructor;$ctor$$;$ctor$$ = $ctor$$.superClass_ && $ctor$$.superClass_.constructor) {
    if ($ctor$$.prototype[$opt_methodName$$] === $caller$$) {
      $foundCaller$$ = !0;
    } else {
      if ($foundCaller$$) {
        return $ctor$$.prototype[$opt_methodName$$].apply($me$$, $args$$);
      }
    }
  }
  if ($me$$[$opt_methodName$$] === $caller$$) {
    return $me$$.constructor.prototype[$opt_methodName$$].apply($me$$, $args$$);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function $goog$scope$($fn$$) {
  $fn$$.call(goog.global);
};
// Input 1
var tr = {Browser:{UNKNOWN:0, INTERNET_EXPLORER:1, CHROME:2, FIREFOX:3, OPERA:4, SAFARI:5, BUILTIN:6, SILK:7}};
// Input 2
tr.dom = {};
tr.dom.addClass = function $tr$dom$addClass$($element$$, $name$$) {
  tr.dom.hasClass($element$$, $name$$) || ($element$$.className += ("" === $element$$.className ? "" : " ") + $name$$);
};
tr.dom.removeClass = function $tr$dom$removeClass$($element$$, $name$$) {
  for (var $classes$$ = $element$$.className.split(/\s+/), $result$$ = [], $i$$ = 0, $len$$ = $classes$$.length;$i$$ < $len$$;$i$$ += 1) {
    $classes$$[$i$$] !== $name$$ && $result$$.push($classes$$[$i$$]);
  }
  $element$$.className = $result$$.join(" ");
};
tr.dom.hasClass = function $tr$dom$hasClass$($element$$, $name$$) {
  for (var $classes$$ = $element$$.className.split(/\s+/), $i$$ = 0, $len$$ = $classes$$.length;$i$$ < $len$$;$i$$ += 1) {
    if ($classes$$[$i$$] === $name$$) {
      return!0;
    }
  }
  return!1;
};
tr.dom.setAttribute = function $tr$dom$setAttribute$($element$$, $name$$, $value$$) {
  $element$$.setAttribute($name$$, $value$$);
};
tr.dom.createElement = function $tr$dom$createElement$($name$$, $attributes$$) {
  var $element$$ = goog.global.document.createElement($name$$);
  if ($attributes$$) {
    for (var $attributeName$$ in $attributes$$) {
      $attributes$$.hasOwnProperty($attributeName$$) && tr.dom.setAttribute($element$$, $attributeName$$, $attributes$$[$attributeName$$]);
    }
  }
  return $element$$;
};
// Input 3
tr.Platform = {UNKNOWN:0, WINDOWS:1, OSX:2, IOS:3, LINUX:4, ANDROID:5, CHROME_OS:6, FIREFOX_OS:7, WINDOWS_PHONE:8, BLACKBERRY:9};
// Input 4
tr.Version = function $tr$Version$($opt_major$$, $opt_minor$$, $opt_patch$$, $opt_build$$) {
  this.major_ = goog.isDefAndNotNull($opt_major$$) ? $opt_major$$ : null;
  this.minor_ = goog.isDefAndNotNull($opt_minor$$) ? $opt_minor$$ : null;
  this.patch_ = goog.isDefAndNotNull($opt_patch$$) ? $opt_patch$$ : null;
  this.build_ = goog.isDefAndNotNull($opt_build$$) ? $opt_build$$ : null;
};
tr.Version.TOKENIZER = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
tr.Version.prototype.isValid = function $tr$Version$$isValid$() {
  return!goog.isNull(this.major_);
};
tr.Version.prototype.compare = function $tr$Version$$compare$($version$$) {
  return this.major_ > $version$$.major_ || this.major_ === $version$$.major_ && this.minor_ > $version$$.minor_ || this.major_ === $version$$.major_ && this.minor_ === $version$$.minor_ && this.patch_ > $version$$.patch_ ? 1 : this.major_ < $version$$.major_ || this.major_ === $version$$.major_ && this.minor_ < $version$$.minor_ || this.major_ === $version$$.major_ && this.minor_ === $version$$.minor_ && this.patch_ < $version$$.patch_ ? -1 : 0;
};
tr.Version.prototype.gt = function $tr$Version$$gt$($version$$) {
  return 1 === this.compare($version$$);
};
tr.Version.prototype.lt = function $tr$Version$$lt$($version$$) {
  return-1 === this.compare($version$$);
};
tr.Version.prototype.ge = function $tr$Version$$ge$($version$$) {
  return 0 === this.compare($version$$) || 1 === this.compare($version$$);
};
tr.Version.prototype.le = function $tr$Version$$le$($version$$) {
  return 0 === this.compare($version$$) || -1 === this.compare($version$$);
};
tr.Version.prototype.eq = function $tr$Version$$eq$($version$$) {
  return 0 === this.compare($version$$);
};
tr.Version.prototype.ne = function $tr$Version$$ne$($version$$) {
  return 0 !== this.compare($version$$);
};
tr.Version.parse = function $tr$Version$parse$($match_str$$) {
  $match_str$$ = tr.Version.TOKENIZER.exec($match_str$$);
  var $major$$ = null, $minor$$ = null, $patch$$ = null, $build$$ = null;
  $match_str$$ && (!goog.isNull($match_str$$[1]) && $match_str$$[1] && ($major$$ = parseInt($match_str$$[1], 10)), !goog.isNull($match_str$$[2]) && $match_str$$[2] && ($minor$$ = parseInt($match_str$$[2], 10)), !goog.isNull($match_str$$[3]) && $match_str$$[3] && ($patch$$ = parseInt($match_str$$[3], 10)), !goog.isNull($match_str$$[4]) && $match_str$$[4] && ($build$$ = /^[0-9]+$/.test($match_str$$[4]) ? parseInt($match_str$$[4], 10) : $match_str$$[4]));
  return new tr.Version($major$$, $minor$$, $patch$$, $build$$);
};
// Input 5
tr.Antialiasing = {UNKNOWN:"unknown", NONE:"none", GRAYSCALE:"grayscale", SUBPIXEL:"subpixel"};
tr.Antialiasing.get = function $tr$Antialiasing$get$($userAgent$$) {
  return $userAgent$$.getPlatform() === tr.Platform.IOS || $userAgent$$.getPlatform() === tr.Platform.FIREFOX_OS || $userAgent$$.getPlatform() === tr.Platform.CHROME_OS || $userAgent$$.getPlatform() === tr.Platform.BLACKBERRY || $userAgent$$.getPlatform() === tr.Platform.WINDOWS_PHONE || $userAgent$$.getPlatform() === tr.Platform.ANDROID ? tr.Antialiasing.GRAYSCALE : $userAgent$$.getPlatform() === tr.Platform.WINDOWS && $userAgent$$.getPlatformVersion().ge(new tr.Version(6, 2)) && $userAgent$$.getBrowser() === 
  tr.Browser.INTERNET_EXPLORER ? tr.Antialiasing.GRAYSCALE : tr.Antialiasing.UNKNOWN;
};
tr.Antialiasing.guess = function $tr$Antialiasing$guess$($userAgent$$) {
  var $antialiasing$$ = tr.Antialiasing.get($userAgent$$);
  return $antialiasing$$ !== tr.Antialiasing.UNKNOWN ? $antialiasing$$ : $userAgent$$.getPlatform() === tr.Platform.OSX || $userAgent$$.getPlatform() === tr.Platform.LINUX ? tr.Antialiasing.SUBPIXEL : $userAgent$$.getPlatform() === tr.Platform.WINDOWS ? $userAgent$$.getPlatformVersion().ge(new tr.Version(6, 0)) ? tr.Antialiasing.SUBPIXEL : $userAgent$$.getBrowser() === tr.Browser.INTERNET_EXPLORER ? $userAgent$$.getBrowserVersion().ge(new tr.Version(7, 0)) ? tr.Antialiasing.SUBPIXEL : tr.Antialiasing.GRAYSCALE : 
  tr.Antialiasing.SUBPIXEL : tr.Antialiasing.UNKNOWN;
};
// Input 6
tr.Rasterizer = {UNKNOWN:"unknown", GDI:"gdi", DIRECTWRITE:"directwrite", CORETEXT:"coretext", FREETYPE:"freetype"};
tr.Rasterizer.get = function $tr$Rasterizer$get$($userAgent$$) {
  return $userAgent$$.getPlatform() === tr.Platform.WINDOWS ? $userAgent$$.getBrowser() === tr.Browser.CHROME || $userAgent$$.getBrowser() === tr.Browser.OPERA || $userAgent$$.getPlatformVersion().lt(new tr.Version(6, 0)) ? tr.Rasterizer.GDI : $userAgent$$.getPlatformVersion().ge(new tr.Version(6, 0)) ? $userAgent$$.getBrowser() === tr.Browser.INTERNET_EXPLORER && $userAgent$$.getBrowserVersion().le(new tr.Version(8, 0)) ? tr.Rasterizer.GDI : tr.Rasterizer.DIRECTWRITE : tr.Rasterizer.UNKNOWN : $userAgent$$.getPlatform() === 
  tr.Platform.WINDOWS_PHONE ? tr.Rasterizer.DIRECTWRITE : $userAgent$$.getPlatform() === tr.Platform.OSX || $userAgent$$.getPlatform() === tr.Platform.IOS ? tr.Rasterizer.CORETEXT : $userAgent$$.getPlatform() === tr.Platform.ANDROID || $userAgent$$.getPlatform() === tr.Platform.LINUX || $userAgent$$.getPlatform() === tr.Platform.CHROME_OS || $userAgent$$.getPlatform() === tr.Platform.FIREFOX_OS || $userAgent$$.getPlatform() === tr.Platform.BLACKBERRY ? tr.Rasterizer.FREETYPE : tr.Rasterizer.UNKNOWN;
};
// Input 7
tr.UserAgent = function $tr$UserAgent$($browser$$, $browserVersion$$, $platform$$, $platformVersion$$) {
  this.browser_ = $browser$$;
  this.browserVersion_ = $browserVersion$$;
  this.platform_ = $platform$$;
  this.platformVersion_ = $platformVersion$$;
};
tr.UserAgent.prototype.getBrowser = function $tr$UserAgent$$getBrowser$() {
  return this.browser_;
};
tr.UserAgent.prototype.getBrowserVersion = function $tr$UserAgent$$getBrowserVersion$() {
  return this.browserVersion_;
};
tr.UserAgent.prototype.getPlatform = function $tr$UserAgent$$getPlatform$() {
  return this.platform_;
};
tr.UserAgent.prototype.getPlatformVersion = function $tr$UserAgent$$getPlatformVersion$() {
  return this.platformVersion_;
};
tr.UserAgent.parse = function $tr$UserAgent$parse$($userAgent$$) {
  var $browser$$ = tr.Browser.UNKNOWN, $browserVersion$$ = new tr.Version, $platform$$ = tr.Platform.UNKNOWN, $platformVersion$$ = new tr.Version, $match$$ = null;
  if ($match$$ = /(?:iPod|iPad|iPhone).*? OS ([\d_]+)/.exec($userAgent$$)) {
    $platform$$ = tr.Platform.IOS, $platformVersion$$ = tr.Version.parse($match$$[1]);
  } else {
    if ($match$$ = /(?:BB\d{2}|BlackBerry).*?Version\/([^\s]*)/.exec($userAgent$$)) {
      $platform$$ = tr.Platform.BLACKBERRY, $platformVersion$$ = tr.Version.parse($match$$[1]);
    } else {
      if ($match$$ = /Android ([^;)]+)|Android/.exec($userAgent$$)) {
        $platform$$ = tr.Platform.ANDROID, $platformVersion$$ = tr.Version.parse($match$$[1]);
      } else {
        if ($match$$ = /Windows Phone(?: OS)? ([^;)]+)/.exec($userAgent$$)) {
          $platform$$ = tr.Platform.WINDOWS_PHONE, $platformVersion$$ = tr.Version.parse($match$$[1]);
        } else {
          if ($match$$ = /Linux ([^;)]+)|Linux/.exec($userAgent$$)) {
            $platform$$ = tr.Platform.LINUX, $platformVersion$$ = tr.Version.parse($match$$[1]);
          } else {
            if ($match$$ = /OS X ([^;)]+)/.exec($userAgent$$)) {
              $platform$$ = tr.Platform.OSX, $platformVersion$$ = tr.Version.parse($match$$[1]);
            } else {
              if ($match$$ = /Windows NT ([^;)]+)/.exec($userAgent$$)) {
                $platform$$ = tr.Platform.WINDOWS, $platformVersion$$ = tr.Version.parse($match$$[1]);
              } else {
                if ($match$$ = /CrOS ([^;)]+)/.exec($userAgent$$)) {
                  $platform$$ = tr.Platform.CHROME_OS, $platformVersion$$ = tr.Version.parse($match$$[1]);
                }
              }
            }
          }
        }
      }
    }
  }
  if ($match$$ = /MSIE ([\d\w\.]+)/.exec($userAgent$$)) {
    $browser$$ = tr.Browser.INTERNET_EXPLORER, $browserVersion$$ = tr.Version.parse($match$$[1]);
  } else {
    if ($match$$ = /Trident.*rv:([\d\w\.]+)/.exec($userAgent$$)) {
      $browser$$ = tr.Browser.INTERNET_EXPLORER, $browserVersion$$ = tr.Version.parse($match$$[1]);
    } else {
      if ($match$$ = /OPR\/([\d.]+)/.exec($userAgent$$)) {
        $browser$$ = tr.Browser.OPERA, $browserVersion$$ = tr.Version.parse($match$$[1]);
      } else {
        if ($match$$ = /Opera Mini.*Version\/([\d\.]+)/.exec($userAgent$$)) {
          $browser$$ = tr.Browser.OPERA, $browserVersion$$ = tr.Version.parse($match$$[1]);
        } else {
          if ($match$$ = /Opera(?: |.*Version\/|\/)([\d\.]+)/.exec($userAgent$$)) {
            $browser$$ = tr.Browser.OPERA, $browserVersion$$ = tr.Version.parse($match$$[1]);
          } else {
            if ($match$$ = /Firefox\/([\d\w\.]+)|Firefox/.exec($userAgent$$)) {
              $browser$$ = tr.Browser.FIREFOX, $browserVersion$$ = tr.Version.parse($match$$[1]);
            } else {
              if ($match$$ = /(?:Chrome|CrMo|CriOS)\/([\d\.]+)/.exec($userAgent$$)) {
                $browser$$ = tr.Browser.CHROME, $browserVersion$$ = tr.Version.parse($match$$[1]);
              } else {
                if ($match$$ = /Silk\/([\d\._]+)/.exec($userAgent$$)) {
                  $browser$$ = tr.Browser.SILK, $browserVersion$$ = tr.Version.parse($match$$[1]);
                } else {
                  if ($platform$$ === tr.Platform.ANDROID || $platform$$ === tr.Platform.BLACKBERRY) {
                    $browser$$ = tr.Browser.BUILTIN;
                  } else {
                    if ($match$$ = /Version\/([\d\.\w]+).*Safari/.exec($userAgent$$)) {
                      $browser$$ = tr.Browser.SAFARI, $browserVersion$$ = tr.Version.parse($match$$[1]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return new tr.UserAgent($browser$$, $browserVersion$$, $platform$$, $platformVersion$$);
};
// Input 8
var userAgent = tr.UserAgent.parse(goog.global.navigator.userAgent), rasterizer = tr.Rasterizer.get(userAgent), antialiasing = tr.Antialiasing.get(userAgent), antialiasingGuess = tr.Antialiasing.guess(userAgent), documentElement = goog.global.document.documentElement;
tr.dom.addClass(documentElement, "tr-" + rasterizer);
antialiasing === tr.Antialiasing.UNKNOWN && antialiasingGuess !== tr.Antialiasing.UNKNOWN && (antialiasing += "-" + antialiasingGuess);
tr.dom.addClass(documentElement, "tr-aa-" + antialiasing);
}());
