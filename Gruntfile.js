// Generated on 2015-02-02 using generator-teamnet-component 0.2.1
'use strict';

module.exports = function(grunt) {

  // Configurable paths
  var yoConfig = {
    livereload: 35729,
    name: 'app-bootstrap-dictionary-web',
    src: 'src',
    dist: 'dist'
  };

  // Livereload setup
  var lrSnippet = require('connect-livereload')({port: yoConfig.livereload});
  var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yo: yoConfig,
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.name %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author mihaela.petre mihaela.petre@teamnet.ro\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yo.dist %>/*',
            'template/**/*.js',
            '!<%= yo.dist %>/.git*',
            'demo/bower_components/app-bootstrap-dictionary-web/src',
            'demo/bower_components/app-bootstrap-dictionary-web/dist'
          ]
        }]
      },
      buf:{
          files: [{
              dot: true,
              src: [
                  '.bowerrcBuf',
                  'packageJsonBuf'
              ]
          }]
      },
      server: '.tmp'
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      less: {
        files: ['<%= yo.src %>/{,*/}*.less'],
        tasks: ['less:dist']
      },
      app: {
        files: [
          '<%= yo.src %>/{,*/}*.html',
          '{.tmp,<%= yo.src %>}/{,*/}*.css',
          '{.tmp,<%= yo.src %>}/{,*/}*.js'
        ],
        options: {
          livereload: yoConfig.livereload
        }
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0' // Change this to '0.0.0.0' to access the server from outside.
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yoConfig.src)
            ];
          }
        }
      }
    },
    less: {
      options: {
        // dumpLineNumbers: 'all',
        paths: ['<%= yo.src %>']
      },
      dist: {
        files: {
          '<%= yo.src %>/<%= yo.name %>.css': '<%= yo.src %>/<%= yo.name %>.less'
        }
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= yo.src %>/{,*/}*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS']
      },
      unit: {
        singleRun: true
      },
      server: {
        autoWatch: true
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= yo.src %>/',
            src: [ '../template/*.html'],
            dest: '<%= yo.dist %>/template'
          }
        ]
      }
    },
    html2js: {
      dist: {
        options: {
          module: 'app-bootstrap-dictionary-webTemplate.html',
          singleModule: true,
          useStrict: true,
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        },
        files: [{
          src:'<%= yo.src %>/template/**/*.html',
          dest: '<%= yo.dist %>/templates.html.js'
        }]
      }
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: '<%= yo.src %>/',
            src: 'img/*.png',
            dest: '<%= yo.dist %>/'

          }
        ]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      dist: {
        files: {
          '<%= yo.dist %>/styles/main.css': [
            '<%= yo.src %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    ngmin: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= yo.src %>/generator-teamnet-component.js'],
        dest: '<%= yo.dist %>/generator-teamnet-component.js'
      }
      // dist: {
      //   files: {
      //     '/.js': '/.js'
      //   }
      // }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= yo.src %>/<%= pkg.name %>.js','<%= yo.dist %>/templates.html.js','<%= yo.src %>/scripts/**/*.js'],
        dest: '<%= yo.dist %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= yo.dist %>/<%= pkg.name %>.min.js'
      }
    },
    copy: {
          main: {
              options: {
                  forceOverwrite: true,
                  force: true
              },
              files: [
                  // includes files within path and its sub-directories
                  {expand: true, src: ['dist/**'], dest: 'demo/bower_components/app-bootstrap-dictionary-web/',filter: 'isFile'}

              ]
          }/*,
          toBuf: {
              options: {
                  forceOverwrite: true,
                  force: true
              },
              files: [
                  // includes files within path and its sub-directories
                  {expand: true, src: ['.bowerrc'], dest: '.bowerrcBuf',filter: 'isFile'}
//                  {expand: true, src: ['.bowerrc'], dest: 'packageJsonBuf',filter: 'isFile'}

              ]
          },
          FromBuf: {
            options: {
                forceOverwrite: true,
                force: true
            },
            files: [
                // includes files within path and its sub-directories
                {expand: true, src: ['.bowerrcBuf'], dest: '.bowerrc',filter: 'isFile'}

            ]
        },
          bowerrcDemoTobowerrc: {
              options: {
                  forceOverwrite: true,
                  force: true
              },
              files: [
                  // includes files within path and its sub-directories
                  {expand: true, src: ['/demo/.bowerrc'], dest: '.bowerrc',filter: 'isFile'},

              ]
          }*/
      }
  });

  grunt.registerTask('test', [
    'jshint',
    'karma:unit'
  ]);

//    grunt.registerTask('copy',['copy:main']);

  grunt.registerTask('build', [
    'clean:dist',
//    'htmlmin:dist',
    'html2js',
    'cssmin:dist',
    'imagemin',
    'ngmin:dist',
    'concat',
    'uglify:dist',
    'copy:main'

  ]);

  grunt.registerTask('release', [
    'test',
    'bump-only',
    'dist',
    'bump-commit'
  ]);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('before-test', ['enforce', 'jshint', 'html2js']);

};
