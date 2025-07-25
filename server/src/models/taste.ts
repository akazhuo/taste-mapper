import mongoose from 'mongoose';

const Schema = mongoose.Schema

export interface Taste {
  title: string;
  comment: string;
  pics: Array<string>;
  date: Date;
  shop: string;
}

const TasteSchema = new Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true },
  pics: { type: Array },
  date: { type: Date, required: true },
  // shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true }
  shop: { type: String, required: true },
})

export const TasteModel = mongoose.model('Taste', TasteSchema);