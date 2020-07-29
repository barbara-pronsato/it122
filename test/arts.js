const expect    = require("chai").expect;
const art = require("../data");

describe("Get Art Items", () => {
    it("return requested art item", () => {
        const result = art.getItem(2)
        expect(result).to.deep.equal({
            status: "success",
            data: {
                title: "Walk", 
                type: "photography", 
                price: 100, 
                media: "Gelatin Silver", 
                artist_name: "Eric Fromm", 
                id: 2
            }
        })
    });
    it("return error due to invalid art item", () => {
        const result = art.getItem(999)
        expect(result).to.deep.equal({
            status: 'failure', 
            message: 'Artwork with ID 999 not found'
        })
    });
});

describe("Add Art Item", () => {
    it("add an item to the list of art items", () => {
        const result = art.addItem({
            title: "Hello World", 
            type: "sculpture", 
            price: 444, 
            media: "Bronze", 
            artist_name: "Zoe de Cat", 
            id: 5
        })
        expect(result).to.deep.equal({
            status: 'success',
            message: "Hello World added to the list of art items"
        })
    });
    it("return error due to invalid art item", () => {
        const result = art.addItem({
            type: "sculpture", 
            price: 444, 
            media: "Bronze", 
            artist_name: "Zoe de Cat", 
            id: 5
        })
        expect(result).to.deep.equal({
            status: 'failure', 
            message: 'all art items must have a title'
        })
    });
});

describe("Delete Art Item", () => {
    it("delete an item to the list of art items", () => {
        const result = art.deleteItem(2)
        expect(result).to.deep.equal({
            status: 'success',
            message: 'item with ID 2 removed'
        })
    });
    it("return error due to invalid art item", () => {
        const result = art.deleteItem(7)
        expect(result).to.deep.equal({
            status: 'failure', 
            message: 'Artwork with ID 7 not found to delete'
        })
    });
});
