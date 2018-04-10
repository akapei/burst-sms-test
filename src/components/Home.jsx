import React from 'react'
import axios from 'axios'

function sendMessage(number, text) {

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
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        })
}

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {number: '', text: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const target = event.target
        const name = target.name
        this.setState({
            [name]: target.value
        })

        const state = this.state
        console.log(state.number, state.text)
    }

    handleSubmit(event) {
        const state = this.state
        console.log(state.number, state.text)
        sendMessage(state.number, state.text)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    To:
                    <input name="number" type="text" value={this.state.to} onChange={this.handleChange}/>
                </label>
                <label>
                    Message:
                    <input name="text" type="text" value={this.state.text} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default Form;