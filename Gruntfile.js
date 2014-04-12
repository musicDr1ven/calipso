module.exports = function(grunt) {
		 
		// Project configuration.
		grunt.initConfig({
		    pkg: grunt.file.readJSON('package.json'),
		 
		    compass: {
		        dev: {
		            options: {
		               /* Either use your config.rb for settings, or state them here */
		               //config: 'config.rb'
		               httpPath:"./",
		               sassDir:"themes/core/cleanslate/public/sass/",
		               cssDir:"themes/core/cleanslate/public/css/",
		               imagesDir:"themes/core/cleanslate/public/css/images/",
		               javascriptsDir:"themes/core/cleanslate/public/js/",
		               fontsDir:"themes/core/cleanslate/public/fonts",
		               outputStyle:"compact",
		               noLineComments:true,
		               relativeAssets:true
		            }
		        }
		     },
		});
		 
		// Load plugins here
		grunt.loadNpmTasks('grunt-contrib-compass');
		 
		// Default task(s).
		grunt.registerTask('default', ['compass']);
};