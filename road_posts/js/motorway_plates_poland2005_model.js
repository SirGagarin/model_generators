MotorwayPlatesPoland2005Model = function() {
    Model.call(this);
    this.name = {"pl":"Tablice kilometrowe",
                 "en":"Motorway kilometer plates",
                 "de":"----"};
    this.capabilities = {
        allowsRoadNumber: false,
        allowsAdditionalPosts: false,
        allowsPhones: false};
};
MotorwayPlatesPoland2005Model.prototype = Object.create(Model.prototype);
MotorwayPlatesPoland2005Model.prototype.constructor = MotorwayPlatesPoland2005Model;

MotorwayPlatesPoland2005Model.prototype.init = function(scale, data) {
    Model.prototype.init.call(this, scale, data);
    for (var i = Math.floor(data.start); i <= data.end; i++)
    {
        this.parts.push(new MotorwayPlatesPoland2005(this.scale, 1 + data.doubled, {kilometer: i.toString()}));
    }
};

MotorwayPlatesPoland2005 = function(scale, amount, data) {
    Part.call(this, scale, amount);
    this.font = ["drogowskaz.ttf"];
    this.width = 1700.787 / this.scale;
    this.height = 907.086 / this.scale;
    this.kilometer = data.kilometer;
};
MotorwayPlatesPoland2005.prototype = Object.create(Part.prototype);
MotorwayPlatesPoland2005.prototype.constructor = MotorwayPlatesPoland2005;

MotorwayPlatesPoland2005.prototype.draw = function(doc) {
    doc.save();
    doc.scale(1 / this.scale);
    doc.path("M1700.787,864.566c0,23.386-19.134,42.52-42.52,42.52H42.52c-23.386,0-42.52-19.134-42.52-42.52V42.52C0,19.134,19.134,0,42.52,0h1615.748c23.386,0,42.52,19.134,42.52,42.52V864.566z").fill(this.fontColor);
    doc.path("M1672.44,864.567c0,7.795-6.378,14.173-14.173,14.173H42.52c-7.795,0-14.173-6.378-14.173-14.173V42.52c0-7.795,6.378-14.173,14.173-14.173h1615.748c7.795,0,14.173,6.378,14.173,14.173V864.567z").fill(this.fillColor);
    doc.restore();
    doc.font(this.font[0]).fontSize(792.379 / this.scale);
    doc.fill(this.fontColor).text(this.kilometer, (this.width - doc.widthOfString(this.kilometer)) * 0.5, -67 / this.scale);
};