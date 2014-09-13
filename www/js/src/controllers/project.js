/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //

app.controller("ProjectController",function($scope,Lang,Data) {
  $scope.projects = Data.getProjects();
  $scope.selected = Data.getSelected();
  $scope.addProject = function() {
    Data.addProject($scope.projectName);
    $scope.projectName = "";
  };
  $scope.selectProject = function(projectId) {
    Data.selectProject(projectId);
  };
  $scope.doneProject = function(checked) {
    Data.doneProject(checked);
  };
  $scope.deleteProject = function(projectId) {
    Data.deleteProject(projectId);
  };
});

// - -------------------------------------------------------------------- - //
