module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
	dev_prod_switch: {
        options: {
            // Can be ran as `grunt --env=dev` or `grunt --env=prod`
            environment: grunt.option('env') || 'dev',
                env_char: '#',
                env_block_dev: 'env:dev',
                env_block_prod: 'env:prod',
                env_block_test: 'env:test'
        },
        all: {
            files: {
                'index.html': 'index.html'
            }
        }
    },
	connect: {
		server: {
			options: {
				port: 3000,
				base: './'
			}
		}
	},
	open: {
		dev: {
			path: 'http://localhost:3000/index.html'
		}
	},
	ts: {
		build: {
			src: ['public/app/*.ts'],
			dest: 'public/app',
			options: {
				"target": "es5",
				"module": "commonjs",
				"moduleResolution": "node",
				"sourceMap": true,
				"emitDecoratorMetadata": true,
				"experimentalDecorators": true,
				"removeComments": false,
				"noImplicitAny": true,
				"suppressImplicitAnyIndexErrors": true
			}
		}
	},
	concat: {
		options: {
		  separator: ';',
		},
		dist: {
		  src: ['public/src/script.js','public/src/app.js'],
		  dest: 'public/dist/concat.js',
		},
	},
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "public/css/main.css": "public/less/main.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['public/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
	  concat: {
		files: ['public/src/script.js','public/src/app.js'],
		tasks: ['concat']
	  },
	  ts: {
		files: 'public/app/*.ts',
		tasks: ['ts']  
	  }
    }
  });
 // grunt.registerTask('test', ['dev_prod_switch']);
  //grunt.registerTask('default', ['less','concat', 'watch']);
  grunt.registerTask('default', ['ts:build','connect', 'open', 'watch']);
};