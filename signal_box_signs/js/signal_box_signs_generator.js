function SignalBoxSignsGenerator(inputFormName, fontFolder, models, translation) {
    this.name = "signal_box_signs_generator";
    this.posts = [];
    this.selectedPostId = 0;
    this.postsTypes = new SignalBoxTypes();
    this.NAME_MAX_COLS = 30;
    this.NAME_MAX_ROWS = 2;
    this.SYMBOL_MAX_COLS = 5;
    this.MIN_POST_NUMBER = 1;
    this.MAX_POST_NUMBER = 99;
    this.MIN_DISTANCE = 0.0;
    this.MAX_DISTANCE = 999.999;
    this.modelDefaults = {posts: [
                new SignalBox(this.postsTypes.SIGNAL_BOX, "Dąbrowa", "Db", NaN, NaN, false),
                new SignalBox(this.postsTypes.SIGNAL_BOX, "Dąbrowa", "Db1", NaN, NaN, false),
                new SignalBox(this.postsTypes.SIGNAL_BOX, "Post. odg. Zalesie", "Za", NaN, NaN, false),
                new SignalBox(this.postsTypes.POINT_POST, "", "", 10, NaN, true),
                new SignalBox(this.postsTypes.END_SIGN_POST, "", "", NaN, NaN, true),
                new SignalBox(this.postsTypes.END_SIGN_POST, "", "", 2, NaN, true),
                new SignalBox(this.postsTypes.CROSSING_POST, "", "", 1, 10.125, true),
                new SignalBox(this.postsTypes.CROSSING_POST, "", "", 2, NaN, true),
                new SignalBox(this.postsTypes.CROSSING_POST, "", "", NaN, 12.345, true),
        ]};
    ModelGenerator.call(this, inputFormName, fontFolder, models, translation);
}
SignalBoxSignsGenerator.prototype = Object.create(ModelGenerator.prototype);
SignalBoxSignsGenerator.prototype.constructor = SignalBoxSignsGenerator;

