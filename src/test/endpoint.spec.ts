
describe("Filter function", () => {
    let axios = require('axios');
    test("test server connection", async () => {
        await axios.get('http://localhost:8081/selab/services/getReturn', {
            params: {
                serviceID: '2'
            }
        }).then((response) => {
            // console.log(typeof (response["data"]))
            // console.log(response["data"])
            let keys = Object.keys(response["data"])
            // for (let key of keys)
            //     console.log(key)
            expect(keys).toEqual(["name", "description", "category"])
        })
    });
});