export const home = (req, res) => {
  res.render("home", { title: "Bienvenido" });
};

export const login = (req, res) => {
  res.cookie("username");
  res.render("login", { title: "Bienvenido" });
};
