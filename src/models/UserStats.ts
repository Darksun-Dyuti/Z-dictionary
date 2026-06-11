import mongoose from "mongoose"

export interface IUserStats extends mongoose.Document {
  userId: string
  currentStreak: number
  longestStreak: number
  lastActive: Date
  totalWordsLearned: number
}

const UserStatsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  totalWordsLearned: { type: Number, default: 0 }
})

export default mongoose.models.UserStats || mongoose.model<IUserStats>("UserStats", UserStatsSchema)
