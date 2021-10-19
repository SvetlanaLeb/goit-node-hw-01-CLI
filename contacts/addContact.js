const fs = require("fs/promises");
const path = require("path");
const colors = require("colors");
const contactsPath = path.resolve("./db/contacts.json");

const addContact = async (name, email, phone) => {
  try {
    if (!name) return console.log("Введите имя".red);
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data.toString());
    const foundItem = parsedData.find((el) => {
      return el.name.toLowerCase() === name.toLowerCase();
    });

    if (foundItem) {
      return console.log(`Контакт ${name} уже есть`.red);
    }

    const newContact = {
      id: parsedData.length + 1,
      name,
      email,
      phone,
    };
    parsedData.push(newContact);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(parsedData, null, 2),
      "utf8"
    );
    const result = await fs.readFile(contactsPath, "utf8");
    const parsedResult = JSON.parse(result.toString());
    console.log("Новый контакт добавлен".blue);
    console.log("Обновленный список контактов".yellow);
    console.table(parsedResult);
  } catch (err) {
    if (err) {
      return console.log(err.red);
    }
  }
};

module.exports = addContact;
