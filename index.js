module.exports = function (grunt) {
  // Override process.stdout to log the name+args of the current task before
  // every logged line.
  var hooker = require('hooker')
  // Override grunt.log.header to update a per-line prefix and prevent default logging.
  var prefix
  hooker.hook(grunt.log, 'header', function () {
    prefix = '[' + grunt.task.current.nameArgs + '] '
    return hooker.preempt()
  })
  // Override process.stdout to log the name+args of the current task before
  // every logged line.
  var newline = true
  hooker.hook(process.stdout, 'write', function (str) {
    if (newline) {
      if (str === '\n') {
        return hooker.preempt()
      } else if (prefix) {
        str = prefix + String(str).replace(/(\n)(?!$)/g, '$1' + prefix)
      }
    }
    newline = str.slice(-1) === '\n'
    return hooker.filter(this, [str])
  })
}
