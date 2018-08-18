SampleModelGenerator = function(_inputFormName, _fontFolder, _models, _translation) {
	this.name = "sample_model_generator";
	this.MIN_SIZE = 1;
	this.MAX_SIZE = 1000;
	this.MIN_AMOUNT = 1;
	this.MAX_AMOUNT = 100;
	this.modelDefaults ={width: 100, height:100, amount: 10};
	ModelGenerator.call(this, _inputFormName, _fontFolder, _models, _translation);
};
SampleModelGenerator.prototype = Object.create(ModelGenerator.prototype);
SampleModelGenerator.prototype.constructor = SampleModelGenerator;

SampleModelGenerator.prototype.createCustomInterfacePart = function() {
	var customInterfacePart = [];
	
	var widthGroup = document.createElement("p");
	var widthLabel = document.createElement("label");
	widthLabel.textContent = this.getTranslation("width");
	widthGroup.appendChild(widthLabel);
	this.widthField = document.createElement("input");
	this.widthField.type = "number";
	this.widthField.min = this.MIN_SIZE;
	this.widthField.max = this.MAX_SIZE;
	this.widthField.step = 1;
	this.widthField.title = this.getTranslation("widthHelp", [this.MIN_SIZE, this.MAX_SIZE]);
	widthGroup.appendChild(this.widthField);
	customInterfacePart.push(widthGroup);
	
	var heightGroup = document.createElement("p");
	var heightLabel = document.createElement("label");
	heightLabel.textContent = this.getTranslation("height");
	heightGroup.appendChild(heightLabel);
	this.heightField = document.createElement("input");
	this.heightField.type = "number";
	this.heightField.min = this.MIN_SIZE;
	this.heightField.max = this.MAX_SIZE;
	this.heightField.step = 1;
	this.heightField.title = this.getTranslation("heightHelp", [this.MIN_SIZE, this.MAX_SIZE]);
	heightGroup.appendChild(this.heightField);
	customInterfacePart.push(heightGroup);
	
	var amountGroup = document.createElement("p");
	var amountLabel = document.createElement("label");
	amountLabel.textContent = this.getTranslation("amount");
	amountGroup.appendChild(amountLabel);
	this.amountField = document.createElement("input");
	this.amountField.type = "number";
	this.amountField.min = this.MIN_AMOUNT;
	this.amountField.max = this.MAX_AMOUNT;
	this.amountField.step = 1;
	this.amountField.title = this.getTranslation("amountHelp", [this.MIN_AMOUNT, this.MAX_AMOUNT]);
	amountGroup.appendChild(this.amountField);
	customInterfacePart.push(amountGroup);
	
	return customInterfacePart;
};

SampleModelGenerator.prototype.setCustomFormValues = function(data) {
	if (data) {
		this.widthField.value = (data.width === undefined ? this.modelDefaults.width : data.width);
		this.heightField.value = (data.height === undefined ? this.modelDefaults.height : data.height);
		this.amountField.value = (data.amount === undefined ? this.modelDefaults.amount : data.amount);
	}
	else {
		this.widthField.value = this.modelDefaults.width;
		this.heightField.value = this.modelDefaults.height;
		this.amountField.value = this.modelDefaults.amount;
	}
};

SampleModelGenerator.prototype.prepareModelData = function() {
	return {width: parseInt(this.widthField.value), height: parseInt(this.heightField.value), amount: parseInt(this.amountField.value)};
};

SampleTranslationEn = function() {
	Translation.call(this);
	this.extend({
		"width": "Width",
		"widthHelp": "Life-size width, value from {0}mm to {1}mm.",
		"height": "Height",
		"heightHelp": "Life-size height, value from {0}mm to {1}mm.",
		"amount": "Amount",
		"amountHelp": "Amount of parts, value from {0} to {1}.",
		"filename" : "sample_model{0}cl.pdf"
	});
};
SampleTranslationEn.prototype = Object.create(Translation.prototype);
SampleTranslationEn.prototype.constructor = SampleTranslationEn;

SampleTranslationPl = function() {
	TranslationPl.call(this);
	this.extend({
		"width": "Szerokość",
		"widthHelp": "Rzeczywista szerokość, wartość od {0}mm do {1}mm.",
		"height": "Wysokość",
		"heightHelp": "Rzeczywista wysokość, wartość od {0}mm do {1}mm.",
		"amount": "Ilość",
		"amountHelp": "Liczba elementów do wygenerowania, wartość od {0} do {1}.",
		"filename" : "przykladowy_model{0}cl.pdf"
	});
};
SampleTranslationPl.prototype = Object.create(TranslationPl.prototype);
SampleTranslationPl.prototype.constructor = SampleTranslationPl;

SampleTranslationDe = function() {
	TranslationDe.call(this);
	this.extend({
		"width": "Breite",
		"widthHelp": "Wirkliche Breite, von {0} mm bis {1} mm.",
		"height": "Höhe",
		"heightHelp": "Wirkliche Höhe, von {0} mm bis {1} mm.",
		"amount": "Menge",
		"amountHelp": "Teilemenge zu erzeugen, von {0} bis {1}.",
		"filename" : "mustermodell{0}cl.pdf"
	});
};
SampleTranslationDe.prototype = Object.create(TranslationDe.prototype);
SampleTranslationDe.prototype.constructor = SampleTranslationDe;

SampleModel = function() {
	Model.call(this);
	this.name = {"pl":"Przykładowy model",
				 "en":"Sample model",
				 "de":"Mustermodell"};
};
SampleModel.prototype = Object.create(Model.prototype);
SampleModel.prototype.constructor = SampleModel;

SampleModel.prototype.init = function(scale, data) {
	Model.prototype.init.call(this, scale, data);
	this.parts.push(new SamplePart(this.scale, data.amount, {width: data.width, height: data.height}));
};

SamplePart = function(scale, amount, data) {
	Part.call(this, scale, amount);
	this.fillColor = "#BBBBBB";
	this.width = data.width;
	this.height = data.height;
};
SamplePart.prototype = Object.create(Part.prototype);
SamplePart.prototype.constructor = SamplePart;
SamplePart.prototype.getDimensions = function(doc) {
	if (this.width === 0 && this.height === 0)
	{
		var ptsPermm = 2.8346;
		this.width *= (ptsPermm / this.scale);
		this.height *= (ptsPermm / this.scale);
	}
	return [this.width, this.height];
};
SamplePart.prototype.draw = function(doc) {
	doc.rect(0, 0, this.width, this.height).lineWidth(this.strokeWidth).fillAndStroke(this.fillColor, this.borderColor);
};