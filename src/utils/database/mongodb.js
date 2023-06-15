import mongoose from 'mongoose';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

export async function connectMongoDB() {
  try {
    mongoose.set('strictQuery', true);
    const con = await mongoose.connect(DB);
    console.log('DB Connection Success');
    return con;
  } catch (error) {
    console.log(`DB Connection Failed : ${error}`);
  }
}

export async function closeMongoDB() {
  try {
    await mongoose.disconnect();
    console.log('DB Disconnected');
  } catch (error) {
    console.log(`DB Disconnected : ${error}`);
  }
}
