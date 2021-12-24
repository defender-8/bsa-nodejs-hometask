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
        UserRepository.create(data);
    }

    updateOne(id, dataToUpdate) {
        if (!this.search({id})) {
            return null;
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
