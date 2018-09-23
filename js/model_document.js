/**
 * Model document with a ready page template. Inherits from [pdfkit's]{@link https://github.com/devongovett/pdfkit} PDFDocument.
 * @constructor
 */
ModelDocument = function(options) {
    PDFDocument.call(this, options);
    this.model = options.model;
    this.completeCallback = options.completeCallback;
    this.fonts = this.model.getFonts().concat(["document_font"]);
    this.pageMargin = options.margin;
    this.footerHeight = 102.047;
    this.partMargin = 4.252;
    this.lastPartPos = [this.pageMargin, this.pageMargin];
    this.drawAreaDim = [options.size[0] - 2 * this.pageMargin,
                        options.size[1] - this.pageMargin - this.footerHeight - this.partMargin];
    this.biggestPartHeight = 0;
    this.firstPart = false;
    this.fontFolder = options.fontFolder;
};
ModelDocument.prototype = Object.create(PDFDocument.prototype);
ModelDocument.prototype.constructor = ModelDocument;

/**
 * Start building the document.
 */
ModelDocument.prototype.createDocument = function() {
    this.firstPart = true;
    this.biggestPartHeight = 0;
    this.loadFonts();
};

/**
 * Recursively load the required fonts.
 */
ModelDocument.prototype.loadFonts = function() {
    if (!this.fonts.length) {
        this.drawParts();
        return;
    }
    var fontName = this.fonts.shift();
    var request = new XMLHttpRequest();
    var self = this;
    request.open('GET', this.fontFolder + fontName, true);
    request.responseType = 'arraybuffer';
    request.send();
    request.onload = function (e) {
        if (this.status == 200) {
            self.registerFont(fontName, request.response);
            self.loadFonts();
        }
    };
};

/**
 * Draw parts of the model.
 */
ModelDocument.prototype.drawParts = function() {
    var stream = this.pipe(blobStream());
    this.createPageTemplate();
    for (var i = 0; i < this.model.parts.length; i++) {
        for (var j = 0; j < this.model.parts[i].amount; j++) {
            this.drawPart(this.model.parts[i]);
        }
    }
    this.end();
    var self = this;
    stream.on("finish", function() {
        self.completeCallback(stream.toBlobURL("application/pdf"));
    });
};

/**
 * Try to position the part in the free space on the page and draw it, if needed, append new page to the document.
 * If part is too big to fit on the page in any direction, a placeholder icon is drawn instead.
 * @param {Object} part
 */
ModelDocument.prototype.drawPart = function(part) {
    var partDim = part.getDimensions(this);
    var hasToRotate = false;
    if (partDim[0] > this.drawAreaDim[0] || partDim[1] > this.drawAreaDim[1]) {
        hasToRotate = true;
        var tmp = partDim[0];
        partDim[0] = partDim[1];
        partDim[1] = tmp;
    }
    // if rotation didn't help, replace part with a placeholder
    if (partDim[0] > this.drawAreaDim[0] || partDim[1] > this.drawAreaDim[1]) {
        hasToRotate = false;
        part = this.model.partPlaceholder;
        partDim = part.getDimensions(this);
    }
    if (this.lastPartPos[0] + partDim[0] > this.drawAreaDim[0])
    {
        this.lastPartPos[0] = this.pageMargin;
        this.lastPartPos[1] = this.lastPartPos[1] + this.partMargin + this.biggestPartHeight;
        this.biggestPartHeight = 0;
    }
    if (this.lastPartPos[1] + partDim[1] > this.drawAreaDim[1])
    {
        this.addPage();
        this.createPageTemplate();
        this.lastPartPos[1] = this.pageMargin;
    }
    this.save();
    this.translate(this.lastPartPos[0],this.lastPartPos[1]);
    if (hasToRotate) {
        this.translate(0, partDim[1]);
        this.rotate(-90);
    }
    part.draw(this);
    this.restore();
    this.lastPartPos[0] += (partDim[0] + this.partMargin);
    if (partDim[1] > this.biggestPartHeight)
        this.biggestPartHeight = partDim[1];
};

/**
 * Append new page to the document and draw the constant part for the template: title, footer and rulers.
 */
