function StationSignsGenerator(inputFormName, fontFolder, models, translation) {
    this.name = "station_sign_generator";
    this.platforms = [];
    this.selectedPlatformId = 0;
    this.MIN_PLATFORM_NUMBER = 1;
    this.MAX_PLATFORM_NUMBER = 99;
    this.MIN_TRACK_NUMBER = 1;
    this.MAX_TRACK_NUMBER = 999;
    this.MIN_LENGTH = 100;
    this.MAX_LENGTH = 1000;
    this.MIN_WIDTH = 1;
    this.MAX_WIDTH = 20;
    this.MIN_TABLE_WIDTH = 0;
    this.MAX_TABLE_WIDTH = 3;
    this.modelDefaults = {
            name: "Buczyna Osiedle", isBilingual: false, hasExternal: true, hasSmallPlates: false, platforms: [
                new Platform(1, 1, 1, 300, 5, "Dąbrowa", "Zalesie", 0, false),
                new Platform(2, 2, 3, 300, 5, "Dąbrowa", "Zalesie", 0, true),
                new Platform(3, 5, 3, 300, 5, "Dąbrowa", "Zalesie", 0, false)
        ]};
    ModelGenerator.call(this, inputFormName, fontFolder, models, translation);
}
StationSignsGenerator.prototype = Object.create(ModelGenerator.prototype);
StationSignsGenerator.prototype.constructor = StationSignsGenerator;

