/**
 * Framework of model generator.
 * @constructor
 * @param {string} inputFormName Name attribute of form element where model generator will be created.
 * @param {string} fontFolder Path to the location of font files.
 * @param {Array} models Models supported by this generator.
 * @param {Object} translation Translation used by this form.
 */
ModelGenerator = function(inputFormName, fontFolder, models, translation) {
    var self = this;
    if (!this.name) {
        this.name = "model_generator";
    }
    this.paperSizes = [ [2381.1023, 3367.5591], [1683.7795, 2381.1023], [1190.5512, 1683.7795], [841.8898, 1190.5512], [595.2756, 841.8898] ]; //A0 - A4 in points 72dpi
    this.generatorForm = document.getElementById(inputFormName);
    this.models = models;
    this.translation = translation;
    this.fontFolder = fontFolder;
    this.MIN_SCALE = 6;
    this.MAX_SCALE = 220;

    this.defaults = {paperSize: this.paperSizes.length - 1, scale: 25, style: 0};

    this.createInterface();
    this.createModel();

    this.generatorForm.addEventListener("submit", function(event){ self.createModel(); event.preventDefault(); } );
};

/**
 * Create additional controls in generator form (between Style combobox and submit buttons).
 * @abstract
 * @return {Array} Array with custom HTML elements to be added in the form.
 */
ModelGenerator.prototype.createCustomInterfacePart = function() {
    var customInterfacePart = [];
    return customInterfacePart;
};

/**
 * Create the UI of the generator in the HTML form element added to this generator.
 */
ModelGenerator.prototype.createInterface = function() {
    // main form panels
    var self = this;
    while (this.generatorForm.firstChild) {
        this.generatorForm.removeChild(this.generatorForm.firstChild);
    }
    var leftPane = document.createElement("div");
    leftPane.className = "left-pane";
    this.generatorForm.appendChild(leftPane);
    var rightPane = document.createElement("div");
    rightPane.className = "right-pane";
    this.generatorForm.appendChild(rightPane);

    // sheet size
    var paperSizeGroup = document.createElement("p");
    leftPane.appendChild(paperSizeGroup);
    var paperSizeLabel = document.createElement("label");
    paperSizeLabel.textContent = this.getTranslation("paperSize");
    paperSizeGroup.appendChild(paperSizeLabel);
    this.paperSizeField = document.createElement("select");
    paperSizeGroup.appendChild(this.paperSizeField);
    for (var i = 0; i < this.paperSizes.length; i++) {
        var paperSizeOption = document.createElement("option");
        paperSizeOption.value = i;
        paperSizeOption.textContent = "A" + i;
        this.paperSizeField.appendChild(paperSizeOption);
    }

    // model scale
    var scaleGroup = document.createElement("p");
    leftPane.appendChild(scaleGroup);
    var scaleLabel = document.createElement("label");
    scaleLabel.textContent = this.getTranslation("scale");
    scaleGroup.appendChild(scaleLabel);
    this.scaleField = document.createElement("input");
    this.scaleField.type = "number";
    this.scaleField.min = this.MIN_SCALE;
    this.scaleField.max = this.MAX_SCALE;
    this.scaleField.step = 0.5;
    this.scaleField.title = this.getTranslation("scaleHelp", [this.MIN_SCALE, this.MAX_SCALE]);
    scaleGroup.appendChild(this.scaleField);

    // model style
    var styleGroup = document.createElement("p");
    leftPane.appendChild(styleGroup);
    var styleLabel = document.createElement("label");
    styleLabel.innerHTML = this.getTranslation("style");
    styleGroup.appendChild(styleLabel);
    this.styleField = document.createElement("select");
    styleGroup.appendChild(this.styleField);
    for (i = 0; i < this.models.length; i++) {
        var styleOption = document.createElement("option");
        styleOption.value = i;
        styleOption.textContent = this.models[i].getName(this.translation.lang);
        this.styleField.appendChild(styleOption);
    }

    var customControls = this.createCustomInterfacePart();
    for (i = 0; i < customControls.length; i++)
    {
        leftPane.appendChild(customControls[i]);
    }

    // submit button
    var submitGroup = document.createElement("p");
    leftPane.appendChild(submitGroup);
    var submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.className = "submit";
    submitButton.value = this.getTranslation("submit");
    submitGroup.appendChild(submitButton);

    // reset button
    var resetButton = document.createElement("input");
    resetButton.type = "button";
    resetButton.className = "button";
    resetButton.value = this.getTranslation("reset");
    resetButton.addEventListener("click",function(event){ self.setDefaultSettings(); } );
    submitGroup.appendChild(resetButton);

    // download button
    this.downloadButton = document.createElement("a");
    this.downloadButton.textContent = this.getTranslation("download");
    this.downloadButton.className = "button";
    submitGroup.appendChild(this.downloadButton);

    // target iframe for PDF document
    this.iframe = document.createElement("iframe");
    rightPane.appendChild(this.iframe);

    // status text
    this.statusText = document.createElement("h1");
    this.statusText.textContent = this.getTranslation("generating");
    rightPane.appendChild(this.statusText);

    this.loadSettings();
};

