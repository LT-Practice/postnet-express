//text next reset  newMapping:
class CommandResponse {
    constructor(text, next=false, reset=false, newMapping=null) {
        this._text = text;
        this._next = next;
        this._reset = reset;
        this._newMapping = newMapping;
    }

    get text() {
        return this._text;
    }

    get next() {
        return this._next;
    }

    get reset() {
        return this._reset;
    }

    get newMapping() {
        return this._newMapping;
    }

    set text(text) {
        this._next = text;
    }

    set next(next) {
        this._next = next;
    }

    set reset(reset) {
        this._reset = reset;
    }
}

module.exports = CommandResponse;