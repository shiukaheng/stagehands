import makeMdns from "multicast-dns"
import { getName } from "./name";

const mdns = makeMdns();
const name = getName();

// Get IP address of the device on the local network 


// Advertise stagehands_pairing service
mdns.on('query', (query) => {
    const [question] = query.questions;
    if (question && question.type === 'PTR' && question.name === '_stagehands_pairing._tcp.local.') {
        mdns.respond({
            answers: [{
                name: '_stagehands_pairing._tcp.local.',
                type: 'PTR',
                data: 'Stagehands Pairing._stagehands_pairing._tcp.local.'
            }, {
                name: 'Stagehands Pairing._stagehands_pairing._tcp.local.',
                type: 'SRV',
                data: {
                    port: 3535,
                    weight: 0,
                    priority: 0,
                    target: 'my-stagehands-pairing.local'
                }
            }, {
                name: 'my-stagehands-pairing.local',
                type: 'A',
                ttl: 300,
                data: '192.168.0.2'
            }]
        });
    }
});