/**
 * Generic station sign typical with UIC standard from epoch Vc.
 * @constructor
 * @param {number} scale Denominator of model's scale.
 * @param {number} amount Number of parts.
 */
GenericPlateEp5c = function(scale, amount) {
    Part.call(this, scale, amount);
    this.fillColor = "#00447C";
    this.fontColor = "#FFFFFF";
    this.font = ["myriad_pro_semibold.otf"];
    this.rimWidth = 170.079 / this.scale;
    if (this.rimWidth < 2.8) {
        this.rimWidth = 0;
    }
    this.width = 0;
    this.height = 0;
};
GenericPlateEp5c.prototype = Object.create(Part.prototype);
GenericPlateEp5c.constructor = GenericPlateEp5c;

/**
 * Draw backround of the part - plate background with foldable edges (if not to small for a scale).
 * @param {Object} doc Traget document.
 */
GenericPlateEp5c.prototype.drawBackground = function(doc) {
    plateWidth = this.width - 2 * this.rimWidth;
    plateHeight = this.height - 2 * this.rimWidth;
    if (this.rimWidth > 0) {
        doc.rect(0, this.rimWidth, this.rimWidth, plateHeight).fill(this.fillColor);
        doc.rect(this.rimWidth, 0, plateWidth, this.rimWidth).fill(this.fillColor);
        doc.rect(this.rimWidth + plateWidth, this.rimWidth, this.rimWidth, plateHeight).fill(this.fillColor);
        doc.rect(this.rimWidth, this.rimWidth + plateHeight, plateWidth, this.rimWidth).fill(this.fillColor);
    }
    doc.rect(this.rimWidth, this.rimWidth, plateWidth, plateHeight).fill(this.fillColor);
};

/**
 * Station sign with single row for the name, (PKP, ep. Vc).
 * @constructor
 */
StationPlateOneLineEp5c = function(scale, amount, data) {
    GenericPlateEp5c.call(this, scale, amount);
    this.name = data.name;
    if (data.isSmall)
        this.baseSize = 850.38 / this.scale; // 2.8346 * 300;
    else
        this.baseSize = 1984.22 / this.scale; // 2.8346 * 700;
    this.name = data.name;
    this.additionalStyles = {characterSpacing: 62 / this.scale * (data.isSmall ? 0.4286 : 1), lineBreak: false};
};
StationPlateOneLineEp5c.prototype = Object.create(GenericPlateEp5c.prototype);
StationPlateOneLineEp5c.prototype.constructor = StationPlateOneLineEp5c;

StationPlateOneLineEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize + 2 * this.rimWidth;
        this.fontSize = this.baseSize * 0.6013;
        doc.font(this.font[0]).fontSize(this.fontSize);
        this.width = 0.8 * this.baseSize + doc.widthOfString(this.name, this.additionalStyles) +  2 * this.rimWidth;
    }
    return [this.width, this.height];
};

StationPlateOneLineEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.font(this.font[0]).fontSize(this.fontSize);
    doc.fill(this.fontColor).text(
        this.name,
        this.baseSize * 0.4 + this.rimWidth,
        this.baseSize * 0.2474 + this.rimWidth,
        this.additionalStyles);
};

/**
 * Station sign with single row for the name and additional station icon, (PKP, ep. Vc).
 * @constructor
 */
StationPlateOneLineWithIcoEp5c = function(scale, amount, data) {
    StationPlateOneLineEp5c.call(this, scale, amount, data);
    this.additionalStyles = {characterSpacing: 37 / this.scale * (data.isSmall ? 0.4286 : 1), lineBreak: false};
    this.obverseAdditionalStyles = {characterSpacing: 62 / this.scale * (data.isSmall ? 0.4286 : 1), lineBreak: false};
};
StationPlateOneLineWithIcoEp5c.prototype = Object.create(StationPlateOneLineEp5c.prototype);
StationPlateOneLineWithIcoEp5c.prototype.constructor = StationPlateOneLineWithIcoEp5c;

StationPlateOneLineWithIcoEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize + 2 * this.rimWidth;
        this.fontSize = this.baseSize * 0.3827;
        // for width calculation we use the bigger font placed on the obverse
        doc.font(this.font[0]).fontSize(this.baseSize * 0.6013);
        this.width = this.baseSize * 0.8 + doc.widthOfString(this.name, this.obverseAdditionalStyles) +  2 * this.rimWidth;
    }
    return [this.width, this.height];
};