ModelDocument.prototype.createPageTemplate = function() {
    this.font("document_font");
    var rightScaleEdge = this.drawAreaDim[0] + this.pageMargin;
    var footerTop = this.drawAreaDim[1] + this.pageMargin + this.partMargin;
    var scaleSectionLen = 28.346;
    this.fontSize(18).text(this.options.info.Title, this.pageMargin, footerTop + 8.9287);
    this.fontSize(9).text(this.options.info.Copyright, this.pageMargin, footerTop + 57.2894);
    var lastPos = this.pageMargin;
    for (var i = 0; i < Math.floor(this.drawAreaDim[0] / scaleSectionLen); i++) {
        this.rect(lastPos, footerTop, scaleSectionLen, 5.669).lineWidth(0.0028).fillAndStroke((i%2?"#000000":"#FFFFFF"), "#000000");
        lastPos += scaleSectionLen;
    }
    this.fill("#000000").text("1cm", lastPos - (scaleSectionLen + this.widthOfString("1cm")) / 2, footerTop + 8.6541);
    for (i = 0; i < Math.floor(this.drawAreaDim[1] / scaleSectionLen); i++) {
        this.rect(rightScaleEdge, this.pageMargin + (i * scaleSectionLen), 5.669, scaleSectionLen).lineWidth(0.0028).fillAndStroke((i%2?"#000000":"#FFFFFF"), "#000000");
    }
    this.save();
    this.translate(this.pageMargin + 4.12 + this.widthOfString(this.options.info.Copyright), footerTop + 56.884);
    this.rect(0,0,60.021,11.313).fill("#000000");
    this.rect(0.789,0.763,58.443,9.787).fill("#FFFFFF");
    this.rect(1.496,1.456,57.028,8.4).fill("#000000");
    this.path("M1.496,1.465v8.4h15.061c0.969-1.225,1.623-2.649,1.623-4.2c0-1.54-0.643-2.979-1.6-4.2H1.496z").fill("#C0C4BC");
    this.path("M47.809,3.557h1.217c0.679,0,1.185,0.046,1.517,0.138c0.334,0.09,0.619,0.243,0.856,0.461c0.21,0.189,0.366,0.408,0.468,0.655c0.103,0.248,0.153,0.528,0.153,0.842c0,0.316-0.051,0.6-0.153,0.85c-0.102,0.247-0.258,0.466-0.468,0.655c-0.239,0.217-0.526,0.372-0.862,0.464c-0.336,0.09-0.84,0.136-1.511,0.136h-1.217V3.557zM48.963,4.375v2.563h0.413c0.472,0,0.831-0.109,1.079-0.329c0.25-0.219,0.375-0.538,0.375-0.956c0-0.417-0.124-0.733-0.372-0.951s-0.608-0.326-1.082-0.326H48.963zM42.666,3.557h1.289l1.627,2.88v-2.88h1.094v4.2h-1.288L43.76,4.875v2.882h-1.094V3.557zM39.882,5.688h1.882v0.818h-1.882V5.688zM39.01,7.525c-0.212,0.104-0.433,0.181-0.662,0.233s-0.469,0.079-0.719,0.079c-0.745,0-1.336-0.195-1.771-0.585c-0.436-0.392-0.653-0.923-0.653-1.593c0-0.671,0.218-1.202,0.653-1.592c0.436-0.393,1.026-0.588,1.771-0.588c0.25,0,0.489,0.026,0.719,0.079c0.229,0.052,0.45,0.13,0.662,0.232v0.87c-0.214-0.138-0.424-0.237-0.632-0.302c-0.208-0.063-0.427-0.095-0.656-0.095c-0.412,0-0.735,0.123-0.971,0.371c-0.236,0.247-0.354,0.589-0.354,1.023c0,0.434,0.118,0.773,0.354,1.021c0.235,0.247,0.559,0.371,0.971,0.371c0.229,0,0.448-0.031,0.656-0.096c0.208-0.063,0.418-0.164,0.632-0.301V7.525zM30.319,3.557h1.289l1.627,2.88v-2.88h1.094v4.2h-1.288l-1.628-2.882v2.882h-1.094V3.557zM27.535,5.688h1.882v0.818h-1.882V5.688zM23.595,3.557h1.262l1.019,1.496l1.019-1.496h1.266l-1.706,2.43v1.771H25.3V5.986L23.595,3.557zM22.916,5.509c0.247,0.067,0.439,0.192,0.575,0.374s0.203,0.405,0.203,0.669c0,0.405-0.146,0.708-0.437,0.906c-0.292,0.199-0.735,0.299-1.331,0.299h-1.915v-4.2h1.732c0.621,0,1.07,0.088,1.349,0.264c0.279,0.177,0.419,0.459,0.419,0.847c0,0.205-0.051,0.379-0.152,0.523C23.258,5.333,23.109,5.439,22.916,5.509M21.843,7.02c0.231,0,0.405-0.046,0.521-0.139c0.118-0.092,0.177-0.23,0.177-0.416c0-0.182-0.058-0.317-0.174-0.407c-0.116-0.093-0.291-0.139-0.524-0.139h-0.677V7.02H21.843zM21.804,5.183c0.182,0,0.319-0.038,0.414-0.113c0.094-0.075,0.141-0.186,0.141-0.332c0-0.144-0.047-0.254-0.141-0.329c-0.095-0.076-0.232-0.115-0.414-0.115h-0.638v0.89H21.804z").fill("#FFFFFF");
    this.path("M14.424,1.456c1.086,1.073,1.76,2.563,1.76,4.209c0,1.643-0.669,3.128-1.75,4.2H6.097c-1.08-1.072-1.75-2.558-1.75-4.2c0-1.646,0.674-3.136,1.759-4.209H14.424z").fill("#000000");
    this.path("M10.265,10.428c2.63,0,4.763-2.133,4.763-4.763c0-2.629-2.133-4.762-4.763-4.762c-2.629,0-4.762,2.133-4.762,4.762C5.503,8.295,7.636,10.428,10.265,10.428").fill("#FFFFFF");
    this.path("M13.563,4.683L12.78,5.095c-0.085-0.176-0.188-0.299-0.312-0.369c-0.124-0.07-0.242-0.106-0.354-0.106c-0.528,0-0.793,0.349-0.793,1.047c0,0.316,0.067,0.57,0.201,0.761s0.331,0.285,0.592,0.285c0.345,0,0.588-0.169,0.729-0.507l0.74,0.369c-0.162,0.289-0.381,0.517-0.655,0.682c-0.274,0.166-0.574,0.249-0.898,0.249c-0.535,0-0.963-0.162-1.283-0.486c-0.321-0.324-0.481-0.775-0.481-1.353c0-0.564,0.164-1.011,0.491-1.343c0.328-0.331,0.742-0.496,1.242-0.496C12.73,3.827,13.252,4.112,13.563,4.683").fill("#000000");
    this.path("M10.148,4.683L9.355,5.095C9.271,4.919,9.167,4.796,9.044,4.726S8.807,4.619,8.7,4.619c-0.527,0-0.792,0.349-0.792,1.047c0,0.316,0.066,0.57,0.2,0.761S8.439,6.712,8.7,6.712c0.346,0,0.589-0.169,0.729-0.507l0.729,0.369c-0.155,0.289-0.37,0.517-0.645,0.682C9.24,7.422,8.937,7.505,8.605,7.505c-0.528,0-0.955-0.162-1.279-0.486C7.003,6.694,6.841,6.243,6.841,5.666c0-0.564,0.163-1.011,0.491-1.343C7.66,3.992,8.073,3.827,8.574,3.827C9.307,3.827,9.832,4.112,10.148,4.683").fill("#000000");
    this.restore();
    this.biggestPartHeight = 0;
};

