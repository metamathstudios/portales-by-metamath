import TransactionsList from './TransactionsList'

const TransactionsContainer = ({ data }) => {
  return (
    <div>
        {data.length < 1 ? 
        <p className='text-sm font-bold'>No History</p>
        : 
        <TransactionsList data={data}/>
        }
    </div>
  )
}

export default TransactionsContainer