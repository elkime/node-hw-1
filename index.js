const argv = require("yargs").argv;
const contacts = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts((err, contactList) => {
        if (err) {
          console.error("Error al listar contactos:", err);
        } else {
          console.table(contactList);
        }
      });
      break;

    case "get":
      contacts.getContactById(id, (err, contact) => {
        if (err) {
          console.error("Error al obtener contacto por ID:", err);
        } else {
          console.table(contact);
        }
      });
      break;

    case "add":
      const newContact = {
        name,
        email,
        phone,
      };
      contacts.addContact(newContact, (err) => {
        if (err) {
          console.error("Error al agregar contacto:", err);
        } else {
          console.log("Nuevo contacto agregado con éxito.");
        }
      });
      break;

    case "remove":
      contacts.removeContact(id, (err) => {
        if (err) {
          console.error("Error al eliminar contacto por ID:", err);
        } else {
          console.log("Contacto eliminado con éxito.");
        }
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
