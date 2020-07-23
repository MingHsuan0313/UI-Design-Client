import { Table, tableHeader } from "src/app/models/modelDependency";

export let fakeTable: Table = new Table({
    headers: [
        {headerName: "Text1", componentType: "text"},
        {headerName: "Text2", componentType: "text"},
        {headerName: "Text3", componentType: "text"}
    ],
    data: [
        [1, 3, 3],
        [2, 7, 5],
        [1, 1, 1]
    ],
    id: "31",
    selector: "table3",
    type: "table"
})