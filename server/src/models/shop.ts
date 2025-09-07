import { Schema, Types, model } from 'mongoose'

interface Shop {
  name: string;
  location: string;
  menus: Types.ObjectId[];
}

const ShopSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  menus: { type: Schema.Types.ObjectId, ref: 'Shop'},
})

export const ShopModel = model<Shop>('shop', ShopSchema)