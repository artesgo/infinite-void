interface User {
  user_name: string,
  user_id: string,
  created_at: Date,
}

interface Product {
  name: string;
}

interface Store {
  address: string;
}

export interface Database {
  public: {
    Tables: {
      user: {
        Row: User
        Insert: User
        Update: User
      },
      products: {
        Row: Product // The data expected to be returned from a "select" statement.
        Insert: Product // The data expected passed to an "insert" statement.
        Update: Product // The data expected passed to an "update" statement.
      },
      stores: {
        Row: Store // The data expected to be returned from a "select" statement.
        Insert: Store // The data expected passed to an "insert" statement.
        Update: Store // The data expected passed to an "update" statement.
      }
    }
  }
}