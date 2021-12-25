const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
  get() {
    const items = FighterRepository.getAll();
    if (!items) {
      const err = new Error('Fighters cannot be fetched!');
      err.statusCode = 404;
      throw err;
    }
    return FighterRepository.getAll();
  }

  search(search) {
    const item = FighterRepository.getOne(search);
    if(!item) {
      const err = new Error('Fighter is not found!');
      err.statusCode = 404;
      throw err;
    }
    return item;
  }

  createOne(data) {
    const { name, health } = data;
    const searchName = name.toLowerCase();

    if (FighterRepository.getOne({ searchName })) {
      const err = new Error('User with this name already exists!');
      err.statusCode = 400;
      throw err;
    }

    data.health = health || 100;

    return FighterRepository.create({searchName, ...data});
  }

  updateOne(id, dataToUpdate) {
    if (!FighterRepository.getOne({ id })) {
      const err = new Error('Fighter is not found!');
      err.statusCode = 400;
      throw err;
    }

    if (dataToUpdate.name) {
      const searchName = dataToUpdate.name.toLowerCase();

      if (FighterRepository.getOne({ searchName })) {
        const err = new Error('User with this name already exists!');
        err.statusCode = 400;
        throw err;
      }

      dataToUpdate.searchName = searchName;
    }

    const updatedItem = FighterRepository.update(id, dataToUpdate);
    if (!updatedItem) {
      const err = new Error('Fighter cannot be updated!');
      err.statusCode = 400;
      throw err;
    }
    return updatedItem
  }

  deleteOne(id) {
    if (!FighterRepository.getOne({id})) {
      const err = new Error('Fighter is not found!');
      err.statusCode = 400;
      throw err;
    }

    const result = FighterRepository.delete(id);
    if (!result) {
      const err = new Error('Fighter cannot be removed!');
      err.statusCode = 400;
      throw err;
    }
    return result[0];
  }
}

module.exports = new FighterService();
