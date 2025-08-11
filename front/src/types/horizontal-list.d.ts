  export enum TagType {
    tag = 'tag', 
    truck = 'truck', 
    trendingUp = 'trending-up', 
    thumbsUp = 'thumbs-up'
  }
  export interface Item {
    name: string
    delivery: {
      times: number
      distance: number
    }
    tag: {
      title: string,
      type: TagType
    }
    thumb: string
  }
  