StationSignsGenerator.prototype.createCustomInterfacePart = function() {
    var customInterfacePart = [];
    var self = this;

    // name input
    var nameGroup = document.createElement("p");
    var nameLabel = document.createElement("label");
    nameLabel.textContent = this.getTranslation("name");
    nameGroup.appendChild(nameLabel);
    this.nameField = document.createElement("textarea");
    this.nameField.cols = "30";
    this.nameField.rows = "2";
    this.nameField.title = this.getTranslation("nameHelp", [2, 30]);
    this.nameField.addEventListener("keypress", function(event){ self.validateName(event); } );
    nameGroup.appendChild(this.nameField);
    customInterfacePart.push(nameGroup);

    // treat name as bilingual
    var bilingualGroup = document.createElement("p");
    this.bilingualCheckbox = document.createElement("input");
    this.bilingualCheckbox.type = "checkbox";
    this.bilingualCheckbox.title = this.getTranslation("bilingualHelp");
    bilingualGroup.appendChild(this.bilingualCheckbox);
    var bilingualLabel = document.createElement("label");
    bilingualLabel.textContent = this.getTranslation("bilingual");
    bilingualGroup.appendChild(bilingualLabel);
    customInterfacePart.push(bilingualGroup);

    // add external signs
    var externalGroup = document.createElement("p");
    this.externalCheckbox = document.createElement("input");
    this.externalCheckbox.type = "checkbox";
    this.externalCheckbox.title = this.getTranslation("externalHelp");
    externalGroup.appendChild(this.externalCheckbox);
    var externalLabel = document.createElement("label");
    externalLabel.textContent = this.getTranslation("external");
    externalGroup.appendChild(externalLabel);
    customInterfacePart.push(externalGroup);
    
    // use small signs
    var smallGroup = document.createElement("p");
    this.smallCheckbox = document.createElement("input");
    this.smallCheckbox.type = "checkbox";
    this.smallCheckbox.title = this.getTranslation("smallHelp");
    smallGroup.appendChild(this.smallCheckbox);
    var smallLabel = document.createElement("label");
    smallLabel.textContent = this.getTranslation("small");
    smallGroup.appendChild(smallLabel);
    customInterfacePart.push(smallGroup);

    // platform number
    var platformNumberGroup = document.createElement("p");
    var platformNumberLabel = document.createElement("label");
    platformNumberLabel.textContent = this.getTranslation("platformNumber");
    platformNumberGroup.appendChild(platformNumberLabel);
    this.platformNumberField = document.createElement("input");
    this.platformNumberField.type = "number";
    this.platformNumberField.min = this.MIN_PLATFORM_NUMBER;
    this.platformNumberField.max = this.MAX_PLATFORM_NUMBER;
    this.platformNumberField.step = 0.1;
    this.platformNumberField.title = this.getTranslation("platformNumberHelp", [this.MIN_PLATFORM_NUMBER, this.MAX_PLATFORM_NUMBER]);
    platformNumberGroup.appendChild(this.platformNumberField);
    customInterfacePart.push(platformNumberGroup);

    // left track number
    var leftTrackGroup = document.createElement("p");
    var leftTrackLabel = document.createElement("label");
    leftTrackLabel.textContent = this.getTranslation("leftTrack");
    leftTrackGroup.appendChild(leftTrackLabel);
    this.leftTrackField = document.createElement("input");
    this.leftTrackField.type = "number";
    this.leftTrackField.min = this.MIN_TRACK_NUMBER;
    this.leftTrackField.max = this.MAX_TRACK_NUMBER;
    this.leftTrackField.step = 0.1;
    this.leftTrackField.title = this.getTranslation("leftTrackHelp", [this.MIN_TRACK_NUMBER, this.MAX_TRACK_NUMBER]);
    leftTrackGroup.appendChild(this.leftTrackField);
    customInterfacePart.push(leftTrackGroup);

    // right track number
    var rightTrackGroup = document.createElement("p");
    var rightTrackLabel = document.createElement("label");
    rightTrackLabel.textContent = this.getTranslation("rightTrack");
    rightTrackGroup.appendChild(rightTrackLabel);
    this.rightTrackField = document.createElement("input");
    this.rightTrackField.type = "number";
    this.rightTrackField.min = this.MIN_TRACK_NUMBER;
    this.rightTrackField.max = this.MAX_TRACK_NUMBER;
    this.rightTrackField.step = 0.1;
    this.rightTrackField.title = this.getTranslation("rightTrackHelp", [this.MIN_TRACK_NUMBER, this.MAX_TRACK_NUMBER]);
    rightTrackGroup.appendChild(this.rightTrackField);
    customInterfacePart.push(rightTrackGroup);

    // platform length
    var lengthGroup = document.createElement("p");
    var lengthLabel = document.createElement("label");
    lengthLabel.textContent = this.getTranslation("length");
    lengthGroup.appendChild(lengthLabel);
    this.lengthField = document.createElement("input");
    this.lengthField.type = "number";
    this.lengthField.min = this.MIN_LENGTH;
    this.lengthField.max = this.MAX_LENGTH;
    this.lengthField.step = 0.1;
    this.lengthField.title = this.getTranslation("lengthHelp", [this.MIN_LENGTH, this.MAX_LENGTH]);
    lengthGroup.appendChild(this.lengthField);
    customInterfacePart.push(lengthGroup);

    // platform width
    var widthGroup = document.createElement("p");
    var widthLabel = document.createElement("label");
    widthLabel.textContent = this.getTranslation("width");
    widthGroup.appendChild(widthLabel);
    this.widthField = document.createElement("input");
    this.widthField.type = "number";
    this.widthField.min = this.MIN_WIDTH;
    this.widthField.max = this.MAX_WIDTH;
    this.widthField.step = 0.1;
    this.widthField.title = this.getTranslation("widthHelp", [this.MIN_WIDTH, this.MAX_WIDTH]);
    widthGroup.appendChild(this.widthField);
    customInterfacePart.push(widthGroup);
    
    // direction left input
    var directionLeftGroup = document.createElement("p");
    var directionLeftLabel = document.createElement("label");
    directionLeftLabel.textContent = this.getTranslation("directionLeft");
    directionLeftGroup.appendChild(directionLeftLabel);
    this.directionLeftField = document.createElement("textarea");
    this.directionLeftField.cols = "30";
    this.directionLeftField.rows = "2";
    this.directionLeftField.title = this.getTranslation("directionLeftHelp", [2, 30]);
    this.directionLeftField.addEventListener("keypress", function(event){ self.validateName(event); } );
    directionLeftGroup.appendChild(this.directionLeftField);
    customInterfacePart.push(directionLeftGroup);
    
    // direction right input
    var directionRightGroup = document.createElement("p");
    var directionRightLabel = document.createElement("label");
    directionRightLabel.textContent = this.getTranslation("directionRight");
    directionRightGroup.appendChild(directionRightLabel);
    this.directionRightField = document.createElement("textarea");
    this.directionRightField.cols = "30";
    this.directionRightField.rows = "2";
    this.directionRightField.title = this.getTranslation("directionRightHelp", [2, 30]);
    this.directionRightField.addEventListener("keypress", function(event){ self.validateName(event); } );
    directionRightGroup.appendChild(this.directionRightField);
    customInterfacePart.push(directionRightGroup);
    
    // time table holder width in standard segments
    var tableWidthGroup = document.createElement("p");
    var tableWidthLabel = document.createElement("label");
    tableWidthLabel.textContent = this.getTranslation("tableWidth");
    tableWidthGroup.appendChild(tableWidthLabel);
    this.tableWidthField = document.createElement("input");
    this.tableWidthField.type = "number";
    this.tableWidthField.min = this.MIN_TABLE_WIDTH;
    this.tableWidthField.max = this.MAX_TABLE_WIDTH;
    this.tableWidthField.step = 1;
    this.tableWidthField.title = this.getTranslation("tableWidthHelp", [this.MIN_TABLE_WIDTH, this.MAX_TABLE_WIDTH]);
    tableWidthGroup.appendChild(this.tableWidthField);
    customInterfacePart.push(tableWidthGroup);
    
    // add sector markings
    var sectorGroup = document.createElement("p");
    this.sectorCheckbox = document.createElement("input");
    this.sectorCheckbox.type = "checkbox";
    this.sectorCheckbox.title = this.getTranslation("sectorHelp");
    sectorGroup.appendChild(this.sectorCheckbox);
    var sectorLabel = document.createElement("label");
    sectorLabel.textContent = this.getTranslation("sector");
    sectorGroup.appendChild(sectorLabel);
    customInterfacePart.push(sectorGroup);

    // platform modification buttons
    var modGroup = document.createElement("p");
    var addBeforeButton = document.createElement("input");
    addBeforeButton.type = "button";
    addBeforeButton.className = "button edit-button add-before";
    addBeforeButton.title = this.getTranslation("addBefore");
    addBeforeButton.addEventListener("click",function(event){ self.addPlatformBefore(); } );
    modGroup.appendChild(addBeforeButton);
    var addAfterButton = document.createElement("input");
    addAfterButton.type = "button";
    addAfterButton.className = "button edit-button add-after";
    addAfterButton.title = this.getTranslation("addAfter");
    addAfterButton.addEventListener("click",function(event){ self.addPlatformAfter(); } );
    modGroup.appendChild(addAfterButton);
    var changeButton = document.createElement("input");
    changeButton.type = "button";
    changeButton.className = "button edit-button change";
    changeButton.title = this.getTranslation("change");
    modGroup.appendChild(changeButton);
    changeButton.addEventListener("click",function(event){ self.changePlatform(); } );
    var removeButton = document.createElement("input");
    removeButton.type = "button";
    removeButton.className = "button edit-button remove";
    removeButton.title = this.getTranslation("remove");
    removeButton.addEventListener("click",function(event){ self.removePlatform(); } );
    modGroup.appendChild(removeButton);
    var moveUpButton = document.createElement("input");
    moveUpButton.type = "button";
    moveUpButton.className = "button edit-button move-up";
    moveUpButton.title = this.getTranslation("moveUp");
    moveUpButton.addEventListener("click",function(event){ self.movePlatformUp(); } );
    modGroup.appendChild(moveUpButton);
    var moveDownButton = document.createElement("input");
    moveDownButton.type = "button";
    moveDownButton.className = "button edit-button move-down";
    moveDownButton.title = this.getTranslation("moveDown");
    moveDownButton.addEventListener("click",function(event){ self.movePlatformDown(); } );
    modGroup.appendChild(moveDownButton);
    customInterfacePart.push(modGroup);

    // list of platforms
    var platformListGroup = document.createElement("p");
    this.platformList = document.createElement("select");
    this.platformList.size = 5;
    platformListGroup.appendChild(this.platformList);
    this.platformList.addEventListener("input",function(event){ self.platformSelectCallback(); } );
    customInterfacePart.push(platformListGroup);

    return customInterfacePart;
};

