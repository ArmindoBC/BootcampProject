'use strict';

class MemoryStorageService{
    constructor(){
        this.db = new Map();
    }
    set(key, value){
        return this.db.set(key, value);
    }
    get(key){
        return this.db.get(key);
    }
}

module.exports = new MemoryStorageService();