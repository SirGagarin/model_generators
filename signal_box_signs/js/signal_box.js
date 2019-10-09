SignalBox = function(type, name, symbol, number, distance, smallSigns) {
    this.type = type;
    this.name = name;
    this.symbol = symbol;
    this.number = number;
    this.distance = distance;
    this.smallSigns = smallSigns;
};

SignalBox.prototype.getName = function() {
    var types = new SignalBoxTypes();
    switch (this.type) {
        case types.SIGNAL_BOX:
            return this.name + " " + this.symbol;
        case types.POINT_POST:
        case types.END_SIGN_POST:
            if (this.number)
                return this.number.toString();
        case types.CROSSING_POST:
            postNum = "";
            if (this.number)
                postNum += this.number.toString();
            if (this.distance || this.Distance === 0) {
                if (postNum !== "")
                    postNum += "/";
                postNum += this.distance.toFixed(3).toString().replace('.',',')
            }
            return postNum;
        break;
    }
    return "";
};

SignalBoxTypes = function() {
    this.SIGNAL_BOX = 0;
    this.POINT_POST = 1;
    this.END_SIGN_POST = 2;
    this.CROSSING_POST = 3;
    this.names = ["signal_box", "point_post", "end_sign_post", "crossing_post"];
    this.capabilities = [
        {hasName: true, hasSymbol: true, hasNumber: false, hasDistance: false, numberObligatory: false, numberOrDistanceObligatory: false},
        {hasName: false, hasSymbol: false, hasNumber: true, hasDistance: false, numberObligatory: true, numberOrDistanceObligatory: false},
        {hasName: false, hasSymbol: false, hasNumber: true, hasDistance: false, numberObligatory: false, numberOrDistanceObligatory: false},
        {hasName: false, hasSymbol: false, hasNumber: true, hasDistance: true, numberObligatory: false, numberOrDistanceObligatory: true}
    ];
};