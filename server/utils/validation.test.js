const expect = require('expect')

const {isRealString} = require('./validation')


describe('isRealString', () => {
    it('should reject non-string values', () => {
        const str = 1
        expect(isRealString(str)).toBe(false)
    })

    it('should reject string with only spaces', function () {
        const str = ' '
        expect(isRealString(str)).toBe(false)
    })

    it('should allow string with non-space characters', function () {
        const str = ' Hello '
        expect(isRealString(str)).toBe(true)
    })
})
