const index = require("../index1");
test('first Test', () => {

    const result = index.get('/status', (req, res) => {
        console.log("Looks like server is running ok");
        res.status(200).send("Looks like everything on API server is working");
        expect(result).toBe(1);
    });
});