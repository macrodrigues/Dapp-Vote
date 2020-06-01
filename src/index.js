import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './index.css';
import VotePT from './contracts/VotePT.json'
import './parties.js'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      accountBalance: 0,
      voteCount: 0,
      voters: [],
      allAcounts: [],
      isFormHidden : true,
      loading: true,
    }
    this.vote = this.vote.bind(this)
    this.getAllVotes = this.getAllVotes.bind(this)
    this.getVotesByParty = this.getVotesByParty.bind(this)
  }

  async UNSAFE_componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  //connect to web3
  async loadBlockchainData() {
    var Web3 = require('web3');
    let web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    let accountBalance = await web3.eth.getBalance(accounts[0]);
    accountBalance = web3.utils.fromWei(accountBalance, 'ether')
    this.setState({ accountBalance })

    const networkId = await web3.eth.net.getId()
    const networkData = VotePT.networks[networkId]
    console.log(networkData.address) //smart contract address
    console.log(this.state.account) //sending address

    if (networkData) {
      const votePt = new web3.eth.Contract(VotePT.abi, networkData.address)
      this.setState({ votePt })

      const voteCount = await votePt.methods.voteCount().call()
      this.setState({ voteCount })

      // Load voters
      for (var i = 1; i <= voteCount; i++) {
        const voter = await votePt.methods.voters(i).call()
        this.setState({ voters: [...this.state.voters, voter] })
      }
      this.setState({ loading: false })
    } else {
      window.alert('Election contract not deployed to detected network.')
    }
  }

  //Define solidity functions 
  vote(id, party) {
    this.setState({ loading: true })
    this.state.votePt.methods.vote(id, party, this.state.account).send({ from: this.state.account, gas:3000000 })
      .on('receipt', (receipt) => {
        console.log(receipt);
        this.setState({ loading: false })
      })
  }

  getAllVotes() {
    this.setState({ loading: true })
    this.state.votePt.methods.getAllVotes().call()
    .on('receipt', (receipt) => {
      console.log(receipt);
      this.setState({ loading: false })
    })
  }

  getVotesByParty(party) {
    this.setState({ loading: true })
    this.state.votePt.methods.getVotesByParty(party).call()
    .on('receipt', (receipt) => {
      console.log(receipt);
      this.setState({ loading: false })
    })
  }

  hideAllSections() {
    this.setState({
        isFormHidden : true
    })
  }

  render() {
    return (
      <div>
        <h1>Make Your Electronic Vote</h1>
        <h2>The Blockchain based E-Vote, allows the voters to fight against political corruption and lack of transparency</h2>
        <div className="buttons-container">
        <button onClick={()=> {
            this.hideAllSections()
            if(this.state.isFormHidden) this.setState({isFormHidden: false})
            else this.setState({isFormHidden:true})
            }}>Vote</button>          
        </div>
        <Vote 
          className={this.state.isFormHidden?'hidden':''}
          cancel={() => this.setState({isFormHidden:true})}
          vote={(id, party) => {
              this.vote(id, party)
          }}
          />
      </div>
    );
  }
}

class Vote extends React.Component {
  constructor(){
      super()
  }

  render() {
      return (
          <form className={this.props.className}>
              <input className="form-input" type="text" ref="form-id" placeholder="Insert ID card number" />
              <input className="form-input" type="number" ref="form-party" placeholder="Insert party index" />
              <h4>*Insert 0 for blank vote</h4>
              <div>
                  <button onClick={event => {
                      event.preventDefault()
                      this.props.cancel()
                  }} className="cancel-button">Cancel</button>
                  <button onClick={event => {
                      event.preventDefault()
                      this.props.vote(
                          this.refs['form-id'].value,
                          this.refs['form-party'].value)
                  }}>Submit</button>
              </div>
          </form>
      )
  }
}

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;

