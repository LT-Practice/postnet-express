class CoreResponse {
    constructor(result, type = false) {
        this._result = result;
        this._type = type;
    }

    get result() {
        return this._result;
    }
    get type(){
        return this._type;
    }

    set message(result) {
        this._result = result;
    }

    set type(type) {
        this._type = type;
    }
}

module.exports = CoreResponse;

