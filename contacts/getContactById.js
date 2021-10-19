const fs = require("fs/promises");
const path = require("path");
const colors = require("colors");
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

const getContactById = async (contactId) => {
  try {
    if (!contactId) return console.log("Введите id".red);
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    const contact = parsedData.find(({ id }) => id === Number(contactId));
    console.log(`Найден контакт ${contactId}`.blue, contact);
  } catch (err) {
    console.log(err.red);
  }
};

module.exports = getContactById;
