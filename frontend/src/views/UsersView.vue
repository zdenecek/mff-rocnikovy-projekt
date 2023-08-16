<template>
    <h1>Uživatelé</h1>
    <div v-for="user in users" v-bind:key="user.id">
        {{ user.name }} Smazat atd
    </div>
    <data-paginator v-model:page="page" :perPage="perPage" :total="total"></data-paginator>
</template>

<script setup lang="ts">
import DataPaginator from "@/components/part/DataPaginator.vue";
import { User } from "@/model/User";
import { UserRepositoryContract } from "@/repository/UserRepositoryContract";
import { inject, ref, watch, onMounted } from "vue";

const userRepository = inject("userRepository") as UserRepositoryContract;
const users = ref([] as User[])
const page = ref(1)
const perPage = ref(25)
const total = ref(1)

onMounted(() => update());
watch(page, () => update());

async function update() {
    const paginator = await userRepository.getUsers(perPage.value, page.value, {});
    page.value = paginator.page;
    users.value = paginator.data;
    total.value = paginator.total;
}

</script>
