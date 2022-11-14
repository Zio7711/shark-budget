"use strict";
exports.__esModule = true;
var expenseController_1 = require("../controllers/expenseController");
var express_1 = require("express");
var expenseRouter = express_1["default"].Router();
expenseRouter.route("/").post(expenseController_1.createExpense).get(expenseController_1.getAllExpenses);
expenseRouter
    .route("/:id")
    .get(expenseController_1.getExpense)
    .patch(expenseController_1.updateExpense)["delete"](expenseController_1.deleteExpense);
exports["default"] = expenseRouter;
