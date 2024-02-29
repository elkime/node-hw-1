const fs = require("fs");
const path = require("path");

// Ruta al archivo contacts.json
const contactsPath = path.join(__dirname, "db", "contacts.json");

// Función para listar todos los contactos
function listContacts(callback) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    try {
      const contacts = JSON.parse(data);
      callback(null, contacts);
    } catch (error) {
      callback(error, null);
    }
  });
}

// Función para obtener un contacto por su ID
function getContactById(contactId, callback) {
  listContacts((err, contacts) => {
    if (err) {
      callback(err, null);
      return;
    }
    const contact = contacts.find((c) => c.id === contactId);
    callback(null, contact);
  });
}

// Función para eliminar un contacto por su ID
function removeContact(contactId, callback) {
  listContacts((err, contacts) => {
    if (err) {
      callback(err);
      return;
    }
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    const contactsJSON = JSON.stringify(updatedContacts, null, 2);
    fs.writeFile(contactsPath, contactsJSON, (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  });
}

// Función para agregar un nuevo contacto
function addContact(contact, callback) {
  listContacts((err, contacts) => {
    if (err) {
      callback(err);
      return;
    }
    const newContact = {
      id: Date.now(),
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };
    contacts.push(newContact);
    const contactsJSON = JSON.stringify(contacts, null, 2);
    fs.writeFile(contactsPath, contactsJSON, (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
