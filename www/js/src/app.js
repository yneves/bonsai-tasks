/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //

var app = angular.module("BonsaiTasks",["ngTouch"]);

app.run(function($window,$rootScope,Lang) {

  // Applies language resources.
  $rootScope.lang = Lang;

  function hideSplash() {
    var elm = $window.document.getElementById("splash-style");
    if (elm) {
      angular.element(elm).remove();
    }
  }

  // Doesn't use the ApplicationCache if running from local file.
  // This is necessary to support atom-shell distribution.
  if ($window.location.protocol === "file:") {
    hideSplash();
  } else {
    var appCache = $window.applicationCache;
    if (appCache.status === appCache.UNCACHED) {
      appCache.update();
    }
    appCache.addEventListener("cached",hideSplash);
    appCache.addEventListener("noupdate",hideSplash);
    appCache.addEventListener("error",function() {
      hideSplash();
    });
    appCache.addEventListener("obsolete",function() {
      appCache.update();
    });
    appCache.addEventListener("updateready",function() {
      appCache.swapCache();
      $window.location.reload();
    });
  }

});

// - -------------------------------------------------------------------- - //
