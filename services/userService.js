const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    get() {
        const items = UserRepository.getAll();
        if (!items) {
            return null;
        }
        return items;
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    createOne(data) {
        const {email, phoneNumber, ...restValues} = data;

        if (this.search({email: email.toLowerCase()})) {
            const err = new Error('User with these email already exists!');
            err.statusCode = 400;
            throw err;
        }
        if (this.search({phoneNumber})) {
            const err = new Error('User with this phone number already exists!');
            err.statusCode = 400;
            throw err;
        }

        UserRepository.create({email: email.toLowerCase(), phoneNumber, ...restValues});
    }

    updateOne(id, dataToUpdate) {
        if (!this.search({id})) {
            return null;
        }

        if (dataToUpdate.email) {
            dataToUpdate.email = dataToUpdate.email.toLowerCase();
        }

        const updatedItem = UserRepository.update(id, dataToUpdate);
        if (!updatedItem) {
            return null;
        }
        return updatedItem
    }

    deleteOne(id) {
        UserRepository.delete(id);
    }
}

module.exports = new UserService();
