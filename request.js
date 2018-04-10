import axios from 'axios'

export function sendMessage(number, text) {

    axios({
            url: 'http://localhost:8080/send-message',
            method: 'get',
            params: {
                to: number,
                message: text
            }
        }
    )
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
}