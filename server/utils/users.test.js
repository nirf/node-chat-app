const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
    let users

    beforeEach(() => {
        users = new Users()
        users.users = [
            {
                id: '1',
                name: 'One',
                room: 'Room1'
            },
            {
                id: '2',
                name: 'Two',
                room: 'Room2'
            },
            {
                id: '3',
                name: 'Three',
                room: 'Room1'
            }
        ]
    })


    it('should add new user', () => {
        let user = {
            id: 'id',
            name: 'Nir',
            room: 'living-room'
        }
        users.addUser(user.id, user.name, user.room)
        expect(users.users.length).toBe(4)
        expect(users.users[3]).toInclude({
            id: user.id,
            name: user.name,
            room: user.room
        })
    })


    it('should remove a user by id', () => {
        let removeUser = users.removeUser('1')
        expect(users.users.length).toBe(2)
        expect(removeUser).toEqual({
            id: '1',
            name: 'One',
            room: 'Room1'
        })
    })


    it('should not remove a user by id', () => {
        let removeUser = users.removeUser('4')
        expect(users.users.length).toBe(3)
        expect(removeUser).toNotExist()
    })


    it('should get a user by id', () => {
        let fetchedUser = users.getUser('1')
        expect(users.users.length).toBe(3)
        expect(fetchedUser).toEqual({
            id: '1',
            name: 'One',
            room: 'Room1'
        })
    })


    it('should not get a user by id', () => {
        let fetchedUser = users.getUser('4')
        expect(users.users.length).toBe(3)
        expect(fetchedUser).toNotExist()
    })


    it('should return user list by room', () => {
        let userList = users.getUserList('Room1')
        expect(userList.length).toBe(2)
        expect(userList).toEqual([
            'One', 'Three'
        ])
    })
})