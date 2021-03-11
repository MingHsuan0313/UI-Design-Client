
// describe("getServices api", () => {
//     let axios = require('axios');
//     let url = 'http://localhost:8081/selab/services'
//     test("test get services", async () => {
//         await axios.get(`${url}/getServices`, {
//             params: {
//                 uiCategory: "input",
//                 parameterCount: 3,
//                 matchmaking: true,
//                 uiName: "test",
//                 uiType: "form"
//             }
//         }).then((response) => {
//             let keys = Object.keys(response["data"][0])
//             expect(keys).toEqual(["names","className","serviceID"])
//         })
//     })
// });

describe("ddd", () => {
    test('aaa', () => {
        expect(1).toEqual(1);
    })
})