StationPlateOneLineWithIcoEp5c.prototype.drawStationIco = function(doc, pos, size) {
    doc.save();
    doc.translate(pos[0],pos[1]);
    doc.scale(size / 100);
    doc.rect(0, 0, 100, 100).fill(this.fontColor);
    doc.path("M74.812,79.034H52.152c-4.992-0.6-8.79-2-11.377-4.198C32.22,68.228,20.872,64.517,6.721,63.711v-7.126c13.717-6.685,23.466-17.55,29.774-32.038c2.051-6.327,8.66-9.749,15.916-10.278h18.127c8.237,0.753,12.981,4.233,14.822,9.984l3.122,9.972c1.275,3.181,1.863,6.497,2.134,9.872l-0.358,22.701C90.416,73.789,84.055,78.917,74.812,79.034z").fill(this.fillColor);
    doc.polygon([50.383, 79.875], [54.821, 79.875], [60.995, 87.859], [54.692, 87.859]).fill(this.fillColor);
    doc.polygon([74.906, 79.875], [79.645, 79.875], [92.222, 87.859], [85.607,87.859]).fill(this.fillColor);
    doc.path("M8.579,60.713c9.971-2.075,17.868-6.22,25.646-13.893l0.977-12.283C28.404,45.173,19.773,53.398,8.579,58.238V60.713z").fill(this.fontColor);
    doc.path("M63.74,16.534c1.323,0,2.399,1.082,2.399,2.405c0,1.317-1.076,2.399-2.399,2.399c-1.322,0-2.398-1.082-2.398-2.399C61.342,17.616,62.418,16.534,63.74,16.534z").fill(this.fontColor);
    doc.path("M55.074,57.638c2.398,0,4.351,1.952,4.351,4.345c0,2.398-1.952,4.351-4.351,4.351c-2.393,0-4.351-1.953-4.351-4.351C50.724,59.59,52.682,57.638,55.074,57.638z").fill(this.fontColor);
    doc.path("M83.426,57.638c2.393,0,4.351,1.952,4.351,4.345c0,2.398-1.958,4.351-4.351,4.351c-2.398,0-4.352-1.953-4.352-4.351C79.074,59.59,81.027,57.638,83.426,57.638z").fill(this.fontColor);
    doc.path("M86.201,36.295l-3.394-10.524c-0.417-1.282-1.457-2.487-3.145-2.487H64.822l1.557,16.841l17.17-1.014C85.524,39.111,86.571,38.447,86.201,36.295z").fill(this.fontColor);
    doc.path("M64.044,23.284H48.295c-2.498,0-3.293,1.511-3.346,2.622l-0.522,11.177c-0.053,1.117,0.911,1.97,2.021,2.028l19.154,1.013L64.044,23.284z").fill(this.fontColor);
    doc.restore();
};

StationPlateOneLineWithIcoEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.font(this.font[0]).fontSize(this.fontSize);
    var margin = (this.width - this.baseSize * 0.6842 - doc.widthOfString(this.name, this.additionalStyles)) * 0.5;
    this.drawStationIco(doc, [margin, this.rimWidth + this.baseSize * 0.2368], this.baseSize * 0.5263);
    doc.fill(this.fontColor).text(
        this.name,
        this.baseSize * 0.6842 + margin,
        this.baseSize * 0.3402 + this.rimWidth,
        this.additionalStyles);
};

/**
 * Station sign with two rows for the name (PKP, ep. Vc).
 * @constructor
 */
StationPlateTwoLinesEp5c = function(scale, amount, data) {
    StationPlateOneLineEp5c.call(this, scale, amount, data);
    this.additionalStyles = {characterSpacing: 45 / this.scale * (data.isSmall ? 0.4286 : 1), lineBreak: false};
    this.nameWidth = 0;
};
StationPlateTwoLinesEp5c.prototype = Object.create(StationPlateOneLineEp5c.prototype);
StationPlateTwoLinesEp5c.prototype.constructor = StationPlateTwoLinesEp5c;

StationPlateTwoLinesEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize + 2 * this.rimWidth;
        this.fontSize = this.baseSize * 0.4633;
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

StationPlateTwoLinesEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.font(this.font[0]).fontSize(this.fontSize);
    for (var i = 0; i < this.name.length; i++) {
        doc.fill(this.fontColor).text(
            this.name[i],
            (this.width - doc.widthOfString(this.name[i], this.additionalStyles)) * 0.5,
            this.rimWidth + this.baseSize * (0.0755 + 0.4299 * i),
            this.additionalStyles);
    }
};

/**
 * Station sign with tow rows for the name allowing for bilingual station names, (PKP, ep. Vc).
 * @constructor
 */
StationPlateBilingualEp5c = function(scale, amount, data) {
    StationPlateTwoLinesEp5c.call(this, scale, amount, data);
    this.additionalStyles = {characterSpacing: 41 / this.scale * (data.isSmall ? 0.4286 : 1), lineBreak: false};
};
StationPlateBilingualEp5c.prototype = Object.create(StationPlateTwoLinesEp5c.prototype);
StationPlateBilingualEp5c.prototype.constructor = StationPlateBilingualEp5c;

