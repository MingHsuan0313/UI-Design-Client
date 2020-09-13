export const Library = {
  "genre": {
    "CoreUI": {
      "category": {
        "Input Controls": ["input", "form", "dropdown"],
        "Navigational Components": ["text", "button", "breadcrumb"],
        "Informational Components": ["text", "table", "card", "icons"],
        "Containers": ["form", "card"],
      }
    },
    "Angular Material": {
      "category": {
        "Input Controls": [],
        "Navigational Components": [],
        "Informational Components": [],
        "Containers": [],
      }
    },
    "HTML": {
      "category": {
        "Input Controls": [],
        "Navigational Components": [],
        "Informational Components": [],
        "Containers": [],
      }
    }
  },

  // component properties
  "components": {
    "icon": ["text"],
    "text": ["text", "href"],
    "button": ["text", "href"],
    "input": ["typeInfo"],
    "dropdown": ["items"],
    "table": ["headers", "rows"],
    "card": ["header", "componentList"],
    "breadcrumb": ["componentList"],
    "inputgroup": ["componentList"],
    "form": ["componentList"]
  },

  // Composite component can composite the following components
  "compositeComponents": {
    "card": ["text", "dropdown", "button", "table"],
    "breadcrumb": ["text"],
    "inputgroup": ["text", "button", "icon", "dropdown"],
    "form": ["text", "button", "input", "dropdown"],
  },

  "componentValue": {
    "icon": ["text"],
    "text": ["text"],
    "button": ["text"],
    "table": ["headers", "rows"],
    "dropdown": ["items"],
    "card": ["header"],
    "breadcrumb": [],
    "input": [],
    "inputgroup": [],
  },

  // three kind of type
  // service
  // argument
  // none
  "UI_Service_Type": {
    "form": "service",
    "input": "argument",
    "table": "service",
  }
};


