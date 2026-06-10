import { Schema, model, models } from 'mongoose';

const SavedWordSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  word: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['dictionary', 'encyclopedia'],
    required: true,
  }
}, {
  timestamps: true,
});

// Compound index to prevent duplicate saves by the same user
SavedWordSchema.index({ userId: 1, word: 1, type: 1 }, { unique: true });

const SavedWord = models.SavedWord || model('SavedWord', SavedWordSchema);

export default SavedWord;
