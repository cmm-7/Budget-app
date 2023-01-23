import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TransactionNewForm() {
  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: ""
  });

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  // const handleCheckboxChange = () => {
  //   setTransaction({ ...transaction, isFavorite: !bookmark.isFavorite });
  // };

  const API = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${API}/transactions`, transaction)
    .then(() => {
      navigate("/transactions")
    })
    .catch(err => {
      console.log(err);
    })
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
      <label htmlFor="item_name">Item Name:</label>
        <input
          id="item_name"
          type="text"
          value={transaction.item_name}
          placeholder="Name of Transaction"
          onChange={handleTextChange}
          required
        />
        <br/>
        <br/>
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={transaction.amount}
          placeholder="Income or spending amount"
          onChange={handleTextChange}
          required
        />
        <br/>
        <br/>
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="text"
          name="date"
          value={transaction.date}
          placeholder="i.e: January 1"
          onChange={handleTextChange}
        />
        <br/>
        <br/>
        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="text"
          name="from"
          value={transaction.from}
          placeholder="Store, Company, ..."
          onChange={handleTextChange}
        />
        <br />
        <br/>
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={transaction.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <br/>
        <br/>
        <input type="submit" />
      </form>
      <br/>
      <br/>
    </div>
  );
}

export default TransactionNewForm;
