const user = {
    name: 'John',
    age: 20,
    email: 'john@example.com'
    say: function() {
        console.log('hello, my name is', this.name);
    }
}

export default user;

user.say();