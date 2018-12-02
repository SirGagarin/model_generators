RoadPostsPoland2005Model = function() {
    Model.call(this);
    this.name = {"pl":"Słupki prowadzące z pikietażem drogi",
                 "en":"Roadside posts with road distance",
                 "de":"----"};
    this.capabilities = {
        allowsRoadNumber: true,
        allowsAdditionalPosts: true,
        allowsPhones: true};
};
RoadPostsPoland2005Model.prototype = Object.create(Model.prototype);
RoadPostsPoland2005Model.prototype.constructor = RoadPostsPoland2005Model;


RoadPostsPoland2005Model.prototype.reverseDir = function(direction) {
    if (direction === SignDirection.LEFT)
        return SignDirection.RIGHT;
    if (direction === SignDirection.RIGHT)
        return SignDirection.LEFT;
    return direction;
};

RoadPostsPoland2005Model.prototype.addPart = function(amount, partData) {
    this.parts.push(new RoadPostsPoland2005(this.scale, amount, partData));
};

RoadPostsPoland2005Model.prototype.initWithPhone = function(data) {
    var phoneDistance = data.phoneDistance / 1000,
    prevPhone = data.phoneStart - phoneDistance,
    phoneMarkingStart = data.phoneStart - 0.5 * phoneDistance,
    additionalPostsDistance = 0.1 / (data.additionalPosts + 1);
    if (prevPhone < data.start)
        prevPhone = prevPhone + phoneDistance * Math.floor((data.start - prevPhone) / phoneDistance);
    var nextPhone = prevPhone + phoneDistance;
    for (var i = data.start * 10; i <= data.end * 10; i++)
    {
        currPos = i * 0.1;
        partData = {kilometer: Math.floor(i / 10).toString(), 
                    hectometer: Math.round(i % 10).toString(), 
                    roadNumber: (isNaN(data.roadNumber) ? "" : data.roadNumber.toString()),
                    phoneIcoDir: SignDirection.NONE};
        if (currPos >= phoneMarkingStart) {
            if (currPos > nextPhone) {
                prevPhone = nextPhone;
                nextPhone += phoneDistance;
            }
            if ((currPos - prevPhone) < (nextPhone - currPos))
                partData.phoneIcoDir = SignDirection.LEFT;
            else
                partData.phoneIcoDir = SignDirection.RIGHT;
        }
        this.addPart(1, partData);
        if (data.doubled) {
            partData.phoneIcoDir = this.reverseDir(partData.phoneIcoDir);
            this.addPart(1, partData);
        }
        partData = {kilometer: "", hectometer: "", roadNumber: "", phoneIcoDir: SignDirection.NONE};
        for (var j = 0; j < data.additionalPosts; j++) {
            currPos += additionalPostsDistance;
            if (currPos >= phoneMarkingStart) {
                if (currPos > nextPhone) {
                    prevPhone = nextPhone;
                    nextPhone += phoneDistance;
                }
                if ((currPos - prevPhone) < (nextPhone - currPos))
                    partData.phoneIcoDir = SignDirection.LEFT;
                else
                    partData.phoneIcoDir = SignDirection.RIGHT;
            }
            this.addPart(1, partData);
            if (data.doubled) {
                partData.phoneIcoDir = this.reverseDir(partData.phoneIcoDir);
                this.addPart(1, partData);
            }
        }
    }
};

RoadPostsPoland2005Model.prototype.initWithoutPhone = function(data) {
    for (var i = data.start * 10; i <= data.end * 10; i++)
    {
        this.addPart(1 + data.doubled, 
                     {kilometer: Math.floor(i / 10).toString(), 
                      hectometer: Math.round(i % 10).toString(), 
                      roadNumber: (isNaN(data.roadNumber) ? "" : data.roadNumber.toString()),
                      phoneIcoDir: SignDirection.NONE});
        if (data.additionalPosts > 0)
            this.addPart(data.additionalPosts * (1 + data.doubled), 
                         {kilometer: "", hectometer: "", roadNumber: "", phoneIcoDir: SignDirection.NONE});
    }
};

RoadPostsPoland2005Model.prototype.init = function(scale, data) {
    Model.prototype.init.call(this, scale, data);
    if (data.hasPhone)
        this.initWithPhone(data);
    else
        this.initWithoutPhone(data);
};

SignDirection = {NONE: 0, LEFT: 1, RIGHT: 2};

RoadPostsPoland2005 = function(scale, amount, data) {
    Part.call(this, scale, amount);
    this.font = ["drogowskaz.ttf"];
    this.strokeColor = "#AAAAAA";
    this.redColor = "#ED1C24";
    this.lightGrayColor = "#F1F2F2";
    this.darkRedColor = "#CC171E";
    this.yellowColor = "#FFF200";
    this.width = 1029.04 / this.scale;
    this.height = 3633.96 / this.scale;
    this.kilometer = data.kilometer;
    this.hectometer = data.hectometer;
    this.roadNumber = data.roadNumber;
    this.phoneIcoDir = data.phoneIcoDir;
};
RoadPostsPoland2005.prototype = Object.create(Part.prototype);
RoadPostsPoland2005.prototype.constructor = RoadPostsPoland2005;

