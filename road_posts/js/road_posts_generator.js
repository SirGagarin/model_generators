RoadPostsGenerator = function(inputFormName, fontFolder, models, translation) {
    this.name = "road_post_generator";
    this.MIN_DISTANCE = 0.0;
    this.MAX_DISTANCE = 999.9;
    this.MIN_ROAD_NUMBER = 0;
    this.MAX_ROAD_NUMBER = 999;
    this.MIN_ADD_POSTS = 0;
    this.MAX_ADD_POSTS = 10;
    this.MIN_PHONE_DISTANCE = 100;
    this.MAX_PHONE_DISTANCE = 5000;
    this.modelDefaults ={start: 0.0, end: 10.0, roadNumber: 742, additionalPosts: 0, phoneStart: 0.0, phoneDistance: 1500};
    ModelGenerator.call(this, inputFormName, fontFolder, models, translation);
};
RoadPostsGenerator.prototype = Object.create(ModelGenerator.prototype);
RoadPostsGenerator.prototype.constructor = RoadPostsGenerator;

RoadPostsGenerator.prototype.adjustCapabilities = function(event) {
    var capabilities = this.models[this.styleField.selectedIndex].capabilities;
    this.roadNumberField.disabled = !capabilities.allowsRoadNumber;
    this.additionalPostsField.disabled = !capabilities.allowsAdditionalPosts;
    this.phoneCheckbox.disabled = !capabilities.allowsPhones;
    this.phoneStartField.disabled = !(this.phoneCheckbox.checked & capabilities.allowsPhones);
    this.phoneDistanceField.disabled = !(this.phoneCheckbox.checked & capabilities.allowsPhones);
};

RoadPostsGenerator.prototype.adjustPhoneFields = function(event) {
    this.phoneStartField.disabled = !this.phoneCheckbox.checked;
    this.phoneDistanceField.disabled = !this.phoneCheckbox.checked;
};

