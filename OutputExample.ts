// queryArgumentsByServiceID
// return
let argument2 = [
    "uid", "token", "aid"
]
let argument1 = [
    {
        "name": "uid",
        "type": "String",
        "annotationType": "CookieValue"
    },
    {
        "name": "token",
        "type": "String",
        "annotationType": "CookieValue"
    },
    {
        "name": "aid",
        "type": "String",
        "annotationType": "RequestParam"
    }
]

let argument3 = [
    "uid",
    "token",
    "validataion",
    "department"
]

let argument4 = [
    {
        "isComplexType": "false",
        "name": "uid",
        "type": "String",
        "annotationType": "CookieValue"
    },
    {
        "isComplexType": "false",
        "name": "token",
        "type": "String",
        "annotationType": "CookieValue"
    },
    {
        "isComplexType": "false",
        "name": "token",
        "type": "String",
        "annotationType": "None"
    },
    {
        "isComplexType": "true",
        "name": "department",
        "annotationType": "RequestParam",
        "initUrl": "",
        "arguments": [
            {
                "name": "name",
                "type": "String",
                "annotationType": "RequestParam",
                "isComplexType": "true",
                "setterUrl": ""
            },
            {
                "name": "description",
                "type": "String",
                "annotationType": "RequestParam",
                "isComplexType": "true",
                "setterUrl": ""
            },
            {
                "name": "code",
                "type": "String",
                "annotationType": "RequestParam",
                "isComplexType": "true",
                "setterUrl": ""
            }
        ]
    }
]

// goal
// login
// viewDepartmentList
// addDepartment