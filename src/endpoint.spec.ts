const axios = require('axios');

describe("Filter function", () => {
    test("it should filter by a search term (link)", async () => {
        const input = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.link3.dev" }
        ];
        await axios.get('http://localhost:8081/selab/services/getReturn', {
            params: {
                serviceID: '2'
            }
        })
            .then((response) => {
                console.log(typeof (response["data"]))
                console.log(response["data"])
                let keys = Object.keys(response["data"])
                for(let key of keys)
                    console.log(key)
                expect(keys).toEqual(["name","descriptions","category"])
            })
    });
});