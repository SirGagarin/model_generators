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
    if (data.isSmall === true) {
        this.scale = this.scale * 7/3;
    }
    this.name = data.name;
    this.fontSize = 1193.11 / this.scale;
    this.additionalStyles = {characterSpacing: 62 / this.scale, lineBreak: false};
};
StationPlateOneLineEp5c.prototype = Object.create(GenericPlateEp5c.prototype);
StationPlateOneLineEp5c.prototype.constructor = StationPlateOneLineEp5c;

StationPlateOneLineEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        doc.font(this.font[0]).fontSize(this.fontSize);
        this.width = 1587.402 / this.scale + doc.widthOfString(this.name, this.additionalStyles) +  2 * this.rimWidth;
        this.height = 1984.252 / this.scale + 2 * this.rimWidth;
    }
    return [this.width, this.height];
};

StationPlateOneLineEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.font(this.font[0]).fontSize(this.fontSize);
    doc.fill(this.fontColor).text(
        this.name,
        749.09 / this.scale + this.rimWidth,
        490.994 / this.scale + this.rimWidth,
        this.additionalStyles);
};

/**
 * Station sign with single row for the name and additional station icon, (PKP, ep. Vc).
 * @constructor
 */
StationPlateOneLineWithIcoEp5c = function(scale, amount, data) {
    StationPlateOneLineEp5c.call(this, scale, amount, data);
    this.fontSize = 759.4034 / this.scale;
    this.additionalStyles = {characterSpacing: 37 / this.scale, lineBreak: false};
};
StationPlateOneLineWithIcoEp5c.prototype = Object.create(StationPlateOneLineEp5c.prototype);
StationPlateOneLineWithIcoEp5c.prototype.constructor = StationPlateOneLineWithIcoEp5c;

StationPlateOneLineEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        // for width calculation we use the bigger font placed on the obverse
        doc.font(this.font[0]).fontSize(1193.11 / this.scale);
        this.width = 1587.402 / this.scale + doc.widthOfString(this.name, {characterSpacing: 62 / this.scale, lineBreak: false}) +  2 * this.rimWidth;
        this.height = 1984.252 / this.scale + 2 * this.rimWidth;
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
    var margin = (this.width - 1357.646 / this.scale - doc.widthOfString(this.name, this.additionalStyles)) / 2;
    this.drawStationIco(doc, [margin, this.rimWidth + 469.954 / this.scale], 1044.343 / this.scale);
    doc.fill(this.fontColor).text(
        this.name,
        1357.646 / this.scale + margin,
        674.976 / this.scale + this.rimWidth,
        this.additionalStyles);
};

/**
 * Station sign with two rows for the name (PKP, ep. Vc).
 * @constructor
 */
StationPlateTwoLinesEp5c = function(scale, amount, data) {
    StationPlateOneLineEp5c.call(this, scale, amount, data);
    this.fontSize = 919.3613 / this.scale;
    this.additionalStyles = {characterSpacing: 45 / this.scale, lineBreak: false};
    this.nameWidth = 0;
};
StationPlateTwoLinesEp5c.prototype = Object.create(StationPlateOneLineEp5c.prototype);
StationPlateTwoLinesEp5c.prototype.constructor = StationPlateTwoLinesEp5c;

StationPlateTwoLinesEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        var stringWidth = 0;
        doc.font(this.font[0]).fontSize(this.fontSize);
        for (var i = 0; i < this.name.length; i++) {
            stringWidth = doc.widthOfString(this.name[i], this.additionalStyles);
            if (stringWidth > this.nameWidth)
                this.nameWidth = stringWidth;
        }
        this.width = 1303.94 / this.scale + this.nameWidth +  2 * this.rimWidth;
        this.height = 1984.252 / this.scale + 2 * this.rimWidth;
    }
    return [this.width, this.height];
};

StationPlateTwoLinesEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.font(this.font[0]).fontSize(this.fontSize);
    doc.fill(this.fontColor).text(
        this.name[0],
        (this.width - doc.widthOfString(this.name[0], this.additionalStyles)) / 2,
        this.rimWidth + (149.803 / this.scale),
        this.additionalStyles);
    doc.text(
        this.name[1],
        (this.width - doc.widthOfString(this.name[1], this.additionalStyles)) / 2,
        this.rimWidth + (1002.838 / this.scale),
        this.additionalStyles);
};

