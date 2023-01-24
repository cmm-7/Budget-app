import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function TransactionDetails() {
  const [transaction, setTransaction] = useState([]);
  let { index } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/transactions/${index}`)
    .then((response) => {
      setTransaction(response.data);
    })
    .catch(err => {
      navigate("/not-found");
    })
  }, [index, navigate]);

  const handleDelete = () => {
    axios.delete(`${API}/transactions/${index}`)
      .then(response => navigate("/transactions"))
      .catch(console.error);
  };

  return (
    <article>
      <h2>
          {transaction.item_name}
      </h2>
      <h5>
        Date: {transaction.date}
      </h5>
      <h5>
        Amount: ${transaction.amount}
      </h5>
      <h5>
        From: {transaction.from}
      </h5>
      <h5>
        Category: {transaction.category}
      </h5>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/transactions`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/transactions/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default TransactionDetails;
