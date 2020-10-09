const {expect, it} = require('@jest/globals')
const {repair, success, fail, get} = require('./enhancer.js');
// test away!
const {
    itemOne,
    itemTwo,
    itemThree,
    itemFour,
    itemFive,
    itemSix
} = require('./items')

describe("repair(item)", () => {
    it('returns an item with durability raised to 100', () => {
        const repairedItemOne = repair(itemOne)
        expect(repairedItemOne.durability).toBe(100)
    })

})

describe("success(item)", () => {
    it("raises enhancement by 1 items with enhancement value <= 20", () => {
        const enahancementItemOne = success(itemOne)
        expect(enahancementItemOne.enhancement).toBe(15)
    })
    it("doesn't raised enhancement for items with an enhancement value of 20", () => {
        const enhanceItemTwo = success(itemTwo)
        expect(enhanceItemTwo.enhancement).not.toBe(21)
    })
})

describe("fail(item)", () => {
    it("decreases durability by 5 when items enhancement value is < 15", () => {
        const failedItemOne = fail(itemOne)
        expect(failedItemOne.durability).toBe(70)
    })
    it("decreases durability by 10 when items enhancement value value is >= 15", () => {
        const failedItemFour = fail(itemFour)
        expect(failedItemFour.durability).toBe(75)
    })
    it("decrease enhancement by 1 if items enhancement value >= 16", () => {
        const failedItemTwo = fail(itemTwo)
        const failedItemFive = fail(itemFive)
        expect(failedItemTwo.enhancement).toBe(19)
        expect(failedItemFive.enhancement).toBe(16)
    })
})
describe("get()", () => {
    it("returns item with new name showing enhancement", () => {
        const enhancementItemThree = get(itemThree)
        const enhancementItemFive = get(itemFive)
        expect(enhancementItemThree.name).toEqual('[+95] Superman')
        expect(enhancementItemFive.name).toEqual('[+16] Captain America')
    })
    it("returns original item name if item not enhanced", () => {
        const unchangedItem = get(itemSix)
        expect(unchangedItem.name).toBe("[+85] Thor")
    })
})