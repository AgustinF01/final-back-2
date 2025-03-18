export class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return this.model.find({}).exec();
    }

    async getById(id) {
        return this.model.findById(id).exec();
    }

    async create(data) {
        const newItem = new this.model(data);
        return newItem.save();
    }

    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id) {
        const result = await this.model.findByIdAndDelete(id).exec();
        return !!result;
    }
}