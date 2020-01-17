import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://mongouser:mongouser@cluster0-xnxmx.mongodb.net/sky?retryWrites=true&w=majority',
    )
      .then(() => console.log('MongoDB Connected'))
      .catch((err) => console.log(`MongoDB error:${err}`));
  }
}

export default new Database();
