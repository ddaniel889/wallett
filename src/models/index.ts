type MongoObject = {
  _id?: string;
  __V?:number;
 
};

export type Customer = MongoObject & {
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  zipCode?: string;
  extra?: string;
};