/**
 * Station sign with tow rows for the name allowing for bilingual station names, (PKP, ep. Vc).
 * @constructor
 */
StationPlateBilingualEp5c = function(scale, amount, data) {
    StationPlateTwoLinesEp5c.call(this, scale, amount, data);
    this.fontSize = 835.9774 / this.scale;
    this.additionalStyles = {characterSpacing: 41 / this.scale, lineBreak: false};
    this.nameWidth = 0;
};
StationPlateBilingualEp5c.prototype = Object.create(StationPlateTwoLinesEp5c.prototype);
StationPlateBilingualEp5c.prototype.constructor = StationPlateBilingualEp5c;
StationPlateBilingualEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.font(this.font[0]).fontSize(this.fontSize);
    doc.rect(
        (this.width - this.nameWidth) / 2,
        this.rimWidth + 958.801 / this.scale,
        this.nameWidth,
        54.995 / this.scale
        ).fill(this.fontColor);
    doc.fill(this.fontColor).text(
        this.name[0],
        (this.width - doc.widthOfString(this.name[0], this.additionalStyles)) / 2,
        this.rimWidth + 129.803 / this.scale,
        this.additionalStyles);
    doc.text(
        this.name[1],
        (this.width - doc.widthOfString(this.name[1], this.additionalStyles)) / 2,
        this.rimWidth + 1138.324 / this.scale,
        this.additionalStyles);
};

/**
 * Station sign with two rows for the name and additional station icon, (PKP, ep. Vc).
 * @constructor
 */
StationPlateTwoLinesWithIcoEp5c = function(scale, amount, data) {
    StationPlateOneLineWithIcoEp5c.call(this, scale, amount, data);
    this.fontSize = 719.78 / this.scale;
    this.additionalStyles = {characterSpacing: 35 / this.scale, lineBreak: false};
    this.nameWidth = 0;
};
StationPlateTwoLinesWithIcoEp5c.prototype = Object.create(StationPlateOneLineWithIcoEp5c.prototype);
StationPlateTwoLinesWithIcoEp5c.prototype.constructor = StationPlateTwoLinesWithIcoEp5c;

StationPlateTwoLinesWithIcoEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        var stringWidth = 0;
        // for width calculation we use the bigger font placed on the obverse
        doc.font(this.font[0]).fontSize(919.3613 / this.scale);
        for (var i = 0; i < this.name.length; i++) {
            stringWidth = doc.widthOfString(this.name[i], {characterSpacing: 45 / this.scale, lineBreak: false});
            if (stringWidth > this.nameWidth)
                this.nameWidth = stringWidth;
        }
        this.width = 1303.94 / this.scale + this.nameWidth +  2 * this.rimWidth;
        this.height = 1984.252 / this.scale + 2 * this.rimWidth;
        // recalculate the max width of sign
        this.nameWidth *= 0.7829;
    }
    return [this.width, this.height];
};

StationPlateTwoLinesWithIcoEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.font(this.font[0]).fontSize(this.fontSize);
    var margin = (this.width - 1357.646 / this.scale - this.nameWidth) / 2;
    this.drawStationIco(doc, [margin, this.rimWidth + 469.954 / this.scale], 1044.343 / this.scale);
    doc.fill(this.fontColor).text(
        this.name[0],
        margin + 1357.646 / this.scale + (this.nameWidth - doc.widthOfString(this.name[0], this.additionalStyles)) / 2,
        this.rimWidth + (260.842 / this.scale),
        this.additionalStyles);
    doc.text(
        this.name[1],
        margin + 1357.646 / this.scale + (this.nameWidth - doc.widthOfString(this.name[1], this.additionalStyles)) / 2,
        this.rimWidth + (1093.141 / this.scale),
        this.additionalStyles);
};

/**
 * Platform marking sign for narrow or very wide platforms, (PKP, ep. Vc).
 * @constructor
 */
