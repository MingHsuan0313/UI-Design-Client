export let fakeServiceComponents = [
    {
        name: "addCategory",
        className: "HierarchyController",
        preference: 0.45,
        connectDB: true,
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
        className: "HierarchyController",
        preference: 0.25,
        connectDB: true,
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
        className: "HierarchyController",
        preference: 0.03,
        connectDB: true,
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
        className: "AuthController",
        preference: 0.13,
        connectDB: true,
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
        className: "HierarchyController",
        preference: 0.04,
        connectDB: true,
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