const Dictionary = require('dict');
const TrackState = require('./TrackState');
const Base = require(__dirname + '/../Helpers/Base');

class DataCache extends Base {
  constructor() {
    super();

    this.dictionary = Dictionary();
    this.Trackable = {
      Key: null,
      Item: null,
      State: null
    }
  }

  TValue(key) {

  }

  //public void Add(TKey key, TValue value)
  Add(key, value) {
    const trackable = this.dictionary.has(key);

    if (trackable && trackable.State !== TrackState.Deleted) {
      this.Exception('ArgumentException', 'ArgumentException');
    }

    const newValue = {
      Key: key,
      Item: value,
      State: trackable ? TrackState.Changed : TrackState.Added
    };

    this.dictionary.set(key, newValue);
  }

  //public void Delete(TKey key)
  Delete(key) {
    const trackable = this.dictionary.get(key);

    if (trackable) {
      if (trackable.State === TrackState.Added) {
        this.dictionary.delete(key);
      } else {
        trackable.State = TrackState.Deleted;
      }
    } else {
      const item = this.TryGetInternal(key);
      if (!item) {
        return;
      }

      const newValue = {
        Key: key,
        Item: item,
        State: TrackState.Deleted
      };
      this.dictionary.set(key, newValue);
    }
  }

  //public void DeleteWhere(Func<TKey, TValue, bool> predicate)
  DeleteWhere(predicate) {

  }

  //public IEnumerable<KeyValuePair<TKey, TValue>> Find(byte[] key_prefix)
  Find(key_prefix) {

  }

  //protected abstract IEnumerable<KeyValuePair<TKey, TValue>> FindInternal(byte[] key_prefix)
  FindInternal(key_prefix) {

  }

  //protected internal IEnumerable<Trackable> GetChangeSet()
  GetChangeSet() {

  }

  //protected abstract TValue GetInternal(TKey key);
  GetInternal(key) {

  }

  //public TValue GetAndChange(TKey key, Func<TValue> factory = null)
  GetAndChange(key, factory = null) {
  }

  //public TValue GetOrAdd(TKey key, Func<TValue> factory)
  GetOrAdd(key, factory) {

  }

  //public TValue TryGet(TKey key)
  TryGet(key) {

  }

  //protected abstract TValue TryGetInternal(TKey key)
  TryGetInternal(key) {
    return false;
  }
}

module.exports = DataCache;

/*
d.has("IV");                      // true
d.get("V");                       // "The Empire Strikes Back"
d.size;                           // 3

d.has("I");                       // false
d.set("I", "The Phantom Menace"); // "The Phantom Menace"
d.get("I");                       // "The Phantom Menace"
d.delete("I");                    // true
d.get("I");                       // undefined
d.get("I", "Jar-Jar's Fun Time"); // "Jar-Jar's Fun Time"

d.forEach(function (value, key) {
   console.log("Star Wars Episode " + key + ": " + value);
});

d.clear();
d.size;                           // 0
 */