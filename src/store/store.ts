import axios from "axios";
import { create } from "zustand";

// Note: 'create' as a default export is a deprecated import.

interface IStore {
    counter: number;
    incrementCounter: () => void;

    unpressed: boolean;
    loading: boolean;
    success: boolean;
    error: boolean;
    data: any;
    errorData: any;
    clearUsers: () => void;
    getUsers: () => Promise<void>;
}

const initialState = {
    unpressed: true,
    loading: false,
    success: false,
    error: false,
    data: null,
    errorData: null,
};

const useStore = create<IStore>((set, get) => ({
    counter: 0,
    ...initialState,
    incrementCounter: () => set({ counter: get().counter + 1 }),
    clearUsers: () => set({ ...initialState }),
    getUsers: async () => {
        set({ ...initialState, loading: true });
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            set({ loading: false, success: true, unpressed: false, data: res.data });
            console.log("Data fetch ok", res.data);
        } catch (err: any) {
            console.log("Error in data fetch:", err);
            set({ ...initialState, unpressed: false, error: true, errorData: err.message });
        }
    },
}));

export default useStore;
