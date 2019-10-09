/**
 * Signal box symbol sign, PKP, ep. IV
 * @constructor
 */
SignalBoxSymbolEp4 = function(scale, amount, data) {
    StationPlateOneLineEp4.call(this, scale, amount, data);
};
SignalBoxSymbolEp4.prototype = Object.create(StationPlateOneLineEp4.prototype);
SignalBoxSymbolEp4.prototype.constructor = SignalBoxSymbolEp4;

SignalBoxSymbolEp4.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize / this.scale;
        this.fontSize = this.height * 0.4;
        this.margin = this.height * 0.3;
        doc.font(this.font[0]).fontSize(this.fontSize);
        this.width = this.margin * 2 + doc.widthOfString(this.name, this.additionalStyles);
    }
    return [this.width, this.height];
};

/**
 * Signal box plate with one line of text, PKP, ep. IV
 * @constructor
 */
SignalBoxPlateOneLineEp4 = function(scale, amount, data) {
    GenericPlateEp4.call(this, scale, amount);
    this.name = data.name;
    if (data.isSmall)
        this.baseSize = 1133.84; // 2.8346 * 400;
    else
        this.baseSize = 2267.68; // 2.8346 * 800;
};
SignalBoxPlateOneLineEp4.prototype = Object.create(GenericPlateEp4.prototype);
SignalBoxPlateOneLineEp4.prototype.constructor = SignalBoxPlateOneLineEp4;

SignalBoxPlateOneLineEp4.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize / this.scale;
        this.fontSize = this.height * 0.4;
        this.margin = this.height * 0.5;
        doc.font(this.font[0]).fontSize(this.fontSize);
        this.width = this.margin * 2 + doc.widthOfString(this.name, this.additionalStyles);
    }
    return [this.width, this.height];
};

SignalBoxPlateOneLineEp4.prototype.drawBackground = function(doc) {
    doc.rect(0, 0, this.width, this.height).fillAndStroke(this.fillColor, this.borderColor);
};

SignalBoxPlateOneLineEp4.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.font(this.font[0]).fontSize(this.fontSize);
    doc.fill(this.fontColor).text(
        this.name,
        this.margin,
        this.height * 0.27,
        this.additionalStyles);
};

/**
 * Signal box plate with two lines of text, PKP, ep. IV
 * @constructor
 */
SignalBoxPlateTwoLinesEp4 = function(scale, amount, data) {
    SignalBoxPlateOneLineEp4.call(this, scale, amount, data);
    this.nameWidth = 0;
};
SignalBoxPlateTwoLinesEp4.prototype = Object.create(SignalBoxPlateOneLineEp4.prototype);
SignalBoxPlateTwoLinesEp4.prototype.constructor = SignalBoxPlateTwoLinesEp4;

SignalBoxPlateTwoLinesEp4.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        var stringWidth = 0;
        this.height = this.baseSize / this.scale;
        this.fontSize = this.height * 0.345;
        doc.font(this.font[0]).fontSize(this.fontSize);
        for (var i = 0; i < this.name.length; i++) {
            stringWidth = doc.widthOfString(this.name[i], this.additionalStyles);
            if (stringWidth > this.nameWidth)
                this.nameWidth = stringWidth;
        }
        this.width = this.height + this.nameWidth;
    }
    return [this.width, this.height];
};

StationPlateOneLineEp4.prototype.drawBackground = function(doc) {
    doc.rect(0, 0, this.width, this.height).fillAndStroke(this.fillColor, this.borderColor);
};

SignalBoxPlateTwoLinesEp4.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.font(this.font[0]).fontSize(this.fontSize);
    for (var i = 0; i < this.name.length; i++) {
        doc.fill(this.fontColor).text(
            this.name[i],
            this.height * 0.5 + (this.nameWidth - doc.widthOfString(this.name[i], this.additionalStyles)) * 0.5,
            this.height * (0.09 + 0.425 * i),
            this.additionalStyles);
    }
};

/**
 * Signal box signs, PKP, ep. IV
 * @constructor
 */
SignalBoxSignsPKPEp4 = function() {
    Model.call(this);
    this.name = {"pl":"Oznakowanie posterunków ruchu, epoka IV",
                 "en":"Railway posts signs, epoch IV",
                 "de":""};
    this.postsTypes = new SignalBoxTypes();
    this.strings = {post: "Post.", endOfTrainControl: "Skp"};
};
SignalBoxSignsPKPEp4.prototype = Object.create(Model.prototype);
SignalBoxSignsPKPEp4.prototype.constructor = SignalBoxSignsPKPEp4;

SignalBoxSignsPKPEp4.prototype.init = function(scale, data) {
    Model.prototype.init.call(this, scale, data);
    for (var i=0; i < data.posts.length; i++) {
        switch(data.posts[i].type) {
            case this.postsTypes.SIGNAL_BOX:
                var nameLine = data.posts[i].name.toUpperCase().split('\n').join(' ');
                this.parts.push(new StationPlateOneLineEp4(this.scale, 2, {name: nameLine, isSmall: data.posts[i].smallSigns}));
                this.parts.push(new SignalBoxSymbolEp4(this.scale, 2, {name: data.posts[i].symbol, isSmall: data.posts[i].smallSigns}));
                break;
            case this.postsTypes.POINT_POST:
                if (data.posts[i].number) {
                    this.parts.push(new SignalBoxPlateOneLineEp4(this.scale, 2, {name: this.strings.post + " " + data.posts[i].number, isSmall: data.posts[i].smallSigns}));
                }
                break;
            case this.postsTypes.END_SIGN_POST:
                if (data.posts[i].number) {
                    this.parts.push(new SignalBoxPlateOneLineEp4(this.scale, 2, {name: this.strings.endOfTrainControl + " " + data.posts[i].number.toString(), isSmall: data.posts[i].smallSigns}));
                }
                else {
                    this.parts.push(new SignalBoxPlateOneLineEp4(this.scale, 2, {name: this.strings.endOfTrainControl, isSmall: data.posts[i].smallSigns}));
                }
                break;
            case this.postsTypes.CROSSING_POST:
                var nameLines = [];
                if (data.posts[i].number) {
                    nameLines.push(data.posts[i].number.toString());
                }
                if (data.posts[i].distance || data.posts[i].distance === 0) {
                    nameLines.push(data.posts[i].distance.toFixed(3).toString().replace('.',','));
                }
                if (nameLines.length > 1) {
                    this.parts.push(new SignalBoxPlateTwoLinesEp4(this.scale, 2, {name: nameLines, isSmall: data.posts[i].smallSigns}));
                    break;
                }
                if (nameLines.length > 0) {
                    this.parts.push(new SignalBoxPlateOneLineEp4(this.scale, 2, {name: nameLines[0], isSmall: data.posts[i].smallSigns}));
                }
                break;
        }
    }
};
