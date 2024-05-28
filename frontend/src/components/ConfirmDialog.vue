<template>
    <v-dialog v-model="_show" v-bind="$attrs" max-width="500">
        <template v-slot:activator="{ props }">
            <slot name="activator" v-bind="props"></slot>
        </template>
        <v-card class="dialog-card">
            <v-card-title>
                <h3>
                    <slot name="title">{{ _title }}</slot>
                </h3>
            </v-card-title>
            <v-card-text>
                <slot name="text"><div v-html="_text"></div></slot>
            </v-card-text>
            <v-card-actions class="flex spaced actions">
                <slot name="actions">
                    <v-btn color="red" variant="tonal" @click="cancel">Zrušit</v-btn>
                    <v-btn color="secondary" variant="flat" @click="confirm">Potvrdit</v-btn>
                </slot>
            </v-card-actions>
            <slot></slot>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const _show = defineModel<boolean>()
const _title = ref("Potvrzení")
const _text = ref("Opravdu?")
let _onConfirm = () => { };
let _onCancel = () => { };


function cancel() {
    _show.value = false;
    _onCancel();
}

function confirm() {
    _show.value = false;
    _onConfirm();
}



defineExpose({
     show({ text, title, onConfirm, onCancel }: { text?: string, title?: string, onConfirm?: () => {}, onCancel?: () => {} } = {}) {
        _show.value = true
        _text.value = text ?? 'Opravdu?';
        _title.value = title ?? "Potvrzení";
        _onConfirm = onConfirm ?? (() => { });
        _onCancel = onCancel ?? (() => { });
    },
})
</script>

<style scoped>
.dialog-card {
    padding: 20px;
}

.actions {
    margin-top: 20px;
    justify-content: flex-end;
}
</style>