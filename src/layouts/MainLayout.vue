

<template>
    <div class="container main-layout">
        <div class="head">
            <slot name="header" />

            <div class="line">
            </div>
        </div>
        <div class="content">
            <slot />
        </div>
        <div class="footer">
            <div class="line">
                <slot name="footer-line" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/style/colors.scss";


.container {
    width: 960px;
    margin: auto;
    background: white;
    border-radius: 20px;
    min-height: calc(100vh - 30px);
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;

    box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.8);
}

.head {
    background-color: $background;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.head :slotted(h1) {
    text-align: center;
    font-size: 48px;
    padding: 40px 20px;
    color: white;
    text-shadow: -1px -1px 0 #000000, 0px -1px 0 #000000, 1px -1px 0 #000000,
        -1px 1px 0 #000000, 0px 1px 0 #000000, 1px 1px 0 #000000;
}



.router-link-active {
    cursor: pointer;
    background: $foreground;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
}
.line {
    // hide shadow from nav links
    position: relative;
    z-index: 3;
}


.content {
    flex-grow: 1;
    padding: 20px;
}

.line {
    height: 20px;
    background: $foreground;
    font-size: small;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.footer {
    clear: both;
    height: 100px;
    width: 960px;
    background: $background;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
</style>