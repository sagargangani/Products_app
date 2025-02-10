import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required." };
    }
    const res = await fetch("http://localhost:3001/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),  });
    const data = await res.json();
    set((state) => ({
      products: [...state.products, data],
    }));
    return { success: true, message: "Product created successfully." };
  },
  fetchProducts: async()=>{
    const res= await fetch("http://localhost:3001/api/products");
    const data=await res.json();
    consolelog("Fetch Response:", data);
    set({products: data.products})
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`http://localhost:3001/api/products/${pid}`, {
        method: "DELETE",
      });
  
      const data = await res.json();
      console.log("Delete Response:", data);
      if (data.success) {
        set((state) => ({
          products: state.products.filter((product) => product._id !== pid),
        }));
      }
  
      return { success: data.success };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`http://localhost:3001/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
    console.log("update Response:", data);
    
		if (!data.success) return { success: false };

		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.product : product)),
		}));

		return { success: true };
	},
}))
