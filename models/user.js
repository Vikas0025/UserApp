const db = require('../utils/db')

class User {
    constructor(id, name, age){
        this.id = id;
        this.name = name;
        this.age = age;
    }
    save(){
        return db.execute('INSERT INTO users (id, name, age) VALUES (?, ?, ?) ', [this.id, this.name, this.age]); 
    }

    static updateUser(newUser){
        const id = newUser.id
        const newName = newUser.name
        const newAge = newUser.age
        return db.execute('UPDATE users SET name = ?, age = ? WHERE users.id = ?', [newName, newAge, id])
    }

    static deleteById(id) {
        return db.execute('DELETE FROM users WHERE users.id = ?', [id])
    }

    static findById(id) {
        return db.execute(`SELECT * FROM users WHERE users.id = ?`, [id])
    }

    static fetchAll(){
        return db.execute('SELECT * FROM users')
    }
}

module.exports = User