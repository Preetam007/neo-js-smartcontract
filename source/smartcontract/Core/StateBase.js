const Base = require(__dirname + '/../Helpers/Base');
const BinaryReader = require(__dirname + "/Helpers/BinaryReader");

class StateBase extends Base {
  constructor() {
    super();

    this.StateVersion = 0;

  }

  get Size() {
    // sizeof(byte)
    return 1;
  }

  //public virtual void Deserialize(BinaryReader reader)
  Deserialize(reader) {
    if(reader.ReadByte() != this.StateVersion) {
      this.Exception("StateBase.FormatException()", "FormatException()");
    }
  }

  //public virtual void Serialize(BinaryWriter writer)
  Serialize(writer) {
    writer.push(this.StateVersion);
  }

  // public virtual JObject ToJson()
  ToJson() {
    return JSON.stringify({version: this.StateVersion});
  }
}

module.exports = StateBase;