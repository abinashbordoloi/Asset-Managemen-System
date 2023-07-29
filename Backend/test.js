const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Number of salt rounds for hashing

    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
    // console.log(
    //   await bcrypt.compare(
    //     "NEEPCO@123",
    //     "$2b$10$QxP6FiqctSAlc5UtO/fuaefUWSUNYhC7PtRvV5YYDyvFeDniijCY6"
    //   )
    // );
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};
const password = "neepco123";

hashPassword(password)
  .then((hashedPassword) => {
    console.log("Hashed password:", hashedPassword);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
// const call=async ()=>{
//   console.log(await bcrypt.compare(
//     "NEEPCO@123",
//     "$2b$10$QxP6FiqctSAlc5UtO/fuaefUWSUNYhC7PtRvV5YYDyvFeDniijCY6"
//   )
//   )