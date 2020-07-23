export const Library = {
  "genre": {
    "CoreUI": {
      "category": {
        "retrieving data": ["text", "table", "card", "inputgroup", "dropdown", "icon", "breadcrumb","inputText"],
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
    "table": ["headers", "data"],
    "card": ["header", "componentList"],
    "inputgroup": ["componentList"]
  },

  // Composite component can composite the following components
  "compositeComponents": {
    "card": ["text","dropdown", "button", "table"],
    "inputgroup": ["text", "button", "icon", "dropdown"],
  },

  "componentValue": {
    "icon": ["text"],
    "text": ["text"],
    "button": ["text"],
    "breadcrumb": ["items"],
    "table": ["headers", "data"],
    "dropdown": ["items"],
    "card": ["header"]
  }
};

