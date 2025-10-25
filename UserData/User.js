import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/UserInfo2')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));



const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },         // username can repeat
  email:    { type: String, required: true, unique: true },  // ✅ unique email
  password: { type: String, required: true },

});




export const User = mongoose.model('User', userSchema);