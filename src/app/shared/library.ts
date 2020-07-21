export const Library = {
  "genre": {
    "CoreUI": {
      "category": {
        "retrieving data": ["text", "table", "card", "inputgroup", "dropdown", "icon", "breadcrumb"],
        "submitting data": ["button", "inputgroup", "dropdown", "input"],
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
    "breadcrumb": ["items"],
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
    "breadcrumb": ["items"],
    "table": ["headers", "rows"],
    "dropdown": ["items"],
    "card": ["header"]
  }
};