PlatformPlateNarrowEp5c = function(scale, amount, data) {
    GenericPlateEp5c.call(this, scale, amount);
    this.font = ["myriad_pro_semibold.otf", "myriad_pro_italic.otf"];
    if (data.isSmall === true) {
        this.scale = this.scale * 7/3;
    }
    this.baseDim = data.size / this.scale;
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
    this.fontSizes = [[1.515 * this.baseDim, 0.793 * this.baseDim, 0.344 * this.baseDim], // main text, e.g. platform number
                      [1.253 * this.baseDim, 0.645 * this.baseDim, 0.285 * this.baseDim]]; // secondary text e.g. track number
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
        this.width = 2.0 * this.baseDim + this.numbersWidth + this.textsWidth +  2 * this.rimWidth;
        this.height = (1.9 * this.baseDim + 2 * this.rimWidth) + (1.43 * this.baseDim * (this.numbers.length - 1));
    }
    return [this.width, this.height];
};

PlatformPlateNarrowEp5c.prototype.draw = function(doc) {
    this.drawBackground(doc);
    doc.rect(
        (this.isLeft ? (0.685 * this.baseDim + this.numbersWidth) : (1.285 * this.baseDim + this.textsWidth)) + this.rimWidth,
        0.6 * this.baseDim + this.rimWidth,
        0.03 * this.baseDim,
        4.16 * this.baseDim).fill(this.fontColor);
    var fontSizes =  this.fontSizes[0];
    var numberYPos = 0.46 * this.baseDim + this.rimWidth;
    var textYPos = 0.5 * this.baseDim + this.rimWidth;
    var transTextYPos = 1.26 * this.baseDim + this.rimWidth;
    var leftMargin = (this.isLeft ? (0.4 * this.baseDim + this.numbersWidth) : (this.baseDim + this.textsWidth)) + this.rimWidth;
    var rightMargin = (this.isLeft ? (1.0 * this.baseDim + this.numbersWidth) : (1.6 * this.baseDim + this.textsWidth)) + this.rimWidth;
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
            numberYPos += 1.63 * this.baseDim;
            textYPos += 1.61 * this.baseDim;
            transTextYPos += 1.46 * this.baseDim;
        }
        else {
            numberYPos += 1.43 * this.baseDim;
            textYPos += 1.43 * this.baseDim;
            transTextYPos += 1.43 * this.baseDim;
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
    if (data.isSmall === true) {
        this.scale = this.scale * 7/3;
    }
    this.baseDim = data.size / this.scale;
    this.numbers = [data.numbers.platform, data.numbers.leftTrack, data.numbers.rightTrack, data.numbers.sector];
    this.strings = [data.strings.platform, data.strings.track, data.strings.sector];
    this.stringsTrans = [data.stringsTranslated.platform, data.stringsTranslated.track, data.stringsTranslated.sector];
    this.platformWidth = [data.platformWidth] / this.scale;
    this.isLeft = data.isLeft;
    // font sizes: 0 - number, 1 - main text, 2 - translated text
    this.fontSizes = [[1.845 * this.baseDim, 0.966 * this.baseDim, 0.4 * this.baseDim],    // platform number
                      [1.515 * this.baseDim, 0.793 * this.baseDim, 0.344 * this.baseDim],    // track number
                      [0.89 * this.baseDim, 0.466 * this.baseDim, 0.202 * this.baseDim]];    // sector letter
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
        this.height = 1.9 * this.baseDim + 2 * this.rimWidth;
        if (this.numbers[3])
            this.height += 1.2 * this.baseDim;
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
            (this.width + this.stringsWidths[0] + 0.3 * this.baseDim - numberWidth) / 2,
            this.rimWidth + 0.215 * this.baseDim, this.additionalStyles);
        doc.fontSize(this.fontSizes[0][1]);
        doc.text(this.strings[0],
            (this.width + this.stringsWidths[0] - 0.3 * this.baseDim - numberWidth) / 2 - doc.widthOfString(this.strings[0], this.additionalStyles),
            this.rimWidth + 0.27 * this.baseDim, this.additionalStyles);
        doc.font(this.font[1]).fontSize(this.fontSizes[0][2]);
        doc.text(this.stringsTrans[0],
            (this.width + this.stringsWidths[0] - 0.3 * this.baseDim - numberWidth) / 2 - doc.widthOfString(this.stringsTrans[0], this.additionalStyles),
            this.rimWidth + 1.22 * this.baseDim, this.additionalStyles);
    }
    if (this.numbers[1]) {
        doc.font(this.font[0]).fontSize(this.fontSizes[1][0]);
        numberWidth = doc.widthOfString(this.numbers[1], this.additionalStyles);
        numberMargin = (numberWidth > this.baseDim ? 0 : this.baseDim - numberWidth);
        doc.rect(
            0.685 * this.baseDim + this.rimWidth + numberMargin + numberWidth,
            0.6 * this.baseDim + this.rimWidth,
            0.03 * this.baseDim,
            1.3 * this.baseDim).fill(this.fontColor);
        doc.text(this.numbers[1],
            0.4 * this.baseDim + this.rimWidth + numberMargin,
            0.46 * this.baseDim + this.rimWidth, this.additionalStyles);
        doc.fontSize(this.fontSizes[1][1]);
        doc.text(this.strings[1],
            this.baseDim + this.rimWidth + numberMargin + numberWidth,
            0.49 * this.baseDim + this.rimWidth, this.additionalStyles);
        doc.font(this.font[1]).fontSize(this.fontSizes[1][2]);
        doc.text(this.stringsTrans[1],
            this.baseDim + this.rimWidth + numberMargin + numberWidth,
            1.26 * this.baseDim + this.rimWidth, this.additionalStyles);
    }
    if (this.numbers[2]) {
        doc.font(this.font[0]).fontSize(this.fontSizes[1][0]);
        numberWidth = doc.widthOfString(this.numbers[2], this.additionalStyles);
        numberMargin = (numberWidth > this.baseDim ? 0 : this.baseDim - numberWidth);
        doc.rect(
            this.width - (0.685 * this.baseDim + this.rimWidth + numberMargin + numberWidth),
            0.6 * this.baseDim + this.rimWidth,
            0.03 * this.baseDim,
            1.3 * this.baseDim).fill(this.fontColor);
        doc.text(this.numbers[2],
            this.width - (0.4 * this.baseDim + this.rimWidth + numberMargin + numberWidth),
            0.46 * this.baseDim + this.rimWidth, this.additionalStyles);
        doc.fontSize(this.fontSizes[1][1]);
        doc.text(this.strings[1],
            this.width - (this.baseDim + this.rimWidth + numberMargin + numberWidth + doc.widthOfString(this.strings[1], this.additionalStyles)),
            0.49 * this.baseDim + this.rimWidth, this.additionalStyles);
        doc.font(this.font[1]).fontSize(this.fontSizes[1][2]);
        doc.text(this.stringsTrans[1],
            this.width - (this.baseDim + this.rimWidth + numberMargin + numberWidth + doc.widthOfString(this.stringsTrans[1], this.additionalStyles)),
            1.26 * this.baseDim + this.rimWidth, this.additionalStyles);
    }
    if (this.numbers[3]) {
        doc.font(this.font[0]).fontSize(this.fontSizes[2][0]);
        numberWidth = doc.widthOfString(this.numbers[3], this.additionalStyles);
        doc.rect(this.rimWidth, this.rimWidth + 1.885 * this.baseDim, this.width - 2 * this.rimWidth, 0.03 * this.baseDim).fill(this.fontColor);
        doc.text(this.numbers[3],
            (this.width + this.stringsWidths[2] + 0.2 * this.baseDim - numberWidth) / 2,
            2.135 * this.baseDim + this.rimWidth, this.additionalStyles);
        doc.fontSize(this.fontSizes[2][1]);
        doc.text(this.strings[2],
            (this.width + this.stringsWidths[2] - 0.2 * this.baseDim - numberWidth) / 2 - doc.widthOfString(this.strings[2], this.additionalStyles),
            2.136 * this.baseDim + this.rimWidth, this.additionalStyles);
        doc.font(this.font[1]).fontSize(this.fontSizes[2][2]);
        doc.text(this.stringsTrans[2],
            (this.width + this.stringsWidths[2] - 0.2 * this.baseDim - numberWidth) / 2 - doc.widthOfString(this.stringsTrans[2], this.additionalStyles),
            2.608 * this.baseDim + this.rimWidth, this.additionalStyles);
    }
};

