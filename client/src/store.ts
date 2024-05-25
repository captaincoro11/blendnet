import { create } from 'zustand';

interface Store {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void; // Corrected type for setIsAuthenticated
}

const useStore  = create<Store>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }), // Set isAuthenticated to the new value
}));

 export default useStore


