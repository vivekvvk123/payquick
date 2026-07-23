// "use client";

// import { Provider } from "react-redux";
// import { store } from "./store";

// export default function StoreProvider({ children }: { children: React.ReactNode }) {
//   return <Provider store={store}>
//     {children}
//   </Provider>
// }


// "use client";

// import { ReactNode } from "react";
// import { Provider } from "react-redux";
// import { store } from "./store";

// type StoreProviderProps = {
//   children: ReactNode;
// };

// export function StoreProvider({ children }: StoreProviderProps) {
//   return <Provider store={store}>{children}</Provider>;
// }

"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}