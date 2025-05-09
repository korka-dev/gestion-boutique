import mongoose, { Schema, type Document } from "mongoose"
import type { IClient } from "./Client"

export interface IDette extends Document {
  client_id: mongoose.Types.ObjectId | IClient
  produit: string
  prix: number
  paye: boolean
  created_at: Date
}

const DetteSchema: Schema = new Schema({
  client_id: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  produit: { type: String, required: true },
  prix: { type: Number, required: true },
  paye: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
})

export default mongoose.models.Dette || mongoose.model<IDette>("Dette", DetteSchema)