StationSignsGenerator.prototype.validateName = function(event) {
    var lines = this.nameField.value.split('\n');
    var currentLine = this.nameField.value.substr(0,this.nameField.selectionStart).split("\n").length;
    if (event.keyCode == 13) {
        if (lines.length >= this.nameField.rows) {
            event.preventDefault();
        }
    }
    else {
        if (lines[currentLine - 1].length >= this.nameField.cols) {
            event.preventDefault();
        }
    }
};

StationSignsGenerator.prototype.setCustomFormValues = function(data) {
    if (data) {
        this.nameField.value = (data.name === undefined ? this.modelDefaults.name : data.name);
        this.platforms = (data.platforms === undefined ? this.modelDefaults.platforms : data.platforms);
        this.bilingualCheckbox.checked = data.isBilingual;
        this.externalCheckbox.checked = data.hasExternal;
        this.smallCheckbox.checked = data.hasSmallPlates;
    }
    else {
        this.nameField.value = this.modelDefaults.name;
        this.platforms = this.modelDefaults.platforms;
        this.bilingualCheckbox.checked = this.modelDefaults.isBilingual;
        this.externalCheckbox.checked = this.modelDefaults.hasExternal;
        this.smallCheckbox.checked = this.modelDefaults.hasSmallPlates;
    }
    this.selectedPlatformId = 0;
    this.populatePlatformList();
};

