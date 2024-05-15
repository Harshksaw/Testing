// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit process on connection failure
  }
};

export default connectDB;
