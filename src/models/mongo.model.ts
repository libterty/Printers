import * as mongoose from 'mongoose';
const { Schema } = mongoose;

const LogSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    path: {
        type: String,
        require: true,
    },
});

export default mongoose.model('logModel', LogSchema);