StationSignsGenerator.prototype.populatePlatformList = function() {
    while (this.platformList.hasChildNodes()) {
        this.platformList.removeChild(this.platformList.lastChild);
    }
    for (var i = 0; i < this.platforms.length; i++) {
        var platformOption = document.createElement("option");
        platformOption.value = i;
        platformOption.textContent = (this.platforms[i].leftTrack ? this.getTranslation("track", [this.platforms[i].leftTrack]) + " | " : "") +
                                    this.getTranslation("platform", [this.platforms[i].number]) +
                                    (this.platforms[i].rightTrack ? " | " + this.getTranslation("track", [this.platforms[i].rightTrack]) : "");
        if (i == this.selectedPlatformId) {
            platformOption.selected = true;
        }
        this.platformList.appendChild(platformOption);
    }
    this.platformSelectCallback();
};

StationSignsGenerator.prototype.platformSelectCallback = function() {
    if (!this.platforms.length)
        return;
    this.selectedPlatformId = this.platformList.selectedIndex;
    if (this.selectedPlatformId < 0) {
        this.selectedPlatformId = 0;
        this.platformList.selectedIndex = 0;
    }
    this.platformNumberField.value = this.platforms[this.selectedPlatformId].number;
    this.leftTrackField.value = this.platforms[this.selectedPlatformId].leftTrack;
    this.rightTrackField.value = this.platforms[this.selectedPlatformId].rightTrack;
    this.lengthField.value = this.platforms[this.selectedPlatformId].length;
    this.widthField.value = this.platforms[this.selectedPlatformId].width;
    this.directionRightField.value = this.platforms[this.selectedPlatformId].directionRight;
    this.directionLeftField.value = this.platforms[this.selectedPlatformId].directionLeft;
    this.tableWidthField.value = this.platforms[this.selectedPlatformId].timeTableWidth;
    this.sectorCheckbox.checked = this.platforms[this.selectedPlatformId].hasSectors;
};

