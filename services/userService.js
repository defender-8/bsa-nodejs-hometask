const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    createOne(data) {
        UserRepository.create(data);
    }

    updateOne(id, dataToUpdate) {
        UserRepository.update(id, dataToUpdate);
    }
}

module.exports = new UserService();
