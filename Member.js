import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  _id: String,
  numberOfTimesShammed: {
    type: Number,
    default: 1
  }
});

export default mongoose.model('member', MemberSchema);