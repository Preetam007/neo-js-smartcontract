// const DataCache = require(__dirname + "/Caching/DataCache");
const neovm = require('neo-js-vm');

class CachedScriptTable extends neovm.IScriptTable {
  //public CachedScriptTable(DataCache<UInt160, ContractState> contracts)
  constructor(contracts) {
    super();

    this.contracts = contracts;
    this.crypto = new neovm.Cryptography();
  }

  //byte[] IScriptTable.GetScript(byte[] script_hash)
  GetScript(script_hash) {
    console.log("CachedScriptTable3.GetScript: %s", this.crypto.Hash160(script_hash));
    console.log("CachedScriptTable3.Script: %s", this.contracts[this.crypto.Hash160(script_hash)].Script);
    return this.contracts[this.crypto.Hash160(script_hash)].Script;
  }

}

module.exports = CachedScriptTable;