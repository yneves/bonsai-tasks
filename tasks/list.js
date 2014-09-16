/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //
module.exports = function(grunt) {

  var path = require("path");

  var templates = {
    ".js": "<script src=\"<%= file %>\"></script>",
    ".css": "<link rel=\"stylesheet\" href=\"<%= file %>\" />",
  };

  grunt.registerMultiTask("list",function() {
    var files = grunt.file.expand({
      cwd: this.data.cwd,
      filter: this.data.filter,
    },this.data.src);
    var html = files.map(function(file) {
      var ext = path.extname(file);
      var template = templates[ext];
      return grunt.template.process(template,{ data: { file: file } });
    }).join("\n");
    grunt.file.write(this.data.dest,html);
  });

};
// - -------------------------------------------------------------------- - //
