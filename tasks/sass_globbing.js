/*
 * grunt-sass-globbing
 * https://github.com/itsravenous/grunt-sass-globbing
 *
 * Copyright (c) 2014 Tom Jenkins
 * Licensed under the GPLv3 license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sass_globbing', 'Shims globbing support for SASS. Useful if you can\'t use the sass-globbing plugin (e.g. you\'re using libsass)', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    // var options = this.options({
    //   // Add defaults here
    // });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        console.log('processing', filepath);
        return grunt.file.exists(filepath);
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      });

      // Find and replace globbing patterns with actual file lists
      var re = /@import ['"](.*)['"]/g;
      var globs = re.exec(src);
      console.log('GLOBS', globs);


      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