/**
 * Save the parameters used to generate the latest model to browser's local storage.
 * @param {Object} modelData Custom data specific for a model generated.
 */
ModelGenerator.prototype.saveSettings = function(modelData) {
    if (typeof(Storage) === "undefined")
        return;
    var saveRecord = {
        paperSize : this.paperSizeField.selectedIndex,
        scale : parseInt(this.scaleField.value),
        style : this.styleField.selectedIndex,
        modelData : modelData
    };
    localStorage.setItem(this.name, JSON.stringify(saveRecord));
};

/**
 * Attempt to load form parameters from browser's local storage.
 */
ModelGenerator.prototype.loadSettings = function() {
    if (typeof(Storage) === "undefined") {
        this.setFormValues();
        return;
    }
    this.setFormValues( JSON.parse(localStorage.getItem(this.name)) );
};

/**
 * Populate custom form entries with data retrieved from local storage. If not possible use default values.
 * @abstract
 * @param {Object} data
 */
ModelGenerator.prototype.setCustomFormValues = function(data) {};

/**
 * Populate form entries with data retrieved from local storage. If not possible use default values.
 * @param {Object} data Form data from local storage.
 */
ModelGenerator.prototype.setFormValues = function(data) {
    if (data) {
        this.paperSizeField.selectedIndex = (data.paperSize === undefined ? this.defaults.paperSize : data.paperSize);
        this.scaleField.value = (data.scale === undefined ? this.defaults.scale : data.scale);
        this.styleField.selectedIndex = (data.style === undefined ? this.defaults.style : data.style);
        this.setCustomFormValues(data.modelData);
    }
    else {
        this.paperSizeField.selectedIndex = this.defaults.paperSize;
        this.scaleField.value = this.defaults.scale;
        this.styleField.selectedIndex = this.defaults.style;
        this.setCustomFormValues();
    }
};

/**
 * Populate form entries with default values.
 */
ModelGenerator.prototype.setDefaultSettings = function() {
    this.setFormValues();
};

/**
 * Check correctness of numeric input. Invalid field's class is set to "field-error".
 * @param {Object} input HTML form numeric input.
 * @param {number} minValue Minimum allowed value of the input.
 * @param {number} maxValue Maximum allowed value of the input.
 * @return {boolean} True if input value is valid (non-empty, numeric, within specified bounds). False otherwise.
 */
ModelGenerator.prototype.validateNumericInput = function(input, minValue, maxValue) {
    var strValue = input.value.trim();
    var value = Number(input.value);
    if (strValue === '' ||
        value === NaN ||
        value < minValue ||
        value > maxValue) {
        input.className = "field-error";
        return false;
    }
    input.className = "";
    return true;
};

/**
 * Check correctness of text input. Invalid field's class is set to "field-error".
 * @param {Object} input HTML form text input.
 * @param {number} minLength Minimum number of charactes in the field.
 * @param {number} maxLength Maximum number of charactes in the field.
 * @return {boolean} True if input value is valid (non-empty, text, length within specified bounds). False otherwise.
 */
ModelGenerator.prototype.validateStringInput = function(input, minLength, maxLength) {
    if (input.value === undefined ||
        typeof input.value != 'string' ||
        input.value.length < minLength ||
        input.value.length > maxLength) {
        input.className = "field-error";
        return false;
    }
    input.className = "";
    return true;
};

/**
 * Check if combobox/list has any entries.
 * @param {Object} input HTML form list input.
 * @return {boolean} True if input has any options. False otherwise.
 */
ModelGenerator.prototype.validateEmptyList = function(input) {
    if (input.hasChildNodes()){
        input.className = "";
        return true;
    }
    input.className = "field-error";
    return false;
};

/**
 * Validate fields of generator's form.
 * @abstract
 */
ModelGenerator.prototype.validateInputs = function() {
    return this.validateNumericInput(this.scaleField, this.MIN_SCALE, this.MAX_SCALE);
};

/**
 * Get and format translation string.
 * @param {string} id Tag of the translated string.
 * @param {Array} args Strings to be substituted in the translated string.
 * @return {string} If tag was found in Translation objetc, translated string with any wildcard (i.e. &#123;0&#125;, &#123;1&#125; etc. strings) replaced with respective elements of args array. If tag was not found - tag itself is returned.
 * @return {string} If tag was found in Translation objetc, translated string with any wildcard (i.e. &#123;0&#125;, &#123;1&#125; etc. strings) replaced with respective elements of args array. If tag was not found - tag itself is returned.
 */
