import { useState, useEffect, createContext, useContext, useMemo } from "react";
import { OrderItemsType, Product } from "../Type";
import { useAuth } from "./authContext";
import { User } from "firebase/auth";

interface globalStateContextProps {
  setSearchResults: (arg: string) => void;
  getSearchResults: string;

  setWishlist: (args: Product) => void;
  removeFromWishlist: (args: Product) => void;
  getWishlist: Product[];

  setOrderItems: (args: Product) => void;
  removeFromOrderItems: (args: Product) => void;
  changeItemCount: (prod: Product, countUpdate: number) => void;
  getOrderItems: OrderItemsType[];
  clearOrderItems: () => void;
}
type globalStateProviderProps = {
  children: React.ReactNode;
};

const GlobalStateContext = createContext<globalStateContextProps>({
  // search results
  setSearchResults: (arg: string) => {
    arg;
    return;
  },
  getSearchResults: "",

  // wishlist
  setWishlist: (args: Product) => {
    args;
    return;
  },
  removeFromWishlist: (args: Product) => {
    args;
    return;
  },
  getWishlist: [] as Product[],

  //order items
  setOrderItems: (args: Product) => {
    args;
    return;
  },
  removeFromOrderItems: (args: Product) => {
    args;
    return;
  },
  changeItemCount: (prod: Product, countUpdate: number) => {
    prod;
    countUpdate;
    return;
  },
  clearOrderItems: () => {
    return;
  },
  getOrderItems: [] as OrderItemsType[],
});

export const GlobalStateProvider = ({ children }: globalStateProviderProps) => {
  const { user } = useAuth();

  const [searchResults, searchResultsSet] = useState("");
  const [wishlist, wishlistSet] = useState<Product[]>([]);
  const [orderItems, orderItemsSet] = useState<OrderItemsType[]>([]);

  const globalState = useMemo(
    () => ({
      setSearchResults: (arg: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        searchResultsSet((_prev) => arg);
      },
      getSearchResults: searchResults,

      setWishlist: (args: Product) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        wishlistSet((_prev) => [...wishlist, args]);
      },
      removeFromWishlist: (args: Product) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        wishlistSet((_prev) => wishlist.filter((f) => f.id !== args.id));
      },
      getWishlist: wishlist,
      //order items
      setOrderItems: (args: Product) => {
        orderItemsSet([...orderItems, { item: args, count: 1 }]);
      },
      removeFromOrderItems: (args: Product) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        orderItemsSet((_prev) =>
          orderItems.filter((f) => f.item.id !== args.id)
        );
      },
      changeItemCount: (prod: Product, updateCount: number) => {
        orderItemsSet(
          orderItems.map((item) =>
            item.item.id === prod.id
              ? { ...item, count: updateCount }
              : { ...item }
          )
        );
      },
      clearOrderItems: () => {
        orderItemsSet([]);
      },
      getOrderItems: orderItems,
    }),
    [searchResults, wishlist, orderItems]
  );

  const updateData = (
    orderItems: OrderItemsType[],
    wishlist: Product[],
    user: User
  ) => {
    if (user) {
      try {
        // Save orderItems and wishlist to localStorage
        localStorage.setItem("orderItems", JSON.stringify(orderItems));
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    // Retrieve orderItems and wishlist from localStorage

    const storedOrderItems = localStorage.getItem("orderItems");
    const storedWishlist = localStorage.getItem("wishlist");

    // If storedOrderItems or storedWishlist exist in localStorage, parse and set the state
    if (storedOrderItems) {
      orderItemsSet(JSON.parse(storedOrderItems));
    }
    if (storedWishlist) {
      wishlistSet(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    updateData(orderItems, wishlist, user as User);
  }, [orderItems, wishlist, user]);

  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalState = (): globalStateContextProps =>
  useContext(GlobalStateContext);
