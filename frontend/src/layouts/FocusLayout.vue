

<template>
    <div class="wrapper">
        <div class="back-button">
            <router-link :to="{name: 'home'}">Zpět na hlavní stránku</router-link>
        </div>
        <div class="box">
            <div class="head">
                
                <slot name="header" />

                <div class="line">
                </div>
            </div>
            <div class="content">
            <slot></slot>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style scoped lang="scss">
@import "@/style/colors.scss";

.back-button {
    position: absolute;
    padding: 30px;
    top: 0;
    left: 0;

    @import "@/style/unstyle-links.scss";
}


.head {
    background-color: $background;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;    
}

.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.head :slotted(h1) {
    font-size: 24px;
    padding: 10px 20px;
    text-align: center;
    color: white;
    text-shadow: -1px -1px 0 #000000, 0px -1px 0 #000000, 1px -1px 0 #000000,
        -1px 1px 0 #000000, 0px 1px 0 #000000, 1px 1px 0 #000000;
}


.content {
    padding: 20px 80px;
}
.box {
    background: white;
    border-radius: 20px;
    box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.8);
}

.line {
    height: 10px;
    background: $foreground;
}
</style>