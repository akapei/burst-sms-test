import React from 'react'

import {sendMessage} from '../../request'

class Home extends React.Component {
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
    }

    handleSubmit(event) {
        event.preventDefault()
        const state = this.state
        sendMessage(state.number, state.text)
    }

    render() {
        return (
            <div>
                <nav></nav>
                <header>
                    <img id="logo" src="logo.png"/>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        To
                        <input name="number" type="text" value={this.state.to} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Message
                        <textarea name="text" rows="10" value={this.state.text} onChange={this.handleChange}/>
                        <span></span>
                    </label>
                    <input type="submit" value="SEND"/>
                </form>
                <footer>
                    <a href="http://www.burstsms.com.au/" target="_blank">BURST SMS HOME</a>
                </footer>
            </div>
        )
    }
}

export default Home