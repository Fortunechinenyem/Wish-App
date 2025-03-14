import vCard from "vcard-parser";

export const importContacts = async () => {
  try {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".vcf";
    fileInput.click();

    const file = await new Promise((resolve) => {
      fileInput.onchange = (e) => resolve(e.target.files[0]);
    });

    const fileContent = await file.text();

    const parsedContacts = vCard.parse(fileContent);

    const contacts = parsedContacts.map((contact) => ({
      name: contact.fn || "Unknown",
      birthday: contact.bday || null,
    }));

    return contacts.filter((contact) => contact.birthday);
  } catch (error) {
    console.error("Error importing contacts:", error);
    throw error;
  }
};