RoadPostsGenerator.prototype.createCustomInterfacePart = function() {
    var customInterfacePart = [];
    var self = this;
    this.styleField.addEventListener("input", function(event){ self.adjustCapabilities(event); });

    var startGroup = document.createElement("p");
    var startLabel = document.createElement("label");
    startLabel.textContent = this.getTranslation("startDistance");
    startGroup.appendChild(startLabel);
    this.startField = document.createElement("input");
    this.startField.type = "number";
    this.startField.min = this.MIN_DISTANCE;
    this.startField.max = this.MAX_DISTANCE;
    this.startField.step = 0.1;
    this.startField.title = this.getTranslation("startDistanceHelp", [this.MIN_DISTANCE, this.MAX_DISTANCE]);
    startGroup.appendChild(this.startField);
    customInterfacePart.push(startGroup);

    var endGroup = document.createElement("p");
    var endLabel = document.createElement("label");
    endLabel.textContent = this.getTranslation("endDistance");
    endGroup.appendChild(endLabel);
    this.endField = document.createElement("input");
    this.endField.type = "number";
    this.endField.min = this.MIN_DISTANCE;
    this.endField.max = this.MAX_DISTANCE;
    this.endField.step = 0.1;
    this.endField.title = this.getTranslation("endDistanceHelp", [this.MIN_DISTANCE, this.MAX_DISTANCE]);
    endGroup.appendChild(this.endField);
    customInterfacePart.push(endGroup);

    var roadNumberGroup = document.createElement("p");
    var roadNumberLabel = document.createElement("label");
    roadNumberLabel.textContent = this.getTranslation("roadNumber");
    roadNumberGroup.appendChild(roadNumberLabel);
    this.roadNumberField = document.createElement("input");
    this.roadNumberField.type = "number";
    this.roadNumberField.min = this.MIN_ROAD_NUMBER;
    this.roadNumberField.max = this.MAX_ROAD_NUMBER;
    this.roadNumberField.step = 1;
    this.roadNumberField.title = this.getTranslation("roadNumberHelp", [this.MIN_ROAD_NUMBER, this.MAX_ROAD_NUMBER]);
    roadNumberGroup.appendChild(this.roadNumberField);
    customInterfacePart.push(roadNumberGroup);
    
    var additionalPostsGroup = document.createElement("p");
    var additionalPostsLabel = document.createElement("label");
    additionalPostsLabel.textContent = this.getTranslation("additionalPosts");
    additionalPostsGroup.appendChild(additionalPostsLabel);
    this.additionalPostsField = document.createElement("input");
    this.additionalPostsField.type = "number";
    this.additionalPostsField.min = this.MIN_ADD_POSTS;
    this.additionalPostsField.max = this.MAX_ADD_POSTS;
    this.additionalPostsField.step = 1;
    this.additionalPostsField.title = this.getTranslation("additionalPostsHelp", [this.MIN_ADD_POSTS, this.MAX_ADD_POSTS]);
    additionalPostsGroup.appendChild(this.additionalPostsField);
    customInterfacePart.push(additionalPostsGroup);
    
    var phoneGroup = document.createElement("p");
    this.phoneCheckbox = document.createElement("input");
    this.phoneCheckbox.type = "checkbox";
    phoneGroup.appendChild(this.phoneCheckbox);
    var phoneLabel = document.createElement("label");
    phoneLabel.textContent = this.getTranslation("phone");
    phoneGroup.appendChild(phoneLabel);
    customInterfacePart.push(phoneGroup);
    this.phoneCheckbox.addEventListener("input", function(event){ self.adjustPhoneFields(event); });
    
    var phoneStartGroup = document.createElement("p");
    var phoneStartLabel = document.createElement("label");
    phoneStartLabel.textContent = this.getTranslation("phoneStart");
    phoneStartGroup.appendChild(phoneStartLabel);
    this.phoneStartField = document.createElement("input");
    this.phoneStartField.type = "number";
    this.phoneStartField.min = this.MIN_DISTANCE;
    this.phoneStartField.max = this.MAX_DISTANCE;
    this.phoneStartField.step = 0.1;
    this.phoneStartField.title = this.getTranslation("phoneStartHelp", [this.MIN_DISTANCE, this.MAX_DISTANCE]);
    phoneStartGroup.appendChild(this.phoneStartField);
    customInterfacePart.push(phoneStartGroup);
    
    var phoneDistanceGroup = document.createElement("p");
    var phoneDistanceLabel = document.createElement("label");
    phoneDistanceLabel.textContent = this.getTranslation("phoneDistance");
    phoneDistanceGroup.appendChild(phoneDistanceLabel);
    this.phoneDistanceField = document.createElement("input");
    this.phoneDistanceField.type = "number";
    this.phoneDistanceField.min = this.MIN_PHONE_DISTANCE;
    this.phoneDistanceField.max = this.MAX_PHONE_DISTANCE;
    this.phoneDistanceField.step = 1;
    this.phoneDistanceField.title = this.getTranslation("phoneDistanceHelp", [this.MIN_PHONE_DISTANCE, this.MAX_PHONE_DISTANCE]);
    phoneDistanceGroup.appendChild(this.phoneDistanceField);
    customInterfacePart.push(phoneDistanceGroup);
    
    var doubleGroup = document.createElement("p");
    this.doubleCheckbox = document.createElement("input");
    this.doubleCheckbox.type = "checkbox";
    doubleGroup.appendChild(this.doubleCheckbox);
    var doubleLabel = document.createElement("label");
    doubleLabel.textContent = this.getTranslation("double");
    doubleGroup.appendChild(doubleLabel);
    customInterfacePart.push(doubleGroup);

    return customInterfacePart;
};

