/*!
**  bonsai-tasks -- Just another TODO application.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //

app.factory("Data",function($window) {

  var projects = [];
  var versions = [];
  var tasks = [];

  function loadData() {
    var psaved = $window.localStorage.getItem("projects");
    if (psaved) projects = JSON.parse(psaved);
    var vsaved = $window.localStorage.getItem("versions");
    if (vsaved) versions = JSON.parse(vsaved);
    var tsaved = $window.localStorage.getItem("tasks");
    if (tsaved) tasks = JSON.parse(tsaved);
  };

  loadData();

  function saveProjects() {
    console.log(JSON.stringify(projects));
    $window.localStorage.setItem("projects",JSON.stringify(projects));
  };

  function saveVersions() {
    $window.localStorage.setItem("versions",JSON.stringify(versions));
  };

  function saveTasks() {
    $window.localStorage.setItem("tasks",JSON.stringify(tasks));
  };

  var state = {
    counter: {
      project: 0,
      version: 0,
      task: 0,
    },
    selected: {
      project: 0,
      version: 0,
      task: 0,
    },
    done: {
      project: false,
      version: false,
      task: false,
    },
  };

  function loadState() {
    var saved = $window.localStorage.getItem("state");
    if (saved) state = JSON.parse(saved);
  };

  loadState();

  function saveState() {
    $window.localStorage.setItem("state",JSON.stringify(state));
  };

  var bound = {
    projects: [],
    versions: [],
    tasks: [],
  };

  function refreshProjects() {
    bound.projects.splice(0,bound.projects.length);
    projects.forEach(function(project) {
      if (state.done.project || !project.done) {
        bound.projects.push({
          id: project.id,
          name: project.name,
          done: project.done,
        });
      }
    });
  };

  function refreshVersions() {
    bound.versions.splice(0,bound.versions.length);
    versions.forEach(function(version) {
      if (state.selected.project === version.project) {
        if (state.done.version || !version.done) {
          bound.versions.push({
            id: version.id,
            number: version.number,
            done: version.done,
          });
        }
      }
    });
  };

  function refreshTasks() {
    bound.tasks.splice(0,bound.tasks.length);
    tasks.forEach(function(task) {
      if (task.project === state.selected.project) {
        if (task.version === state.selected.version || state.selected.version === 0) {
          if (state.done.task || !task.done) {
            bound.tasks.push({
              id: task.id,
              text: task.text,
              done: task.done,
            });
          }
        }
      }
    });
  };

  refreshProjects();
  refreshVersions();
  refreshTasks();

  return {

    getSelected: function() { return state.selected; },
    getProjects: function() { return bound.projects; },
    getVersions: function() { return bound.versions; },
    getTasks: function() { return bound.tasks; },

    addProject: function(projectName) {
      if (/\w/.test(projectName)) {
        projects.push({
          id: ++state.counter.project,
          name: projectName,
          done: false,
        });
        refreshProjects();
        saveProjects();
      }
    },

    addVersion: function(versionNumber) {
      if (/\w/.test(versionNumber)) {
        versions.push({
          id: ++state.counter.version,
          project: state.selected.project,
          number: versionNumber,
          done: false,
        });
        refreshVersions();
        saveVersions();
      }
    },

    addTask: function(taskText) {
      if (/\w/.test(taskText)) {
        tasks.push({
          id: ++state.counter.task,
          project: state.selected.project,
          version: state.selected.version,
          text: taskText,
          done: false,
        });
        refreshTasks();
        saveTasks();
      }
    },

    deleteProject: function(projectId) {
      projects.forEach(function(project,projectIndex) {
        if (project.id === projectId) {
          projects.splice(projectIndex,1);
          versions.forEach(function(version,versionIndex) {
            if (version.project === projectId) {
              versions.splice(versionIndex,1);
            }
          });
          tasks.forEach(function(task,taskIndex) {
            if (task.project === projectId) {
              tasks.splice(taskIndex,1);
            }
          });
          refreshProjects();
          refreshVersions();
          refreshTasks();
          saveProjects();
          saveVersions();
          saveTasks();
        }
      });
    },

    deleteVersion: function(versionId) {
      versions.forEach(function(version,index) {
        if (version.id === versionId) {
          versions.splice(index,1);
          tasks.forEach(function(task,taskIndex) {
            if (task.version === versionId) {
              tasks.splice(taskIndex,1);
            }
          });
          refreshVersions();
          refreshTasks();
          saveVersions();
          saveTasks();
        }
      });
    },

    deleteTask: function(taskId) {
      tasks.forEach(function(task,index) {
        if (task.id === taskId) {
          tasks.splice(index,1);
          refreshTasks();
          saveTasks();
        }
      });
    },

    selectProject: function(projectId) {
      if (state.selected.project === projectId) {
        state.selected.project = 0;
      } else {
        state.selected.project = projectId;
      }
      refreshVersions();
      refreshTasks();
      saveState();
    },

    selectVersion: function(versionId) {
      if (state.selected.version === versionId) {
        state.selected.version = 0;
      } else {
        state.selected.version = versionId;
      }
      refreshTasks();
      saveState();
    },

    selectTask: function(taskId) {
      if (state.selected.task === taskId) {
        state.selected.task = 0;
      } else {
        state.selected.task = taskId;
      }
      saveState();
    },

    doneProject: function(val) {
      state.done.project = val;
      refreshProjects();
      saveState();
    },

    doneVersion: function(val) {
      state.done.version = val;
      refreshVersions();
      saveState();
    },

    doneTask: function(val) {
      state.done.task = val;
      refreshTasks();
      saveState();
    },

  };

});

// - -------------------------------------------------------------------- - //
