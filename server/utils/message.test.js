const expect = require('expect')

const {generateMessage} = require('./message')


describe('message.js', () => {
    it('should generate correct message object', () => {
        let name = 'Nir'
        let say = 'Hello!'
        let generatedMessage = generateMessage(name, say)
        expect(generatedMessage).toInclude({
            from: name,
            text: say
        })
        expect(generatedMessage.createdAt).toBeA('number')
    })
})