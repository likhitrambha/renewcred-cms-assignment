export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async find(query = {}, options = {}) {
    return this.model.find(query, null, options);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async create(payload) {
    return this.model.create(payload);
  }

  async update(id, payload) {
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}