/**
 * Basic model.
 * @constructor
 */
Model = function() {
    this.name = {"pl":"Model PL",
                 "en":"Model EN",
                 "de":"Model DE"};
    this.partPlaceholder = new PartPlaceholder();
    this.parts = [];
};

/**
 * Initialize new set of parts for this model.
 * @param {number} scale The denominator of model's scale.
 * @param {Object} data Data required to create the parts for this model.
 */
Model.prototype.init = function(scale, data) {
    this.scale = scale;
    this.parts = [];
};

/**
 * Get the name of the model in specific language.
 * @param {string} lang Language symbol.
 * @return {string} Name of the model.
 */
Model.prototype.getName = function(lang) {
    if (lang in this.name)
        return this.name[lang];
    return this.name.en;
};

/**
 * Scan the parts used by this model and return all fonts that are utilized by those parts.
 * @return {Array} Fonts used by this model's parts.
 */
Model.prototype.getFonts = function() {
    var fonts = [];
    for (var i = 0; i < this.parts.length; i++) {
        for (var j = 0; j < this.parts[i].font.length; j++) {
            if (fonts.indexOf(this.parts[i].font[j]) == -1)
                fonts.push(this.parts[i].font[j]);
        }
    }
    return fonts;
};

/**
 * Basic single part of a model.
 * @constructor
 * @param {number} scale Denominator of the model's scale.
 * @param {number} amount How many parts of this tyoe are used by the model.
 */
Part = function(scale, amount) {
    this.fillColor = "#FFFFFF";
    this.borderColor = "#888888";
    this.fontColor = "#000000";
    this.strokeWidth = 0.0762;
    this.amount = 0;
    this.font = ["document_font"];
    this.width = 0;
    this.height = 0;
    this.scale = scale;
    this.amount = amount;
};

/**
 * Calculate dimensions of the part to determine its placement on the page.
 * @abstract
 * @param {Object} doc Target document.
 * @return {Array} Two=element array with part's width and height.
 */
Part.prototype.getDimensions = function(doc) {
    return [this.width, this.height];
};

/**
 * Draw the part in the target document.
 * @abstract
 * @param {Object} doc Target document.
 */
Part.prototype.draw = function(doc) {};

/**
 * Placeholder marker drawn when part cannot fit on the page.
 */
PartPlaceholder = function() {
    Part.call(this, 0, 0);
    this.fillColor = "#FF0000";
    this.borderColor = "#000000";
    this.font = [];
    this.width = 28.347;
    this.height = 28.347;
};
PartPlaceholder.prototype = Object.create(Part.prototype);
PartPlaceholder.constructor = PartPlaceholder;

/**
 * Draw the placeholder marker in the target document.
 * @param {Object} doc Target document.
 */
PartPlaceholder.prototype.draw = function(doc) {
    doc.rect(0, 0, this.width, this.height).lineWidth(this.borderWidth).stroke(this.borderColor);
    doc.polygon([28.347,0],[22.678,0],[14.173,8.504],[5.669,0],[0,0],[0,5.669],[8.504,14.173],[0,22.678],[0,28.347],[5.669,28.347],[14.173,19.842],[22.678,28.347],[28.347,28.347],[28.347,22.678],[19.842,14.173],[28.347,5.669]).fill(this.fillColor);
};
