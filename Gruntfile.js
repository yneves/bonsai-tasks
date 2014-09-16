/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("./package.json"),
    platform: process.platform,
    dist: {
      web: "./dist/web/<%= pkg.name %>-<%= pkg.version %>",
      atom: {
        bin: "./dist/atom/<%= pkg.name %>-<%= pkg.version %>-<%= platform %>",
        app: (process.platform === "darwin") ? "/Atom.app/Contents/Resources/app" : "/resources/app",
      },
    },

    // Concatenates script and style files to be used in production.
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

    // Joins all html files recursivelly into index.html.
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

    // Lists js and css files and generates assets.html file.
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

    // Compiles all files from ./www/less into ./www/css.
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

    // Compresses the index.js file to be used in production.
    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
      },
      prod: {
        src: "./www/js/index.js",
        dest: "./www/js/index.js",
      },
    },

    // Compresses the index.html file to be used in production.
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

    // Processes the index.js file to prepare angularjs for compression.
    ngAnnotate: {
      prod: {
        files: {
          "./www/js/index.js": "./www/js/index.js",
        },
      },
    },

    // Generates cache-manifest file for dev and production enviroments.
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

    // Generates all icons from one original icon.
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

    // Downloads atom-shell.
    "get-atom-shell": {
      atom: {
        version: "0.16.0",
        outputDir: "<%= dist.atom.bin %>",
        downloadDir: "./engines",
      },
    },

    // Include the app icon to atom-shell's exe file.
    exeico: {
      atom: {
        exe: "<%= dist.atom.bin %>/atom.exe",
        ico: "./www/img/favicon.ico",
      },
    },

    "file-creator": {
      atom: {
        files: [{
          file: "<%= dist.atom.bin %><%= dist.atom.app %>/package.json",
          method: function(fs,fd,done) {
            var pkg = grunt.file.readJSON("./package.json");
            pkg.productName = pkg.productName || pkg.name;
            delete pkg.devDependencies;
            delete pkg.repositories;
            delete pkg.scripts;
            pkg.main = "./main.js";
            fs.writeSync(fd,JSON.stringify(pkg,null,2));
            done();
          },
        }],
      },
    },

    // Renames atom-shell's exe file to the package's product name.
    rename: {
      atom: {
        files: [{
          src: "<%= dist.atom.bin %>/atom.exe",
          dest: "<%= dist.atom.bin %>/<%= pkg.productName %>.exe",
        }],
      },
    },

    // Deletes files from production when changing to dev mode.
    clean: {
      dev: [
        "./www/js/index.js",
        "./www/css/index.css",
      ],
    },

    // Copy the files for each type of distribution.
    copy: {

      // Web distribution.
      web: {
        expand: true,
        cwd: "./www",
        src: [
          "index.html",
          "cache-manifest",
          "js/index.js",
          "css/index.css",
          "img/*.*",
        ],
        dest: "<%= dist.web %>/",
      },

      // Desktop distribution.
      atom: {
        files: [{
          expand: true,
          cwd: "./www",
          src: [
            "index.html",
            "cache-manifest",
            "js/index.js",
            "css/index.css",
            "img/*.*",
          ],
          dest: "<%= dist.atom.bin %><%= dist.atom.app %>",
        },{
          src: "./node_modules/atom-shell-scripts/scripts/atom-shell-single-page.js",
          dest: "<%= dist.atom.bin %><%= dist.atom.app %>/main.js",
        }],
      },

    },

  });

  grunt.loadTasks("tasks");

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-rename");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-ng-annotate");
  grunt.loadNpmTasks("grunt-file-creator");
  grunt.loadNpmTasks("grunt-manifest");
  grunt.loadNpmTasks("grunt-favicons");

  grunt.registerTask("dev",[
    "clean:dev",
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

    "get-atom-shell:atom",
    "copy:atom",
    "exeico:atom",
    "rename:atom",
    "file-creator:atom",
  ]);

};
// - -------------------------------------------------------------------- - //
