/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    concat: {
      options: {
        separator: ";",
      },
      scripts: {
        src: ["./www/js/**/*.js"],
        dest: "./www/index.js",
      },
      styles: {
        src: ["./www/css/**/*.css"],
        dest: "./www/index.css",
      },
    },

    html: {
      dev: {
        dest: "./www/index.html",
        path: "./www/html",
        manifest: "cache-manifest",
      },
      prod: {
        dest: "./www/index.html",
        path: "./www/html",
        manifest: "cache-manifest",
      },
    },

    list: {
      devScripts: {
        cwd: "./www",
        src: ["js/**/*.js"],
        dest: "./www/html/scripts.html",
      },
      devStyles: {
        cwd: "./www",
        src: ["css/**/*.css"],
        dest: "./www/html/styles.html",
      },
      prodScripts: {
        cwd: "./www",
        src: ["index.js"],
        dest: "./www/html/scripts.html",
      },
      prodStyles: {
        cwd: "./www",
        src: ["index.css"],
        dest: "./www/html/styles.html",
      },
    },

    less: {
      dev: {
        expand: true,
        cwd: "./www/less",
        src: ["*.less"],
        dest: "./www/css/",
        ext: ".css",
      },
      prod: {
        options: {
          cleancss: true,
        },
        files: {
          "./www/index.css": "./www/index.css",
        },
      },
    },

    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
      },
      prod: {
        src: "./www/index.js",
        dest: "./www/index.js",
      },
    },

    ngAnnotate: {
      prod: {
        files: {
          "./www/index.js": "./www/index.js",
        },
      },
    },

    manifest: {
      dev: {
        options: {
          basePath: "./www/",
          timestamp: true
        },
        src: [],
        dest: "./www/cache-manifest",
      },
      prod: {
        options: {
          basePath: "./www/",
          network: [],
          timestamp: true
        },
        src: ["index.html","index.css","index.js","img/*"],
        dest: "./www/cache-manifest",
      },
    },

  });

  grunt.loadTasks("tasks");

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-ng-annotate");
  grunt.loadNpmTasks("grunt-manifest");

  grunt.registerTask("dev",[
    "less:dev",
    "list:devScripts",
    "list:devStyles",
    "html:dev",
    "manifest:dev",
  ]);

  grunt.registerTask("prod",[
    "less:dev",
    "concat:scripts",
    "ngAnnotate:prod",
    "uglify:prod",
    "concat:styles",
    "less:prod",
    "list:prodScripts",
    "list:prodStyles",
    "html:prod",
    "manifest:prod",
  ]);

};
// - -------------------------------------------------------------------- - //
