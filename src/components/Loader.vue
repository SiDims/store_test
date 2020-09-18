<template>
    <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style lang="scss" scoped>
    .loader {
        position: relative;
        max-width: 100px;
        margin: 0 auto;

        div {
            animation: 1s ease 0s loader infinite;
            border-radius: 50%;
            float: left;
            height: 10px;
            width: 10px;
            margin: 5px;
            background: #000000;

            &:nth-child(1) {
                animation-delay: 1 * (1s / 18);
            }

            &:nth-child(2) {
                animation-delay: 2 * (1s / 18);
            }

            &:nth-child(3) {
                animation-delay: 3 * (1s / 18);
            }

            &:nth-child(4) {
                animation-delay: 4 * (1s / 18);
            }
        }
    }

    @keyframes loader {
        0% {
            transform: scale(1);
        }
        
        25% {
            transform: scale(0);
        }
        
        50% {
            transform: scale(1);
        }
    }
</style>