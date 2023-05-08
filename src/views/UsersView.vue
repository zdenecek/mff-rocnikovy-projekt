<template>
    <h1>Uživatelé</h1>
    <div v-for="user in users" v-bind:key="user.id">
        {{ user.name }} Smazat atd
    </div>
    <data-paginator v-model:page="page" :perPage="perPage" :total="total"></data-paginator>
</template>

<script lang="ts">
import DataPaginator from "@/components/part/DataPaginator.vue";
import { User } from "@/model/User";
import { UserRepositoryContract } from "@/repository/UserRepositoryContract";
import { defineComponent, inject } from "vue";

export default defineComponent({
    name: "UsersView",
    components: { DataPaginator },
    data: function () {
        return {
            userRepository: inject("userRepository") as UserRepositoryContract,
            users: new Array<User>(),
            page: 1,
            perPage: 25,
            total: 1,
        };
    },
    watch: {
        page() {
            this.update();
        },
    },
    methods: {
        async update() {
            const paginator = await this.userRepository.getUsers(this.perPage, this.page, {});
            this.page = paginator.page;
            this.users = paginator.data;
            this.total = paginator.total;
        },
    },
    mounted: function () {
        this.update();
    },
});
</script>
