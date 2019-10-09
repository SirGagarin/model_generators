# Model generators
Various JavaScript apps to generate PDF documents with signs, plates, posts etc. for railway models and scale layouts. Using [pdfkit by devongovett](https://github.com/devongovett/pdfkit).

Currently availabe *generators*:
* *example* - Sample application to present how to use the base classes.
* *road_posts* - Road kilometer/hectometer posts and plates.
* *signal_box_signs* - Signs designating signal boxes and other railway posts.
* *station_signs* - Signs with station's name and platforms numbers.

Each app uses the base classes from main `js` folder:
* `ModelGenerator` - builds generator's UI and delivers the interface to document creation.
* `ModelDocument` - a PDF document with constant page template (inherits from the [pdfkit's](https://github.com/devongovett/pdfkit) `PDFDocument`).
* `Model` - container for the parts of the specific model, also responsible for cretaing those parts.
* `Part` - a single part, an element that is actually drawn in the document.
* `Translation` - contains strings required for localization of the generator.