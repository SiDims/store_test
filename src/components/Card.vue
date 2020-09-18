<template>
    <div class="card">
        <div class="card__image" :style="`background-image: url(${image});`"></div>
        <div class="card__info">
            <div class="card__title">{{title}}</div>
            <div class="card__button">
                <button @click="click" :disabled="cart">
                    <Loader v-if="btnLoader" />
                    <span v-if="!btnLoader">{{cart ? 'в корзине' : 'купить'}}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import Loader from '@/components/Loader'

export default {
    data() {
        return {
            btnLoader: false,
        }
    },
    props: {
        index: {
            type: Number,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        cart: {
            type: Boolean,
            required: true
        }
    },

    components: {
        Loader
    },

    methods: {
        ...mapActions(['ADD_TO_CART']),

        async click() {
            try {
                this.btnLoader = true
                await this.ADD_TO_CART(this.id)
                this.btnLoader = false
            } catch (e) {}
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        background-color: #e6e6e6;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;

        &__image {
            height: 200px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }

        &__title {
            padding: 15px;
            border-bottom: 1px solid #ffffff;
        }

        &__button {
            padding: 15px;
            position: relative;

            button {
                display: block;
                width: 100%;
                cursor: pointer;
                text-transform: uppercase;
                border: 1px solid #000000;
                background-color: #ffffff;
                border-radius: 10px;
                height: 30px;
                outline: none;
                padding: 0;
            }
        }
    }
</style>