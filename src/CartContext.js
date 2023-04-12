import { createContext, useState } from "react";
import { productsArray, getProductData } from "./productsStore";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => { },
    addOnetoCart: ()=> {},
    removerOneFromCart: ()=> {},
    deleteCart: ()=> {},
    getTotalCost: ()=> {},
})


export default function CartProvider({ children }) {

    const [cartProducts, setCartProducts] = useState([])

    // { id: 1, quantity: 2 }

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity
        
        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }


    function addOnetoCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts, {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else {
                setCartProducts(cartProducts.map(product => 
                product.id === id ? {...product, quantity: product.quantity + 1} : product
            ))
        }
    }

    function removerOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteCart(id)
        } else {
                setCartProducts(cartProducts.map(product => 
                product.id === id ? {...product, quantity: product.quantity - 1} : product
            ))
        }

    }

    function deleteCart(id) {
        setCartProducts(
            cartProducts => cartProducts.filter(product => {
                return product.id != id
            })
        )        
    }

    function getTotalCost() {
        let total = 0;

        cartProducts.map((product) => {
            const productData = getProductData(product.id)
            total += (productData.price * product.quantity)
        })
        return total
    }

    const contextValue = {
      items: cartProducts,
      getProductQuantity,
      addOnetoCart,
      removerOneFromCart,
      deleteCart,
      getTotalCost,
    };
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}


//Context (cart, addtoCart, removeCart)