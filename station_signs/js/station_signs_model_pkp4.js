/**
 * Generic station sign typical with UIC standard from epoch Vc.
 * @constructor
 * @param {number} scale Denominator of model's scale.
 * @param {number} amount Number of parts.
 */
GenericPlateEp4 = function(scale, amount) {
    Part.call(this, scale, amount);
    this.fillColor = "#FFFFFF";
    this.fontColor = "#000000";
    this.borderColor = "#BBBBBB";
    this.font = ["dworcowa_pkp_new.otf"];
    this.width = 0;
    this.height = 0;
    this.additionalStyles = {lineBreak: false};
};
GenericPlateEp4.prototype = Object.create(Part.prototype);
GenericPlateEp4.constructor = GenericPlateEp4;


/**
 * Station sign with single row for the name, (PKP, ep. IV).
 * @constructor
 */
StationPlateOneLineEp4 = function(scale, amount, data) {
    GenericPlateEp4.call(this, scale, amount);
    this.name = data.name;
    if (data.isSmall)
        this.baseSize = 850.38; // 2.8346 * 300;
    else
        this.baseSize = 1984.22; // 2.8346 * 700;
};
StationPlateOneLineEp4.prototype = Object.create(GenericPlateEp4.prototype);
StationPlateOneLineEp4.prototype.constructor = StationPlateOneLineEp4;

StationPlateOneLineEp4.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize / this.scale;
        this.fontSize = this.height * 0.4125;
        doc.font(this.font[0]).fontSize(this.fontSize);
        this.width = this.height * 0.9 + doc.widthOfString(this.name, this.additionalStyles);
    }
    return [this.width, this.height];
};

StationPlateOneLineEp4.prototype.draw = function(doc) {
    doc.rect(0, 0, this.width, this.height).fillAndStroke(this.fillColor, this.borderColor);
    doc.font(this.font[0]).fontSize(this.fontSize);
    doc.fill(this.fontColor).text(
        this.name,
        this.height * 0.45,
        this.height * 0.21,
        this.additionalStyles);
};

/**
 * Station sign with single row for the name and additional station icon, (PKP, ep. IV).
 * @constructor
 */
StationPlateOneLineWithIcoEp4 = function(scale, amount, data) {
    StationPlateOneLineEp4.call(this, scale, amount, data);
};
StationPlateOneLineWithIcoEp4.prototype = Object.create(StationPlateOneLineEp4.prototype);
StationPlateOneLineWithIcoEp4.prototype.constructor = StationPlateOneLineWithIcoEp4;

StationPlateOneLineWithIcoEp4.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize / this.scale;
        this.fontSize = this.height * 0.4125;
        doc.font(this.font[0]).fontSize(this.fontSize);
        this.width = this.height * 2.1095 + doc.widthOfString(this.name, this.additionalStyles);
    }
    return [this.width, this.height];
};

StationPlateOneLineWithIcoEp4.prototype.drawIco = function(doc, pos, size) {
    doc.save();
    doc.translate(pos[0],pos[1]);
    doc.scale(size / 100);
    doc.path("M137.518,59.397l31.94-55.323l-41.252,34.98L137.518,59.397L137.518,59.397z M153.768,65.026h-32.263l-10.862-23.74l-13.71,23.74h-19.5L114.977,0h19.503l-13.06,22.616L148.095,0h56.878c11.242,0,15.769,11.232,10.526,20.297l-9.281,16.038c-3.798,6.562-11.53,11.779-19.253,11.789l-23.457,0.035L153.768,65.026L153.768,65.026zM39.691,65.026h-19.5L57.73,0h33.166c11.489,0,15.557,11.578,10.523,20.297l-9.278,16.038c-3.795,6.562-11.524,11.779-19.253,11.789l-23.457,0.035L39.691,65.026L39.691,65.026zM67.443,16.963l-8.217,14.23l13.662,0.032c1.514,0.005,3.928-2.119,4.625-3.331l6.291-10.932H67.443L67.443,16.963zM181.517,16.963l-8.214,14.23l13.662,0.032c1.518,0.005,3.925-2.119,4.625-3.331l6.288-10.932H181.517L181.517,16.963zM16.323,71.726H187.64l36.84-63.807C226.779,3.231,231.604,0,237.176,0h99.04l-16.323,28.271h-74.595l-4.412,7.648h74.591l-16.256,28.159h-74.595l-4.416,7.647h74.599L278.485,100H0L16.323,71.726L16.323,71.726zM19.585,77.383l-9.791,16.96h265.422l9.794-16.96h-74.592l10.941-18.955h74.596l9.73-16.855h-74.598l10.944-18.955h74.595l9.795-16.963h-89.246c-3.244,0-6.19,1.845-7.618,4.756l-38.652,66.972H19.585L19.585,77.383z").fill(this.fontColor);
    doc.restore();
};

