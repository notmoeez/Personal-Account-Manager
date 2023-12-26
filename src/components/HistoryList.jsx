import React from "react";
import "./HistoryList.css";
import { firestore } from "../firebase";
import { deleteDoc, doc } from "@firebase/firestore";

const HistoryList = ({ transactions, setTransactions, getTransactions }) => {
  const deleteItem = (id) => {
    const docRef = doc(firestore, "transactions", id);
    deleteDoc(docRef);

    getTransactions();
  };

  return (
    <>
      <h3>History</h3>
      <ul className="list" id="list">
        {transactions.map(({ id, name, amount, sign }) => (
          <li key={id} className={sign ? "exp exp-hover" : "inc inc-hover"}>
            <span>{name}</span>
            <span>{sign ? amount : `+${amount}`}</span>
            <button onClick={() => deleteItem(id)} className="delete-btn">
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HistoryList;
