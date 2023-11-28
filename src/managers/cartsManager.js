const fs = require('fs')

class CartsManager{
    constructor(){
        this.path = './src/mockDB/Carts.json'
    }

    readFile = async () => {
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            console.log(data)
            return JSON.parse(data)
        }catch(error){
            return []
        }
    }

    getCartById = async (cid) => {
        const carts = await this.readFile() 
        const cart = carts.find(cart => cart.id === cid)
        if(!cart){
            return 'no se encontró el cart'
        }
        return cart
    }

    createCart = async () =>{
        const carts = this.readFile()
        let newCart
        if(carts.length === 0){
            newCart = {id:1, products:[]}
        }else{
            newCart = {id:carts.length + 1, products:[]}
        }
        carts.push(newCart)
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
        return results 
    }

    addProductToCart = async (cid, pid) =>{
        const carts = await this.readFile() 
        const cartIndex = carts.findIndex(cart => cart.id === cid)
        if(cartIndex===-1){
            return 'no se ecnuetra el cart'
        }
        carts[cartIndex].products = {productId: pid}
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
        return results
    }

    deleteCart = async (cid) => {
        const carts = await this.readFile();
        const updatedCarts = carts.filter((cart) => cart.id !== cid);

        if (carts.length === updatedCarts.length) {
            return 'No se encontró el cart';
        }

        const results = await fs.promises.writeFile(
            this.path,
            JSON.stringify(updatedCarts, null, 2),'utf-8')

        return results;
    }
}

module.exports = CartsManager