export interface UserAddress {
  address: string; // 地址描述
  formatted_addresses: { // 位置描述
    recommend: string; // 经过腾讯地图优化过的描述方式，更具人性化特点
    rough: string; // 大致位置，可用于对位置的粗略描述
  };
  address_component: { // 地址部件，address不满足需求时可自行拼接
    nation: string; // 国家
    province: string; // 省
    city: string; // 市
    district: string; // 区
    street: string; // 街道
    street_number: string;
  }
}

export interface UserInfo {
  nickName: string;
  avatarUrl: string;
}