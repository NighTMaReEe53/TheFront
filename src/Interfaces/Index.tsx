export interface IProduct {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    qty: number;
    category_name: string;
    categories?: {
      data?: [
        {
          attributes?: {
            name_eng: string;
          };
        }
      ];
    };
    image: {
      data: [
        {
          attributes: {
            url: string;
          };
        }
      ];
    };
  };
}
export interface IProduct_Single {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    qty: number;
    categories: {
      data: [
        {
          id: number;
          attributes: {
            name_eng: string;
          };
        }
      ];
    };
    image: {
      data: [
        {
          attributes: {
            url: string;
          };
        }
      ];
    };
  };
}
export interface IProduct_Single_Favourite {
  id: number;
  title: string;
  description: string;
  price: number;
  qty: number;
  categories: {
    data: [
      {
        id: number;
        attributes: {
          name_eng: string;
        };
      }
    ];
  };
  image: {
    data: [
      {
        attributes: {
          url: string;
        };
      }
    ];
  };
}

export interface ICart {
  id: number;
  title: string;
  image: string;
  price: string;
  qty: string;
  description: string;
  product_id: number;
}

export interface IOrder {
  id: number;
  attributes: {
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    street: string;
    createdAt: string;
    products: ICart[];
  };
}

export interface ISale_Product {
  id: number;
  attributes: {
    description: string;
    title: string;
    price: string;
    image: string;
    facebook: string;
    whatsapp: string;
    users: {
      data: {
        id: number;
      };
    };
  };
}
export interface ISale_For_Product {
  id: number;
  description: string;
  title: string;
  price: string;
  image: string;
  facebook: string;
  whatsapp: string;
  users: {
    data: {
      id: number;
    };
  };
}
