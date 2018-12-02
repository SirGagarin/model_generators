RoadPostsSmallPoland2005Model = function() {
    RoadPostsPoland2005Model.call(this);
    this.name = {"pl":"Skrócone słupki prowadzące na bariery",
                 "en":"Road barier posts with road distance",
                 "de":"----"};
    this.capabilities = {
        allowsRoadNumber: false,
        allowsAdditionalPosts: true,
        allowsPhones: true};
};
RoadPostsSmallPoland2005Model.prototype = Object.create(RoadPostsPoland2005Model.prototype);
RoadPostsSmallPoland2005Model.prototype.constructor = RoadPostsSmallPoland2005Model;

RoadPostsSmallPoland2005Model.prototype.addPart = function(amount, partData) {
    this.parts.push(new RoadPostsSmallPoland2005(this.scale, amount, partData));
};

RoadPostsSmallPoland2005 = function(scale, amount, data) {
    RoadPostsPoland2005.call(this, scale, amount, data);
    this.width = 1029.04 / this.scale;
    this.height = 1782.71 / this.scale;
};
RoadPostsSmallPoland2005.prototype = Object.create(RoadPostsPoland2005.prototype);
RoadPostsSmallPoland2005.prototype.constructor = RoadPostsSmallPoland2005;

RoadPostsSmallPoland2005.prototype.draw = function(doc) {
    doc.save();
    doc.scale(1 / this.scale);
    doc.rect(0, 232.385, 226.771, 1550.322).stroke(this.strokeColor);
    doc.polygon([226.771, 1215.777], [570.807, 1357.51], [571.621, 345.77], [284.246, 232.385], [226.771, 232.385]).stroke(this.strokeColor);
    doc.rect(570.807, 345.771, 113.385, 1011.74).stroke(this.strokeColor);
    doc.polygon([1029.041, 1215.777], [684.191, 1357.51], [684.191, 345.77], [971.566, 232.385], [1029.041,232.385]).stroke(this.strokeColor);
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
    var numberWidth = doc.widthOfString(this.kilometer),
        leftMedian = 399.195 / this.scale,
        rightMedian = 856.616 / this.scale,
        numberHeight = 301.0 / this.scale; //345
    doc.fill(this.fontColor).text(this.kilometer, leftMedian - numberWidth * 0.5, numberHeight);
    doc.text(this.kilometer, rightMedian - numberWidth * 0.5, numberHeight);
    numberWidth = doc.widthOfString(this.hectometer);
    numberHeight = 465.0 / this.scale;
    doc.text(this.hectometer, leftMedian - numberWidth * 0.5, numberHeight);
    doc.text(this.hectometer, rightMedian - numberWidth * 0.5, numberHeight);
};