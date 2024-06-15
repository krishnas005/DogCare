import mongoose from 'mongoose';

const connect = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected");
        return;
    }
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    }).then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.error('Database connection error:', err);
        throw err;
    });
};

export default connect;
