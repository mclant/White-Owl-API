<template>
    <v-container>
        <v-layout
            align-start
            justify-space-around
            row
            fill-height
            >
            <!--
            <v-flex 
                xs6
                offset-xs3
                >
                <span>this users id: {{ ips_network_id }}</span>
            </v-flex>
            -->
            <v-flex xs3>
                <v-card>
                    <v-card-title>
                        Select a Report Template
                    </v-card-title>
                    <v-select
                        v-model="selected_template"
                        :items="template_items"
                        label="Select a Template"
                        solo
                    ></v-select>
                </v-card>
            </v-flex>

            <v-flex xs3>
                <v-card>
                    <v-form>
                        <v-text-field
                            v-on:keyup.enter="addNewIP"
                            v-model="newAddress"
                            label="Add an IP Address or Range of IP Addresses"
                        ></v-text-field>
                        <v-btn round light @click.native="addNewIP">Add</v-btn>
                    </v-form>

                    <ul>
                        <ip-item
                        v-for="(ip, index) in ips"
                        v-bind:key="ip.id"
                        v-bind:address="ip.address"
                        v-on:remove="ips.splice(index, 1)"
                        ></ip-item>
                    </ul>
                </v-card>
            </v-flex>

            <v-flex xs3>
                <v-card>
                    <v-card-title>
                        Select an Output Format
                    </v-card-title>
                <v-select
                    v-model="selected_output"
                    :items="output_items"
                    label="Select an Output Format"
                    solo
                ></v-select>
                </v-card>
            </v-flex>

        </v-layout>


        <v-flex offset-xs5>
            <ul>
                <v-btn color="error" @click.native="fetchData">Launch Report</v-btn>
            </ul>
            <ul>
                <p>{{info}}</p>
            </ul>
        </v-flex>

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
                { text: 'Executive Report', value: '4279536'},
                { text: 'High Severity Vulnerability Report', value: '5569003'},
                { text: 'Patch Report', value: '5021898'},
                { text: 'High Severity Patch Report', value: '5569001'},
            ],
            output_items: [
                { text: 'PDF', value: 'pdf'},
                { text: 'CSV', value: 'csv'},
                { text: 'HTML (a ZIP file)', value: 'html'},
                { text: 'XML', value: 'xml'},
                { text: 'MHT', value: 'mht'},
                { text: 'DOCX', value: 'docx'},
            ],
            selected_template: '',
            selected_output: '',
            //ips_network_id: user.user_metadata.ips_network_id,
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
                        template_id: this.selected_template,
                        output_format: this.selected_output,
                        report_title: 'White-Owl-Vulnerability-Report',
                        report_type: 'Scan',
                        //target_from: assets,  (should be the default so might not need to include it)
                        ips: this.ip_list,
                        //ips_network_id: this.ips_network_id,
                    },
                    auth: {
                        username: this.username,
                        password: this.password,
                    },
                    config: {
                        headers: {
                            'X-Requested-With': 'Scanner ServiceAccount',
                            //'Access-Control-Allow-Origin': 'http://localhost:8080',
                            //'Access-Control-Allow-Methods': 'POST',
                            //'Access-Control-Request-Method': 'POST',
                            //'Access-Control-Request-Headers': 'origin, x-requested-with',
                            //'Origin': 'localhost:8080',
                            //'Authorization': this.username + ':' + this.password,
                            //this is just a guess, will need to test, might just need the 'auth:' above
                            
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
