import React, { useState } from "react";

export default function Footer(props: any) {
  let [total, setTotal] = useState(0);
  total = props.totalAmount;

  return (
    <footer className="footer">
      <form className="footer-info">
        <div className="footer-contact">
          <span>
            <p>First name: <input placeholder="First Name"></input></p>
            <p>Last name: <input placeholder="Last Name"></input> </p>
            <p>Phone number: <input placeholder="Phone number"></input></p>
            <p>E-Mail address: <input placeholder="E-Mail"></input></p>
            <p>Country: Germany</p>
            <p>City: Berlin</p>
          </span>
        </div>
        <span>Amount: {total}€</span>
        <span>Shipping: Free</span>
        <span className="total">Total amount: {total}€</span>

        <button
          type="submit"
          className="footer-order-button"
          onClick={() => {
            alert(`Your order has been accepted!
            Total amount of your order is ${total}€.`);
          }}
        >
          Order ➢
        </button>
      </form>
    </footer>
  );
}
