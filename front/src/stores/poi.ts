import { defineStore } from 'pinia';

interface Poi {
  id: string,
  title: string,
  address:string,
  tel:string,
  category:string,
  type:number,
  location: {
    lat:number,lng:number
  },
   _distance: number,
   ad_info: { adcode:number, province: string, city:string, district:string}
  }
// 位置 store
export const poiStore = defineStore('poiStore', {
  state: () => { 
    return { poi: null }
  },
  getters: {
  },
  actions: {
    setPoi (poi: Poi) {
      this.poi = poi
    }
  },
})