StationPlateOneLineWithIcoEp4.prototype.draw = function(doc) {
    doc.rect(0, 0, this.width, this.height).fillAndStroke(this.fillColor, this.borderColor);
    this.drawIco(doc, [this.height * 0.45, this.height * 0.33], this.height * 0.33);
    doc.font(this.font[0]).fontSize(this.fontSize);
    doc.fill(this.fontColor).text(
        this.name,
        this.height * 1.6595,
        this.height * 0.21,
        this.additionalStyles);
};

/**
 * Station sign with two rows for the name, (PKP, ep. IV).
 * @constructor
 */
StationPlateTwoLinesEp4 = function(scale, amount, data) {
    StationPlateOneLineEp4.call(this, scale, amount, data);
    this.nameWidth = 0;
};
StationPlateTwoLinesEp4.prototype = Object.create(StationPlateOneLineEp4.prototype);
StationPlateTwoLinesEp4.prototype.constructor = StationPlateTwoLinesEp4;

StationPlateTwoLinesEp4.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        var stringWidth = 0;
        this.height = this.baseSize / this.scale;
        this.fontSize = this.height * 0.35;
        doc.font(this.font[0]).fontSize(this.fontSize);
        for (var i = 0; i < this.name.length; i++) {
            stringWidth = doc.widthOfString(this.name[i], this.additionalStyles);
            if (stringWidth > this.nameWidth)
                this.nameWidth = stringWidth;
        }
        this.width = this.height * 0.9 + this.nameWidth;
    }
    return [this.width, this.height];
};

StationPlateTwoLinesEp4.prototype.draw = function(doc) {
    doc.rect(0, 0, this.width, this.height).fillAndStroke(this.fillColor, this.borderColor);
    doc.font(this.font[0]).fontSize(this.fontSize);
    for (var i = 0; i < this.name.length; i++) {
        doc.fill(this.fontColor).text(
            this.name[i],
            this.height * 0.45 + (this.nameWidth - doc.widthOfString(this.name[i], this.additionalStyles)) * 0.5,
            this.height * (0.046 + 0.426 * i),
            this.additionalStyles);
    }
};

/**
 * Station sign with single row for the name and additional station icon, (PKP, ep. IV).
 * @constructor
 */
StationPlateTwoLinesWithIcoEp4 = function(scale, amount, data) {
    StationPlateOneLineWithIcoEp4.call(this, scale, amount, data);
    this.nameWidth = 0;
};
StationPlateTwoLinesWithIcoEp4.prototype = Object.create(StationPlateOneLineWithIcoEp4.prototype);
StationPlateTwoLinesWithIcoEp4.prototype.constructor = StationPlateTwoLinesWithIcoEp4;

StationPlateTwoLinesWithIcoEp4.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        var stringWidth = 0;
        this.height = this.baseSize / this.scale;
        this.fontSize = this.height * 0.35;
        doc.font(this.font[0]).fontSize(this.fontSize);
        for (var i = 0; i < this.name.length; i++) {
            stringWidth = doc.widthOfString(this.name[i], this.additionalStyles);
            if (stringWidth > this.nameWidth)
                this.nameWidth = stringWidth;
        }
        this.width = this.height * 2.1095 + this.nameWidth;
    }
    return [this.width, this.height];
};

StationPlateTwoLinesWithIcoEp4.prototype.draw = function(doc) {
    doc.rect(0, 0, this.width, this.height).fillAndStroke(this.fillColor, this.borderColor);
    this.drawIco(doc, [this.height * 0.45, this.height * 0.33], this.height * 0.33);
    doc.font(this.font[0]).fontSize(this.fontSize);
    for (var i = 0; i < this.name.length; i++) {
        doc.fill(this.fontColor).text(
            this.name[i],
            this.height * 1.6595 + (this.nameWidth - doc.widthOfString(this.name[i], this.additionalStyles)) * 0.5,
            this.height * (0.046 + 0.426 * i),
            this.additionalStyles);
    }
};

/**
 * Platform marking sign, (PKP, ep. IV).
 * @constructor
 */
PlatformPlateEp4 = function(scale, amount, data) {
    GenericPlateEp4.call(this, scale, amount);
    this.name = data.name;
    this.baseSize = 850.38; // 2.8346 * 300;
    this.strings = [];
    if (data.numbers.leftTrack)
        this.strings.push(data.strings.track + " " + data.numbers.leftTrack);
    if (data.numbers.platform)
        this.strings.push(data.strings.platform + " " + data.numbers.platform);
    if (data.numbers.rightTrack)
        this.strings.push(data.strings.track + " " + data.numbers.rightTrack);
};
PlatformPlateEp4.prototype = Object.create(GenericPlateEp4.prototype);
PlatformPlateEp4.prototype.constructor = PlatformPlateEp4;

