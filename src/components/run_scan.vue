<template>
    <v-container fluid>
        <v-layout
            text-xs-center
            wrap
            justify-space-between
            align-start>
            

            <v-flex 
                xs5
                >
                <p>here we will add a Template ID</p>
                <v-select
                    v-model="selected"
                    :items="template_items"
                    label="Select a Template ID"
                    solo
                ></v-select>
                <span>selected value: {{selected}}</span>
            </v-flex>



            <v-flex xs5>
            
            <!--
            <form v-on:submit.prevent="addNewIP">
                <label for="new-ip">Add an IP Address</label><br>
                <input
                v-model="newAddress"
                id="new-ip"
                placeholder="add here"
                >
                <button>Add</button>
            </form>
            -->

            <v-form>
                <v-text-field
                    v-on:keyup.enter="addNewIP"
                    v-model="newAddress"
                    label="Add an IP Address"
                ></v-text-field>
                <v-btn round @click.native="addNewIP">Add</v-btn>
            </v-form>

            <ul>
                <ip-item
                v-for="(ip, index) in ips"
                v-bind:key="ip.id"
                v-bind:address="ip.address"
                v-on:remove="ips.splice(index, 1)"
                ></ip-item>
            </ul>
            </v-flex>
            <v-flex xs12>
            <ul>
                <v-btn dark @click.native="fetchData">Launch Report</v-btn>
            </ul>
            <ul>
                <p>{{info}}</p>
            </ul>
            </v-flex>
            
        </v-layout>
    </v-container>
</template>

<script>
const axios = require('axios');
import IpItem from './IpItem'

export default {
    components: {
        IpItem,
    },
    data () {
        return {
            ipnumber: '1',
            id: '',
            address: '',
            ips: [],
            nextIPid: 0,
            newAddress: '',
            info: null,
            usd: null,
            username: 'whtew3ss',
            //password: 'GfvmRShT',
            password: '3H2Z_f3EhGbWbtW',
            ip_list: '',
            template_items: [
                { text: 'option 1', value: '5569003'},
                { text: 'option 2', value: '5021898'},
                { text: 'option 3', value: '4279536'},
                { text: 'option 4', value: '5569001'},
            ],
            selected: '',
        }
    },
    methods: {
        addNewIP: function () {
            this.ips.push({
                id: this.nextIPid++,
                address: this.newAddress,
            })
            this.newAddress = ''
        },
        fetchData: function() {

            //check that there have been IP addresses specified to be scanned
            if (this.ips.length != 0){
                //this for loop will make the variable 'ip_list' become a string of the IPs to be scanned
                var i;
                for (i = 0; i < this.ips.length; i++){
                    this.ip_list += this.ips[i].address + ', ';
                }
                /* eslint-disable */
                console.log(this.ip_list);

                //post method
                axios ({
                    method: 'post',
                    url: 'https://qualysapi.qg3.apps.qualys.com/api/2.0/fo/report',
                    data: {
                        action: 'launch',
                        template_id: this.selected,
                        output_format: 'html',
                        report_title: 'White-Owl-Vulnerability-Report',
                        report_type: 'Scan',
                        //target_from: assets,  (should be the default so might not need to include it)
                        ip_restriction: this.ip_list,
                    },
                    auth: {
                        username: this.username,
                        password: this.password,
                    },
                    config: {
                        headers: {
                            //'Access-Control-Allow-Origin': 'http://localhost:8080',
                            //'Access-Control-Allow-Methods': 'POST',
                            //'Access-Control-Request-Method': 'POST',
                            //'Access-Control-Request-Headers': 'origin, x-requested-with',
                            //'Origin': 'localhost:8080',
                            //'Authorization': this.username + ':' + this.password,
                            //this is just a guess, will need to test, might just need the 'auth:' above
                            //'X-Requested-With': 'Scanner ServiceAccount',
                        }
                    },
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (response) {
                    console.log (response);
                })
                
            } else {
                alert('Please enter one or more IP addresses to be scanned.');
            }
        }
    },
    props: ['title']

}
</script>
