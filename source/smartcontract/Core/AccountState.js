const StateBase = require(__dirname + "/StateBase");
const Dictionary = require('dict');

class AccountState extends StateBase {
  //public AccountState(UInt160 hash)
  constructor(hash) {
    super();

    this.ScriptHash = hash;
    this.IsFrozen = false;
    this.Votes = []; // new ECPoint[0]
    this.Balances =  Dictionary();  // new Dictionary<UInt256, Fixed8>();
  }

  get Size() {
    //        public override int Size => base.Size + ScriptHash.Size + sizeof(bool) + Votes.GetVarSize()
    // + IO.Helper.GetVarSize(Balances.Count) + Balances.Count * (32 + 8);
    return super.Size + this.ScriptHash.length + 1 + this.Votes.length + this.Balances.size + (this.Balances.size * (32 + 8));
  }

  Clone() {
    return {...this};
  }

  // public override void Deserialize(BinaryReader reader)
  Deserialize(reader) {

  }

  //void ICloneable<AccountState>.FromReplica(AccountState replica)
  FromReplica(replica) {
    this.ScriptHash = replica.ScriptHash;
    this.IsFrozen = replica.IsFrozen;
    this.Votes = replica.Votes;
    this.Balances = replica.Balances;
  }

  //public override void Serialize(BinaryWriter writer)
  Serialize(writer) {

  }

  //public override JObject ToJson()
  ToJson() {
    return JSON.stringify({
      script_hash: this.ScriptHash,
      frozen: this.IsFrozen,
      votes: this.Votes,
      balances: this.Balances
    });
  }
}

module.exports = AccountState;