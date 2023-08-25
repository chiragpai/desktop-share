import { NetUtils } from './net-utils.js';
import multicastdns from 'multicast-dns';
const mdns = multicastdns();

const DNS_NAME = "desktop-share.local"

export class MulticastDnsService {

    constructor() {
        let nutil = new NetUtils();
        const address = nutil.findLocalAddress();
        mdns.on('query', function (query) {
            query.questions.forEach(q => {
                if(q.name === DNS_NAME) {
                    console.log(DNS_NAME, address);
                    mdns.respond({
                        answers: [{ name: 'desktop-share.local', type: 'A', data: address }]
                    });
                }
            });
        })
    }

}