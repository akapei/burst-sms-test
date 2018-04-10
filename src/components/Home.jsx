import React from 'react'

import {sendMessage} from '../../request'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {number: '', text: '', charlength: 480, validation: false}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const target = event.target
        const name = target.name


        this.setState({
            [name]: target.value
        })

        if(name === 'number') {
            if(/^\d{10}$/.test(this.state.number)){
                this.setState({
                    validation: true
                })
            } else {
                this.setState({
                    validation: false
                })
            }
        }

        if(name === 'text') {
            const charlength = 480 - this.state.text.length - 1
            this.setState({
                charlength: charlength
            })
        }
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
                    <h1>Send a message</h1>
                    <label>
                        To
                        <input name="number" type="text" maxLength="11" value={this.state.number} onChange={this.handleChange}/>
                        {this.state.validation ? (<span></span>) : (<span>INVALID NUMBER</span>)}
                    </label>
                    <label>
                        Message
                        <textarea name="text" rows="10" maxLength="480" value={this.state.text} onChange={this.handleChange}/>
                        <span>Characters left: {this.state.charlength}</span>
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