StationPlateBilingualEp5c.prototype.getDimensions = function(doc) {
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

StationPlateBilingualEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.rect(
        (this.width - this.nameWidth) * 0.5,
        this.rimWidth + this.baseSize * 0.4857,
        this.nameWidth,
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
 * Station sign with two rows for the name and additional station icon, (PKP, ep. Vc).
 * @constructor
 */
StationPlateTwoLinesWithIcoEp5c = function(scale, amount, data) {
    StationPlateOneLineWithIcoEp5c.call(this, scale, amount, data);
    this.additionalStyles = {characterSpacing: 35 / this.scale * (data.isSmall ? 0.4286 : 1), lineBreak: false};
    this.obverseAdditionalStyles = {characterSpacing: 45 / this.scale * (data.isSmall ? 0.4286 : 1), lineBreak: false};
    this.nameWidth = 0;
};
StationPlateTwoLinesWithIcoEp5c.prototype = Object.create(StationPlateOneLineWithIcoEp5c.prototype);
StationPlateTwoLinesWithIcoEp5c.prototype.constructor = StationPlateTwoLinesWithIcoEp5c;

StationPlateTwoLinesWithIcoEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize + 2 * this.rimWidth;
        this.fontSize = this.baseSize * 0.3628;
        var stringWidth = 0;
        // for width calculation we use the bigger font placed on the obverse
        doc.font(this.font[0]).fontSize(this.baseSize * 0.4633);
        for (var i = 0; i < this.name.length; i++) {
            stringWidth = doc.widthOfString(this.name[i], this.obverseAdditionalStyles);
            if (stringWidth > this.nameWidth)
                this.nameWidth = stringWidth;
        }
        this.width = this.baseSize * 0.6572 + this.nameWidth +  2 * this.rimWidth;
        // recalculate the max width of sign
        this.nameWidth *= 0.7829;
    }
    return [this.width, this.height];
};

StationPlateTwoLinesWithIcoEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.font(this.font[0]).fontSize(this.fontSize);
    var margin = (this.width - 0.6842 * this.baseSize - this.nameWidth) * 0.5;
    this.drawStationIco(doc, [margin, this.rimWidth + this.baseSize * 0.2368], this.baseSize * 0.5263);
    for (var i = 0; i < this.name.length; i++) {
        doc.fill(this.fontColor).text(
        this.name[i],
        margin + 0.6842 * this.baseSize + (this.nameWidth - doc.widthOfString(this.name[i], this.additionalStyles)) / 2,
        this.rimWidth + this.baseSize * ( 0.1315 + 0.4196 * i),
        this.additionalStyles);
    }
};

/**
 * Platform marking sign for narrow or very wide platforms, (PKP, ep. Vc).
 * @constructor
 */
PlatformPlateNarrowEp5c = function(scale, amount, data) {
    GenericPlateEp5c.call(this, scale, amount);
    this.font = ["myriad_pro_semibold.otf", "myriad_pro_italic.otf"];
    this.baseSize = data.size / this.scale;
    this.numbers = [data.numbers.platform, data.numbers.track, data.numbers.sector];
    this.strings = [data.strings.platform, data.strings.track, data.strings.sector];
    this.stringsTrans = [data.stringsTranslated.platform, data.stringsTranslated.track, data.stringsTranslated.sector];
    for (var i = 0; i < this.numbers.length; i++) {
        if (this.numbers[i] === undefined || this.numbers[i] === '') {
            this.numbers.splice(i,1);
            this.strings.splice(i,1);
            this.stringsTrans.splice(i,1);
            i--;
        }
    }
    this.isLeft = data.isLeft;
    // font sizes: 0 - number, 1 - main text, 2 - translated text
    this.fontSizes = [[1.515 * this.baseSize, 0.793 * this.baseSize, 0.344 * this.baseSize], // main text, e.g. platform number
                      [1.253 * this.baseSize, 0.645 * this.baseSize, 0.285 * this.baseSize]]; // secondary text e.g. track number
    this.additionalStyles = {lineBreak: false};
};
PlatformPlateNarrowEp5c.prototype = Object.create(GenericPlateEp5c.prototype);
PlatformPlateNarrowEp5c.prototype.constructor = PlatformPlateNarrowEp5c;

PlatformPlateNarrowEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.numbersWidth = 0;
        this.textsWidth = 0;
        var tmpWidth = 0;
        var fontSizes = this.fontSizes[0];
        for (var i = 0; i < this.numbers.length; i++) {
            doc.font(this.font[0]).fontSize(fontSizes[0]);
            tmpWidth = doc.widthOfString(this.numbers[i], this.additionalStyles);
            if (tmpWidth > this.numbersWidth)
                this.numbersWidth = tmpWidth;
            doc.font(this.font[0]).fontSize(fontSizes[1]);
            tmpWidth = doc.widthOfString(this.strings[i], this.additionalStyles);
            if (tmpWidth > this.textsWidth)
                this.textsWidth = tmpWidth;
            doc.font(this.font[1]).fontSize(fontSizes[2]);
            tmpWidth = doc.widthOfString(this.stringsTrans[i], this.additionalStyles);
            if (tmpWidth > this.textsWidth)
                this.textsWidth = tmpWidth;
            if (i === 0)
                fontSizes = this.fontSizes[1];
        }
        this.width = 2.0 * this.baseSize + this.numbersWidth + this.textsWidth +  2 * this.rimWidth;
        this.height = (1.9 * this.baseSize + 2 * this.rimWidth) + (1.43 * this.baseSize * (this.numbers.length - 1));
    }
    return [this.width, this.height];
};

PlatformPlateNarrowEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.rect(
        (this.isLeft ? (0.685 * this.baseSize + this.numbersWidth) : (1.285 * this.baseSize + this.textsWidth)) + this.rimWidth,
        0.6 * this.baseSize + this.rimWidth,
        0.03 * this.baseSize,
        4.16 * this.baseSize).fill(this.fontColor);
    var fontSizes =  this.fontSizes[0];
    var numberYPos = 0.46 * this.baseSize + this.rimWidth;
    var textYPos = 0.5 * this.baseSize + this.rimWidth;
    var transTextYPos = 1.26 * this.baseSize + this.rimWidth;
    var leftMargin = (this.isLeft ? (0.4 * this.baseSize + this.numbersWidth) : (this.baseSize + this.textsWidth)) + this.rimWidth;
    var rightMargin = (this.isLeft ? (1.0 * this.baseSize + this.numbersWidth) : (1.6 * this.baseSize + this.textsWidth)) + this.rimWidth;
    for (var i = 0; i < this.numbers.length; i++){
        doc.font(this.font[0]).fontSize(fontSizes[0]);
        doc.text(this.numbers[i],
            (this.isLeft ? (leftMargin - doc.widthOfString(this.numbers[i], this.additionalStyles)) : rightMargin),
            numberYPos, this.additionalStyles);
        doc.fontSize(fontSizes[1]);
        doc.text(this.strings[i],
            (this.isLeft ? rightMargin : (leftMargin - doc.widthOfString(this.strings[i], this.additionalStyles))),
            textYPos, this.additionalStyles);
        doc.font(this.font[1]).fontSize(fontSizes[2]);
        doc.text(this.stringsTrans[i],
            (this.isLeft ? rightMargin : (leftMargin - doc.widthOfString(this.stringsTrans[i], this.additionalStyles))),
            transTextYPos, this.additionalStyles);
        if (i === 0) {
            fontSizes = this.fontSizes[1];
            numberYPos += 1.63 * this.baseSize;
            textYPos += 1.61 * this.baseSize;
            transTextYPos += 1.46 * this.baseSize;
        }
        else {
            numberYPos += 1.43 * this.baseSize;
            textYPos += 1.43 * this.baseSize;
            transTextYPos += 1.43 * this.baseSize;
        }
    }
};

/**
 * Banner-type platform marking sign, (PKP, ep. Vc).
 * @constructor
 */
PlatformPlateWideEp5c = function(scale, amount, data) {
    GenericPlateEp5c.call(this, scale, amount);
    this.font = ["myriad_pro_semibold.otf", "myriad_pro_italic.otf"];
    this.baseSize = data.size / this.scale;
    this.numbers = [data.numbers.platform, data.numbers.leftTrack, data.numbers.rightTrack, data.numbers.sector];
    this.strings = [data.strings.platform, data.strings.track, data.strings.sector];
    this.stringsTrans = [data.stringsTranslated.platform, data.stringsTranslated.track, data.stringsTranslated.sector];
    this.platformWidth = data.platformWidth / this.scale;
    this.isLeft = data.isLeft;
    // font sizes: 0 - number, 1 - main text, 2 - translated text
    this.fontSizes = [[1.845 * this.baseSize, 0.966 * this.baseSize, 0.4 * this.baseSize],    // platform number
                      [1.515 * this.baseSize, 0.793 * this.baseSize, 0.344 * this.baseSize],    // track number
                      [0.89 * this.baseSize, 0.466 * this.baseSize, 0.202 * this.baseSize]];    // sector letter
    this.additionalStyles = {lineBreak: false};
};
PlatformPlateWideEp5c.prototype = Object.create(GenericPlateEp5c.prototype);
PlatformPlateWideEp5c.prototype.constructor = PlatformPlateWideEp5c;

PlatformPlateWideEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.stringsWidths = new Array(this.strings.length);
        var tmpWidth;
        for (var i = 0; i < this.strings.length; i++) {
            doc.font(this.font[0]).fontSize(this.fontSizes[i][1]);
            this.stringsWidths[i] = doc.widthOfString(this.strings[i], this.additionalStyles);
            doc.font(this.font[1]).fontSize(this.fontSizes[i][2]);
            tmpWidth = doc.widthOfString(this.stringsTrans[i], this.additionalStyles);
            if (tmpWidth > this.stringsWidths[i])
                this.stringsWidths[i] = tmpWidth;
        }
        this.width = this.platformWidth + 2 * this.rimWidth;
        this.height = 1.9 * this.baseSize + 2 * this.rimWidth;
        if (this.numbers[3])
            this.height += 1.2 * this.baseSize;
    }
    return [this.width, this.height];
};

PlatformPlateWideEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    var numberWidth;
    var numberMargin;
    if (this.numbers[0]) {
        doc.font(this.font[0]).fontSize(this.fontSizes[0][0]);
        numberWidth = doc.widthOfString(this.numbers[0], this.additionalStyles);
        doc.fill(this.fontColor).text(this.numbers[0],
            (this.width + this.stringsWidths[0] + 0.3 * this.baseSize - numberWidth) * 0.5,
            this.rimWidth + 0.215 * this.baseSize, this.additionalStyles);
        doc.fontSize(this.fontSizes[0][1]);
        doc.text(this.strings[0],
            (this.width + this.stringsWidths[0] - 0.3 * this.baseSize - numberWidth) * 0.5 - doc.widthOfString(this.strings[0], this.additionalStyles),
            this.rimWidth + 0.27 * this.baseSize, this.additionalStyles);
        doc.font(this.font[1]).fontSize(this.fontSizes[0][2]);
        doc.text(this.stringsTrans[0],
            (this.width + this.stringsWidths[0] - 0.3 * this.baseSize - numberWidth) * 0.5 - doc.widthOfString(this.stringsTrans[0], this.additionalStyles),
            this.rimWidth + 1.22 * this.baseSize, this.additionalStyles);
    }
    if (this.numbers[1]) {
        doc.font(this.font[0]).fontSize(this.fontSizes[1][0]);
        numberWidth = doc.widthOfString(this.numbers[1], this.additionalStyles);
        numberMargin = (numberWidth > this.baseSize ? 0 : this.baseSize - numberWidth);
        doc.rect(
            0.685 * this.baseSize + this.rimWidth + numberMargin + numberWidth,
            0.6 * this.baseSize + this.rimWidth,
            0.03 * this.baseSize,
            1.3 * this.baseSize).fill(this.fontColor);
        doc.text(this.numbers[1],
            0.4 * this.baseSize + this.rimWidth + numberMargin,
            0.46 * this.baseSize + this.rimWidth, this.additionalStyles);
        doc.fontSize(this.fontSizes[1][1]);
        doc.text(this.strings[1],
            this.baseSize + this.rimWidth + numberMargin + numberWidth,
            0.49 * this.baseSize + this.rimWidth, this.additionalStyles);
        doc.font(this.font[1]).fontSize(this.fontSizes[1][2]);
        doc.text(this.stringsTrans[1],
            this.baseSize + this.rimWidth + numberMargin + numberWidth,
            1.26 * this.baseSize + this.rimWidth, this.additionalStyles);
    }
    if (this.numbers[2]) {
        doc.font(this.font[0]).fontSize(this.fontSizes[1][0]);
        numberWidth = doc.widthOfString(this.numbers[2], this.additionalStyles);
        numberMargin = (numberWidth > this.baseSize ? 0 : this.baseSize - numberWidth);
        doc.rect(
            this.width - (0.685 * this.baseSize + this.rimWidth + numberMargin + numberWidth),
            0.6 * this.baseSize + this.rimWidth,
            0.03 * this.baseSize,
            1.3 * this.baseSize).fill(this.fontColor);
        doc.text(this.numbers[2],
            this.width - (0.4 * this.baseSize + this.rimWidth + numberMargin + numberWidth),
            0.46 * this.baseSize + this.rimWidth, this.additionalStyles);
        doc.fontSize(this.fontSizes[1][1]);
        doc.text(this.strings[1],
            this.width - (this.baseSize + this.rimWidth + numberMargin + numberWidth + doc.widthOfString(this.strings[1], this.additionalStyles)),
            0.49 * this.baseSize + this.rimWidth, this.additionalStyles);
        doc.font(this.font[1]).fontSize(this.fontSizes[1][2]);
        doc.text(this.stringsTrans[1],
            this.width - (this.baseSize + this.rimWidth + numberMargin + numberWidth + doc.widthOfString(this.stringsTrans[1], this.additionalStyles)),
            1.26 * this.baseSize + this.rimWidth, this.additionalStyles);
    }
    if (this.numbers[3]) {
        doc.font(this.font[0]).fontSize(this.fontSizes[2][0]);
        numberWidth = doc.widthOfString(this.numbers[3], this.additionalStyles);
        doc.rect(this.rimWidth, this.rimWidth + 1.885 * this.baseSize, this.width - 2 * this.rimWidth, 0.03 * this.baseSize).fill(this.fontColor);
        doc.text(this.numbers[3],
            (this.width + this.stringsWidths[2] + 0.2 * this.baseSize - numberWidth) * 0.5,
            2.135 * this.baseSize + this.rimWidth, this.additionalStyles);
        doc.fontSize(this.fontSizes[2][1]);
        doc.text(this.strings[2],
            (this.width + this.stringsWidths[2] - 0.2 * this.baseSize - numberWidth) * 0.5 - doc.widthOfString(this.strings[2], this.additionalStyles),
            2.136 * this.baseSize + this.rimWidth, this.additionalStyles);
        doc.font(this.font[1]).fontSize(this.fontSizes[2][2]);
        doc.text(this.stringsTrans[2],
            (this.width + this.stringsWidths[2] - 0.2 * this.baseSize - numberWidth) * 0.5 - doc.widthOfString(this.stringsTrans[2], this.additionalStyles),
            2.608 * this.baseSize + this.rimWidth, this.additionalStyles);
    }
};

