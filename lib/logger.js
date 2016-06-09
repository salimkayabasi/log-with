var winston = require('winston');

/**
 * try to find line number of error
 * generate new error
 * trace the error stack
 *
 * @returns {string} number of error
 */
function traceCaller() {
  var stack = ((new Error()).stack).split('\n');
  if (stack.length > 4) {
    var line = stack[4];
    var start = line.indexOf(':', line.lastIndexOf('.'));
    var end = line.indexOf(')', start);
    return line.slice(start, end);
  }
  return '';
}
function getLogger(module) {
  var path = module.filename
    .replace(process.cwd(), '')
    .split('\\')
    .join('/');
  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        colorize: true,
        label: path
      })
    ]
  });
  var oldLog = logger.log;
  logger.log = function () {
    var args = Array.prototype.slice.call(arguments);
    args.splice(1, 0, traceCaller());
    oldLog.apply(logger, args);
  };
  return logger;
}

module.exports = getLogger;
