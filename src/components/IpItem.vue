<template>
    <div>
        <li>
          {{ address }}
          <button v-on:click="$emit('remove')">Remove</button>
        </li>
    </div>
</template>



<script>
export default {
    name: 'ip-item',
    props: ['address']
}
</script>

<style>

</style>