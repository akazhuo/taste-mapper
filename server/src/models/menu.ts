import { Schema, Types, model } from 'mongoose'

enum MenuType {
  Breakfast = 0,
  Lunch = 1,
  Dinner = 2,
}

interface Menu {
  title: string;
  price: number;
  type: MenuType;
}

const MenuSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: Number, required: true },
})

export const MenuModel = model<Menu>('menu', MenuSchema)