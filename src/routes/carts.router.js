const { Router } = require('express')
const CartsManager = require('../managers/cartsManager')
const cartsService = new CartsManager()
const router = Router()

router.get('/:cid', async (req, res)=>{
    const{cid}=req.params
    const cart = await cartsService.getCartById(parseInt(cid))
    res.send({
        status: 'success',
        payload:cart
    })
})

module.exports = router