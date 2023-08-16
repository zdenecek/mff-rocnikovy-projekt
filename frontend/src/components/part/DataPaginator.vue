<template>
    <ul class="paginator" v-if="availablePages.length > 1">
        <li
            v-if="previousPage"
            @click="changePage(previousPage)"
            class="paginator-button"
            role="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="back" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </li>
        <li v-for="(page, index) in availablePages" :key="index">
            <div
                 @click="changePage(page)"
                 role="button"
                 v-if="page !== 'separator'"
                 class="paginator-button"
                 :class="{
                     'active': active(page),
                 }">
                {{ page }}
            </div>
            <div v-else class="paginator-button">...</div>
        </li>
        <li
            v-if="nextPage"
            @click="changePage(nextPage)"
            class="paginator-button"
            role="button">
            <svg
                 xmlns="http://www.w3.org/2000/svg"
                 class="h-4 w-4"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </li>
    </ul>
</template>

<style lang="scss">

.paginator-button {
    padding: .25em .3em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
    cursor: pointer;


    width: 1.75em;
    height: 1.75em;

    &.active {
        border: transparent 0.5em;
        
        &:hover {
            border: $primary 0.5em;
            transition: all 0.2s ease-in-out;
        }
    }

    &:not(.active) {
        background-color: $primary;
        color: gray;
    }
}

.paginator {
    display: flex;
    gap: 0.5em;
    margin: 0.5em;
}

.back, .forward {
    width: 1em;
    height: 1em;
}


</style>

<script setup lang="ts">
import { computed } from "vue";


const emit = defineEmits(['update:page']);

const props = defineProps(
    {
        page: {
            type: Number,
            required: true,
        },
        total:  {
            type: Number,
            required: true,
        },
        perPage: {
            type: Number,
            default: 16,
        },
        onEachSide: {
            type: Number,
            default: 2,
        },
    }
);

function active(page: number): boolean {
    return page === props.page;
}
function changePage(page: number): void {
    emit('update:page', page);
}

const lastPage = computed(() => {
    return Math.ceil(props.total / props.perPage);
});

const previousPage = computed(() => {
    return props.page === 1 ? null : props.page - 1;
});

const nextPage = computed(() => {
    return props.page === lastPage.value ? null : props.page + 1;
});

const availablePages = computed(() => {

    let pages: (any)[] = [1];
    let i = - props.onEachSide;
    if (props.page + i > 2) pages.push('separator');
    for (; i <= props.onEachSide; i++) {
        pages.push(props.page + i);
    }
    if (pages[pages.length - 1] < lastPage.value - 1) pages.push("separator");
    pages.push(lastPage.value);
    return pages.filter((val, index, self) => {
        return (self.indexOf(val) === index && val > 0 && val <= lastPage.value) || val === "separator";
    });
});

</script>
