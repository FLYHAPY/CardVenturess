// For now it is only an auxiliary class to hold data in here 
// so no need to create a model file for it
class State {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    export() {
        return this.name;
    }
}

module.exports = State;