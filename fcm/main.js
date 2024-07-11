import { JWT } from "google-auth-library";
import fetch from 'node-fetch';
import key from './tmp/secret.json' assert { type: 'json' };

async function main() {

    const token = await getAccessToken()
    const projectId = 'secret';
    const res = await fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            message: {
                topic: 'CT0021',
                android: {
                    priority: 'HIGH',
                    data: {
                        method: 'requestRelease',
                        title: 'title',
                        msg: 'test',
                    },
                    // notification: {
                        // title: 'title',
                        // body: 'test',
                        // default_sound: true,
                        // notification_priority: 'PRIORITY_MAX',
                    // },
                }
            }
        })
    }
    )
    const data = await res.json();
    console.log(data)
}
main()


async function getAccessToken() {
    const client = new JWT(
        key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/firebase.messaging'],
    );

    const res = await client.authorize();

    console.log(res)

    return res.access_token
}