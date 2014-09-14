/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //
module.exports = function(grunt) {

  var path = require("path");

  grunt.registerMultiTask("html",function() {
    var data = { pkg: grunt.config.get("pkg") };
    grunt.file.recurse(this.data.path,function(file) {
      var name = path.basename(file,path.extname(file));
      data[name] = grunt.file.read(file,{ encoding: "utf8" });
    });
    var html = grunt.template.process(data.main,{ data: data });
    grunt.file.write(this.data.dest,html);
  });

};
// - -------------------------------------------------------------------- - //
