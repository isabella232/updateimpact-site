module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'dist/index.html': ['jade/index.jade']
        }
      }
    },

    stylus: {
      compile: {
        options: {
          paths: ['styl'], // folder, where files to be imported are located
          urlfunc: 'url', // use embedurl('test.png') in our code to trigger Data URI embedding
          'include css': true
        },
        files: {
          'dist/index.css': 'styl/index.styl' // 1:1 compile
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/smooth-scroll.js', 'js/jquery-scrollspy.js', 'js/app.js'],
        dest: 'dist/app.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'dist/app.js': ['dist/app.js']
        }
      }
    },

    watch: {
      src: {
        files: ['jade/*.jade', 'styl/*.styl', 'js/*.js'],
        tasks: ['build']
      }
    },

    aws: grunt.file.readJSON('grunt-aws.json'),

    aws_s3: {
      release: {
        options: {
            accessKeyId: '<%= aws.key %>',          
            secretAccessKey: '<%= aws.secret %>',
            bucket: '<%= aws.bucket %>',    
            region: '',        
            sslEnabled: false
        },
        files: [
            {
                expand: true, 
                dest: '/', 
                cwd: 'dist/', 
                src: ['**'], 
                action: 'upload', 
                differential: true
            },
            { 
                dest: '/', 
                cwd: 'dist/', 
                action: 'delete', 
                differential: true
            }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-aws-s3');

  grunt.registerTask('build', ['jade:compile', 'stylus:compile', 'concat:dist']);
  grunt.registerTask('deploy', ['jade:compile', 'stylus:compile', 'concat:dist', 
    'uglify:my_target', 'aws_s3']);
};