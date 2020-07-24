export const Library = {
  "genre": {
    "CoreUI": {
      "category": {
        "retrieving data": ["text", "table", "card", "inputgroup", "dropdown", "icon", "breadcrumb"],
        "submitting data": ["button", "inputgroup", "dropdown", "input", "form"],
        "navigation": ["text", "button", "breadcrumb"],
        "prompt": [],
      }
    },
    "Angular Material": {
      "category": {
        "retrieving data": [],
        "submitting data": [],
        "navigation": [],
        "prompt": [],
      }
    },
    "HTML": {
      "category": {
        "retrieving data": [],
        "submitting data": [],
        "navigation": [],
        "prompt": [],
      }
    }
  },

  // component properties
  "components": {
    "icon": ["text"],
    "text": ["text", "href"],
    "button": ["text", "href"],
    "input": ["type"],
<<<<<<< HEAD
    "breadcrumb": ["componentList"],
=======
>>>>>>> c8eadd46ac0fcbe8ebd32706e6778067ec9eedea
    "dropdown": ["items"],
    "table": ["headers", "rows"],
    "card": ["header", "componentList"],
    "breadcrumb": ["componentList"],
    "inputgroup": ["componentList"],
    "form":["componentList"]
  },

  // Composite component can composite the following components
  "compositeComponents": {
    "card": ["text", "dropdown", "button", "table"],
    "breadcrumb": ["text"],
    "inputgroup": ["text", "button", "icon", "dropdown"],
<<<<<<< HEAD
    "form": ["text", "button", "icon"],
    "breadcrumb": ["text"]
=======
    "form": ["text", "button", "input"]
>>>>>>> c8eadd46ac0fcbe8ebd32706e6778067ec9eedea
  },

  "componentValue": {
    "icon": ["text"],
    "text": ["text"],
    "button": ["text"],
<<<<<<< HEAD
    "breadcrumb": [],
=======
>>>>>>> c8eadd46ac0fcbe8ebd32706e6778067ec9eedea
    "table": ["headers", "rows"],
    "dropdown": ["items"],
    "card": ["header"],
    "breadcrumb": [],
    "input": [],
    "inputgroup": [],
  }
};


