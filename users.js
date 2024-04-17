let registeredUsers = [
  { username: "utilisateur1", password: "motdepasse1" },
  { username: "utilisateur2", password: "motdepasse2" },
];

const getRegisteredUsers = () => {
  return registeredUsers;
};

module.exports = {
  getRegisteredUsers,
};