StationSignsGenerator.prototype.addPlatformBefore = function() {
    if (!this.validateInputs()) return;
    this.platforms.splice(this.selectedPlatformId, 0,
        new Platform(this.platformNumberField.value,
                    this.leftTrackField.value,
                    this.rightTrackField.value,
                    this.lengthField.value,
                    this.widthField.value,
                    this.directionRightField.value,
                    this.directionLeftField.value,
                    this.tableWidthField.value,
                    this.sectorCheckbox.checked));
    this.populatePlatformList();
};

StationSignsGenerator.prototype.addPlatformAfter = function() {
    if (!this.validateInputs()) return;
    this.platforms.splice(this.selectedPlatformId + 1, 0,
        new Platform(this.platformNumberField.value,
                    this.leftTrackField.value,
                    this.rightTrackField.value,
                    this.lengthField.value,
                    this.widthField.value,
                    this.directionRightField.value,
                    this.directionLeftField.value,
                    this.tableWidthField.value,
                    this.sectorCheckbox.checked));
    this.selectedPlatformId++;
    this.populatePlatformList();
};

StationSignsGenerator.prototype.changePlatform = function() {
    if (!this.validateInputs()) return;
    if (!this.platforms.length)
        return;
    this.platforms[this.selectedPlatformId].number = this.platformNumberField.value;
    this.platforms[this.selectedPlatformId].leftTrack = this.leftTrackField.value;
    this.platforms[this.selectedPlatformId].rightTrack = this.rightTrackField.value;
    this.platforms[this.selectedPlatformId].length = this.lengthField.value;
    this.platforms[this.selectedPlatformId].width = this.widthField.value;
    this.platforms[this.selectedPlatformId].directionRight = this.directionRightField.value;
    this.platforms[this.selectedPlatformId].directionLeft = this.directionLeftField.value;
    this.platforms[this.selectedPlatformId].timeTableWidth = this.tableWidthField.value;
    this.platforms[this.selectedPlatformId].hasSectors = this.sectorCheckbox.checked;
    this.populatePlatformList();
};

StationSignsGenerator.prototype.removePlatform = function() {
    if (!this.platforms.length)
        return;
    this.platforms.splice(this.selectedPlatformId, 1);
    if (this.selectedPlatformId >= this.platforms.length)
        this.selectedPlatformId = this.platforms.length - 1;
    this.populatePlatformList();
};

StationSignsGenerator.prototype.movePlatformUp = function() {
    if (this.selectedPlatformId <= 0)
        return;
    var tmp = this.platforms[this.selectedPlatformId];
    this.platforms[this.selectedPlatformId] = this.platforms[this.selectedPlatformId - 1];
    this.platforms[this.selectedPlatformId - 1] = tmp;
    this.selectedPlatformId--;
    this.populatePlatformList();
};

StationSignsGenerator.prototype.movePlatformDown = function() {
    if (this.selectedPlatformId >= (this.platforms.length - 1))
        return;
    var tmp = this.platforms[this.selectedPlatformId];
    this.platforms[this.selectedPlatformId] = this.platforms[this.selectedPlatformId + 1];
    this.platforms[this.selectedPlatformId + 1] = tmp;
    this.selectedPlatformId ++;
    this.populatePlatformList();
};

StationSignsGenerator.prototype.validateInputs = function() {
    return true;
};

/**
 * Prepare the custom values to be used by the sample model.
 */
StationSignsGenerator.prototype.prepareModelData = function() {
    return {
        name: this.nameField.value.trim(),
        isBilingual: this.bilingualCheckbox.checked,
        hasExternal: this.externalCheckbox.checked,
        hasSmallPlates: this.smallCheckbox.checked,
        platforms: this.platforms
    };
};

