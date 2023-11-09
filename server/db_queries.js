import executeQuery from "./db.js";

const registerUser = async (id, username, email, password, role) => {
  const newUser = {
    id: id,
    username: username,
    email: email,
    password: password,
    role: role,
  };

  const result = await executeQuery(
    "INSERT INTO users (id, username, email, password, role) VALUES ($1, $2, $3, $4, $5)",
    [
      newUser.id,
      newUser.username,
      newUser.email,
      newUser.password,
      newUser.role,
    ]
  );

  // console.log(`new user created`);
  // console.log(result);
  return result;
};

const findUser = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  // console.log(`found user?`);
  return result.rows[0];
};

const getAllUsers = async () => {
  // console.log(`requesting for all users`);
  const result = await executeQuery("SELECT * FROM users");
  // console.log(`found ${result.rows.length} users`);
  return result;
};

const getUser = async (id) => {
  // console.log(`requesting user with ${id}`);
  const result = await executeQuery("SELECT * FROM users WHERE id=$1", [id]);
  // console.log(`found ${result.rows.length} users`);
  return result;
};

const updateUser = async (user) => {
  const userDetails = [
    user.username,
    user.email,
    user.password,
    user.role,
    user.id
  ];
  // console.log(userDetails)
  const result = await executeQuery(
    "UPDATE users SET username=$1, email=$2, password=$3, role=$4 WHERE id=$5",
    userDetails
  );
  // console.log(`user with id ${user.id} updated`);
  return result;
};

const deleteUser = async (id) => {
  // console.log(`deleting user with id ${id}`);
  const userId = [id];
  const result = await executeQuery("DELETE FROM users WHERE id=$1", userId);
  return result;
};

export {
  registerUser,
  findUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
