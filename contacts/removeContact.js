const fs = require("fs/promises");
const path = require("path");
const colors = require("colors");
const contactsPath = path.resolve("./db/contacts.json");

const removeContact = async (contactId) => {
  try {
    if (!contactId) return console.log("Введите id".red);

    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data.toString());

    const foundItem = parsedData.find(({ id }) => id === Number(contactId));
    if (!foundItem) return console.log("Такого id нет".red);

    const newData = parsedData.filter(({ id }) => id !== Number(contactId));

    await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), "utf8");

    const result = await fs.readFile(contactsPath, "utf8");
    const parsedResult = JSON.parse(result.toString());
    console.log(`Контакт  ${contactId} удален`.blue);
    console.log("Обновленный список контактов".yellow);
    console.table(parsedResult);
  } catch (err) {
    console.log(err);
  }
};

module.exports = removeContact;