/**
 * Platform direction sign, (PKP, ep. Vc).
 * @constructor
 */
DirectionPlateEp5c = function(scale, amount, data) {
    GenericPlateEp5c.call(this, scale, amount);
    this.font = ["myriad_pro_semibold.otf", "myriad_pro_italic.otf"];
    this.baseSize = data.size / this.scale;
    this.dirString = data.strings.direction;
    this.dirStringTrans = data.stringsTranslated.direction;
    this.leftStrings = data.directionLeft;
    this.rightStrings = data.directionRight;
    this.fontSizes = [0.75 * this.baseSize, 0.56 * this.baseSize, 0.275 * this.baseSize];
    this.additionalStyles = {lineBreak: false};
};
DirectionPlateEp5c.prototype = Object.create(GenericPlateEp5c.prototype);
DirectionPlateEp5c.prototype.constructor = DirectionPlateEp5c;

DirectionPlateEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.width = 2 * this.rimWidth;
        this.dirSectionHeight = 1.6 * this.baseSize;
        this.leftStringWidth = 0;
        this.rightStringWidth = 0;
        this.hasTwoLines = false;
        var tmpWidth = 0;
        doc.font(this.font[0]).fontSize(this.fontSizes[0]);
        if (this.leftStrings instanceof Array) {
            for (var i = 0; i < this.leftStrings.length; i++)
            {
                tmpWidth = doc.widthOfString(this.leftStrings[i], this.additionalStyles);
                if (tmpWidth > this.leftStringWidth)
                    this.leftStringWidth = tmpWidth;
            }
            this.leftStringWidth += 2.7 * this.baseSize;
            if (this.leftStrings.length > 1) {
                this.hasTwoLines = true;
                this.dirSectionHeight = 1.9 * this.baseSize;
            }
        }
        if (this.rightStrings instanceof Array) {
            for (var i = 0; i < this.rightStrings.length; i++)
            {
                tmpWidth = doc.widthOfString(this.rightStrings[i], this.additionalStyles);
                if (tmpWidth > this.rightStringWidth)
                    this.rightStringWidth = tmpWidth;
            }
            this.rightStringWidth += 2.7 * this.baseSize;
            if (this.rightStrings.length > 1) {
                this.hasTwoLines = true;
                this.dirSectionHeight = 1.9 * this.baseSize;
            }
        }
        this.width += this.leftStringWidth + this.rightStringWidth;
        this.height = 1.7 * this.baseSize + 2 * this.rimWidth + this.dirSectionHeight;
    }
    return [this.width, this.height];
};

DirectionPlateEp5c.prototype.drawArrow = function(doc, size, pos, rotation, color) {
    doc.save();
    doc.translate(pos[0],pos[1]);
    doc.scale(size / 100);
    doc.rotate(rotation);
    doc.polygon([-7.366,43.499], [7.195,43.499], [7.195,-16.06], [29.913,6.261], [29.913,-13.891], [-0.003,-43.499], [-29.913,-13.891], [-29.913,6.268], [-7.366,-15.977]).fill(color);
    doc.restore();
};

DirectionPlateEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.rect(
        this.rimWidth,
        1.7 * this.baseSize + this.rimWidth,
        this.width - 2 * this.rimWidth,
        this.dirSectionHeight).lineWidth(this.borderWidth).fillAndStroke(this.fontColor, this.fillColor);
    doc.font(this.font[0]).fontSize(this.fontSizes[1]).fill(this.fontColor);
    doc.text(this.dirString,
            (this.width - doc.widthOfString(this.dirString, this.additionalStyles)) * 0.5,
            this.rimWidth + 0.575 * this.baseSize,
            this.additionalStyles);
    doc.font(this.font[1]).fontSize(this.fontSizes[2]);
    doc.text(this.dirStringTrans,
            (this.width - doc.widthOfString(this.dirStringTrans, this.additionalStyles)) * 0.5,
            this.rimWidth + 1.19 * this.baseSize,
            this.additionalStyles);
    doc.font(this.font[0]).fontSize(this.fontSizes[0]).fill(this.fillColor);
    var stringTop = this.rimWidth + 2 * this.baseSize;
    if (this.leftStrings instanceof Array) {
        this.drawArrow(doc, this.baseSize, [this.rimWidth + 0.9 * this.baseSize, this.rimWidth + 1.7 * this.baseSize + 0.5 * this.dirSectionHeight], -90, this.fillColor);
        stringTop = this.rimWidth + 1.64 * this.baseSize + (this.dirSectionHeight - 0.5 * this.leftStrings.length * this.baseSize) / (this.leftStrings.length + 1);
        for (var i = 0; i < this.leftStrings.length; i++)
        {
            doc.text(this.leftStrings[i],
            this.rimWidth + 1.7 * this.baseSize,
            stringTop,
            this.additionalStyles);
            stringTop += 0.8 * this.baseSize;
        }
    }
    dirStringTop = 0.3 * this.baseSize;
    if (this.rightStrings instanceof Array) {
        this.drawArrow(doc, this.baseSize, [this.width - (this.rimWidth + 0.9 * this.baseSize), this.rimWidth + 1.7 * this.baseSize + 0.5 * this.dirSectionHeight], 90, this.backgroundColor);
        stringTop = this.rimWidth + 1.64 * this.baseSize + (this.dirSectionHeight - 0.5 * this.rightStrings.length * this.baseSize) / (this.rightStrings.length + 1);
        for (var i = 0; i < this.rightStrings.length; i++)
        {
            doc.text(this.rightStrings[i],
            this.width - 1.7 * this.baseSize - this.rimWidth - doc.widthOfString(this.rightStrings[i], this.additionalStyles),
            stringTop,
            this.additionalStyles);
            stringTop += 0.8 * this.baseSize;
        }
    }
};

/**
 * Station and platform signs based on UIC directives, PKP, ep. Vc.
 * @constructor
 */
StationSignsPKPEp5c = function() {
    this.name = {"pl":"Oznakowanie stacji kolejowych, epoka Vc",
                 "en":"Railway station signs, epoch Vc",
                 "de":"-----"};
    this.strings = {platform: "peron", track: "tor", sector: "sektor", direction: "kierunek"};
    //this.strings = {platform: "Bahnsteig", track: "Gleis", sector: "Sektor", direction: "Richtung"};
    this.stringsTranslated = {platform: "platform", track: "track", sector: "sector", direction: "direction"};
    this.basePlatformSignSize = 565.263;
};
StationSignsPKPEp5c.prototype = Object.create(Model.prototype);
StationSignsPKPEp5c.prototype.constructor = StationSignsPKPEp5c;

StationSignsPKPEp5c.prototype.addStationPlates = function(nameLines, numberOfNameSigns, numberOfAdditionalNameSigns, hasExternal, isBilingual, hasSmallPlates) {
    if (nameLines.length > 1) {
        if (isBilingual) {
            this.parts.push(new StationPlateBilingualEp5c(this.scale, numberOfNameSigns, {name: nameLines, isSmall: hasSmallPlates}));
            return;
        }
        this.parts.push(new StationPlateTwoLinesEp5c(this.scale, numberOfNameSigns, {name: nameLines, isSmall: hasSmallPlates}));
        if (hasExternal) {
            this.parts.push(new StationPlateTwoLinesWithIcoEp5c(this.scale, numberOfAdditionalNameSigns, {name: nameLines, isSmall: hasSmallPlates}));
        }
    }
    else {
        this.parts.push(new StationPlateOneLineEp5c(this.scale, numberOfNameSigns, {name: nameLines[0], isSmall: hasSmallPlates}));
        if (hasExternal) {
            this.parts.push(new StationPlateOneLineWithIcoEp5c(this.scale, numberOfAdditionalNameSigns, {name: nameLines[0], isSmall: hasSmallPlates}));
        }
    }
};

