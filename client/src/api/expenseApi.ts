const expenseApi = {
  CreateNewExpense: "/expense", // post
  GetALlExpenses: "/expense", // get
  EditExpense: (id: string) => `/expense/${id}`, // patch
  DeleteExpense: (id: string) => `/expense/${id}`, // delete
};

export default expenseApi;
