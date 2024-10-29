import express from 'express'
import authMiddleware from '../middleware/auth.js'
import {addToCart,removeFromCart,fetchUserFromCart} from '../controllers/cartController.js'

const cartRouter = express.Router()
cartRouter.post('/add-cart',authMiddleware,addToCart)
cartRouter.post('/remove-cart',authMiddleware, removeFromCart)
cartRouter.post('/get',authMiddleware,fetchUserFromCart)

export default cartRouter;