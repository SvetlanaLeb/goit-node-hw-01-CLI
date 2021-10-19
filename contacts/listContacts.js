let fs = require("fs/promises");
let path = require("path");
const colors = require("colors");
const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");

    console.table(JSON.parse(contacts));
  } catch (err) {
    console.log(err.red);
  }
};
module.exports = listContacts;
