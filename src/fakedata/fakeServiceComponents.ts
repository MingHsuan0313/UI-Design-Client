export let fakeServiceComponents = [
    {
        name: "addCategory",
        preference: 0.45,
        arguments: [
            {
                name: "uid",
                type: "string",
            },
            {
                name: "token",
                type: "string"
            },
            {
                name: "did",
                type: "string"
            },
            {
                name: "category",
                type: "categoryModel"
            }
        ],
        return: {
            name: "serviceResult",
            type: "string" // json string format (serialized)
        }
    },
    {
        name: "viewDepartmentList",
        preference: 0.25,
        arguments: [
            {
                name: "uid",
                type: "string"
            },
            {
                name: "token",
                type: "string"
            }
        ],
        return: {
            name: "serviceResult",
            type: "string" // json string format (serialized)
        }
    },
    {
        name: "addDepartment",
        preference: 0.03,
        arguments: [
            {
                name: "uid",
                type: "string"
            },
            {
                name: "token",
                type: "string"
            },
            {
                name: "department",
                type: "departmentModel"
            }
        ],
        return: {
            name: "serviceResult",
            type: "string" // json string format (serialized)
        }
    },
    {
        name: "login",
        preference: 0.13,
        arguments: [
            {
                name: "account",
                string: "string"
            },
            {
                name: "password",
                string: "string"
            }
        ],
        return: {
            name: "serviceResult",
            type: "string"
        }
    },
    {
        name: "addItem",
        preference: 0.04,
        arguments: [
            {
                name: "description",
                type: "string"
            },
            {
                name: "quantity",
                type: "string"
            },
            {
                name: "price",
                type: "string"
            },
            {
                name: "isNew",
                type: "Boolean"
            },
            {
                name: "condition",
                type: "String"
            }
        ]
    }
]