/**
 * Platform direction sign, (PKP, ep. Vc).
 * @constructor
 */
DirectionPlateEp5c = function(scale, amount, data) {
    GenericPlateEp5c.call(this, scale, amount);
    this.font = ["myriad_pro_semibold.otf", "myriad_pro_italic.otf"];
    if (data.isSmall === true) {
        this.scale = this.scale * 7/3;
    }
    this.baseDim = data.size / this.scale;
    this.dirString = data.strings.direction;
    this.dirStringTrans = data.stringsTranslated.direction;
    this.leftStrings = data.directionLeft;
    this.rightStrings = data.directionRight;
    this.fontSizes = [0.75 * this.baseDim, 0.56 * this.baseDim, 0.275 * this.baseDim];
    this.additionalStyles = {lineBreak: false};
};
DirectionPlateEp5c.prototype = Object.create(GenericPlateEp5c.prototype);
DirectionPlateEp5c.prototype.constructor = DirectionPlateEp5c;

DirectionPlateEp5c.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.width = 2 * this.rimWidth;
        this.dirSectionHeight = 1.6 * this.baseDim;
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
            this.leftStringWidth += 2.7 * this.baseDim;
            if (this.leftStrings.length > 1) {
                this.hasTwoLines = true;
                this.dirSectionHeight = 1.9 * this.baseDim;
            }
        }
        if (this.rightStrings instanceof Array) {
            for (var i = 0; i < this.rightStrings.length; i++)
            {
                tmpWidth = doc.widthOfString(this.rightStrings[i], this.additionalStyles);
                if (tmpWidth > this.rightStringWidth)
                    this.rightStringWidth = tmpWidth;
            }
            this.rightStringWidth += 2.7 * this.baseDim;
            if (this.rightStrings.length > 1) {
                this.hasTwoLines = true;
                this.dirSectionHeight = 1.9 * this.baseDim;
            }
        }
        this.width += this.leftStringWidth + this.rightStringWidth;
        this.height = 1.7 * this.baseDim + 2 * this.rimWidth + this.dirSectionHeight;
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
        1.7 * this.baseDim + this.rimWidth,
        this.width - 2 * this.rimWidth,
        this.dirSectionHeight).lineWidth(this.borderWidth).fillAndStroke(this.fontColor, this.fillColor);
    doc.font(this.font[0]).fontSize(this.fontSizes[1]).fill(this.fontColor);
    doc.text(this.dirString,
            (this.width - doc.widthOfString(this.dirString, this.additionalStyles)) / 2,
            this.rimWidth + 0.575 * this.baseDim,
            this.additionalStyles);
    doc.font(this.font[1]).fontSize(this.fontSizes[2]);
    doc.text(this.dirStringTrans,
            (this.width - doc.widthOfString(this.dirStringTrans, this.additionalStyles)) / 2,
            this.rimWidth + 1.19 * this.baseDim,
            this.additionalStyles);
    doc.font(this.font[0]).fontSize(this.fontSizes[0]).fill(this.fillColor);
    var stringTop = this.rimWidth + 2 * this.baseDim;
    if (this.leftStrings instanceof Array) {
        this.drawArrow(doc, this.baseDim, [this.rimWidth + 0.9 * this.baseDim, this.rimWidth + 1.7 * this.baseDim + 0.5 * this.dirSectionHeight], -90, this.fillColor);
        stringTop = this.rimWidth + 1.64 * this.baseDim + (this.dirSectionHeight - 0.5 * this.leftStrings.length * this.baseDim) / (this.leftStrings.length + 1);
        for (var i = 0; i < this.leftStrings.length; i++)
        {
            doc.text(this.leftStrings[i],
            this.rimWidth + 1.7 * this.baseDim,
            stringTop,
            this.additionalStyles);
            stringTop += 0.8 * this.baseDim;
        }
    }
    dirStringTop = 0.3 * this.baseDim;
    if (this.rightStrings instanceof Array) {
        this.drawArrow(doc, this.baseDim, [this.width - (this.rimWidth + 0.9 * this.baseDim), this.rimWidth + 1.7 * this.baseDim + 0.5 * this.dirSectionHeight], 90, this.backgroundColor);
        stringTop = this.rimWidth + 1.64 * this.baseDim + (this.dirSectionHeight - 0.5 * this.rightStrings.length * this.baseDim) / (this.rightStrings.length + 1);
        for (var i = 0; i < this.rightStrings.length; i++)
        {
            doc.text(this.rightStrings[i],
            this.width - 1.7 * this.baseDim - this.rimWidth - doc.widthOfString(this.rightStrings[i], this.additionalStyles),
            stringTop,
            this.additionalStyles);
            stringTop += 0.8 * this.baseDim;
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

StationSignsPKPEp5c.prototype.init = function(scale, data) {
    Model.prototype.init.call(this, scale, data);
    var numberOfNameSigns = 0;
    var numberOfAdditionalNameSigns = 0;
    for (var i=0; i < data.platforms.length; i++) {
        if (data.platforms[i].hasSectors && data.platforms[i].length >= 300) {
            for (var j = 0; j < Math.floor(data.platforms[i].length / 75); j++) {
                this.addPlatformPlates(1, data.platforms[i], String.fromCharCode(65 + j));
            }
        }
        else {
            numberOfPlatformSigns = Math.floor(data.platforms[i].length / 100) + 1;
            this.addPlatformPlates(numberOfPlatformSigns, data.platforms[i]);
        }
        if (data.platforms[i].directionLeft || data.platforms[i].directionRight) {
            var dirLeftArray = (data.platforms[i].directionLeft ? data.platforms[i].directionLeft.split('\n') : undefined);
            var dirRightArray = (data.platforms[i].directionRight ? data.platforms[i].directionRight.split('\n') : undefined);
            this.parts.push(new DirectionPlateEp5c(this.scale, 1,
                {size: this.basePlatformSignSize,
                directionLeft: dirLeftArray,
                directionRight: dirRightArray,
                strings: this.strings,
                stringsTranslated: this.stringsTranslated}));
            this.parts.push(new DirectionPlateEp5c(this.scale, 1,
                {size: this.basePlatformSignSize,
                directionLeft: dirRightArray,
                directionRight: dirLeftArray,
                strings: this.strings,
                stringsTranslated: this.stringsTranslated}));
        }
        numberOfNameSigns += 2 * (Math.floor(data.platforms[i].length / 100) + 1);
        if (i === 0 || i == (data.platforms.length - 1)) {
            numberOfAdditionalNameSigns += Math.floor(data.platforms[i].length / 100) + 1;
        }
    }
    var nameLines = data.name.split('\n');
    if (nameLines.length > 1) {
        if (data.isBilingual) {
            this.parts.push(new StationPlateBilingualEp5c(this.scale, numberOfNameSigns, {name: nameLines}));
            if (data.hasSmallPlates) {
                this.parts.push(new StationPlateBilingualEp5c(this.scale, numberOfNameSigns, {name: nameLines, isSmall: true}));
            }
        }
        else {
            this.parts.push(new StationPlateTwoLinesEp5c(this.scale, numberOfNameSigns, {name: nameLines}));
            if (data.hasExternal) {
                this.parts.push(new StationPlateTwoLinesWithIcoEp5c(this.scale, numberOfAdditionalNameSigns, {name: nameLines}));
            }
            if (data.hasSmallPlates) {
                this.parts.push(new StationPlateTwoLinesEp5c(this.scale, numberOfNameSigns, {name: nameLines, isSmall: true}));
            }
        }
    }
    else {
        this.parts.push(new StationPlateOneLineEp5c(this.scale, numberOfNameSigns, {name: data.name}));
        if (data.hasExternal) {
            this.parts.push(new StationPlateOneLineWithIcoEp5c(this.scale, numberOfAdditionalNameSigns, {name: data.name}));
        }
        if (data.hasSmallPlates) {
            this.parts.push(new StationPlateOneLineEp5c(this.scale, numberOfNameSigns, {name: data.name, isSmall: true}));
        }
    }
};