StationSignsTranslationEn = function() {
    Translation.call(this);
    this.extend({
        "name" : "Station name",
        "nameHelp" : "Name of the station, max {0} lines, {1} characters in each.",
        "bilingual" : "Bilingual station name",
        "bilingualHelp" : "Treat second line as second language name in bilingual station names.",
        "external" : "Additional station sign",
        "externalHelp" : "Add plates with station symbol for external platforms.",
        "platformNumber" : "Platform number",
        "platformNumberHelp" : "Platform number, value from {0} to {1}.",
        "leftTrack" : "Left track number",
        "leftTrackHelp" : "Left track number, value from {0} to {1}.",
        "rightTrack" : "Right track number",
        "rightTrackHelp" : "Right track number, value from {0} to {1}.",
        "length" : "Platform length [m]",
        "lengthHelp" : "Platform length in metres, value from {0} to {1}.",
        "width" : "Platform width [m]",
        "widthHelp" : "Platform width in metres, value from {0} to {1}.",
        "directionLeft" : "Previous station name",
        "directionLeftHelp" : "Previous station name, max {0} lines, {1} characters in each.",
        "directionRight" : "Next station name",
        "directionRightHelp" : "Next station name, max {0} lines, {1} characters in each.",
        "tableWidth" : "Timetable holder modules",
        "tableWidthHelp" : "Width of sign above timetable holder in standard module widths, from {0} to {1}.",
        "sector" : "Use sector markings",
        "sectorHelp" : "Add sector markings to platform signs, aplicable to platforms over 300 m length.",
        "small" : "Additional small signs",
        "smallHelp" : "Add small variants of station signs.",
        "platform" : "platform {0}",
        "track" : "track {0}",
        "addBefore" : "Add before",
        "addAfter" : "Add after",
        "change" : "Change",
        "remove" : "Remove",
        "moveUp" : "Move up",
        "moveDown" : "Move down",
        "filename" : "station_signs_en{0}cl.pdf"});
};
StationSignsTranslationEn.prototype = Object.create(Translation.prototype);
StationSignsTranslationEn.prototype.constructor = StationSignsTranslationEn;

StationSignsTranslationPl = function() {
    TranslationPl.call(this);
    this.lang = "pl";
    this.extend({
        "name" : "Nazwa stacji",
        "nameHelp" : "Nazwa stacji, maksimum {0} wiersze, {1} znaków każdy.",
        "bilingual" : "Nazwa dwujęzyczna",
        "bilingualHelp" : "Traktuj drugi wiersz jako nazwa stacji w języku obcym.",
        "external" : "Dodatkowe oznakowanie stacji",
        "externalHelp" : "Dodaj znaki z symbolem stacji dla zewnętrznych peronów",
        "platformNumber" : "Numer peronu",
        "platformNumberHelp" : "Numer peronu, wartość od {0} do {1}.",
        "leftTrack" : "Numer toru po lewej",
        "leftTrackHelp" : "Numer toru po lewej stronie peronu, wartość od {0} do {1}.",
        "rightTrack" : "Numer toru po prawej",
        "rightTrackHelp" : "Numer toru po prawej stronie peronu, wartość od {0} do {1}.",
        "length" : "Długość peronu [m]",
        "lengthHelp" : "Długość peronu w metrach, wartość od {0} do {1}.",
        "width" : "Szerokość peronu [m]",
        "widthHelp" : "Szerokość peronu w metrach, wartość od {0} do {1}.",
        "directionLeft" : "Nazwa poprzedzającej stacji",
        "directionLeftHelp" : "Nazwa poprzedniej stacji, maksimum {0} wiersze, {1} znaków każdy.",
        "directionRight" : "Nazwa następnej stacji",
        "directionRightHelp" : "Nazwa następnej stacji, maksimum {0} wiersze, {1} znaków każdy.",
        "tableWidth" : "Moduły tablicy informacyjnej",
        "tableWidthHelp" : "Szerokość fryzu tablicy informacyjnej w modułach tej tablicy, od {0} do {1}.",
        "sector" : "Pokaż oznaczenia sektorów",
        "sectorHelp" : "Dodaj oznaczenia sektorów do oznakowania peronów, dotyczy peronów o długości powyżej 300m.",
        "small" : "Dodatkowe pomniejszone znaki",
        "smallHelp" : "Dodaj pomniejszone znaki (np. na wiaty)",
        "platform" : "peron {0}",
        "track" : "tor {0}",
        "addBefore" : "Dodaj przed",
        "addAfter" : "Dodaj za",
        "change" : "Zmień",
        "remove" : "Usuń",
        "moveUp" : "Przesuń wcześniej",
        "moveDown" : "Przesuń dalej",
        "repository" : "Repozytorium PKP",
        "filename" : "oznakowanie_stacji_pl{0}cl.pdf"});
};
StationSignsTranslationPl.prototype = Object.create(TranslationPl.prototype);
StationSignsTranslationPl.prototype.constructor = StationSignsTranslationPl;

