import axios from 'axios'

const state = {
    products: []
}

const actions = {
    async GET_PRODUCTS({commit}, page = 1) {
        const storage = JSON.parse(localStorage.getItem('cart'))

        try {
            let {data} = await axios({method: 'GET', url: `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=50`})
            
            data = data.map(item => {
                if (storage && storage.includes(item.id)) {
                    return Object.assign(item, {cart: true})
                }
                return Object.assign(item, {cart: false})
            });

            commit('SET_PRODUCTS', data)
            return data
        } catch (err) {
            console.log(err.response || err.message)
        }
    },

    async ADD_TO_CART({commit}, id) {
        const storage = localStorage.getItem('cart')
        const arr = storage ? JSON.parse(storage) : []

        try {
            const {data} = await axios({method: 'GET', url: 'https://jsonplaceholder.typicode.com/posts/1'})
            arr.push(id)
            localStorage.setItem('cart', JSON.stringify(arr))
            commit('SET_CART', id)
            return data
        } catch (err) {
            console.log(err.response || err.message)
        }
    }
}

const mutations = {
    SET_PRODUCTS(state, data) {
        state.products.push(...data)
    },

    SET_CART(state, id) {
        state.products.map((item, index) => {
            if (item.id === id) {
                return state.products[index].cart = true
            }
        })
    }
}

const getters = {
    products: state => state.products
}

export default {
    state,
    mutations,
    actions,
    getters
}