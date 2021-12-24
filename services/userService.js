const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    get() {
        const items = UserRepository.getAll();
        if (!items) {
            const err = new Error('Users cannot be fetched!');
            err.statusCode = 404;
            throw err;
        }
        return UserRepository.getAll();
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            const err = new Error('User is not found!');
            err.statusCode = 404;
            throw err;
        }
        return item;
    }

    createOne(data) {
        const {email, phoneNumber, ...restValues} = data;

        if (UserRepository.getOne({ email: email.toLowerCase() })) {
            const err = new Error('User with this email already exists!');
            err.statusCode = 400;
            throw err;
        }
        if (UserRepository.getOne({ phoneNumber })) {
            const err = new Error('User with this phone number already exists!');
            err.statusCode = 400;
            throw err;
        }

        UserRepository.create({email: email.toLowerCase(), phoneNumber, ...restValues});
    }

    updateOne(id, dataToUpdate) {
        if (!UserRepository.getOne({id})) {
            const err = new Error('User is not found!');
            err.statusCode = 400;
            throw err;
        }

        if (dataToUpdate.email) {
            dataToUpdate.email = dataToUpdate.email.toLowerCase();
        }

        const updatedItem = UserRepository.update(id, dataToUpdate);
        if (!updatedItem) {
            const err = new Error('User cannot be updated!');
            err.statusCode = 400;
            throw err;
        }
        return updatedItem
    }

    deleteOne(id) {
       if (!UserRepository.getOne({id})) {
           const err = new Error('User is not found!');
           err.statusCode = 400;
           throw err;
       }

       const removedItem = UserRepository.delete(id);
       if (!removedItem) {
           const err = new Error('User cannot be removed!');
           err.statusCode = 400;
           throw err;
       }
       return removedItem;
    }
}

module.exports = new UserService();
