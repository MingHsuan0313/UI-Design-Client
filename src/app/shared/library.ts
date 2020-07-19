export const Library = {
  "genre": {
    "CoreUI": {
      "category": {
        "retrieving data": ["text", "table", "card", "inputgroup", "dropdown", "icon"],
        "submitting data": ["button", "inputgroup", "dropdown"],
        "navigation": ["text", "button"],
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
    "dropdown": ["items"],
    "table": ["headers", "rows"],
    "card": ["header", "componentList"],
    "inputgroup": ["componentList"]
  },

  // Composite component can composite the following components
  "compositeComponents": {
    "card": ["text", "button"],
    "inputgroup": ["text", "button", "icon"],
  },

  "componentValue": {
    "icon": ["text"],
    "text": ["text"],
    "button": ["text"],
    "table": ["headers", "rows"],
    "dropdown": ["items"],
    "card": ["header"]
  }
};

