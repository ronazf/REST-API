class Error {
    constructor(title, message, stackTrace) {
        this.title = title ?? "Unknown Error";
        this.message = message ?? null;
        this.stackTrace = stackTrace ?? null;
    };
};

module.exports = Error;
