<template>
  <div class="home">
    Welcome to matrika

    <button @click="alert"> Alert </button>
  </div>
</template>


<script setup lang="ts">
import Swal from 'sweetalert2';

function alert() {

  Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  }).fire("Hello world!")
}


</script>