StationSignsTranslationDe = function() {
    TranslationDe.call(this);
    this.lang = "de";
    this.extend({
        "name" : "Bahnhofsname",
        "nameHelp" : "Name des Bahnhofs, {0} Zeilen maximal, {1} Buchstaben in jeder Zeile.",
        "bilingual" : "zweisprachiger Bahnhofsname",
        "bilingualHelp" : "Zweite Zeile des Names ist in Fremdsprache.",
        "external" : "zusätzliche Bahnhofskennzeichung",
        "externalHelp" : "Zusätzliche Nametaflen für äußeren Bahnsteigen.",
        "platformNumber" : "Bahnsteignummer",
        "platformNumberHelp" : "Bahnsteignummer, von {0} bis {1}.",
        "leftTrack" : "Gleisnummer - links",
        "leftTrackHelp" : "Nummer des Gleis auf der linken Seite des Bahnsteigs, von {0} bis {1}.",
        "rightTrack" : "Gleisnummer - rechts",
        "rightTrackHelp" : "Nummer des Gleis auf der rechten Seite des Bahnsteigs, von {0} bis {1}.",
        "length" : "Bahnsteiglänge [m]",
        "lengthHelp" : "Länge des Bahnsteigs, von {0} bis {1}.",
        "width" : "Bahnsteigbreite [m]",
        "widthHelp" : "Breite des Bahnsteigs, von {0} bis {1}.",
        "directionLeft" : "Name des vorigen Bahnhof",
        "directionLeftHelp" : "Name des vorigen Bahnhof, {0} Zeilen maximal, {1} Buchstaben in jeder Zeile.",
        "directionRight" : "Name des folgenden Bahnhof",
        "directionRightHelp" : "Name des folgenden Bahnhof, {0} Zeilen maximal, {1} Buchstaben in jeder Zeile.",
        "tableWidth" : "Modulen der Fahrplantafel",
        "tableWidthHelp" : "Breite der Fahrplantafelshild in Modulen der Tafel, von {0} bis {1}.",
        "sector" : "Sektorkennzeichnung",
        "sectorHelp" : "Zusätzliche Sektorkennzeichnung für Bahnsteige länger als 300 m.",
        "small" : "Kleine Kennzeichnung",
        "smallHelp" : "Kleine Kennzeichnung z.B. für Bahnsteigüberdachung.",
        "platform" : "Bahnsteig {0}",
        "track" : "Gieis {0}",
        "addBefore" : "Zugeben vor",
        "addAfter" : "Zugeben hinter",
        "change" : "Ändern",
        "remove" : "Löschen",
        "moveUp" : "Verrücken nach vorne",
        "moveDown" : "Verrücken nach hinten",
        "repository" : "PKP Repositorium",
        "filename" : "bahnhofkennzeichnung_de{0}cl.pdf"});
};
StationSignsTranslationDe.prototype = Object.create(TranslationDe.prototype);
StationSignsTranslationDe.prototype.constructor = StationSignsTranslationDe;
