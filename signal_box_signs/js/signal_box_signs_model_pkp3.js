/**
 * Signal box plate with one line of text, PKP, ep. III
 * @constructor
 */
SignalBoxPlateOneLineEp3 = function(scale, amount, data) {
    SignalBoxPlateOneLineEp4.call(this, scale, amount, data);
    if (data.isSmall) {
        this.borderWidth = 56.692 / this.scale;
    }
    else {
        this.borderWidth = 70.865 / this.scale;
    }
};
SignalBoxPlateOneLineEp3.prototype = Object.create(SignalBoxPlateOneLineEp4.prototype);
SignalBoxPlateOneLineEp3.prototype.constructor = SignalBoxPlateOneLineEp3;

SignalBoxPlateOneLineEp3.prototype.drawBackground = function(doc) {
    doc.rect(0, 0, this.width, this.height).fill(this.fontColor);
    doc.rect(this.borderWidth, this.borderWidth, 
             this.width - 2 * this.borderWidth, this.height - 2 * this.borderWidth)
             .fill(this.fillColor);
};

/**
 * Signal box plate with two lines of text, PKP, ep. III
 * @constructor
 */
SignalBoxPlateTwoLinesEp3 = function(scale, amount, data) {
    SignalBoxPlateTwoLinesEp4.call(this, scale, amount, data);
    if (data.isSmall) {
        this.borderWidth = 56.692 / this.scale;
    }
    else {
        this.borderWidth = 70.865 / this.scale;
    }
};
SignalBoxPlateTwoLinesEp3.prototype = Object.create(SignalBoxPlateTwoLinesEp4.prototype);
SignalBoxPlateTwoLinesEp3.prototype.constructor = SignalBoxPlateTwoLinesEp3;

SignalBoxPlateTwoLinesEp3.prototype.drawBackground = function(doc) {
    doc.rect(0, 0, this.width, this.height).fill(this.fontColor);
    doc.rect(this.borderWidth, this.borderWidth, 
             this.width - 2 * this.borderWidth, this.height - 2 * this.borderWidth)
             .fill(this.fillColor);
};

/**
 * Signal box signs, PKP, ep. III
 * @constructor
 */
SignalBoxSignsPKPEp3 = function() {
    Model.call(this);
    this.name = {"pl":"Oznakowanie posterunków ruchu, epoka III",
                 "en":"Railway posts signs, epoch III",
                 "de":""};
    this.postsTypes = new SignalBoxTypes();
    this.strings = {post: "Post.", endOfTrainControl: "Skp"};
};
SignalBoxSignsPKPEp3.prototype = Object.create(Model.prototype);
SignalBoxSignsPKPEp3.prototype.constructor = SignalBoxSignsPKPEp3;

SignalBoxSignsPKPEp3.prototype.init = function(scale, data) {
    Model.prototype.init.call(this, scale, data);
    for (var i=0; i < data.posts.length; i++) {
        switch(data.posts[i].type) {
            case this.postsTypes.SIGNAL_BOX:
                var nameLine = data.posts[i].name.toUpperCase().split('\n').join(' ');
                this.parts.push(new StationPlateOneLineEp3(this.scale, 2, {name: nameLine, isSmall: data.posts[i].smallSigns}));
                this.parts.push(new SignalBoxSymbolEp4(this.scale, 2, {name: data.posts[i].symbol, isSmall: data.posts[i].smallSigns}));
                break;
            case this.postsTypes.POINT_POST:
                if (data.posts[i].number) {
                    this.parts.push(new SignalBoxPlateOneLineEp3(this.scale, 2, {name: this.strings.post + " " + data.posts[i].number, isSmall: data.posts[i].smallSigns}));
                }
                break;
            case this.postsTypes.END_SIGN_POST:
                if (data.posts[i].number) {
                    this.parts.push(new SignalBoxPlateOneLineEp3(this.scale, 2, {name: this.strings.endOfTrainControl + " " + data.posts[i].number.toString(), isSmall: data.posts[i].smallSigns}));
                }
                else {
                    this.parts.push(new SignalBoxPlateOneLineEp3(this.scale, 2, {name: this.strings.endOfTrainControl, isSmall: data.posts[i].smallSigns}));
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
                    this.parts.push(new SignalBoxPlateTwoLinesEp3(this.scale, 2, {name: nameLines, isSmall: data.posts[i].smallSigns}));
                    break;
                }
                if (nameLines.length > 0) {
                    this.parts.push(new SignalBoxPlateOneLineEp3(this.scale, 2, {name: nameLines[0], isSmall: data.posts[i].smallSigns}));
                }
                break;
        }
    }
};