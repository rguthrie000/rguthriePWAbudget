// Budget Tracker - route handling

const router = require("express").Router();
const Transaction = require("../models/transaction.js");

// transactionResponse() provides the callback functionality for all
// of the route handlers.
const transactionResponse = (err,data,res) => {
  if (err) {
      res.status(400).json(err);
  } else {
      res.json(data);
  }
}

// Add a transaction
router.post("/api/transaction", ({body}, res) => {
  Transaction.
    create(body, (err,data) => {
      transactionResponse(err,data,res);
    });
});

// Add a set of transactions.  This is used when
// the client has been storing transactions while
// offline.
router.post("/api/transaction/bulk", ({body}, res) => {
  Transaction.
    insertMany(body, (err,data) => {
      transactionResponse(err,data,res);
    });
});

// Get the list of transactions, sorted in descending order.
router.get("/api/transaction", (req, res) => {
  Transaction.
    find().sort({date: -1}).exec( (err,data) => {
      transactionResponse(err,data,res);
    });
});

module.exports = router;