ModelGenerator.prototype.getTranslation = function(id, args) {
    var msg = this.translation.strings[id];
    if (msg === undefined)
        return id;
    if (args === undefined)
        return msg;
    return msg.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;    });
};

/**
 * Collect and build object with data for a model.
 * @abstract
 * @return {Object} Data for the model.
 */
ModelGenerator.prototype.prepareModelData = function() {
    return {};
};

/**
 * Create model document.
 */
ModelGenerator.prototype.createModel = function() {
    if (!this.validateInputs()) return;
    this.iframe.style.display = "none";
    this.statusText.style.display = "block";
    this.statusText.textContent = this.getTranslation("generating");
    var modelData = this.prepareModelData();
    var model = this.models[this.styleField.selectedIndex];
    model.init(parseInt(this.scaleField.value), modelData);
    var doc = new ModelDocument({
        size: this.paperSizes[this.paperSizeField.selectedIndex],
        margin: 19.8425, //7mm
        info: {
            Title: this.getTranslation("title", [model.getName(this.translation.lang), model.scale]),
            Author: this.getTranslation("repository"),
            Copyright: this.getTranslation("footer", [new Date().getFullYear()])
        },
        model: model,
        completeCallback: this.modelCompleteCallback.bind(this),
        fontFolder: this.fontFolder,
    });
    doc.createDocument();
    this.saveSettings(modelData);
};

/**
 * When model document is ready, intercept pdf data and display it in generator's iframe. Prepare download link.
 */
ModelGenerator.prototype.modelCompleteCallback = function(blob) {
    this.iframe.src = blob;
    this.downloadButton.href = this.iframe.src;
    this.iframe.style.display = "initial";
    this.statusText.style.display = "none";
    this.downloadButton.download = this.getTranslation("filename", [("00" + this.scaleField.value).slice(-3)]);
};

/**
 * Generic English translation strings.
 * @constructor
 */
Translation = function() {
    this.lang = "en";
    this.strings = {"paperSize" : "Paper size",
                    "scale" : "Scale 1:",
                    "scaleHelp" : "Model scale, value from {0} to {1}.",
                    "style" : "Style",
                    "submit" : "Create",
                    "reset" : "Reset",
                    "download" : "Download",
                    "generating" : "One moment, please...",
                    "title" : "{0}, scale 1:{1}",
                    "repository" : "PKP Repository",
                    "filename" : "model{0}cl.pdf",
                    "footer" : "Author: Paweł Adamowicz (http://pkprepo.net/), {0}, selected rights reserved"};
};

/**
 * Add/substitute strings in translation object.
 * @param {Object} strings New or replacement translation strings.
 */
Translation.prototype.extend = function(strings) {
    for (var key in strings) {
        if(strings.hasOwnProperty(key)) {
            this.strings[key] = strings[key];
        }
    }
};

/**
 * Generic Polish translation strings.
 * @constructor
 */
TranslationPl = function() {
    this.lang = "pl";
    this.strings = {"paperSize" : "Format papieru",
                    "scale" : "Skala 1:",
                    "scaleHelp" : "Skala modelu, wartość od {0} do {1}.",
                    "style" : "Styl",
                    "submit" : "Generuj",
                    "reset" : "Resetuj",
                    "download" : "Pobierz",
                    "generating" : "Chwilkę...",
                    "title" : "{0}, skala 1:{1}",
                    "repository" : "Repozytorium PKP",
                    "filename" : "model{0}cl.pdf",
                    "footer" : "Opracował Paweł Adamowicz (http://pkprepo.net/), {0}, niektóre prawa zastrzeżone"};
};
TranslationPl.prototype = Object.create(Translation.prototype);
TranslationPl.prototype.constructor = TranslationPl;

/**
 * Generic German translation strings.
 * @constructor
 */
TranslationDe = function() {
    this.lang = "de";
    this.strings = {"paperSize" : "Blatt",
                    "scale" : "Maßtab 1:",
                    "scaleHelp" : "Maßtab des Modell, von {0} bis {1}.",
                    "style" : "Stil",
                    "submit" : "Erzeuge",
                    "reset" : "Zurücksetze",
                    "download" : "Herunterlade",
                    "generating" : "Ein Moment, bitte...",
                    "title" : "{0}, Maßtab 1:{1}",
                    "repository" : "PKP Repositorium",
                    "filename" : "modell{0}cl.pdf",
                    "footer" : "Bearbeitet bei Paweł Adamowicz (http://pkprepo.net/), {0}, ausgewählte Rechte vorbehalten"};
};
TranslationDe.prototype = Object.create(Translation.prototype);
TranslationDe.prototype.constructor = TranslationDe;
