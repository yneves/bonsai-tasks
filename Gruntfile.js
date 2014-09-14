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
        dest: "./www/js/index.js",
        filter: function(src) { return !/index/.test(src) },
      },
      styles: {
        src: ["./www/css/**/*.css"],
        dest: "./www/css/index.css",
        filter: function(src) { return !/index/.test(src) },
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
      dev: {
        cwd: "./www",
        src: ["css/**/*.css","js/**/*.js"],
        dest: "./www/html/assets.html",
        filter: function(src) { return !/index/.test(src) },
      },
      prod: {
        cwd: "./www",
        src: ["css/index.css","js/index.js"],
        dest: "./www/html/assets.html",
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
          "./www/css/index.css": "./www/css/index.css",
        },
      },
    },

    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
      },
      prod: {
        src: "./www/js/index.js",
        dest: "./www/js/index.js",
      },
    },

    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          "./www/index.html": "./www/index.html",
        },
      },
    },

    ngAnnotate: {
      prod: {
        files: {
          "./www/js/index.js": "./www/js/index.js",
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
        src: ["index.html","css/index.css","js/index.js","img/*"],
        dest: "./www/cache-manifest",
      },
    },

    favicons: {
      options: {
        trueColor: true,
        precomposed: true,
        appleTouchBackgroundColor: "#DDDDDD",
        coast: true,
        windowsTile: true,
        tileBlackWhite: false,
        tileColor: "#DDDDDD",
        html: "./www/html/icons.html",
        HTMLPrefix: "img/"
      },
      icons: {
        src: "./www/img/logo-256.png",
        dest: "./www/img"
      }
    },

    copy: {
      web: {
        expand: true,
        cwd: "./www",
        src: [
          "index.html",
          "css/index.css",
          "js/index.js",
          "cache-manifest",
          "img/*.*",
        ],
        dest: "dist/web/<%= pkg.name %>-<%= pkg.version %>/",
      },
    },

  });

  grunt.loadTasks("tasks");

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-ng-annotate");
  grunt.loadNpmTasks("grunt-manifest");
  grunt.loadNpmTasks("grunt-favicons");

  grunt.registerTask("dev",[
    "less:dev",
    "list:dev",
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
    "list:prod",
    "html:prod",
    "htmlmin:prod",
    "manifest:prod",
  ]);

  grunt.registerTask("dist",[
    "favicons",
    "prod",
    "copy:web",
  ]);

};
// - -------------------------------------------------------------------- - //
