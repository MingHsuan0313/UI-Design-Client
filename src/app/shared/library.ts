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
    "icon": ["name","text"],
    "text": ["name","text", "href"],
    "button": ["name","text", "href"],
    "input": ["name","typeInfo"],
    "dropdown": ["name","items"],
    "table": ["name","headers", "rows"],
    "card": ["name","header", "componentList"],
    "breadcrumb": ["name","componentList"],
    "inputgroup": ["name","componentList"],
    "form": ["name","componentList"]
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


