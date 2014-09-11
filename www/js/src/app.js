/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //

var app = angular.module("BonsaiTasks",[]);

// - -------------------------------------------------------------------- - //
// - Language resources

app.run(function($rootScope,Lang) {
  $rootScope.lang = Lang;
});

app.factory("Lang",function() {
  return {
    projects: "Projects",
    versions: "Versions",
    labels: "Labels",
    tasks: "Tasks",
    newProject: "Add new project",
    newVersion: "Add new version",
    newLabel: "Add new label",
    newTask: "Add new task",
    submitProject: "OK",
    submitVersion: "OK",
    submitLabel: "OK",
    submitTask: "OK",
  };
});





// - -------------------------------------------------------------------- - //
