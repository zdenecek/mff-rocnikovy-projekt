<template>
    <v-dialog v-model="model">
        <slot name="activator"></slot>
        <v-card class="dialog-card">

            <v-card-title>
                <slot name="title"> </slot>
            </v-card-title>
            <v-card-text>
                <slot> </slot>
            </v-card-text>
            <v-card-actions>
                <slot name="actions"> </slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>()
</script>

<style scoped>
.dialog-card {
    padding: 20px 30px;
}
</style>