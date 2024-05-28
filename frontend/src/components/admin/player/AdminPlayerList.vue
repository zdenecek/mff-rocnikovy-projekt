<template>
    <v-row>
        <v-col>
            <div class="flex spaced">
                <h2>Hráči</h2>

                <v-btn @click="showFilter = true" v-show="!showFilter">Filtrovat</v-btn>
                <template v-if="showFilter">
                    <v-btn @click="hideFilter">Zrušit filtraci</v-btn>
                    <v-btn @click="resetFilter">Smazat filtr</v-btn>
                </template>
            </div>
        </v-col>
    </v-row>
    <v-row v-if="showFilter">
        <v-col class="flex gap-1" lg="8">
            <v-text-field hide-details="auto" density="compact" label="Jméno" v-model="filter.name" clearable></v-text-field>
            <v-text-field hide-details="auto" density="compact" type="number" hide-spin-buttons label="Číslo hráče"
                v-model="filter.federationId" clearable></v-text-field>
            <v-combobox hide-details="auto" density="compact" class="category-filter" v-model="filter.category" :items="categoriesAvailable"
                chips clearable label="Kategorie" multiple variant="outlined" single-line>
            </v-combobox>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="flex spaced">
            <v-btn @click="showAddPlayerDialog = true" variant="tonal" prepend-icon="mdi-account-plus-outline">Přidat hráče</v-btn>
            <v-btn :to="{ name: 'admin-import-players' }" variant="tonal" prepend-icon="mdi-account-multiple-plus-outline">Import hráčů</v-btn>
            <template v-if="selected.length">
                <v-btn @click="exportSelected" prepend-icon="mdi-account-arrow-right-outline" variant="tonal">Exportovat vybrané</v-btn>
                <v-btn @click="deleteSelected" variant="tonal" prepend-icon="mdi-account-multiple-remove-outline">Smazat vybrané</v-btn>
                <v-btn @click="selected = []" prepend-icon="mdi-close">Zrušit výběr ({{ selected.length }})</v-btn>
            </template>
            <template v-else>
                <v-btn @click="exportAll" variant="tonal" prepend-icon="mdi-account-arrow-right-outline">Exportovat hráče</v-btn>
            </template>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="playersFiltered" item-key="id" :loading="loading"
                @update:options="updateOptions" no-data-text="Žádný hráč nebyl nalezen." show-select v-model="selected"
                select-strategy="page">
                <template v-slot:bottom v-if="hideFooter"></template>
                <template v-slot:item.actions="{ item }">
                    <v-btn @click=" editPlayer(item)"> <v-icon>mdi-account-edit</v-icon></v-btn>
                    <v-btn color="red" @click="deletePlayer(item)"> <v-icon>mdi-account-remove</v-icon></v-btn>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
    <dialog-modal v-model="showAddPlayerDialog" max-width="500px">
        <add-player-form @player-added="showAddPlayerDialog = dontCloseAddPlayerDialog"></add-player-form>
        <div class="flex justify-center">
            <v-switch color="primary" label="Nezavírat formulář" v-model="dontCloseAddPlayerDialog"></v-switch>
        </div>
    </dialog-modal>
    <dialog-modal v-model="showEditPlayerDialog" max-width="500px">
        <edit-player-form :player="currentlyEditedPlayer"
            @player-edited="showEditPlayerDialog = false"></edit-player-form>
    </dialog-modal>
    <confirm-dialog ref="confirm" />
</template>

<script setup lang="ts">
import { PlayerCategory } from '@/model/PlayerCategory';
import { usePlayerStore } from '@/stores/playerStore';
import { computed, ref } from 'vue';
import DialogModal from '@/components/DialogModal.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import AddPlayerForm from '@/components/admin/player/AddPlayerForm.vue';
import EditPlayerForm from '@/components/admin/player/EditPlayerForm.vue';
import { Player } from '@/model/Player';
import { errorToast, infoToast } from '@/toasts';

const headers = [
    { title: 'Jméno', value: 'firstName', sortable: true, width: '15%' },
    { title: 'Příjmení', value: 'lastName', sortable: true, width: '15%' },
    { title: 'Číslo hráče', value: 'federationId', sortable: true, width: '15%' },
    { title: 'Kategorie', value: 'category', sortable: true },
    // { title: 'Import', value: 'import', sortable: true },
    { title: '', key: 'actions', sortable: false }
]

const playerStore = usePlayerStore();

const players = computed(() => playerStore.players);
const loading = computed(() => playerStore.loading);
const confirm = ref(null as null | (typeof ConfirmDialog));


const showFilter = ref(false);
const filter = ref({
    name: '',
    federationId: '',
    category: [] as string[]
});
const categoriesAvailable = Object.values(PlayerCategory) as string[];
function hideFilter() {
    showFilter.value = false;
    resetFilter();
}
function resetFilter() {
    filter.value = {
        name: '',
        federationId: '',
        category: []
    }
}
const playersFiltered = computed(() => {
    const f = filter.value;
    return players.value.filter(p =>
        (!f.name || p.fullName.toLowerCase().includes(f.name.toLowerCase())) &&
        (!f.category.length || (p.category && f.category.includes(p.category))) &&
        (!f.federationId || p.federationId === f.federationId || p.federationId?.toString().includes(f.federationId.toString()))
    )
});

let itemsPerPage = ref(10);
function updateOptions(options: any) {
    itemsPerPage.value = options.itemsPerPage;
}
const hideFooter = computed(() => playersFiltered.value.length <= itemsPerPage.value);

const showAddPlayerDialog = ref(false);
const dontCloseAddPlayerDialog = ref(false);

function deletePlayer(player: Player) {
    confirm.value?.show({
        text: `Opravdu si přejete smazat hráče ${player.fullName}?`,
        onConfirm: async () => {
            try {
                await playerStore.deletePlayer(player)
                infoToast("Hráč byl smazán")
            } catch (e:any) {
                errorToast("Chyba při mazání hráče:" + e.message )
            }
        }
    })
}


const showEditPlayerDialog = ref(false)
const currentlyEditedPlayer = ref(null as null | Player)
function editPlayer(player: Player) {
    currentlyEditedPlayer.value = player
    showEditPlayerDialog.value = true;
}

function exportAll() {
    playerStore.exportPlayers(playersFiltered.value);
}

const selected = ref([] as number[])
const selectedPlayers = computed(() => players.value.filter(p => selected.value.includes(p.id)))

function exportSelected() {
    playerStore.exportPlayers(selectedPlayers.value);
}

function deleteSelected() {
    const toDelete =selectedPlayers.value;
    confirm.value?.show({
        
        text: `Opravdu si přejete smazat následujících ${toDelete.length} hráčů?<br><br>` + toDelete.map(p => p.fullName).join("<br>") ,
        onConfirm: async () => {
            try {
                await playerStore.deletePlayers(toDelete)
                infoToast("Hráči byli smazáni")
            } catch (e:any) {
                errorToast("Chyba při mazání hráčů:" + e.message )
            }
        }
    })
}


</script>

<style>
.category-filter {
    width: 100px;
}
</style>
