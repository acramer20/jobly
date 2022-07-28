const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
    test("works for one item", function () {
        const result = sqlForPartialUpdate(
           {firstName: "Asher"}, {firstName: "first_name", lastName: "last_name"}
        )
        expect(result).toEqual({
            setCols: "\"first_name\"=$1",
            values: ["Asher"],
        })
    })
});

describe("sqlForPartialUpdate for two", function () {
    test("works for two items/values", function () {
        const result = sqlForPartialUpdate(
            {firstName: "Asher", lastName: "Cramer"}, {firstName: "first_name", lastName: "last_name"}
        )
        expect(result).toEqual({
            setCols: "\"first_name\"=$1, \"last_name\"=$2",
            values: ["Asher", "Cramer"],
        });
    });
})