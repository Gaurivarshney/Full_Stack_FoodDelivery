import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    const currency ='$'
    const url ='https://full-stack-fooddelivery-backend.onrender.com'
    const [cartItems , setCartItems]= useState({})
    const [token, setToken]= useState("")
    const [food_list, setFoodList]= useState([])

    const addToCart = async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add-cart",{itemId},{headers:{token}})
        }
    }
    const removeFromCart= async(itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove-cart",{itemId},{headers:{token}})
        }
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) { // Check if itemInfo is found
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async()=>{
        const response = await axios.get(url+'/api/food/list');
        setFoodList(response.data.data)

    }

    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData)
    }

    useEffect(()=>{
       async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem('token'))
        }
       }
       loadData();
    },[])

    const contextvalue={
        food_list,
        currency, cartItems, setCartItems,
        addToCart, removeFromCart,getTotalCartAmount,url,token,setToken
    }
    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
