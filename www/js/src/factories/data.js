/*!
**  bonsai-tasks -- Just another TODO application.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //

app.factory("Data",function($rootScope) {

  // stores last id for each entity
  var counter = {
    project: 0,
    version: 0,
    label: 0,
    task: 0,
  };

  // stores all data for each entity
  var stored = {
    projects: [],
    versions: [],
    labels: [],
    tasks: [],
  };

  // stores those which is visible after all filters are applied
  var listed = {
    projects: [],
    versions: [],
    labels: [],
    tasks: [],
  };

  // stores the id of the selected item of each entity
  var selected = {
    project: 0,
    version: 0,
    label: 0,
    task: 0,
  };

  // stores the state of the .done filtering
  var checked = {
    project: false,
    version: false,
    label: false,
    task: false,
  };

// - -------------------------------------------------------------------- - //

  // methods which are not exported
  var internal = {

    clear: function() {
      var localStorage = window.localStorage;
      if (localStorage) {
        localStorage.removeItem("stored");
        localStorage.removeItem("listed");
        localStorage.removeItem("counter");
        localStorage.removeItem("checked");
        localStorage.removeItem("selected");
      }
    },

    save: function() {
      var localStorage = window.localStorage;
      if (localStorage) {
        localStorage.setItem("stored",JSON.stringify(stored));
        localStorage.setItem("listed",JSON.stringify(listed));
        localStorage.setItem("counter",JSON.stringify(counter));
        localStorage.setItem("checked",JSON.stringify(checked));
        localStorage.setItem("selected",JSON.stringify(selected));
      }
    },

    load: function() {
      var localStorage = window.localStorage;
      if (localStorage) {
        var saved = {
          stored: localStorage.getItem("stored"),
          listed: localStorage.getItem("listed"),
          counter: localStorage.getItem("counter"),
          checked: localStorage.getItem("checked"),
          selected: localStorage.getItem("selected"),
        };
        if (!!saved.stored) stored = JSON.parse(saved.stored);
        if (!!saved.listed) listed = JSON.parse(saved.listed);
        if (!!saved.counter) counter = JSON.parse(saved.counter);
        if (!!saved.checked) checked = JSON.parse(saved.checked);
        if (!!saved.selected) selected = JSON.parse(saved.selected);
      }
    },

    flushProjects: function() {
      listed.projects.splice(0,listed.projects.length);
      stored.projects.forEach(function(project) {
        if (checked.project || !project.done) {
          listed.projects.push(project);
        }
      });
    },

    flushVersions: function() {
      listed.versions.splice(0,listed.versions.length);
      stored.versions.forEach(function(version) {
        if (version.project === selected.project) {
          if (checked.version || !version.done) {
            listed.versions.push(version);
          }
        }
      });
    },

    flushLabels: function() {
      listed.labels.splice(0,listed.labels.length);
      stored.labels.forEach(function(label) {
        if (label.project === selected.project) {
          if (checked.label || !label.done) {
            listed.labels.push(label);
          }
        }
      });
    },

    flushTasks: function() {
      listed.tasks.splice(0,listed.tasks.length);
      stored.tasks.forEach(function(task) {
        if (task.project === selected.project) {
          if (task.version === selected.version || selected.version === 0) {
            if (checked.task || !task.done) {
              listed.tasks.push(task);
            }
          }
        }
      });
    },

  };

// - -------------------------------------------------------------------- - //

  // methods which are exported
  var exports = {

    selected: function() {
      return selected;
    },

    getProjects: function() {
      return listed.projects;
    },

    getVersions: function() {
      return listed.versions;
    },

    getLabels: function() {
      return listed.labels;
    },

    getTasks: function() {
      return listed.tasks;
    },

    addProject: function(projectName) {
      stored.projects.push({
        id: ++counter.project,
        name: projectName,
        done: false,
      });
      internal.flushProjects();
    },

    addVersion: function(versionNumber) {
      stored.versions.push({
        id: ++counter.version,
        project: selected.project,
        number: versionNumber,
        done: false,
      });
      internal.flushVersions();
    },

    addLabel: function(labelName) {
      stored.labels.push({
        id: ++counter.label,
        project: selected.project,
        name: labelName,
        done: false,
      });
      internal.flushLabels();
    },

    addTask: function(taskText) {
      var tokens = {};
      taskText = taskText.replace(/\#([\w]+)/g,function(str,token) {
        tokens[token] = true;
        return "";
      });
      var labels = listed.labels.filter(function(label) {
        return tokens[label.name];
      });
      stored.tasks.push({
        id: ++counter.task,
        project: selected.project,
        version: selected.version,
        // labels: labels,
        labels: [{name: "asdsdasda"},{name:"wqeewqe"}],
        text: taskText,
        done: false,
      });
      internal.flushTasks();
    },

    deleteProject: function(projectId) {
      stored.projects.forEach(function(project,projectIndex) {
        if (project.id === projectId) {
          stored.projects.splice(projectIndex,1);
          stored.versions.forEach(function(version,versionIndex) {
            if (version.project === projectId) {
              stored.versions.splice(versionIndex,1);
            }
          });
          stored.labels.forEach(function(label,labelIndex) {
            if (label.project === projectId) {
              stored.labels.splice(labelIndex,1);
            }
          });
          stored.tasks.forEach(function(task,taskIndex) {
            if (task.project === projectId) {
              stored.tasks.splice(taskIndex,1);
            }
          });
        }
      });
      internal.flushProjects();
    },

    deleteVersion: function(versionId) {
      stored.versions.forEach(function(version,index) {
        if (version.id === versionId) {
          stored.versions.splice(index,1);
        }
      });
      internal.flushVersions();
    },

    deleteLabel: function(labelId) {
      stored.labels.forEach(function(label,index) {
        if (label.id === labelId) {
          stored.labels.splice(index,1);
        }
      });
      internal.flushLabels();
    },

    deleteTask: function(taskId) {
      stored.tasks.forEach(function(task,index) {
        if (task.id === taskId) {
          stored.tasks.splice(index,1);
        }
      });
      internal.flushTasks();
    },

    selectProject: function(projectId) {
      if (selected.project === projectId) {
        selected.project = 0;
      } else {
        selected.project = projectId;
      }
      internal.flushVersions();
      internal.flushLabels();
      internal.flushTasks();
    },

    selectVersion: function(versionId) {
      if (selected.version === versionId) {
        selected.version = 0;
      } else {
        selected.version = versionId;
      }
      internal.flushTasks();
    },

    selectLabel: function(labelId) {
      if (selected.label === labelId) {
        selected.label = 0;
      } else {
        selected.label = labelId;
      }
      internal.flushTasks();
    },

    selectTask: function(taskId) {
      if (selected.task === taskId) {
        selected.task = 0;
      } else {
        selected.task = taskId;
      }
    },

    doneProject: function(val) {
      checked.project = val;
      internal.flushProjects();
    },

    doneVersion: function(val) {
      checked.version = val;
      internal.flushVersions();
    },

    doneLabel: function(val) {
      checked.label = val;
      internal.flushLabels();
    },

    doneTask: function(val) {
      checked.task = val;
      internal.flushTasks();
    },

  };

// - -------------------------------------------------------------------- - //

  // internal.clear();
  internal.load();
  setInterval(internal.save,5000);

  return exports;

});

// - -------------------------------------------------------------------- - //
