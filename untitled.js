const App = React.createClass({

  getInitialState() {
    return {
      transactions: [],
      balance: 0,
      totalCredit: 0,
      totalDebit: 0,
      counter: 0
    }
  },

  totalDepositsAndWithdrawals(amount) {
    const {totalCredit, totalDebit} = this.state;
      if (amount > 0) {
      this.setState({ totalCredit: totalCredit + amount })
    } else if (amount < 0) {
      totalDebit += amount
      this.setState({ totalDebit })
    }
  },

  addNewTransaction(newTransaction) {
    let {transactions, balance, amount} = this.state;
    this.setState({
      transactions: [...transactions, newTransaction],
      balance: balance + newTransaction.amount
    })
  },

  removeTransaction(id) { 

    const{ transactions, totalCredit, totalDebit } = this.state;

    let removedTransaction = transactions.filter(transaction => transaction.id === id);
    let removedAmount = removedTransaction[0].amount

    if (removedAmount >= 0){
      this.setState({ totalCredit: this.state.totalCredit - removedAmount })
    } else {
      this.setState({ totalDebit: this.state.totalDebit - removedAmount })
    }

    this.setState({
      balance: this.state.balance - removedAmount,
      transactions: transactions.filter(transaction => transaction.id !== id)
    });
  },


  render () {
    const {　transactions, balance, totalCredit, totalDebit　} = this.state;
    return (
      <div className="container">
      <br/>
      <div className="jumbotron">
      <div className="container">
      <h1>MandsBankingCo</h1>
      <h2>Please input a transaction below. Have a lovely day!</h2>
      <div className="jumbotron">
      <h2>Your Balance : </h2>
      <h2><button className="btn btn-lg btn-info btn-block">{ balance }</button></h2>
      <h2>Your Total Credits : </h2>
      <h2><button className="btn btn-lg btn-success btn-block">{ totalCredit }</button></h2>
      <h2>Your Total Debits : </h2>
      <h2><button className="btn btn-lg btn-warning btn-block">{ totalDebit }</button></h2>
      <hr/>
      <NewTransactionForm 
        amount={this.state.amount} 
        totalCredit={this.state.totalCredit} 
        totalDebit={this.state.totalDebit} 
        balance={balance}
        comment={this.state.comment}
        setInitialBalance={this.setInitialBalance}
        totalDepositsAndWithdrawals={this.totalDepositsAndWithdrawals}
        addNewTransaction={this.addNewTransaction}/>
      <TransactionTable 
      transaction={this.state.transaction} 
      balance={this.state.balance}         
      comment={this.state.comment}
      transactions={transactions} 
      removeTransaction={this.removeTransaction}/>
      <hr/>
      </div>
      </div>
      </div>
      </div>
    )
  }
})


const TransactionTable = props => {
  const{　transactions, removeTransaction, transaction, balance　} = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Balance</th>
          <th>Comment</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.balance}</td>
            <td>{transaction.comment}</td>
            <td>
              <button className="btn btn-sm btn-info">Edit</button>
            </td>
            <td>
              <button onClick={removeTransaction.bind(null, transaction.id)} className="btn btn-sm btn-danger">X</button>
            </td>
          </tr>
          ))}
      </tbody>
    </table>
  )
}



const NewTransactionForm = React.createClass({
  submitForm(e) {
    e.preventDefault();

    let balance = this.props.balance + parseFloat(amount.value);

    let transaction = {
      balance,
      id: uuid(),
      comment: comment.value,
      amount: parseFloat(amount.value),
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),      
    }

    this.props.addNewTransaction(transaction);
    this.props.totalDepositsAndWithdrawals(parseFloat(amount.value));

    amount.value = ""
    comment.value　= ""
    document.getElementById("depositRadio").checked = false;
    document.getElementById("withdrawalRadio").checked = false;
  },

  plus() {
    amount.value < 0 ? amount.value * -1 : amount.value;
    this.refs.amount.value = amount.value;
  },

  minus() {
    this.refs.amount.value = -1 * this.refs.amount.value; 
  },

  render() {
    return (
      <div className="container">
        
      <form onSubmit={this.submitForm}>         

           <div className="form-group">
             <label htmlFor="amount">&nbsp Transaction amount:</label>
            <div>
             <input ref="amount" type="number" className="form-control" id="amount" placeholder="100.00" step="0.01" required/>           
             </div>
            <div className="radio">
              <label htmlFor='depositRadio'>Deposit</label>
              <input id="depositRadio" type="radio" name="optradio" onClick={this.plus} />
            </div>
            <div className="radio"><label><input id="withdrawalRadio" type="radio" name="optradio" required onClick={this.minus}/>Withdrawal</label>
            </div>
          <br/>
          <div>
             <input ref="comment" type="text" className="form-control" id="comment" placeholder="Describe this transaction" required/>           
             </div>
             <br/>
            <button type="submit" htmlFor="amount" className="btn btn-lg btn-info {/*col-lg-2*/}">Submit</button>
            <br/>
            <br/>
           </div>
        </form>
      </div>
      )
  }
})

ReactDOM.render (
  <App/>,
  document.getElementById('root')
  )












