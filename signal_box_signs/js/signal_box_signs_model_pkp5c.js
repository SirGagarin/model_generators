/**
 * Station sign with two rows for the name allowing for bilingual station names, (PKP, ep. Vc).
 * @constructor
 */
CrossigPostSignEp5c = function(scale, amount, data) {
    StationPlateTwoLinesEp5c.call(this, scale, amount, data);
    this.additionalStyles = {characterSpacing: 41 / this.scale * (data.isSmall ? 0.4286 : 1), lineBreak: false};
};
CrossigPostSignEp5c.prototype = Object.create(StationPlateTwoLinesEp5c.prototype);
CrossigPostSignEp5c.prototype.constructor = CrossigPostSignEp5c;

CrossigPostSignEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize + 2 * this.rimWidth;
        this.fontSize = this.baseSize * 0.4213;
        var stringWidth = 0;
        doc.font(this.font[0]).fontSize(this.fontSize);
        for (var i = 0; i < this.name.length; i++) {
            stringWidth = doc.widthOfString(this.name[i], this.additionalStyles);
            if (stringWidth > this.nameWidth)
                this.nameWidth = stringWidth;
        }
        this.width = this.baseSize * 0.6572 + this.nameWidth +  2 * this.rimWidth;
    }
    return [this.width, this.height];
};

CrossigPostSignEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.rect(
        this.rimWidth,
        this.rimWidth + this.baseSize * 0.4857,
        this.width - 2* this.rimWidth,
        this.baseSize * 0.0286).fill(this.fontColor);
    doc.font(this.font[0]).fontSize(this.fontSize);
    for (var i = 0; i < this.name.length; i++) {
        doc.fill(this.fontColor).text(
            this.name[i],
            (this.width - doc.widthOfString(this.name[i], this.additionalStyles)) / 2,
            this.rimWidth + this.baseSize * (0.0654 + 0.5183 * i),
            this.additionalStyles);
    }
};

/**
 * Signal box signs based on UIC directives, PKP, ep. Vc.
 * @constructor
 */
SignalBoxSignsPKPEp5c = function() {
    Model.call(this);
    this.name = {"pl":"Oznakowanie posterunków ruchu, epoka Vc",
                 "en":"Railway posts signs, epoch Vc",
                 "de":""};
    this.postsTypes = new SignalBoxTypes();
    this.strings = {post: "Post.", endOfTrainControl: "Skp"};
};
SignalBoxSignsPKPEp5c.prototype = Object.create(Model.prototype);
SignalBoxSignsPKPEp5c.prototype.constructor = SignalBoxSignsPKPEp5c;

SignalBoxSignsPKPEp5c.prototype.init = function(scale, data) {
    Model.prototype.init.call(this, scale, data);
    for (var i=0; i < data.posts.length; i++) {
        switch(data.posts[i].type) {
            case this.postsTypes.SIGNAL_BOX:
                var nameLines = data.posts[i].name.split('\n');
                if (nameLines.length > 1) {
                    this.parts.push(new StationPlateTwoLinesEp5c(this.scale, 2, {name: nameLines, isSmall: data.posts[i].smallSigns}));
                }
                else {
                    this.parts.push(new StationPlateOneLineEp5c(this.scale, 2, {name: nameLines[0], isSmall: data.posts[i].smallSigns}));
                }
                this.parts.push(new StationPlateOneLineEp5c(this.scale, 2, {name: data.posts[i].symbol, isSmall: data.posts[i].smallSigns}));
                break;
            case this.postsTypes.POINT_POST:
                if (data.posts[i].number) {
                    this.parts.push(new StationPlateOneLineEp5c(this.scale, 2, {name: this.strings.post + " " + data.posts[i].number, isSmall: data.posts[i].smallSigns}));
                }
                break;
            case this.postsTypes.END_SIGN_POST:
                if (data.posts[i].number) {
                    this.parts.push(new StationPlateOneLineEp5c(this.scale, 2, {name: this.strings.endOfTrainControl + " " + data.posts[i].number.toString(), isSmall: data.posts[i].smallSigns}));
                }
                else {
                    this.parts.push(new StationPlateOneLineEp5c(this.scale, 2, {name: this.strings.endOfTrainControl, isSmall: data.posts[i].smallSigns}));
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
                    this.parts.push(new CrossigPostSignEp5c(this.scale, 2, {name: nameLines, isSmall: data.posts[i].smallSigns}));
                    break;
                }
                if (nameLines.length > 0) {
                    this.parts.push(new StationPlateOneLineEp5c(this.scale, 2, {name: nameLines[0], isSmall: data.posts[i].smallSigns}));
                }
                break;
        }
    }
};