SignalBoxSignsGenerator.prototype.createCustomInterfacePart = function() {
    var customInterfacePart = [];
    var self = this;

    // signal box type
    var typeGroup = document.createElement("p");
    var typeLabel = document.createElement("label");
    typeLabel.innerHTML = this.getTranslation("type");
    typeGroup.appendChild(typeLabel);
    this.typeField = document.createElement("select");
    typeGroup.appendChild(this.typeField);
    for (i = 0; i < this.postsTypes.names.length; i++) {
        var typeOption = document.createElement("option");
        typeOption.value = i;
        typeOption.textContent = this.getTranslation(this.postsTypes.names[i]);
        this.typeField.appendChild(typeOption);
    }
    this.typeField.addEventListener("input", function(event){ self.adjustCapabilities(event); });
    customInterfacePart.push(typeGroup);
    
    // name input
    var nameGroup = document.createElement("p");
    var nameLabel = document.createElement("label");
    nameLabel.textContent = this.getTranslation("name");
    nameGroup.appendChild(nameLabel);
    this.nameField = document.createElement("textarea");
    this.nameField.cols = this.NAME_MAX_COLS;
    this.nameField.rows = this.NAME_MAX_ROWS;
    this.nameField.title = this.getTranslation("nameHelp", [this.NAME_MAX_ROWS, this.NAME_MAX_COLS]);
    this.nameField.addEventListener("keypress", function(event){ self.validateName(event); } );
    nameGroup.appendChild(this.nameField);
    customInterfacePart.push(nameGroup);
    
    // signal box symbol input
    var symbolGroup = document.createElement("p");
    var symbolLabel = document.createElement("label");
    symbolLabel.textContent = this.getTranslation("symbol");
    symbolGroup.appendChild(symbolLabel);
    this.symbolField = document.createElement("input");
    this.symbolField.maxLength = this.SYMBOL_MAX_COLS;
    this.symbolField.title = this.getTranslation("symbolHelp", [this.SYMBOL_MAX_COLS]);
    symbolGroup.appendChild(this.symbolField);
    customInterfacePart.push(symbolGroup);
    
    // post number
    var postNumberGroup = document.createElement("p");
    var postNumberLabel = document.createElement("label");
    postNumberLabel.textContent = this.getTranslation("postNumber");
    postNumberGroup.appendChild(postNumberLabel);
    this.postNumberField = document.createElement("input");
    this.postNumberField.type = "number";
    this.postNumberField.min = this.MIN_POST_NUMBER;
    this.postNumberField.max = this.MAX_POST_NUMBER;
    this.postNumberField.step = 1;
    this.postNumberField.title = this.getTranslation("postNumberHelp", [this.MIN_POST_NUMBER, this.MAX_POST_NUMBER]);
    postNumberGroup.appendChild(this.postNumberField);
    customInterfacePart.push(postNumberGroup);

    // post location
    var locationGroup = document.createElement("p");
    var locationLabel = document.createElement("label");
    locationLabel.textContent = this.getTranslation("location");
    locationGroup.appendChild(locationLabel);
    this.locationField = document.createElement("input");
    this.locationField.type = "number";
    this.locationField.min = this.MIN_DISTANCE;
    this.locationField.max = this.MAX_DISTANCE;
    this.locationField.step = 0.001;
    this.locationField.title = this.getTranslation("locationHelp", [this.MIN_DISTANCE, this.MAX_DISTANCE]);
    locationGroup.appendChild(this.locationField);
    customInterfacePart.push(locationGroup);

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
    
    // post modification buttons
    var modGroup = document.createElement("p");
    var addBeforeButton = document.createElement("input");
    addBeforeButton.type = "button";
    addBeforeButton.className = "button edit-button add-before";
    addBeforeButton.title = this.getTranslation("addBefore");
    addBeforeButton.addEventListener("click",function(event){ self.addPostBefore(); } );
    modGroup.appendChild(addBeforeButton);
    var addAfterButton = document.createElement("input");
    addAfterButton.type = "button";
    addAfterButton.className = "button edit-button add-after";
    addAfterButton.title = this.getTranslation("addAfter");
    addAfterButton.addEventListener("click",function(event){ self.addPostAfter(); } );
    modGroup.appendChild(addAfterButton);
    var changeButton = document.createElement("input");
    changeButton.type = "button";
    changeButton.className = "button edit-button change";
    changeButton.title = this.getTranslation("change");
    modGroup.appendChild(changeButton);
    changeButton.addEventListener("click",function(event){ self.changePost(); } );
    var removeButton = document.createElement("input");
    removeButton.type = "button";
    removeButton.className = "button edit-button remove";
    removeButton.title = this.getTranslation("remove");
    removeButton.addEventListener("click",function(event){ self.removePost(); } );
    modGroup.appendChild(removeButton);
    var moveUpButton = document.createElement("input");
    moveUpButton.type = "button";
    moveUpButton.className = "button edit-button move-up";
    moveUpButton.title = this.getTranslation("moveUp");
    moveUpButton.addEventListener("click",function(event){ self.movePostUp(); } );
    modGroup.appendChild(moveUpButton);
    var moveDownButton = document.createElement("input");
    moveDownButton.type = "button";
    moveDownButton.className = "button edit-button move-down";
    moveDownButton.title = this.getTranslation("moveDown");
    moveDownButton.addEventListener("click",function(event){ self.movePostDown(); } );
    modGroup.appendChild(moveDownButton);
    customInterfacePart.push(modGroup);

    // list of signal boxes/posts
    var postsListGroup = document.createElement("p");
    this.postsList = document.createElement("select");
    this.postsList.size = 5;
    postsListGroup.appendChild(this.postsList);
    this.postsList.addEventListener("input",function(event){ self.postSelectCallback(); } );
    customInterfacePart.push(postsListGroup);

    return customInterfacePart;
};


SignalBoxSignsGenerator.prototype.enableField = function(field, enabled) {
    field.disabled = !enabled;
    if (field.disabled)
    {
        field.value = "";
    }
}

SignalBoxSignsGenerator.prototype.adjustCapabilities = function(event) {
    var capabilities = this.postsTypes.capabilities[this.typeField.selectedIndex];
    this.enableField(this.nameField, capabilities.hasName);
    this.enableField(this.symbolField, capabilities.hasSymbol);
    this.enableField(this.postNumberField, capabilities.hasNumber);
    this.enableField(this.locationField, capabilities.hasDistance);
};