PlatformPlateEp4.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize / this.scale;
        this.width = this.height * 0.267;
        this.fontSize = this.height * 0.4125;
        doc.font(this.font[0]).fontSize(this.fontSize);
        for (var i = 0; i < this.strings.length; i++) {
            this.width += (0.367 * this.height + doc.widthOfString(this.strings[i], this.additionalStyles));
        }
    }
    return [this.width, this.height];
};

PlatformPlateEp4.prototype.draw = function(doc) {
    doc.rect(0, 0, this.width, this.height).fillAndStroke(this.fillColor, this.borderColor);
    doc.fill(this.fontColor);
    doc.font(this.font[0]).fontSize(this.fontSize);
    var marginLeft = this.height * 0.3;
    var marginTop = this.height * 0.21;
    var isFirst = true;
    for (var i = 0; i < this.strings.length; i++) {
        if (isFirst)
            isFirst = false;
        else
        {
            doc.rect(marginLeft, 0, this.height * 0.033, this.height).fill(this.fontColor);
            marginLeft += this.height * 0.2;
        }
        doc.text(this.strings[i], marginLeft, marginTop, this.additionalStyles);
        marginLeft += (doc.widthOfString(this.strings[i], this.additionalStyles) + this.height * 0.167);
    }
};

/**
 * Station and platform signs, PKP, ep. IV.
 * @constructor
 */
StationSignsPKPEp4 = function() {
    Model.call(this);
    this.name = {"pl":"Oznakowanie stacji kolejowych PKP, epoka IV",
                 "en":"PKP railway station signs, epoch IV",
                 "de":"Bahnhofkennzeichnung, PKP, Epoche IV"};
    this.strings = {platform: "peron", track: "tor"};
    this.capabilities = {
        allowsBilingual: false,
        allowsAdditionalSigns: true,
        allowsSmallSigns: true,
        allowsDirectionPlates: false,
        allowsTimeTables: false,
        allowsSectors: false};
};
StationSignsPKPEp4.prototype = Object.create(Model.prototype);
StationSignsPKPEp4.prototype.constructor = StationSignsPKPEp4;

StationSignsPKPEp4.prototype.addStationPlates = function(nameLines, numberOfNameSigns, numberOfAdditionalNameSigns, hasExternal, hasSmallPlates) {
    if (nameLines.length > 1) {
        this.parts.push(new StationPlateTwoLinesEp4(this.scale, numberOfNameSigns, {name: nameLines, isSmall: hasSmallPlates}));
        if (hasExternal) {
            this.parts.push(new StationPlateTwoLinesWithIcoEp4(this.scale, numberOfAdditionalNameSigns, {name: nameLines, isSmall: hasSmallPlates}));
        }
    }
    else {
        this.parts.push(new StationPlateOneLineEp4(this.scale, numberOfNameSigns, {name: nameLines[0], isSmall: hasSmallPlates}));
        if (hasExternal) {
            this.parts.push(new StationPlateOneLineWithIcoEp4(this.scale, numberOfAdditionalNameSigns, {name: nameLines[0], isSmall: hasSmallPlates}));
        }
    }
};

StationSignsPKPEp4.prototype.addPlatformPlates = function(amount, platformData) {
    this.parts.push(new PlatformPlateEp4(this.scale, amount, {
                numbers: {platform: platformData.number.toString(), leftTrack: platformData.leftTrack.toString(), rightTrack: platformData.rightTrack.toString()},
                strings: this.strings}));
    this.parts.push(new PlatformPlateEp4(this.scale, amount, {
                numbers: {platform: platformData.number.toString(), leftTrack: platformData.rightTrack.toString(), rightTrack: platformData.leftTrack.toString()},
                strings: this.strings}));
};

StationSignsPKPEp4.prototype.init = function(scale, data) {
    Model.prototype.init.call(this, scale, data);
    var numberOfNameSigns = 0;
    var numberOfAdditionalNameSigns = 0;
    for (var i=0; i < data.platforms.length; i++) {
        var numberOfPlatformPosts = Math.floor(data.platforms[i].length / 100) + 1;
        this.addPlatformPlates(numberOfPlatformPosts, data.platforms[i]);
        numberOfNameSigns += 2 * numberOfPlatformPosts;
        if (i === 0 || i == (data.platforms.length - 1)) {
            numberOfAdditionalNameSigns += numberOfPlatformPosts;
        }
    }
    var nameLines = data.name.toUpperCase().split('\n');
    this.addStationPlates(nameLines, numberOfNameSigns, numberOfAdditionalNameSigns, data.hasExternal, false);
    if (data.hasSmallPlates) {
        this.addStationPlates(nameLines, numberOfNameSigns, numberOfAdditionalNameSigns, data.hasExternal, true);
    }
};
