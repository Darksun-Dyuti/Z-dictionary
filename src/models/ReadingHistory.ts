import mongoose from "mongoose"

export interface IReadingHistory extends mongoose.Document {
  userId: string
  query: string
  type: "dictionary" | "encyclopedia"
  viewedAt: Date
}

const ReadingHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  query: { type: String, required: true },
  type: { type: String, enum: ["dictionary", "encyclopedia"], required: true },
  viewedAt: { type: Date, default: Date.now }
})

export default mongoose.models.ReadingHistory || mongoose.model<IReadingHistory>("ReadingHistory", ReadingHistorySchema)
