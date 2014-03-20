module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },

    coffee: {
      compile: {
        files: {
          '<%= pkg.name %>.js': ['src/*.coffee']
        }
      },
      compileWithMaps: {
        options: {
          sourceMap: true
        },
        files: {
          'build/<%= pkg.name %>.js': ['src/*.coffee']
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'build/<%= pkg.name %>.css': 'sass/<%= pkg.name %>.scss'
        }
      }
    },

    imageEmbed: {
      dist: {
        src: [ "build/<%= pkg.name %>.css" ],
        dest: "<%= pkg.name %>.css",
        options: {
          deleteAfterEncoding : false
        }
      }
    },

    watch: {
      scripts: {
        files: 'src/*.coffee',
        tasks: ['coffee:compileWithMaps'],
        options: {
          debounceDelay: 250
        }
      },
      css: {
        files: 'sass/*.scss',
        tasks: ['sass', 'imageEmbed'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-image-embed');

  // Default task(s).
  grunt.registerTask('default', ['coffee', 'sass', 'imageEmbed', 'uglify']);

};