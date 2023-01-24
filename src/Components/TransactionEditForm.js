import { useState, useEffect } from "react";
import { useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";

function TransactionEditForm() {
  let { index } = useParams();

  const API = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };
  
  // const handleCheckboxChange = () => {
  //   setTransaction({ ...transaction, isFavorite: !transaction.isFavorite });
  // };

  useEffect(() => {
    axios.get(`${API}/transactions/${index}`)
      .then(response => setTransaction(response.data))
      .catch(err => console.log(err));
  }, [API, index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${API}/transactions/${index}`, transaction)
      .then(response => navigate(`/transactions/${index}`))
      .catch(console.error);
  };
  return (
    <div className="Edit">
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
      <Link to={`/transactions/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default TransactionEditForm;
