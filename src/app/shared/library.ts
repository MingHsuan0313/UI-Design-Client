export const Library = {
  "genre": {
    "CoreUI": {
      "category": {
        "retrieving data": ["table", "card", "inputgroup", "dropdown", "icon"],
        "submitting data": ["text", "button", "inputgroup", "dropdown"],
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
    "card": ["text", "button", "table"],
    "inputgroup": ["text", "button", "icon", "dropdown"],
  },

  "componentValue": {
    "text": ["text"],
    "table": ["headers","rows"],
    "card": ["header"]
  }
};

