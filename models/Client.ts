import mongoose, { Schema, type Document } from "mongoose"

export interface IClient extends Document {
  nom: string
  telephone: string
  lieu: string
  created_at: Date
}

const ClientSchema: Schema = new Schema({
  nom: { type: String, required: true },
  telephone: { type: String, required: true },
  lieu: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
})

export default mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema)
