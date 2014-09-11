/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //

app.directive("stopClick",function() {
  return {
    restrict: "A",
    link: function(scope,element,attrs) {
      element.on("click",function(event) {
        event.stopPropagation();
      });
    },
  };
});

app.directive("stopSelect",function() {
  return {
    restrict: "A",
    link: function(scope,element,attrs) {
      element.on("selectstart",function(event) {
        event.preventDefault();
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
