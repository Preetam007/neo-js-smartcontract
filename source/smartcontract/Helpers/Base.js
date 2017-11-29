const Exception = require(__dirname + "/Exception");
const Logger = require(__dirname + "/Logger");

class Base {
  constructor() {
  }

  Exception(name, message) {
      throw new Exception(name, message);
  }

  Logging(val) {
    Logger.SetLogging(val);
  }

  Debug() {
    Logger.Log(arguments);
  }
}

module.exports = Base;