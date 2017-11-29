const DataCache = require(__dirname + "/Caching/DataCache");
const neovm = require('neo-js-vm');
const ExecutionEngine = neovm.ExecutionEngine;
const Cryptography = neovm.Cryptography;

class ApplicationEngine extends ExecutionEngine {
  //C# Params: TriggerType trigger, IScriptContainer container, IScriptTable table, InteropService service, Fixed8 gas, bool testMode = false
  constructor(trigger, container, table, service, gas, testMode) {
    super(container, new Cryptography(), table, service);

    this.Debug('ApplicationEngine(%s, %s, %s, %s, %s, %s)', trigger, container, table, service, gas, testMode);

    /// Set the max size allowed size for BigInteger
    this.MaxSizeForBigInteger = 32;
    /// Set the max Stack Size
    this.MaxStackSize = 2 * 1024;
    /// Set Max Item Size
    this.MaxItemSize = 1024 * 1024;
    /// Set Max Invocation Stack Size
    this.MaxInvocationStackSize = 1024;
    /// Set Max Array Size
    this.MaxArraySize = 1024;

    this.ratio = 100000;
    this.gas_free = 10 * 100000000;
    this.gas_consumed = 0;

    this.gas_amount = this.gas_free + gas;
    this.testMode = testMode;
    this.Trigger = trigger; // trigger.Type?
  }

  //C# Params: OpCode nextInstruction
  CheckArraySize(nextInstruction) {
    this.Debug('ApplicationEngine.CheckArraySize(%o)', nextInstruction);
    this.Debug('ratio: %s', this.ratio);
    switch (nextInstruction) {
      case this.opCodes.PACK:
      case this.opCodes.NEWARRAY:
        if (this.EvaluationStack.Count === 0) {
          return false;
        }

        const size = this.EvaluationStack.Peek().GetBigInteger();
        return size <= this.MaxArraySize;

      default:
        return true;
    }
  }

  //C# Params: OpCode nextInstruction
  CheckInvocationStack(nextInstruction) {
    this.Debug('ApplicationEngine.CheckInvocationStack(%s)', nextInstruction);

    switch (nextInstruction) {
      case this.opCodes.CALL:
      case this.opCodes.APPCALL:
        return this.InvocationStack.Count < this.MaxInvocationStackSize;

      default:
        return true;
    }
  }

  //C# Params: OpCode nextInstruction
  CheckItemSize(nextInstruction) {
    this.Debug('ApplicationEngine.CheckItemSize(%s)', nextInstruction);

    switch (nextInstruction) {
      case this.opCodes.PUSHDATA4:
        if(this.CurrentContext.InstructionPointer + 4 >= this.CurrentContext.Script.length) {
          return false;
        }

        //const length = this.CurrentContext.Script
        break;
    }
  }

  //C# Params: BigInteger value
  CheckBigInteger(value) {
    this.Debug('ApplicationEngine.CheckBigInteger(%s)', value);
  }

  //C# Params: OpCode nextInstruction
  CheckBigIntegers(nextInstruction) {
    this.Debug('ApplicationEngine.CheckBigIntegers(%s)', nextInstruction);
  }

  //C# Params: OpCode nextInstruction
  CheckStackSize(nextInstruction) {
    this.Debug('ApplicationEngine.CheckStackSize(%s)', nextInstruction);
  }

  Execute() {
    this.Debug('ApplicationEngine.Execute()');
  }

  //C# Params: OpCode nextInstruction
  GetPrice(nextInstruction) {
    this.Debug('ApplicationEngine.GetPrice(%s)', nextInstruction);
  }

  GetPriceForSysCall() {
    this.Debug('ApplicationEngine.GetPriceForSysCall()');
  }

  //public static ApplicationEngine Run(byte[] script, IScriptContainer container = null)
  Run(script, container = null) {
    this.Debug('ApplicationEngine.Run(%s, %s)', script, container);
    let accounts = new DataCache();
    /*
    DataCache<UInt160, AccountState> accounts = Blockchain.Default.CreateCache<UInt160, AccountState>();
    DataCache<ECPoint, ValidatorState> validators = Blockchain.Default.CreateCache<ECPoint, ValidatorState>();
    DataCache<UInt256, AssetState> assets = Blockchain.Default.CreateCache<UInt256, AssetState>();
    DataCache<UInt160, ContractState> contracts = Blockchain.Default.CreateCache<UInt160, ContractState>();
    DataCache<StorageKey, StorageItem> storages = Blockchain.Default.CreateCache<StorageKey, StorageItem>();
    CachedScriptTable script_table = new CachedScriptTable(contracts);
    StateMachine service = new StateMachine(accounts, validators, assets, contracts, storages);
    ApplicationEngine engine = new ApplicationEngine(TriggerType.Application, container, script_table, service, Fixed8.Zero, true);
    engine.LoadScript(script, false);
    engine.Execute();
    return engine;

     */
  }
}

module.exports = ApplicationEngine;
