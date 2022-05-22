import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import loading from '../assets/gifs/loading.gif'
import TransactionsContainer from './TransactionsContainer'
import { API_URL } from '../config'

const Transactions = ({ fetched, data }) => {
  return (
    <>
        {fetched ? <TransactionsContainer data={data} /> : <img src={loading} alt="back" width={25} className={``}/>}
    </>
  )
}

export default Transactions