RoadPostsPoland2005.prototype.drawPhoneIco = function(doc, pos, direction) {
    if (direction === SignDirection.NONE) return;
    doc.save();
    doc.translate(pos[0],pos[1]);
    if (direction === SignDirection.RIGHT) doc.scale(-1, 1, {origin: [113.385, 0]});
    doc.path("M226.771,255.119V28.347C226.771,12.694,214.077,0,198.424,0c-6.125,0-12.088,1.987-16.989,5.655L0,141.732L181.435,277.81c4.901,3.668,10.864,5.654,16.989,5.654C214.077,283.464,226.771,270.771,226.771,255.119L226.771,255.119zM139.471,239.247l-7.063-5.281c6.709-5.108,12.93-10.947,18.465-17.304c-15.227-24.629-23.315-53.045-23.315-82.016c0-25.885,6.452-51.41,18.774-74.169c6.295-11.091,18.074-17.957,30.832-17.957c2.621,0,5.238,0.294,7.795,0.869l-6.081,41.308c-5.979-0.758-11.742-2.793-16.881-5.949l-6.093,4.874v101.274l4.396,3.396c5.645-3.599,11.787-6.394,18.209-8.27c12.088,5.759,20.006,17.757,20.674,31.229c-6.465,9.74-17.414,15.52-29.105,15.52c-4.876,0-9.713-1.012-14.176-2.961C150.887,229.394,145.366,234.589,139.471,239.247L139.471,239.247z").fill(this.fontColor);
    doc.restore();
};

RoadPostsPoland2005.prototype.draw = function(doc) {
    doc.save();
    doc.scale(1 / this.scale);
    doc.rect(0, 232.385, 226.771, 3401.576).stroke(this.strokeColor);
    doc.polygon([226.771, 3633.961], [571.62, 3633.961], [571.62, 345.771], [284.246, 232.385], [226.771, 232.385]).stroke(this.strokeColor);
    doc.rect(570.807, 345.771, 113.385, 3288.19).stroke(this.strokeColor);
    doc.polygon([1029.04, 3633.961], [684.191, 3633.961], [684.191, 345.771], [971.565, 232.385], [1029.04, 232.385]).stroke(this.strokeColor);
    doc.polygon([523.562, 56.692], [570.806, 345.771], [684.192, 345.771], [731.437, 56.692]).stroke(this.strokeColor);
    doc.polygon([731.437, 56.692], [740.885, 0], [514.113, 0], [523.562, 56.692]).stroke(this.strokeColor);
    doc.polygon([1029.039, 629.235], [684.191, 770.968], [571.619, 770.968], [226.771, 629.235], [0, 629.235], [0, 1196.164], [226.771, 1196.164], 
                [570.807, 1337.562], [570.807, 1337.897], [684.192, 1337.897], [684.192, 1337.895], [1029.039, 1196.164]).fill(this.redColor);
    doc.polygon([456.671, 1290.652], [341.721, 1243.408], [341.721, 676.479], [456.671, 723.724]).fill(this.lightGrayColor);
    doc.polygon([799.141, 1290.652], [914.091, 1243.408], [914.091, 676.479], [799.141, 723.724]).fill(this.darkRedColor);
    this.drawPhoneIco(doc, [514.114, 416.637], this.phoneIcoDir);
    doc.restore();
    if (!(this.kilometer && this.hectometer)) return;
    doc.font(this.font[0]).fontSize(158.7183 / this.scale);
    var numberWidth = 0,
        leftMedian = 399.195 / this.scale,
        rightMedian = 856.616 / this.scale,
        numberHeight = 0;
    if (this.hectometer === "0" && this.roadNumber) {
        numberWidth = doc.widthOfString(this.roadNumber);
        numberHeight = 383.0 / this.scale;
        var numberBgWidth = numberWidth + 36 / this.scale,
            numberBgTop = 402.464 / this.scale,
            numberBgHeight = 170.079 / this.scale,
            roadNumberColor = this.fillColor,
            roadNumberBackground = this.redColor;
        if (numberBgWidth < numberBgHeight)
            numberBgWidth = numberBgHeight;
        if (parseInt(this.roadNumber) >= 100) {
            roadNumberColor = this.fontColor;
            roadNumberBackground = this.yellowColor;
        }
        doc.rect(leftMedian - numberBgWidth * 0.5, numberBgTop, numberBgWidth, numberBgHeight).fill(roadNumberBackground);
        doc.rect(rightMedian - numberBgWidth * 0.5, numberBgTop, numberBgWidth, numberBgHeight).fill(roadNumberBackground);
        doc.fill(roadNumberColor).text(this.roadNumber, leftMedian - numberWidth / 2, numberHeight);
        doc.fill(roadNumberColor).text(this.roadNumber, rightMedian - numberWidth / 2, numberHeight);
    }
    numberWidth = doc.widthOfString(this.kilometer);
    numberHeight = 1662.0 / this.scale;
    doc.fill(this.fontColor).text(this.kilometer, leftMedian - numberWidth * 0.5, numberHeight);
    doc.text(this.kilometer, rightMedian - numberWidth * 0.5, numberHeight);
    doc.fontSize(385.8201 / this.scale);
    numberWidth = doc.widthOfString(this.hectometer);
    numberHeight = 1876.0 / this.scale;
    doc.text(this.hectometer, leftMedian - numberWidth * 0.5, numberHeight);
    doc.text(this.hectometer, rightMedian - numberWidth * 0.5, numberHeight);
};