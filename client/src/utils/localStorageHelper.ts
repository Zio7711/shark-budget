export const addUserToLocalStorage = (
  user: { name: string; email: string },
  token: string
) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
