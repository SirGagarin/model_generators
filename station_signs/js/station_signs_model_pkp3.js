/**
 * Station sign with single row for the name, PKP, ep. III with frames
 * @constructor
 */
StationPlateOneLineEp3 = function(scale, amount, data) {
    StationPlateOneLineEp4.call(this, scale, amount, data);
    if (data.isSmall) {
        this.borderWidth = 56.692 / this.scale;
    }
    else {
        this.borderWidth = 70.865 / this.scale;
    }
};
StationPlateOneLineEp3.prototype = Object.create(StationPlateOneLineEp4.prototype);
StationPlateOneLineEp3.prototype.constructor = StationPlateOneLineEp3;


StationPlateOneLineEp3.prototype.drawBackground = function(doc) {
    doc.rect(0, 0, this.width, this.height).fill(this.fontColor);
    doc.rect(this.borderWidth, this.borderWidth, 
             this.width - 2 * this.borderWidth, this.height - 2 * this.borderWidth)
             .fill(this.fillColor);
};

/**
 * Platform marking sign, PKP, ep. III with frames
 * @constructor
 */
PlatformPlateEp3 = function(scale, amount, data) {
    PlatformPlateEp4.call(this, scale, amount, data);
    this.borderWidth = 56.692 / this.scale;
};
PlatformPlateEp3.prototype = Object.create(PlatformPlateEp4.prototype);
PlatformPlateEp3.prototype.constructor = PlatformPlateEp3;

PlatformPlateEp3.prototype.getDimensions = function(doc) {
    if (this.width === 0 && this.height === 0)
    {
        this.height = this.baseSize / this.scale;
        this.width = 0;
        this.width /= this.scale;
        this.fontSize = this.height * 0.49;
        this.separatorMargin = 0.4 * this.height;
        this.separatorWidth = this.borderWidth;
        this.separatorHeight = 0.8824 * this.height;
        this.separatorTopMargin = (this.height - this.separatorHeight) * 0.5;
        doc.font(this.font[0]).fontSize(this.fontSize);
        this.signsWidth = [];
        var signWidth = 0;
        for (var i = 0; i < this.strings.length; i++) {
            this.signsWidth[i] = doc.widthOfString(this.strings[i], this.additionalStyles);
            if (i > 0)
            {
                signWidth += this.separatorWidth;
            }
            signWidth += this.signsWidth[i] + 2 * this.separatorMargin;
        }
        this.width = signWidth;
        this.marginLeft = this.separatorMargin;
    }
    return [this.width, this.height];
};

PlatformPlateEp3.prototype.drawBackground = function(doc) {
    doc.rect(0, 0, this.width, this.height).fill(this.fontColor);
    doc.rect(this.borderWidth, this.borderWidth, 
             this.width - 2 * this.borderWidth, this.height - 2 * this.borderWidth)
             .fill(this.fillColor);;
};

/**
 * Station and platform signs, PKP, ep. III with frames
 * @constructor
 */
StationSignsPKPEp3 = function() {
    StationSignsPKPEp4.call(this);
    this.name = {"pl":"Oznakowanie stacji kolejowych PKP, epoka III",
                 "en":"PKP railway station signs, epoch III",
                 "de":"Bahnhofkennzeichnung, PKP, Epoche III"};
    this.strings = {platform: "peron", track: "tor"};
    this.capabilities = {
        allowsBilingual: false,
        allowsAdditionalSigns: false,
        allowsSmallSigns: true,
        allowsDirectionPlates: false,
        allowsTimeTables: false,
        allowsSectors: false};
};
StationSignsPKPEp3.prototype = Object.create(StationSignsPKPEp4.prototype);
StationSignsPKPEp3.prototype.constructor = StationSignsPKPEp3;

StationSignsPKPEp3.prototype.addStationPlates = function(nameLine, numberOfNameSigns, numberOfAdditionalNameSigns, hasExternal, hasSmallPlates) {
    this.parts.push(new StationPlateOneLineEp3(this.scale, numberOfNameSigns, {name: nameLine, isSmall: hasSmallPlates}));
};

StationSignsPKPEp3.prototype.addPlatformPlates = function(amount, platformData) {
    if (platformData.width >= 3 && platformData.width <= 7)
    {
        this.parts.push(new PlatformPlateEp3(this.scale, amount, {
                    numbers: {platform: platformData.number.toString(), leftTrack: platformData.leftTrack.toString(), rightTrack: platformData.rightTrack.toString()},
                    strings: this.strings}));
        this.parts.push(new PlatformPlateEp3(this.scale, amount, {
                    numbers: {platform: platformData.number.toString(), leftTrack: platformData.rightTrack.toString(), rightTrack: platformData.leftTrack.toString()},
                    strings: this.strings}));
    }
    else
    {
        if (platformData.number) {
            this.parts.push(new PlatformPlateEp3(this.scale, amount * 2, {numbers: {platform: platformData.number.toString()},
                            strings: this.strings}));
        }
        if (platformData.leftTrack) {
            this.parts.push(new PlatformPlateEp3(this.scale, amount * 2, {numbers: {leftTrack: platformData.leftTrack.toString()},
                strings: this.strings}));
        }
        if (platformData.rightTrack) {
            this.parts.push(new PlatformPlateEp3(this.scale, amount * 2, {numbers: {rightTrack: platformData.rightTrack.toString()},
                strings: this.strings}));
        }
    }
};

StationSignsPKPEp3.prototype.init = function(scale, data) {
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
    var nameLine = data.name.split('\n').join(' ');
    this.addStationPlates(nameLine, numberOfNameSigns, numberOfAdditionalNameSigns, data.hasExternal, false);
    if (data.hasSmallPlates) {
        this.addStationPlates(nameLine, numberOfNameSigns, numberOfAdditionalNameSigns, data.hasExternal, true);
    }
};
