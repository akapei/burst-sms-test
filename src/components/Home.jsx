import React from 'react'
import axios from 'axios'

const KEY = process.env.KEY
const SECRET = process.env.SECRET

function sendMessage(number, text) {
    axios.post({
            method: 'post',
            url: 'http://api.transmitsms.com/',
            headers: {'Authorization': 'Basic ' + (KEY + ':' + SECRET).toString('base64')},
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
            console.log(error)
        })
}


class App extends React.Component() {

    render() {
        return (
            <Form/>
        )

    }

}

class Form extends React.Component {
    constructor(props) {
        super(props);
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
    }

    handleSubmit(event) {
        const state = this.state
        sendMessage(state.number, state.text)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    To:
                    <input type="text" value={this.state.to} onChange={this.handleChange}/>
                </label>
                <label>
                    Message:
                    <input type="text" value={this.state.text} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default App;