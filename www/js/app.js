/*!
**  bonsai-tasks -- Just another TODO application.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //

var app = angular.module("BonsaiTasks",[]);

// - -------------------------------------------------------------------- - //
// - Language resources

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
// - Database

app.factory("Data",function($rootScope) {

  var data = {
    projects: [],
    versions: [],
    labels: [],
    tasks: [],
  };

  var selected = {
    project: 0,
    version: 0,
    label: 0,
    task: 0,
  };

  var db = {

    getProjects: function() {
      return data.projects;
    },

    getVersions: function() {
      if (selected.project > 0) {
        return data.versions.filter(function(version) {
          return version.project === selected.project;
        });
      } else {
        return data.versions;
      }
    },

    getLabels: function() {
      if (selected.project > 0) {
        return data.labels.filter(function(label) {
          return label.project === selected.project;
        });
      } else {
        return data.labels;
      }
    },

    getTasks: function() {
      if (selected.project > 0 || selected.version > 0) {
        return data.tasks.filter(function(task) {
          return (
            (selected.project === 0 || task.project === selected.project)
            ||
            (selected.version === 0 || task.version === selected.version)
          );
        });
      } else {
        return data.tasks;
      }
    },

    addProject: function(projectName) {
      data.projects.push({
        id: data.projects.length + 1,
        name: projectName,
        done: false,
      });
    },

    addVersion: function(versionNumber) {
      data.versions.push({
        id: data.versions.length + 1,
        project: selected.project,
        number: versionNumber,
        done: false,
      });
    },

    addLabel: function(labelName) {
      data.labels.push({
        id: data.labels.length + 1,
        project: selected.project,
        name: labelName,
        done: false,
      });
    },

    addTask: function(taskText) {
      data.tasks.push({
        id: data.tasks.length + 1,
        project: selected.project,
        version: selected.version,
        text: taskText,
        done: false,
      });
    },

    selectProject: function(projectId) {
      selected.project = projectId;
      $rootScope.$broadcast("selectProject");
    },

    selectVersion: function(versionId) {
      selected.version = versionId;
      $rootScope.$broadcast("selectVersion");
    },

    selectLabel: function(labelId) {
      selected.label = labelId;
      $rootScope.$broadcast("selectLabel");
    },

    selectTask: function(taskId) {
      selected.task = taskId;
      $rootScope.$broadcast("selectTask");
    },

    selectedProject: function() {
      return selected.project;
    },

    selectedVersion: function() {
      return selected.version;
    },

    selectedLabel: function() {
      return selected.label;
    },

    selectedTask: function() {
      return selected.task;
    },

  };

  return db;
});

// - -------------------------------------------------------------------- - //

app.controller("ProjectController",function($scope,Lang,Data) {

  $scope.lang = Lang;
  $scope.projects = Data.getProjects();
  $scope.selectedProject = Data.selectedProject();

  $scope.addProject = function() {
    Data.addProject($scope.projectName);
    $scope.projectName = "";
  };

  $scope.selectProject = function(projectId) {
    Data.selectProject(projectId);
    $scope.selectedProject = Data.selectedProject();
  };


});

// - -------------------------------------------------------------------- - //

app.controller("VersionController",function($scope,Lang,Data) {

  $scope.lang = Lang;
  $scope.versions = Data.getVersions();
  $scope.selectedVersion = Data.selectedVersion();

  $scope.$on("selectProject",function() {
    $scope.versions = Data.getVersions();
  });

  $scope.addVersion = function() {
    Data.addVersion($scope.versionNumber);
    $scope.versionNumber = "";
    $scope.versions = Data.getVersions();
  };

  $scope.selectVersion = function(versionId) {
    Data.selectVersion(versionId);
    $scope.selectedVersion = Data.selectedVersion();
  };

});

// - -------------------------------------------------------------------- - //

app.controller("LabelController",function($scope,Lang,Data) {

  $scope.lang = Lang;
  $scope.labels = Data.getLabels();
  $scope.selectedLabel = Data.selectedLabel();

  $scope.$on("selectProject",function() {
    $scope.labels = Data.getLabels();
  });

  $scope.addLabel = function() {
    Data.addLabel($scope.labelName);
    $scope.labelName = "";
    $scope.labels = Data.getLabels();
  };

  $scope.selectLabel = function(labelId) {
    Data.selectLabel(labelId);
    $scope.selectedLabel = Data.selectedLabel();
  };


});

// - -------------------------------------------------------------------- - //

app.controller("TaskController",function($scope,Lang,Data) {

  $scope.lang = Lang;
  $scope.tasks = Data.getTasks();
  $scope.selectedTask = Data.selectedTask();

  $scope.$on("selectProject",function() {
    $scope.tasks = Data.getTasks();
  });

  $scope.$on("selectVersion",function() {
    $scope.tasks = Data.getTasks();
  });

  $scope.addTask = function() {
    Data.addTask($scope.taskText);
    $scope.taskText = "";
    $scope.tasks = Data.getTasks();
  };

  $scope.selectTask = function(taskId) {
    Data.selectTask(taskId);
    $scope.selectedTask = Data.selectedTask();
  };

});

// - -------------------------------------------------------------------- - //
