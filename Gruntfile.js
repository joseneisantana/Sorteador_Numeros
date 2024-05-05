
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            styles: {
                files: ['src/styles/**/*.less'], // Assista a todos os arquivos .less em src/styles/
                tasks: ['less:development'], // Quando houver alterações, execute a tarefa less:development
                options: {
                    livereload: true // Ative o livereload para atualização automática no navegador
                }
            }
        },

        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement:  ' ./styles/main.css '
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [ 'src/index.html' ],
                        dest: 'dev/',

                    }
                ]
            },/*-------------------------------------------------------------------------------------- */
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement:  ' ./styles/main.min.css '
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [ 'prebuild/index.html' ],
                        dest: 'dist/',

                    }
                ]
            }

        },/*_________________________________________________________________________ */
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace:true,
                },
                files:{
                    'prebuild/index.html' :  'src/index.html',
                }
            }
        }
    })


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.registerTask('default', ['less:development']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist']);
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Tarefa para iniciar o watch
    grunt.registerTask('watchStyles', ['watch']);
};
