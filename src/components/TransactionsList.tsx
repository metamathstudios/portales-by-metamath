import React from 'react'

const TransactionsList = ({ data }) => {
  var txnLink;

  const getTxLink = (chainOrigin, txId) => {
    switch (chainOrigin) {
      case "0x4":
        txnLink = `https://rinkeby.etherscan.io/tx/${txId}`;
        break;
      case "0x507":
        txnLink = `https://moonbase.moonscan.io/tx/${txId}`;
        break;
    }

    return txnLink;
  }

  return (
    <div>
      {data.map((index, key) => {
          return (
            <>
              {key < 1 ?
                <a href={getTxLink(index.origin, index.tx)} target="_blank"><div className='p-3 w-[100%] bg-button-gray rounded-lg text-[10px] text-center'>{index.tx}</div></a>
              : ""}
              {key > 0 ?
                <a href={getTxLink(index.origin, index.tx)} target="_blank"><div className='p-3 w-[100%] bg-button-gray rounded-lg text-[10px] text-center mt-3'>{index.tx}</div></a>
              : ""}
              {key == (data.length - 1) ?
                <a href={getTxLink(index.origin, index.tx)} target="_blank"><div className='p-3 w-[100%] bg-button-gray rounded-lg text-[10px] text-center mt-3 mb-3'>{index.tx}</div></a>
              : ""}
            </>
          )
      })}
    </div>
  )
}

export default TransactionsList