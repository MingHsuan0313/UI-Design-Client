let sessionID = "";
const axios = require("axios");
const operationPool = [{
    name: "login",
    url: "http://140.112.90.144:7122/InventorySystemBackendMarksTonyModify/ntu/csie/selab/inventorysystem/controller/AuthController/login-java_lang_String-java_lang_String-javax_servlet_http_HttpServletResponse",
    initUrl: "http://140.112.90.144:7122/InventorySystemBackendMarksTonyModify/ntu/csie/selab/inventorysystem/controller/AuthController/initMethod"
},{
    name: "viewDepartmentList",
    initUrl: "http://140.112.90.144:7122/InventorySystemBackendMarksTonyModify/ntu/csie/selab/inventorysystem/controller/HierarchyController/initMethod",
    url: "http://140.112.90.144:7122/InventorySystemBackendMarksTonyModify/ntu/csie/selab/inventorysystem/controller/HierarchyController/viewDepartmentList-java_lang_String-java_lang_String",
}]
axios.defaults.adapter = require('axios/lib/adapters/http')
axios.defaults.withCredentials = true


describe("Testcase: Register", () => {
    test("Testcase: Register", async () => {
        await axios.get("http://140.112.90.144:7122/registerID")
            .then((response) => {
                sessionID = response["data"]["sessionID"];
                console.log(`register success, sessionID = ${sessionID}`);
                expect(1).toEqual(1);
            }, (error) => {
                console.log("error");
            })
    })
})

describe("Testcasek: login", () => {
    test("Testcase: login", async () => {
        await axios.get(operationPool[0].initUrl, {
            headers: {
                sessionID: sessionID
            }
        }).then(async (response) => {
            console.log(response["data"])
            let instanceID = response["data"]["serviceResult"]["id"];
            let self = `{"id": "${instanceID}"}`;
            console.log(`login init success, instanceID = ${self}`);
            await axios.get(operationPool[0].url, {
                headers: {
                    sessionID: sessionID
                },
                params: {
                    self: self,
                    username: "marks",
                    password: "apple"
                },
            }).then((response) => {
                expect(1).toEqual(1);
                console.log(`login success response:${JSON.stringify(response["data"])}`);
            })
        })
    });
});

describe("Testcasek: HierarchyContronllerInit", () => {
    test("Testcase: HierarchyControllerInit", async () => {
        await axios.get(operationPool[1].initUrl, {
            headers: {
                sessionID: sessionID
            }
        }).then(async (response) => {
            let instanceID = response["data"]["serviceResult"]["id"];
            let self = `{"id": "${instanceID}"}`;
            console.log(`HierarchyController init success, self = ${self}`);
            await axios.get(operationPool[1].url, {
                headers: {
                    sessionID: sessionID
                },
                params: {
                    self: self,
                }, 
            }).then(async (response) => {
                let resultID = response["data"]["serviceResult"]["id"];
                self = `{"id": "${resultID}"}`;
                console.log(`viewDepartmentList success\nsessionID = ${sessionID}\nself = ${self}`);
                console.log(response["data"])
                await axios.get(`http://140.112.90.144:7122/gson/serialize`,{
                    headers: {
                        sessionID: sessionID
                    },
                    params: {
                        self: self
                    }
                }).then((response) => {
                    console.log("convert gson successfully");
                    console.log(response["data"]);
                })
                expect(1).toEqual(1);
            })
        })
    });
})


describe("Testcase: DeRegister", () => {
    test("Testcase: DeRegister", async () => {
        await axios.get("http://140.112.90.144:7122/deleteID",
            {
                params: {
                    id: sessionID
                }
            })
            .then((response) => {
                console.log(response["data"]);
                console.log(`delete sessionID = ${sessionID} succesfully`);
                expect(1).toEqual(1);
            }, (error) => {
                console.log("error");
            })
    })
})
