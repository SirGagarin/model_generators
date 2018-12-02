MotorwayPlatesSmallPoland2005Model = function() {
    Model.call(this);
    this.name = {"pl":"Tablice kilometrowe pomniejszone",
                 "en":"Small motorway kilometer plates",
                 "de":"----"};
    this.capabilities = {
        allowsRoadNumber: false,
        allowsAdditionalPosts: false,
        allowsPhones: false};
};
MotorwayPlatesSmallPoland2005Model.prototype = Object.create(Model.prototype);
MotorwayPlatesSmallPoland2005Model.prototype.constructor = MotorwayPlatesSmallPoland2005Model;

MotorwayPlatesSmallPoland2005Model.prototype.init = function(scale, data) {
    Model.prototype.init.call(this, scale, data);
    for (var i = Math.floor(data.start); i <= data.end; i++)
    {
        this.parts.push(new MotorwayPlatesSmallPoland2005(this.scale, 1 + data.doubled, {kilometer: i.toString()}));
    }
};

MotorwayPlatesSmallPoland2005 = function(scale, amount, data) {
    Part.call(this, scale, amount);
    this.font = ["drogowskaz.ttf"];
    this.width = 850.395 / this.scale;
    this.height = 425.196 / this.scale;
    this.kilometer = data.kilometer;
};
MotorwayPlatesSmallPoland2005.prototype = Object.create(Part.prototype);
MotorwayPlatesSmallPoland2005.prototype.constructor = MotorwayPlatesSmallPoland2005;

MotorwayPlatesSmallPoland2005.prototype.draw = function(doc) {
    doc.save();
    doc.scale(1 / this.scale);
    doc.path("M850.395,396.85c0,15.591-12.756,28.347-28.347,28.347H28.347C12.756,425.196,0,412.44,0,396.85V28.347C0,12.756,12.756,0,28.347,0h793.701c15.591,0,28.347,12.756,28.347,28.347V396.85z").fill(this.fontColor);
    doc.path("M827.718,396.85c0,3.118-2.551,5.669-5.669,5.669H28.347c-3.118,0-5.669-2.551-5.669-5.669V28.346c0-3.118,2.551-5.669,5.669-5.669h793.702c3.118,0,5.669,2.551,5.669,5.669V396.85z").fill(this.fillColor);
    doc.restore();
    doc.font(this.font[0]).fontSize(385.5321 / this.scale);
    doc.fill(this.fontColor).text(this.kilometer, (this.width - doc.widthOfString(this.kilometer)) * 0.5, -40 / this.scale);
};