SignalBoxSignsGenerator.prototype.validateName = function(event) {
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

SignalBoxSignsGenerator.prototype.setCustomFormValues = function(data) {
    if (data) {
        if (data.posts === undefined) {
            this.posts = this.modelDefaults.posts;
        }
        else {
            this.posts = [];
            for (var i = 0; i < data.posts.length; i++) {
                this.posts.push(new SignalBox(data.posts[i].type, data.posts[i].name, data.posts[i].symbol, data.posts[i].number, data.posts[i].distance, data.posts[i].smallSigns));
            }
        }
    }
    else {
        this.posts = this.modelDefaults.posts;
    }
    this.selectedPostId = 0;
    this.populatePostsList();
};

SignalBoxSignsGenerator.prototype.populatePostsList = function() {
    while (this.postsList.hasChildNodes()) {
        this.postsList.removeChild(this.postsList.lastChild);
    }
    for (var i = 0; i < this.posts.length; i++) {
        var postOption = document.createElement("option");
        postOption.value = i;
        postOption.textContent = (this.getTranslation(this.postsTypes.names[this.posts[i].type]) + " " + this.posts[i].getName() );
        if (i == this.selectedPostId) {
            postOption.selected = true;
        }
        this.postsList.appendChild(postOption);
    }
    this.postSelectCallback();
};

SignalBoxSignsGenerator.prototype.postSelectCallback = function() {
    if (!this.posts.length)
        return;
    this.selectedPostId = this.postsList.selectedIndex;
    if (this.selectedPostId < 0) {
        this.selectedPostId = 0;
        this.postsList.selectedIndex = 0;
    }
    this.typeField.selectedIndex = this.posts[this.selectedPostId].type;
    this.nameField.value = this.posts[this.selectedPostId].name;
    this.symbolField.value = this.posts[this.selectedPostId].symbol;
    this.postNumberField.value = this.posts[this.selectedPostId].number?this.posts[this.selectedPostId].number:"";
    this.locationField.value = (this.posts[this.selectedPostId].distance || this.posts[this.selectedPostId].distance === 0)?this.posts[this.selectedPostId].distance:"";
    this.smallCheckbox.checked = this.posts[this.selectedPostId].smallSigns;
    this.adjustCapabilities(null);
};

SignalBoxSignsGenerator.prototype.addPostBefore = function() {
    if (!this.validatePostInput())
        return;
    this.posts.splice(this.selectedPostId, 0,
        new SignalBox(this.typeField.selectedIndex,
                    this.nameField.value,
                    this.symbolField.value,
                    parseInt(this.postNumberField.value),
                    parseFloat(this.locationField.value),
                    this.smallCheckbox.checked));
    this.populatePostsList();
};

SignalBoxSignsGenerator.prototype.addPostAfter = function() {
    this.selectedPostId++;
    this.addPostBefore();
};

SignalBoxSignsGenerator.prototype.changePost = function() {
    if (!this.posts.length) 
        return;
    if (!this.validatePostInput())
        return;
    this.posts[this.selectedPostId].type = this.typeField.selectedIndex;
    this.posts[this.selectedPostId].name = this.nameField.value;
    this.posts[this.selectedPostId].symbol = this.symbolField.value;
    this.posts[this.selectedPostId].number = parseInt(this.postNumberField.value);
    this.posts[this.selectedPostId].distance = parseFloat(this.locationField.value);
    this.posts[this.selectedPostId].smallSigns = this.smallCheckbox.checked;
    this.populatePostsList();
};

SignalBoxSignsGenerator.prototype.removePost = function() {
    if (!this.posts.length)
        return;
    this.posts.splice(this.selectedPostId, 1);
    if (this.selectedPostId >= this.posts.length)
        this.selectedPostId = this.posts.length - 1;
    this.populatePostsList();
};

SignalBoxSignsGenerator.prototype.movePostUp = function() {
    if (this.selectedPostId <= 0)
        return;
    var tmp = this.posts[this.selectedPostId];
    this.posts[this.selectedPostId] = this.posts[this.selectedPostId - 1];
    this.posts[this.selectedPostId - 1] = tmp;
    this.selectedPostId--;
    this.populatePostsList();
};

SignalBoxSignsGenerator.prototype.movePostDown = function() {
    if (this.selectedPostId >= (this.posts.length - 1))
        return;
    var tmp = this.posts[this.selectedPostId];
    this.posts[this.selectedPostId] = this.posts[this.selectedPostId + 1];
    this.posts[this.selectedPostId + 1] = tmp;
    this.selectedPostId ++;
    this.populatePostsList();
};

SignalBoxSignsGenerator.prototype.validateInputs = function() {
    var hasErrors = ModelGenerator.prototype.validateInputs.call(this);
    hasErrors &= this.validateEmptyList(this.postsList);
    return hasErrors;
};

SignalBoxSignsGenerator.prototype.validatePostInput = function() {
    var hasErrors = true;
    var capabilities = this.postsTypes.capabilities[this.typeField.selectedIndex];
    if (capabilities.hasName) {
        this.nameField.value = this.nameField.value.trim();
        hasErrors &= this.validateStringInput(this.nameField, 1, this.NAME_MAX_COLS * this.NAME_MAX_ROWS + 1);
    }
    if (capabilities.hasSymbol) {
        this.symbolField.value = this.symbolField.value.trim();
        hasErrors &= this.validateStringInput(this.symbolField, 1, this.SYMBOL_MAX_COLS);
    }
    this.postNumberField.className = "";
    this.locationField.className = "";
    if (capabilities.hasNumber) {
        this.postNumberField.value = this.postNumberField.value.trim();
        if (capabilities.numberObligatory) {
            if (this.postNumberField.value === "") {
                hasErrors = false;
                this.postNumberField.className = "field-error";
            }
            else {
                hasErrors &= this.validateNumericInput(this.postNumberField, this.MIN_POST_NUMBER, this.MAX_POST_NUMBER);
            }
        }           
    }
    if (capabilities.hasDistance) {
        this.locationField.value = this.locationField.value.trim();
    }
    if (capabilities.numberOrDistanceObligatory)
    {
        if (this.postNumberField.value === "" && this.locationField.value === "") {
            hasErrors = false;
            this.postNumberField.className = "field-error";
            this.locationField.className = "field-error";
        }
        if (this.postNumberField.value !== "") {
            hasErrors &= this.validateNumericInput(this.postNumberField, this.MIN_POST_NUMBER, this.MAX_POST_NUMBER);
        }
        if (this.locationField.value !== "") {
            hasErrors &= this.validateNumericInput(this.locationField, this.MIN_DISTANCE, this.MAX_DISTANCE);
        }
    }
    return hasErrors;
};


/**
 * Prepare the custom values to be used by the sample model.
 */
SignalBoxSignsGenerator.prototype.prepareModelData = function() {
    return {
        posts: this.posts
    };
};

SignalBoxSignsTranslationEn = function() {
    Translation.call(this);
    this.extend({
        "type" : "Post type",
        "signal_box" : "Signal box", 
        "point_post" : "Shunting crew box", 
        "end_sign_post" : "Train end signal control post", 
        "crossing_post" : "Railway crossing post",
        "name" : "Post name",
        "nameHelp" : "Name of the signal box or post, max {0} lines, {1} characters in each.",
        "symbol" : "Signal box symbol",
        "symbolHelp" : "Symbol of the signal box, max {0} characters.",
        "postNumber" : "Post number",
        "postNumberHelp" : "Number of the post, from {0} to {1}.",
        "location" : "Post location",
        "locationHelp" : "Post location on the rail line, value from {0} to {1} km.",
        "small" : "Small signs",
        "smallHelp" : "Use small variants of signs.",
        "addBefore" : "Add before",
        "addAfter" : "Add after",
        "change" : "Change",
        "remove" : "Remove",
        "moveUp" : "Move up",
        "moveDown" : "Move down",
        "filename" : "station_signs_en{0}cl.pdf"});
};
SignalBoxSignsTranslationEn.prototype = Object.create(Translation.prototype);
SignalBoxSignsTranslationEn.prototype.constructor = SignalBoxSignsTranslationEn;

SignalBoxSignsTranslationPl = function() {
    TranslationPl.call(this);
    this.lang = "pl";
    this.extend({
        "type" : "Rodzaj posterunku",
        "signal_box" : "Nastawnia", 
        "point_post" : "Posterunek zwrotniczych", 
        "end_sign_post" : "Posterunek stwierdzania końca pociągu", 
        "crossing_post" : "Posterunek dróżnika przejazdowego",
        "name" : "Nazwa",
        "nameHelp" : "Nazwa posterunku, do {0} wierszy, do {1} znaków w wierszu.",
        "symbol" : "Symbol nastawni",
        "symbolHelp" : "Symbol nastawni, do {0} znaków.",
        "postNumber" : "Numer posterunku",
        "postNumberHelp" : "Numer posterunku ruchu, od {0} do {1}.",
        "location" : "Położenie posterunku",
        "locationHelp" : "Pikietaż linii w miejscu położenia posterunku, od {0} do {1} km.",
        "small" : "Pomniejszone oznakowanie",
        "smallHelp" : "Uzyj pomniejszonego oznakowania.",
        "addBefore" : "Dodaj przed",
        "addAfter" : "Dodaj za",
        "change" : "Zmień",
        "remove" : "Usuń",
        "moveUp" : "Przesuń wcześniej",
        "moveDown" : "Przesuń dalej",
        "repository" : "Repozytorium PKP",
        "filename" : "oznakowanie_posterunkow_pl{0}cl.pdf"});
};
SignalBoxSignsTranslationPl.prototype = Object.create(TranslationPl.prototype);
SignalBoxSignsTranslationPl.prototype.constructor = SignalBoxSignsTranslationPl;

