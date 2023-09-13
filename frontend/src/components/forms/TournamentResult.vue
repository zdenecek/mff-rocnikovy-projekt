<template>
    <form ref="form">
        <div>
            <div v-for="(result, index) in results" :key="index">
                <div> {{ index + 1 }}. místo </div>
                <div v-for="(player, index2) in result.players" :key="player.id">
                    <div class="autocomplete">
                        <div class="flex-container">
                            <input-field class="input-field" :label="`Přidat hráče ${index2 + 1}`" v-model="player.name"
                                :errors="errors?.name" required @input="debounceSearch(player.name, index, index2)"></input-field>
                            <input-number class="input-field" :label="`číslo hráče ${index2 + 1}`" v-model.number="player.federation_id"
                                :errors="errors?.number" required></input-number>
                        </div>

                        <div class="autocomplete-list" ref="list" v-if="player.name && index ==suggestions.index && index2 === suggestions.playerIndex">
                            <div class="autocomplete-item" v-for="player in suggestions.data" :key="player.id"
                                @click="select(player, index, index2)">
                                <div>{{ player.name }}</div>
                            </div>
                        </div>
                        

                    </div>
                    </div>
                    <button @click="addNewPlayer(index)"> ++ </button>
                    <button @click="deletePlayer(index)"> -- </button>

            </div>
            <button @click="addNewResult"> + </button>
            <button @click="removeResult"> - </button>
        </div>
    </form>
</template>

<script setup lang="ts">

import InputField from "@/components/part/InputField.vue";
import InputNumber from "@/components/part/InputNumber.vue";
import { Player } from "@/model/Player";
import {  ExistingPlayerResultData, NewPlayerResultData, PlayerResultData, TournamentResultData } from "@/model/TournamentData";
import { PlayerRepositoryContract } from "@/repository/PlayerRepositoryContract";
import { inject, ref, watch } from "vue";

let suggestions = ref({index: 0, playerIndex: 0, data: [] as Player[] });

const playerRepository = inject("playerRepository") as PlayerRepositoryContract;
let searchTimeout: any = null;
const DEBOUNCE_DELAY = 300;  // 300 milliseconds

function debounceSearch(query: string, index: number, playerIndex: number) {

    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
        playerRepository.search(query).then((response) => {
            suggestions.value.data = response;
            console.log(response);
            suggestions.value.index = index;
            suggestions.value.playerIndex = playerIndex;


        })
            .catch((error) => {
                console.log(error);
            });
    }, DEBOUNCE_DELAY);
}

type TournamentResult = {
    rank: number,
    title: string,
    players: Player[]
}

const results = ref([] as TournamentResult[]);

const errors = ref({});

const emit = defineEmits(["update"]);

// const props = 
defineProps({
    initial: {
        type: Array as () => TournamentResultData[],
        default: () => []
    },
    errors: Object
});

// watch (() => props.initial, (value) => {
// /*
//     if (value) {
//         results.value = value.map((result) => {
//             return {
//                 rank: result.rank,
//                 title: result.title,
//                 players: result.players.map((player) => {
//                     return {
                        
//                     }
//                 })
//             }
//         });

//         */
    
// });
    

watch(results.value, () => {
    let resultsToSend : TournamentResultData[] = results.value.map((result) => {
        return {
            rank: result.rank,
            title: result.title,
            players: result.players.map((player) => mapPlayerToPlayerData(player)
            )
        }
    });
        
    emit("update", resultsToSend);
}, { deep: true });

function mapPlayerToPlayerData(player: Player) : PlayerResultData {
    if (player) {
        return new ExistingPlayerResultData(player);
    } else {
        return new NewPlayerResultData(player);
    }
}

function addNewResult() {
    console.log("add new result");
    results.value.push({
        rank: 0,
        title: "",
        players: []
    });
}

function addNewPlayer(index: number) {
    console.log("add new player");
    results.value[index].players.push({
        id: 0,
        name: "",
        federation_id: 0
    });
}

function deletePlayer(index: number) {
    console.log("delete player");
    results.value[index].players.pop();
}

function removeResult() {
    results.value.pop();
}

function select(player: Player, index: number, playerIndex: number) {
    results.value[index].rank = index + 1;
    results.value[index].players[playerIndex] = player;
    results.value[index].title = ""; //if team, we need to give it a name, TODO

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
    display: inline-block;
}

.autocomplete-list {
    position: absolute;
    background-color: white;
    width: 300px;
    outline: black 1px solid;
    z-index: 100;
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
