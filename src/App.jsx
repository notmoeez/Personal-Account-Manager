import { useState, useEffect } from "react";
import "./App.css";
import HistoryList from "./components/HistoryList";
import { firestore } from "./firebase";
import { getDocs, addDoc, collection } from "@firebase/firestore";

function App() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [transactions, setTransactions] = useState([]);

  const ref = collection(firestore, "transactions");

  const getTransactions = async () => {
    try {
      const res = await getDocs(ref);
      const loadedTransactions = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTransactions(loadedTransactions);
    } catch (error) {
      console.error("error", error);
    }
  };

  const updateList = async (e) => {
    e.preventDefault();

    let sign = value < 0 ? true : false;

    const transaction = {
      name: name,
      amount: Number(value),
      sign: sign,
    };

    try {
      await addDoc(ref, transaction);
    } catch (error) {
      console.error(error);
    }

    setBalance((prevBalance) => prevBalance + Number(value));

    setName("");
    setValue("");

    getTransactions();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(({ sign, amount }) => {
      if (sign) {
        totalExpense += amount;
      } else {
        totalIncome += amount;
      }
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense * -1);
  }, [transactions]);

  return (
    <>
      <h2>Personal Account Manager</h2>
      <h3>Abdul Moez - F2020266109</h3>
      <div className="container">
        <h4 className="balance-display">CURRENT BALANCE</h4>
        <h1 id="balance">Rs. {balance}</h1>

        <div className="inc-exp-container">
          <div>
            <h4>INCOME</h4>
            <p id="money-inc" className="money inc">
              Rs. {income}
            </p>
          </div>
          <div>
            <h4>EXPENSE</h4>
            <p id="money-exp" className="money exp">
              Rs. {expense * -1}
            </p>
          </div>
        </div>

        <HistoryList
          transactions={transactions}
          setTransactions={setTransactions}
          getTransactions={getTransactions}
        />

        <h3>Add New Transaction</h3>

        <form id="form" onSubmit={updateList}>
          <label htmlFor="transaction-name">Text</label>
          <input
            type="text"
            name="transaction-name"
            id="trans-name"
            placeholder="Enter text..."
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount..."
            onChange={(e) => setValue(Number(e.target.value))}
            value={value}
          />
          <button className="btn" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