StationSignsPKPEp5c.prototype.addPlatformPlates = function(amount, platformData, sector) {
    if (platformData.leftTrack && platformData.rightTrack && platformData.width >= 3 && platformData.width <= 7) {
        this.parts.push(new PlatformPlateWideEp5c(this.scale, amount, {
            size: this.basePlatformSignSize,
            numbers: {platform: platformData.number.toString(), leftTrack: platformData.leftTrack.toString(), rightTrack: platformData.rightTrack.toString(), sector: sector},
            strings: this.strings,
            stringsTranslated: this.stringsTranslated,
            platformWidth: platformData.width * 2834.646}));
        this.parts.push(new PlatformPlateWideEp5c(this.scale, amount, {
            size: this.basePlatformSignSize,
            numbers: {platform: platformData.number.toString(), leftTrack: platformData.rightTrack.toString(), rightTrack: platformData.leftTrack.toString(), sector: sector},
            strings: this.strings,
            stringsTranslated: this.stringsTranslated,
            platformWidth: platformData.width * 2834.646}));
        return;
    }
    if (platformData.leftTrack) {
        this.parts.push(new PlatformPlateNarrowEp5c(this.scale, amount, {
            size: this.basePlatformSignSize,
            numbers: {platform: platformData.number.toString(), track: platformData.leftTrack.toString(), sector: sector},
            strings: this.strings,
            stringsTranslated: this.stringsTranslated}));
        this.parts.push(new PlatformPlateNarrowEp5c(this.scale, amount, {
            size: this.basePlatformSignSize,
            numbers: {platform: platformData.number.toString(), track: platformData.leftTrack.toString(), sector: sector},
            strings: this.strings,
            stringsTranslated: this.stringsTranslated,
            isLeft: true}));
        if (!platformData.rightTrack) {
            return;
        }
    }
    if (platformData.rightTrack) {
        this.parts.push(new PlatformPlateNarrowEp5c(this.scale, amount, {
            size: this.basePlatformSignSize,
            numbers: {platform: platformData.number.toString(), track: platformData.rightTrack.toString(), sector: sector},
            strings: this.strings,
            stringsTranslated: this.stringsTranslated}));
        this.parts.push(new PlatformPlateNarrowEp5c(this.scale, amount, {
            size: this.basePlatformSignSize,
            numbers: {platform: platformData.number.toString(), track: platformData.rightTrack.toString(), sector: sector},
            strings: this.strings,
            stringsTranslated: this.stringsTranslated,
            isLeft: true}));
        return;
    }
    if (platformData.number || sector) {
        this.parts.push(new PlatformPlateNarrowEp5c(this.scale, amount, {
            size: this.basePlatformSignSize,
            numbers: {platform: platformData.number.toString(), sector: sector},
            strings: this.strings,
            stringsTranslated: this.stringsTranslated}));
        this.parts.push(new PlatformPlateNarrowEp5c(this.scale, amount, {
            size: this.basePlatformSignSize,
            numbers: {platform: platformData.number.toString(), sector: sector},
            strings: this.strings,
            stringsTranslated: this.stringsTranslated,
            isLeft: true}));
    }
};

StationSignsPKPEp5c.prototype.addDirectionPlates = function(amount, platformData) {
    if (platformData.directionLeft || platformData.directionRight) {
        var dirLeftArray = (platformData.directionLeft ? platformData.directionLeft.split('\n') : undefined);
        var dirRightArray = (platformData.directionRight ? platformData.directionRight.split('\n') : undefined);
        this.parts.push(new DirectionPlateEp5c(this.scale, amount,
            {size: this.basePlatformSignSize,
            directionLeft: dirLeftArray,
            directionRight: dirRightArray,
            strings: this.strings,
            stringsTranslated: this.stringsTranslated}));
        this.parts.push(new DirectionPlateEp5c(this.scale, amount,
            {size: this.basePlatformSignSize,
            directionLeft: dirRightArray,
            directionRight: dirLeftArray,
            strings: this.strings,
            stringsTranslated: this.stringsTranslated}));
    }
};

StationSignsPKPEp5c.prototype.init = function(scale, data) {
    Model.prototype.init.call(this, scale, data);
    var numberOfNameSigns = 0;
    var numberOfAdditionalNameSigns = 0;
    for (var i=0; i < data.platforms.length; i++) {
        var numberOfPlatformPosts = Math.floor(data.platforms[i].length / 100) + 1;
        if (data.platforms[i].hasSectors && data.platforms[i].length >= 300) {
            for (var j = 0; j < Math.floor(data.platforms[i].length / 75); j++) {
                this.addPlatformPlates(1, data.platforms[i], String.fromCharCode(65 + j));
            }
        }
        else {
            this.addPlatformPlates(numberOfPlatformPosts, data.platforms[i]);
        }
        this.addDirectionPlates(1, data.platforms[i]);
        numberOfNameSigns += 2 * numberOfPlatformPosts;
        if (i === 0 || i == (data.platforms.length - 1)) {
            numberOfAdditionalNameSigns += numberOfPlatformPosts;
        }
    }
    var nameLines = data.name.split('\n');
    this.addStationPlates(nameLines, numberOfNameSigns, numberOfAdditionalNameSigns, data.hasExternal, data.isBilingual, false);
    if (data.hasSmallPlates) {
        this.addStationPlates(nameLines, numberOfNameSigns, numberOfAdditionalNameSigns, data.hasExternal, data.isBilingual, true);
    }
};
