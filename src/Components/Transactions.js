import { useState, useEffect } from "react";
import axios from "axios";

import Bookmark from "./Transaction";

const API = process.env.REACT_APP_API_URL;

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  // const [transactionsTotal, setTransactionsTotal] = useState(0);
  let transactionsTotal = 0;

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  transactions.forEach(transaction => transactionsTotal += transaction.amount)

  return (
    <div className="Transactions">
      <section>
        <table>
          <thead>
            <tr>
              <th>Bank Account Total: {transactionsTotal}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <Bookmark key={index} transaction={transaction} index={index} />
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Transactions;
