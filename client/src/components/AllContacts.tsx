import { useEffect, useState } from "react";
import Instance from "../api/Instance";
import ContactItem from "./ContactItem";
import EditContact from "./EditContact";
import CreateContact from "./CreateContact";

type Contact = {
  contactID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
};

const AllContacts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [singleContact, setSingleContact] = useState<Contact | undefined>();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const getAllContacts = async () => {
    setLoading(true);
    try {
      const res = await Instance.get("contact");
      setContacts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item: Contact) => {
      setOpenEdit(true);
      setSingleContact(item);
  };

  const handleDeleteClick = async (contact: Contact) => {
    try {
      await Instance.delete(`contact/${contact.contactID}`);
      getAllContacts();
      setSearch("")
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditData = async (
    e: React.FormEvent<HTMLFormElement>,
    contact: Contact
  ) => {
    e.preventDefault();
    try {
      await Instance.patch(`contact/${contact.contactID}`, contact);
      getAllContacts();
      setOpenEdit(false);
    } catch (error) {
      alert("Enable to edit data");
      console.log(error);
    }
  };

  const handleCreateData = async (
    e: React.FormEvent<HTMLFormElement>,
    contact: Contact
  ) => {
    e.preventDefault();
    try {
      await Instance.post("contact", contact);
      getAllContacts();
      setOpenCreate(false);
    } catch (error) {
      alert("Enable to create data");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  if(loading){
    return <p className="w-full h-[calc(100vh_-_56px)] grid place-items-center">Loading...</p>
  }

  return (
    <>
      {openCreate && (
        <CreateContact
          setOpenCreate={setOpenCreate}
          handleCreateData={handleCreateData}
        />
      )}
      {openEdit && (
        <EditContact
          singleContact={singleContact}
          setOpenEdit={setOpenEdit}
          handleEditData={handleEditData}
        />
      )}
      <section className="mx-auto max-w-6xl mt-10 px-4">
        <div className="flex items-start justify-between">
          <p className="text-xl font-semibold text-gray-800 mb-4">
            All Contacts
          </p>

          <div className="flex items-center gap-2">
            <div className="px-2 py-1.5 rounded shadow border border-white focus-within:border-blue-400 bg-white flex items-center gap-2">
              <svg
                className="fill-none stroke-gray-400 w-4 h-4 cursor-pointer"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
              </svg>
              <input
                type="text"
                className="text-sm outline-none "
                placeholder="Enter first name..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="bg-blue-500 p-1.5 rounded shadow" onClick={() => setOpenCreate(true)}>
              <svg
                className="fill-none stroke-white w-4 h-4 cursor-pointer"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="5" y2="19" />
                <line x1="5" x2="19" y1="12" y2="12" />
              </svg>
            </button>
          </div>
        </div>
        <ContactItem
          contacts={contacts}
          search={search}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      </section>
    </>
  );
};

export default AllContacts;
