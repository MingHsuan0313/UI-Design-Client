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
        else
            return [];
    }

    static getProperties(type: string) {
        if (type == "text") {
            return [
                {
                    "type": "String",
                    "name": "name"
                },
                {
                    "type": "String",
                    "name": "href"
                }
            ]
        }
        else if (type == "button") {
            return [
                {
                    "type": "String",
                    "name": "name"
                },
                {
                    "type": "String",
                    "name": "href"
                },
                {
                    "type": "Boolean",
                    "name": "trigger"
                },
            ]
        }
        else if (type == "table") {
            return [
                {
                    "type": "String",
                    "name": "name"
                },
                {
                    "type": "String",
                    "name": "headers"
                },
                {
                    "type": "String",
                    "name": "rows"
                }
            ]
        }
        else if (type == "card") {
            return [
                {
                    "type": "String",
                    "name": "name"
                },
                {
                    "type": "String",
                    "name": "header"
                }
            ]

        }
        else if (type == "dropdown") {
            return [
                {
                    "type": "String",
                    "name": "name"
                },
                {
                    "type": "String",
                    "name": "items"
                }
            ]
        }
        else if (type == "icon") {
            return [
                {
                    "type": "String",
                    "name": "name"
                },
                {
                    "type": "String",
                    "name": "text"
                }
            ]

        }
        else if (type == "input") {
            return [
                {
                    "type": "String",
                    "name": "name"
                },
            ]
        }
        else if (type == "inputgroup") {
            return [
                {
                    "type": "String",
                    "name": "name"
                }
            ]
        }
        else if (type == "form") {
            return [
                {
                    "type": "String",
                    "name": "name"
                },
            ]

        }
        else if (type == "breadcrumb") {
            return [
                {
                    "type": "String",
                    "name": "name"
                },
                {
                    "type": "String",
                    "name": "items"
                }
            ]
        }
        else if (type == "layout") {

        }
    }
}