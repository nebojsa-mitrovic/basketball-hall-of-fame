module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		express: {
			dev: {
				options: {
					script: "src/index.js",
				},
			},
		},
		sass: {
			dist: {
				files: {
					"src/public/css/style.css": "src/public/css/sass/style.sass",
				},
			},
		},
		watch: {
			css: {
				files: "**/*.sass",
				tasks: ["sass"],
			},
		},
	});
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-express-server");
	grunt.registerTask("dev", ["express", "sass", "watch"]);
};
