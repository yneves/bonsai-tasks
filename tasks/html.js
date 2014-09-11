/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //
module.exports = function(grunt) {

  grunt.registerTask("build-html",function() {

    var path = require("path");

    var data = {
      title: grunt.config.get("pkg.productName"),
    };

    grunt.file.recurse("./www/html",function(file) {
      var name = path.basename(file,path.extname(file));
      data[name] = grunt.file.read(file,{ encoding: "utf8" });
    });

    data.styles = grunt.file.expand({ cwd: "./www" },"css/**/*.css").map(function(file) {
      return grunt.template.process(data.css,{ data: { src: file } });
    }).join("");

    data.scripts = grunt.file.expand({ cwd: "./www" },"js/**/*.js").map(function(file) {
      return grunt.template.process(data.js,{ data: { src: file } });
    }).join("");

    var html = grunt.template.process(data.main,{ data: data });
    grunt.file.write("./www/index.html",html);

  });

};
// - -------------------------------------------------------------------- - //
