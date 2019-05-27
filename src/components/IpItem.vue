<template>
    <div>
        <li id="ipvalue">
          {{ address }}
          <v-btn round v-on:click="$emit('remove')">Remove</v-btn>
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