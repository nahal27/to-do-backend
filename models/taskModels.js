const mongoose =require('mongoose');
const taskSchema = new mongoose.Schema({
    task: { type: String,  required: true }, 
    user_id:{type:mongoose.Schema.ObjectId, ref:'user'},
    completed: { type: Boolean, default: false }, 
    updatedAt: { type: Date,  default: Date.now  }
  });
  
  module.exports = mongoose.model('Task', taskSchema);