RoadPlatesPoland2005Model = function() {
    Model.call(this);
    this.name = {"pl":"Zastępcze oznakowanie pikietażu",
                 "en":"Replacement distance plates",
                 "de":"----"};
    this.capabilities = {
        allowsRoadNumber: false,
        allowsAdditionalPosts: false,
        allowsPhones: false};
};
RoadPlatesPoland2005Model.prototype = Object.create(Model.prototype);
RoadPlatesPoland2005Model.prototype.constructor = RoadPlatesPoland2005Model;

RoadPlatesPoland2005Model.prototype.init = function(scale, data) {
    Model.prototype.init.call(this, scale, data);
    for (var i = data.start * 10; i <= data.end * 10; i++)
    {
        this.parts.push(new RoadPlatesPoland2005(this.scale, 1 + data.doubled, 
                                                     {kilometer: Math.floor(i / 10).toString(), 
                                                      hectometer: Math.round(i % 10).toString()}));
    }
};

RoadPlatesPoland2005 = function(scale, amount, data) {
    Part.call(this, scale, amount);
    this.font = ["drogowskaz.ttf"];
    this.width = 566.93 / this.scale;
    this.height = 907.086 / this.scale;
    this.kilometer = data.kilometer;
    this.hectometer = data.hectometer;
};
RoadPlatesPoland2005.prototype = Object.create(Part.prototype);
RoadPlatesPoland2005.prototype.constructor = RoadPlatesPoland2005;

RoadPlatesPoland2005.prototype.draw = function(doc) {
    doc.save();
    doc.scale(1 / this.scale);
    doc.path("M566.93,864.566c0,23.386-19.134,42.52-42.52,42.52H42.52c-23.386,0-42.52-19.134-42.52-42.52V42.52C0,19.134,19.134,0,42.52,0H524.41c23.386,0,42.52,19.134,42.52,42.52V864.566z").fill(this.fontColor);
    doc.path("M538.583,864.567c0,7.795-6.378,14.173-14.173,14.173H42.52c-7.795,0-14.173-6.378-14.173-14.173V42.52c0-7.795,6.378-14.173,14.173-14.173h481.89c7.795,0,14.173,6.378,14.173,14.173V864.567z").fill(this.fillColor);
    doc.restore();
    doc.font(this.font[0]).fontSize(158.7183 / this.scale);
    doc.fill(this.fontColor).text(this.kilometer, (this.width - doc.widthOfString(this.kilometer)) * 0.5, 112 / this.scale);
    doc.font(this.font[0]).fontSize(385.8201 / this.scale);
    doc.fill(this.fontColor).text(this.hectometer, (this.width - doc.widthOfString(this.hectometer)) * 0.5, 353 / this.scale);
};