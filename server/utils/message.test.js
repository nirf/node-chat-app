const expect = require('expect')

const {generateMessage, generateLocationMessage} = require('./message')


describe('generateMessage', () => {
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


describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        let from = 'Nir'
        let lat = '32.0827382'
        let lon = '34.82378'
        let url = `https://www.google.co.il/maps?q=${lat},${lon}`
        let locationMessage = generateLocationMessage(from, lat, lon)
        expect(locationMessage).toInclude({
            from,
            url
        })
        expect(locationMessage.createdAt).toBeA('number')
    })
})