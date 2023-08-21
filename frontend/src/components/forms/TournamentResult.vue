<template>
    <form ref="form">
        <div>
            <div v-for="(player, index) in players" :key="index">

                <div class="autocomplete">
                    <div class="flex-container">
                        <input-field class="input-field" :label="`Přidat hráče ${index + 1}`" v-model="player.name"
                            :errors="errors?.name" required @input="debounceSearch(player.name, index)"></input-field>
                        <input-field class="input-field" :label="`číslo hráče ${index + 1}`" v-model="player.number"
                            :errors="errors?.number" required></input-field>
                    </div>

                    <div class="autocomplete-list" ref="list" v-if="player.name && index === suggestions.playerIndex">
                        <div class="autocomplete-item" v-for="player in suggestions.data" :key="player.id"
                            @click="select(player, index)">
                            <div>{{ player.name }}</div>
                        </div>
                    </div>

                </div>

            </div>
            <button @click="addNewResult"> + </button>
            <button @click="removeResult"> - </button>
        </div>
    </form>
</template>

<script setup lang="ts">

import InputField from "@/components/part/InputField.vue";
import { Player } from "@/model/Player";
import { PlayerRepositoryContract } from "@/repository/PlayerRepositoryContract";
import { inject, ref } from "vue";

let suggestions = ref({ playerIndex: 0, data: [] as Player[] });

const playerRepository = inject("playerRepository") as PlayerRepositoryContract;
let searchTimeout: any = null;
const DEBOUNCE_DELAY = 300;  // 300 milliseconds

function debounceSearch(query: string, index: number) {

    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
        playerRepository.search(query).then((response) => {
            suggestions.value.data = response;
            console.log(response);
            suggestions.value.playerIndex = index;
        })
            .catch((error) => {
                console.log(error);
            });
    }, DEBOUNCE_DELAY);
}


const players = ref([{ name: "", number: "" }]);
const errors = ref({});

function addNewResult() {
    players.value.push({ name: "", number: "" });
}

function removeResult() {
    players.value.pop();
}

function select(player: Player, index: number) {
    players.value[index].name = player.name;
    players.value[index].number = player.federation_id?.toString() ?? "";
    suggestions.value.data = [];

}





</script>

<style lang="scss">
@import "@/style/auth-forms.scss";

.flex-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.autocomplete {
    position: relative;
}

.autocomplete-list {
    position: absolute;
    background-color: white;
    width: 300px;
    outline: black 1px solid;
}

.autocomplete-item {
    font-size: 10pt;
    cursor: pointer;

    &:hover {
        background-color: lightgray;
    }

    div:last-child {
        font-size: 8pt;
        color: gray;
    }
}
</style>
