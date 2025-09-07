import { model, Schema, Types } from 'mongoose';

export interface Taste {
  title: string;
  comment: string;
  pics: Array<string>;
  date: Date;
  shop: Types.ObjectId;
}

const TasteSchema = new Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true },
  pics: { type: Array },
  date: { type: Date, required: true },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop'},
  // shop: { type: String, required: true },
})

export const TasteModel = model<Taste>('Taste', TasteSchema);