RoadPostsGenerator.prototype.setCustomFormValues = function(data) {
    if (data) {
        this.startField.value = (data.start === undefined ? this.modelDefaults.start : data.start);
        this.endField.value = (data.end === undefined ? this.modelDefaults.end : data.end);
        this.roadNumberField.value = (data.roadNumber === undefined ? this.modelDefaults.roadNumber : data.roadNumber);
        this.additionalPostsField.value = (data.additionalPosts === undefined ? this.modelDefaults.additionalPosts : data.additionalPosts);
        this.phoneCheckbox.checked = data.hasPhone;
        this.phoneStartField.value = (data.phoneStart === undefined ? this.modelDefaults.phoneStart : data.phoneStart);
        this.phoneDistanceField.value = (data.phoneDistance === undefined ? this.modelDefaults.phoneDistance : data.phoneDistance);
        this.doubleCheckbox.checked = data.doubled;        
    }
    else {
        this.startField.value = this.modelDefaults.start;
        this.endField.value = this.modelDefaults.end;
        this.roadNumberField.value = this.modelDefaults.roadNumber;
    }
    var self = this;
    self.adjustCapabilities();
};

RoadPostsGenerator.prototype.prepareModelData = function() {
    var startDistance = parseFloat(this.startField.value),
        endDistance = parseFloat(this.endField.value);
    if (endDistance < startDistance) {
        tmp = endDistance;
        endDistance = startDistance;
        startDistance = tmp;
        this.startField.value = startDistance;
        this.endField.value = endDistance;
    }
    return {start: startDistance, 
            end: endDistance, 
            roadNumber: parseInt(this.roadNumberField.value), 
            additionalPosts: parseInt(this.additionalPostsField.value),
            hasPhone: this.phoneCheckbox.checked,
            phoneStart: parseFloat(this.phoneStartField.value),
            phoneDistance: parseInt(this.phoneDistanceField.value),
            doubled: this.doubleCheckbox.checked,
            };
};

RoadPostsTranslationEn = function() {
    Translation.call(this);
    this.extend({
        "startDistance": "Start distance",
        "startDistanceHelp": "Distance on the first post, value from {0} km to {1} km.",
        "endDistance": "End distance",
        "endDistanceHelp": "Distance on the last post, value from {0} km to {1} km.",
        "roadNumber": "Road number",
        "roadNumberHelp": "Road number, from {0} to {1}. Leave empty if no number should be present on the post.",
        "additionalPosts": "Addiotiona posts",
        "additionalPostsHelp": "Number of additional posts per hectometre, from {0} to {1}.",
        "phone": "Emergency phone mark",
        "phoneStart": "Location of first emergency phone",
        "phoneStartHelp": "Location of first emergency phone, value from {0} km to {1} km.",
        "phoneDistance": "Distance between emergency phones",
        "phoneDistanceHelp": "Distance between emergency phones, value from {0} m to {1} m.",
        "double": "Generate doube",
        "filename" : "road_posts{0}cl.pdf"
    });
};
RoadPostsTranslationEn.prototype = Object.create(Translation.prototype);
RoadPostsTranslationEn.prototype.constructor = RoadPostsTranslationEn;

RoadPostsTranslationPl = function() {
    TranslationPl.call(this);
    this.extend({
        "startDistance": "Początek",
        "startDistanceHelp": "Odległość na pierwszym słupku, wartość od {0} km do {1} km.",
        "endDistance": "Koniec",
        "endDistanceHelp": "Odległość na ostatnim słupku, wartość od {0} km do {1} km.",
        "roadNumber": "Numer drogi",
        "roadNumberHelp": "Numer drogi, od {0} do {1}. Jesśi niewypełnione, numer drogi nie będzie widoczny na słupku.",
        "additionalPosts": "Dodatkowe słupki",
        "additionalPostsHelp": "Liczba dodatkowych słupków na hektometr, wartość od {0} do {1}.",
        "phone": "Oznakowanie łączności alarmowej",
        "phoneStart": "Początek",
        "phoneStartHelp": "Położenie pierwszego punktu łączności alarmowej na tej drodze, wartość od {0} km do {1} km.",
        "phoneDistance": "Odległość",
        "phoneDistanceHelp": "Odległość między sąsiednimi punktami łączności alarmowej, wartość od {0} m do {1} m.",
        "double": "Generuj podwójnie",
        "filename" : "road_posts{0}cl.pdf"
    });
};
RoadPostsTranslationPl.prototype = Object.create(TranslationPl.prototype);
RoadPostsTranslationPl.prototype.constructor = RoadPostsTranslationPl;
