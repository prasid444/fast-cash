import { AsyncStorage } from "react-native";

class Persistor{
  constructor(domain_name, cache_for_seconds, executor, callback){
    this.domain_name = domain_name;
    this.cache_for_seconds = cache_for_seconds;
    this.executor = executor;

    this._initialized = false;
    this._state = {};

    if(this.cache_for_seconds){
      this.executor.readAll(this.domain_name).then(
        (value) => {
          if(value){
            try{
              this._state = JSON.parse(value);
              typeof callback == 'function' && callback(this._state);
            }
            catch(e){
              console.log('Non JSON value saved for Persistor', e);
            }
          }
          this._initialized = true;
        }
      ).catch(
        (error) => {
          console.log('Error in reading persistor', error);
        }
      );
    }
    else{
      this.executor.purge(this.domain_name);
      this._initialized = true;
    }


    this.write = this.write.bind(this);
    this.remove = this.remove.bind(this);
    this.read = this.read.bind(this);
    this.readAll = this.readAll.bind(this);
  }

  write(key, value){
    this._state[key] = value;
    this.executor.writeAll(this.domain_name, JSON.stringify(this._state));
  }

  remove(key){
    if(this._state[key]){
      delete this._state[key];
      this.executor.writeAll(this.domain_name, JSON.stringify(this._state));
    }
  }

  purge(){
    this.executor.purge(this.domain_name);
  }

  read(key){
    return this._state[key];
  }

  readAll(){
    return this._state;
  }
}

class WebPersistor{
  static async readAll(domain_name){
    return localStorage.getItem(domain_name);
  }

  static async writeAll(domain_name, value){
    localStorage.setItem(domain_name, value);
  }

  static async purge(domain_name){
    localStorage.removeItem(domain_name);
  }

  static create(domain_name, cache_for_seconds, callback){
    return new Persistor(domain_name, cache_for_seconds, WebPersistor, callback);
  }
}

class ReactNativePersistor{
  static async readAll(domain_name){
    try{
      let res = await AsyncStorage.getItem(domain_name);
      res = await res;
      // console.log("GOT RES",res)
      return res;
   }catch(error){
     console.log('Error in reading data.');
   }
  }

  static async writeAll(domain_name, value){
    // console.log("WRITING",value)
    await AsyncStorage.setItem(
      domain_name,
      value,
      (error) => {
        if(error){
          console.log('Error in setting item', error);
        }
      }
    );
  }

  static async purge(domain_name){
    await AsyncStorage.removeItem(
      domain_name,
      (error) => {
        if(error){
          console.log('Error in setting item', error);
        }
      }
    );
  }

  static create(domain_name, cache_for_seconds, callback){
    return new Persistor(domain_name, cache_for_seconds, ReactNativePersistor, callback);
  }
}

export {
  WebPersistor,
  ReactNativePersistor,
};
