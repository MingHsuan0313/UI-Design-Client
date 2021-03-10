export class UIComponentConfig {
    static getAllComponentTypes() {
        return [
            "text",
            "button",
            "card",
            "dropdown",
            "input",
            "form",
        ]
    }

    static getChildrenOptions(type: string) {
        if (type == "form") {
            return ["text", "button", "input", "dropdown"];
        }
        else if (type == "card") {
            return ["text", "dropdown", "button", "table","input"]
        }
        else if (type == "inputgroup") {
            return ["text", "button", "icon", "dropdown"];
        }
        else if (type == "breadcrumb") {
            return ["text"];
        }
        else
            return [];
    }

    static getProperties(type: string) {
        if (type == "text") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "href"
                }
            ]
        }
        else if (type == "button") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "href"
                },
                {
                    "type": "Boolean",
                    "value": "trigger"
                },
            ]
        }
        else if (type == "table") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "headers"
                },
                {
                    "type": "String",
                    "value": "rows"
                }
            ]
        }
        else if (type == "card") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "header"
                }
            ]

        }
        else if (type == "dropdown") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "items"
                }
            ]
        }
        else if (type == "icon") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "text"
                }
            ]

        }
        else if (type == "input") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
            ]
        }
        else if (type == "inputgroup") {
            return [
                {
                    "type": "String",
                    "value": "name"
                }
            ]
        }
        else if (type == "form") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
            ]

        }
        else if (type == "breadcrumb") {
            return [
                {
                    "type": "String",
                    "value": "name"
                }
            ]
        }
        else if (type == "layout") {

        }
    }

}