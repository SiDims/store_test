<template>
    <div class="container">
        <div class="grid">
            <Card 
                class="grid__item"
                v-for="(item, index) of products"
                :key="index"
                :index="index"
                :id="item.id"
                :image="item.thumbnailUrl"
                :title="item.title"
                :cart="item.cart"
            />
        </div>

        <Loader v-if="preloader" />
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Card from '@/components/Card'
import Loader from '@/components/Loader'

export default {
    data() {
        return {
            page: 1,
            preloader: true,
        }
    },

    components: {
        Card,
        Loader
    },

    computed: {
        ...mapGetters(['products'])
    },

    async mounted() {
        try {
            await this.GET_PRODUCTS();
            this.preloader = false

            window.addEventListener('scroll', this.onscroll)
            window.addEventListener('touchmove', this.onscroll)
        } catch (e) {}
    },

    methods: {
        ...mapActions(['GET_PRODUCTS']),

        async onscroll(event) {
            if (document.documentElement.scrollTop + window.innerHeight >= document.body.scrollHeight) {
                this.page = this.page + 1
                this.preloader = true
                await this.GET_PRODUCTS(this.page)
                this.preloader = false
            }
        }
    }
}
</script>

<style lang="scss">
    @import "@/styles/style.scss";

    .grid {
        display: flex;
        flex-wrap: wrap;

        &__item {
            margin-right: 15px;
            margin-bottom: 15px;
        }
    }

    /*IE !!!*/
    
    @media (min-width: 1200px) {
        .grid__item {
            width: calc(20% - 12px);
            &:nth-child(5n) {
                margin-right: 0;
            }
        }
    }

    @media (max-width: 1200px) {
        .grid__item {
            width: calc(25% - 12px);

            &:nth-child(4n) {
                margin-right: 0;
            }
        }
    }

    @media (max-width: 768px) {
        .grid__item {
            width: calc(50% - 8px);

            &:nth-child(2n) {
                margin-right: 0;
            }
        }
    }

    @media (max-width: 480px) {
        .grid__item {
            width: 100%;

            &:nth-child(1n) {
                margin-right: 0;
            }
        }
    }
</style>
