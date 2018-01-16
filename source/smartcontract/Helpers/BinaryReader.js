class BinaryReader {

  constructor(binaryStream = []) {
    this.position = 0;
    this.BinaryStream = binaryStream;
  }

  get Position() {
    return this.position;
  }

  set Position(position) {
    this.position = position;
  }

  ReadByte() {
    if(this.position >= this.BinaryStream.length) {
      return false;
    }

    return this.BinaryStream[this.position];
  }
}

module.exports = BinaryReader;