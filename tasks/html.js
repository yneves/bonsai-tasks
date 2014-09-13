/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //
module.exports = function(grunt) {

  var path = require("path");

  grunt.registerMultiTask("list",function() {
    var config = this.data;
    var templates = {
      ".js": "<script src=\"<%= file %>\"></script>",
      ".css": "<link rel=\"stylesheet\" href=\"<%= file %>\" />",
    };
    var files = grunt.file.expand({ cwd: config.cwd },config.src);
    var html = files.map(function(file) {
      var ext = path.extname(file);
      var template = templates[ext];
      return grunt.template.process(template,{ data: { file: file } });
    }).join("\n");
    grunt.file.write(config.dest,html);
  });

  grunt.registerMultiTask("html",function() {
    var data = {
      pkg: grunt.config.get("pkg"),
      manifest: this.data.manifest ? 'manifest="' + this.data.manifest + '"' : "",
    };
    grunt.file.recurse(this.data.path,function(file) {
      var name = path.basename(file,path.extname(file));
      data[name] = grunt.file.read(file,{ encoding: "utf8" });
    });
    var html = grunt.template.process(data.main,{ data: data });
    grunt.file.write(this.data.dest,html);
  });

};
// - -------------------------------------------------------------------- - //
