<template>
    <div>
        {{info}}
        <p>us dollars: {{usd}}</p>
        <button @click="fetchData">fetch data</button>
    </div>
</template>


<script>
const axios = require('axios');

export default {
    name: 'bitcoin-data',
    data () {
        return {
        info: null,
        usd: null,
        }
    },
    methods: {
        fetchData() {
            axios
            .get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => {
                this.info = response,
                this.usd = response.data.bpi
                })
        }
    }
}
</script>

<style>

</style>