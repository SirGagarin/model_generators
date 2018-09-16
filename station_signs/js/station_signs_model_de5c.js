/**
 * Station and platform signs based on UIC directives, Germany, ep. Vc.
 * @constructor
 */
StationSignsDeEp5c = function() {
    StationSignsPKPEp5c.call(this);
    this.name = {"pl":"Oznakowanie stacji kolejowych, Niemcy, epoka Vc",
                 "en":"Railway station signs, Germany, epoch Vc",
                 "de":"Bahnhofkennzeichnung, Deutschland, Epoche Vc"};
    this.strings = {platform: "Bahnsteig", track: "Gleis", sector: "Sektor", direction: "Richtung"};
};
StationSignsDeEp5c.prototype = Object.create(StationSignsPKPEp5c.prototype);
StationSignsDeEp5c.prototype.constructor = StationSignsDeEp5c;