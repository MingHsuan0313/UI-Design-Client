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
    "breadcrumb": ["componentList"],
    "dropdown": ["items"],
    "table": ["headers", "rows"],
    "card": ["header", "componentList"],
    "inputgroup": ["componentList"],
    "form":["componentList"]
  },

  // Composite component can composite the following components
  "compositeComponents": {
    "card": ["text", "dropdown", "button", "table"],
    "inputgroup": ["text", "button", "icon", "dropdown"],
    "form": ["text", "button", "icon"],
    "breadcrumb": ["text"]
  },

  "componentValue": {
    "icon": ["text"],
    "text": ["text"],
    "button": ["text"],
    "breadcrumb": [],
    "table": ["headers", "rows"],
    "dropdown": ["items"],
    "card": ["header"],
    "input": [],
    "inputgroup": [],
  }
};

