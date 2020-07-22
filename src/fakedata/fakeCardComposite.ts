import { UIComponent, CardComposite, Text, Dropdown, Button, Table, tableHeader } from "src/app/models/modelDependency";

export let fakeCardComposite: CardComposite = new CardComposite({
        componentList: [
            new Text({
                href: "testref",
                id: "4",
                selector: "text",
                text: "test",
                type: "text"
            }), 
            new Button({
                href: "testref",
                id: "5",
                selector: "button",
                text: "test",
                type: "button"
            }),
            new Dropdown ({
                id:"13",
                items: ["old", "bad", "broken"],
                selector: "dropdown3",
                type: "dropdown"
            })
            // {
            //     headers: "header1 header2 header3",
            //     id: "6",
            //     rows: "11 22 33",
            //     selector: "table",
            //     type: "table"
            // }
        ],
        header: "fakeCardValue",
        id: "8",
        selector: "card9",
        type: "card",
})


