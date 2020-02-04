import lodash from 'lodash';

class Domain {
  constructor(name, config, PersistorClass){
    this.name = name;
    this.config = config ? config : {};
    this._state = {};

    let { cache_for_seconds } = this.config;

    if(PersistorClass && cache_for_seconds > 0){
      this.persistor = PersistorClass.create(
        this.name,
        cache_for_seconds,
        (state) => {
          this._state = state;
          this._runSubscribers();
        },
      );

      // this._state = this.persistor.readAll();
    }

    this._listeners = {};
    this._subscribers = {};

    this._runSubscribers = this._runSubscribers.bind(this);
    this.write = this.write.bind(this);
    this._write = this._write.bind(this);
    this.merge = this.merge.bind(this);
    this._merge = this._merge.bind(this);
    this.read = this.read.bind(this);
    this.remove = this.remove.bind(this);
    this.listen = this.listen.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.state = this.state.bind(this);
  }

  _runSubscribers(){
    Object.values(this._subscribers).forEach(
      (subscriber) => {
        if(typeof subscriber == 'function'){
          subscriber(this._state);
        }
      }
    );
  }

  _write(namespace, value, cache){
    if(value === undefined){
      delete this._state[namespace];
    }
    else{
      this._state[namespace] = value;
    }

    this._runSubscribers();

    let callback = this._listeners[namespace];
    if(typeof callback == 'function'){
      callback(value, namespace)
    }

    if(this.persistor){
      if(cache === true){
        this.persistor.write(namespace, value);
      }
      else if(cache === false){
        this.persistor.remove(namespace);
      }
    }

    return value;
  }

  write(namespace, value, cache){
    if(!/^[a-z][a-zA-Z0-9_]{3,}$/.test(namespace)){
      throw new Error(`Invalid domain namespace "${namespace}"`);
    }
    return this._write(namespace, value, cache);
  }

  _merge(namespace, value, cache, writer = this._write){
    if(!lodash.isObject(value)){
      throw new Error('Value supplied is not an object.');
    }
    let new_val = lodash.assignIn({}, this.read(namespace), value);

    return writer(namespace, new_val, cache);
  }

  merge(namespace, value, cache){
    return this._merge(namespace, value, cache, this.write);
  }

  read(namespace){
    return this._state[namespace];
  }

  remove(namespace, cache){
    return this._write(namespace, undefined, cache);
  }

  purge(){
    this._state = {};
    this._runSubscribers();

    if(this.persistor){
      this.persistor.purge();
    }
  }

  listen(namespace, callback){
    if(typeof callback != 'function'){
      throw new Error('Listener callback should be a function');
    }

    this._listeners[namespace] = callback;

    return () => delete this._listeners[namespace];
  }

  subscribe(label, callback){
    if(typeof callback != 'function'){
      throw new Error('Subscriber callback should be a function');
    }

    this._subscribers[label] = callback;

    return () => {
      delete this._subscribers[label];
    }
  }

  state(){
    return { ...this._state };
  }

  static create(name, config, PersistorClass){
    if(!/^[a-z][a-zA-Z]{3,}$/.test(name)){
      throw new Error(`Invalid domain name "${name}"`);
    }
    return new Domain(name, config, PersistorClass);
  }
}

export default Domain;
