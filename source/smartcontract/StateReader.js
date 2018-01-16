const neovm = require('neo-js-vm');
const ec = require("elliptic").ec;
const curve = new ec('p256')

class StateReader extends neovm.InteropService {
  /*
          public event EventHandler<NotifyEventArgs> Notify;
          public event EventHandler<LogEventArgs> Log;

          public static readonly StateReader Default = new StateReader();
   */
  constructor() {
    super();

    this.Register("Neo.Runtime.GetTrigger", StateReader.Runtime_GetTrigger);
    this.Register("Neo.Runtime.CheckWitness", StateReader.Runtime_CheckWitness);
    this.Register("Neo.Runtime.Notify", StateReader.Runtime_Notify);
    this.Register("Neo.Runtime.Log", StateReader.Runtime_Log);
    this.Register("Neo.Blockchain.GetHeight", StateReader.Blockchain_GetHeight);
    this.Register("Neo.Blockchain.GetHeader", StateReader.Blockchain_GetHeader);
    this.Register("Neo.Blockchain.GetBlock", StateReader.Blockchain_GetBlock);
    this.Register("Neo.Blockchain.GetTransaction", StateReader.Blockchain_GetTransaction);
    this.Register("Neo.Blockchain.GetAccount", StateReader.Blockchain_GetAccount);
    this.Register("Neo.Blockchain.GetValidators", StateReader.Blockchain_GetValidators);
    this.Register("Neo.Blockchain.GetAsset", StateReader.Blockchain_GetAsset);
    this.Register("Neo.Blockchain.GetContract", StateReader.Blockchain_GetContract);
    this.Register("Neo.Header.GetHash", StateReader.Header_GetHash);
    this.Register("Neo.Header.GetVersion", StateReader.Header_GetVersion);
    this.Register("Neo.Header.GetPrevHash", StateReader.Header_GetPrevHash);
    this.Register("Neo.Header.GetMerkleRoot", StateReader.Header_GetMerkleRoot);
    this.Register("Neo.Header.GetTimestamp", StateReader.Header_GetTimestamp);
    this.Register("Neo.Header.GetConsensusData", StateReader.Header_GetConsensusData);
    this.Register("Neo.Header.GetNextConsensus", StateReader.Header_GetNextConsensus);
    this.Register("Neo.Block.GetTransactionCount", StateReader.Block_GetTransactionCount);
    this.Register("Neo.Block.GetTransactions", StateReader.Block_GetTransactions);
    this.Register("Neo.Block.GetTransaction", StateReader.Block_GetTransaction);
    this.Register("Neo.Transaction.GetHash", StateReader.Transaction_GetHash);
    this.Register("Neo.Transaction.GetType", StateReader.Transaction_GetType);
    this.Register("Neo.Transaction.GetAttributes", StateReader.Transaction_GetAttributes);
    this.Register("Neo.Transaction.GetInputs", StateReader.Transaction_GetInputs);
    this.Register("Neo.Transaction.GetOutputs", StateReader.Transaction_GetOutputs);
    this.Register("Neo.Transaction.GetReferences", StateReader.Transaction_GetReferences);
    this.Register("Neo.Attribute.GetUsage", StateReader.Attribute_GetUsage);
    this.Register("Neo.Attribute.GetData", StateReader.Attribute_GetData);
    this.Register("Neo.Input.GetHash", StateReader.Input_GetHash);
    this.Register("Neo.Input.GetIndex", StateReader.Input_GetIndex);
    this.Register("Neo.Output.GetAssetId", StateReader.Output_GetAssetId);
    this.Register("Neo.Output.GetValue", StateReader.Output_GetValue);
    this.Register("Neo.Output.GetScriptHash", StateReader.Output_GetScriptHash);
    this.Register("Neo.Account.GetScriptHash", StateReader.Account_GetScriptHash);
    this.Register("Neo.Account.GetVotes", StateReader.Account_GetVotes);
    this.Register("Neo.Account.GetBalance", StateReader.Account_GetBalance);
    this.Register("Neo.Asset.GetAssetId", StateReader.Asset_GetAssetId);
    this.Register("Neo.Asset.GetAssetType", StateReader.Asset_GetAssetType);
    this.Register("Neo.Asset.GetAmount", StateReader.Asset_GetAmount);
    this.Register("Neo.Asset.GetAvailable", StateReader.Asset_GetAvailable);
    this.Register("Neo.Asset.GetPrecision", StateReader.Asset_GetPrecision);
    this.Register("Neo.Asset.GetOwner", StateReader.Asset_GetOwner);
    this.Register("Neo.Asset.GetAdmin", StateReader.Asset_GetAdmin);
    this.Register("Neo.Asset.GetIssuer", StateReader.Asset_GetIssuer);
    this.Register("Neo.Contract.GetScript", StateReader.Contract_GetScript);
    this.Register("Neo.Storage.GetContext", StateReader.Storage_GetContext);
    this.Register("Neo.Storage.Get", StateReader.Storage_Get);
    this.Register("AntShares.Runtime.CheckWitness", StateReader.Runtime_CheckWitness);
    this.Register("AntShares.Runtime.Notify", StateReader.Runtime_Notify);
    this.Register("AntShares.Runtime.Log", StateReader.Runtime_Log);
    this.Register("AntShares.Blockchain.GetHeight", StateReader.Blockchain_GetHeight);
    this.Register("AntShares.Blockchain.GetHeader", StateReader.Blockchain_GetHeader);
    this.Register("AntShares.Blockchain.GetBlock", StateReader.Blockchain_GetBlock);
    this.Register("AntShares.Blockchain.GetTransaction", StateReader.Blockchain_GetTransaction);
    this.Register("AntShares.Blockchain.GetAccount", StateReader.Blockchain_GetAccount);
    this.Register("AntShares.Blockchain.GetValidators", StateReader.Blockchain_GetValidators);
    this.Register("AntShares.Blockchain.GetAsset", StateReader.Blockchain_GetAsset);
    this.Register("AntShares.Blockchain.GetContract", StateReader.Blockchain_GetContract);
    this.Register("AntShares.Header.GetHash", StateReader.Header_GetHash);
    this.Register("AntShares.Header.GetVersion", StateReader.Header_GetVersion);
    this.Register("AntShares.Header.GetPrevHash", StateReader.Header_GetPrevHash);
    this.Register("AntShares.Header.GetMerkleRoot", StateReader.Header_GetMerkleRoot);
    this.Register("AntShares.Header.GetTimestamp", StateReader.Header_GetTimestamp);
    this.Register("AntShares.Header.GetConsensusData", StateReader.Header_GetConsensusData);
    this.Register("AntShares.Header.GetNextConsensus", StateReader.Header_GetNextConsensus);
    this.Register("AntShares.Block.GetTransactionCount", StateReader.Block_GetTransactionCount);
    this.Register("AntShares.Block.GetTransactions", StateReader.Block_GetTransactions);
    this.Register("AntShares.Block.GetTransaction", StateReader.Block_GetTransaction);
    this.Register("AntShares.Transaction.GetHash", StateReader.Transaction_GetHash);
    this.Register("AntShares.Transaction.GetType", StateReader.Transaction_GetType);
    this.Register("AntShares.Transaction.GetAttributes", StateReader.Transaction_GetAttributes);
    this.Register("AntShares.Transaction.GetInputs", StateReader.Transaction_GetInputs);
    this.Register("AntShares.Transaction.GetOutputs", StateReader.Transaction_GetOutputs);
    this.Register("AntShares.Transaction.GetReferences", StateReader.Transaction_GetReferences);
    this.Register("AntShares.Attribute.GetUsage", StateReader.Attribute_GetUsage);
    this.Register("AntShares.Attribute.GetData", StateReader.Attribute_GetData);
    this.Register("AntShares.Input.GetHash", StateReader.Input_GetHash);
    this.Register("AntShares.Input.GetIndex", StateReader.Input_GetIndex);
    this.Register("AntShares.Output.GetAssetId", StateReader.Output_GetAssetId);
    this.Register("AntShares.Output.GetValue", StateReader.Output_GetValue);
    this.Register("AntShares.Output.GetScriptHash", StateReader.Output_GetScriptHash);
    this.Register("AntShares.Account.GetScriptHash", StateReader.Account_GetScriptHash);
    this.Register("AntShares.Account.GetVotes", StateReader.Account_GetVotes);
    this.Register("AntShares.Account.GetBalance", StateReader.Account_GetBalance);
    this.Register("AntShares.Asset.GetAssetId", StateReader.Asset_GetAssetId);
    this.Register("AntShares.Asset.GetAssetType", StateReader.Asset_GetAssetType);
    this.Register("AntShares.Asset.GetAmount", StateReader.Asset_GetAmount);
    this.Register("AntShares.Asset.GetAvailable", StateReader.Asset_GetAvailable);
    this.Register("AntShares.Asset.GetPrecision", StateReader.Asset_GetPrecision);
    this.Register("AntShares.Asset.GetOwner", StateReader.Asset_GetOwner);
    this.Register("AntShares.Asset.GetAdmin", StateReader.Asset_GetAdmin);
    this.Register("AntShares.Asset.GetIssuer", StateReader.Asset_GetIssuer);
    this.Register("AntShares.Contract.GetScript", StateReader.Contract_GetScript);
    this.Register("AntShares.Storage.GetContext", StateReader.Storage_GetContext);
    this.Register("AntShares.Storage.Get", StateReader.Storage_Get);
  }

  //protected virtual bool Runtime_GetTrigger(ExecutionEngine engine)
  static Runtime_GetTrigger(engine) {
    engine.EvaluationStack.Push(engine.Trigger);
    return true;
  }

  //protected virtual bool Runtime_CheckWitness(ExecutionEngine engine)
  static CheckWitness(engine) {
    let hashOrPubkey = engine.EvaluationStack.Pop().GetByteArray();
    let result = false;

    if(hashOrPubkey.length === 20) {
      // result = CheckWitness(engine, new UInt160(hashOrPubkey));
      let container = engine.ScriptContainer;
      let _hashes_for_verifying = container.GetScriptHashesForVerifying();
      result = _hashes_for_verifying.has(hash);
    } else if (hashOrPubkey.length === 33) {
    } else {
      return false;
    }

    engine.EvaluationStack.Push(result);
    return true;
  }
}