type Contact = {
  contactID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
};

type Props = {
    contacts: Contact[];
    search: string;
    handleEditClick: Function;
    handleDeleteClick: Function
}

const ContactItem = ({contacts, search, handleEditClick, handleDeleteClick}: Props) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {contacts?.filter((contact) => {
          if (search === "") {
            return contact;
          } else if (
            contact.firstName.toLowerCase().includes(search.toLowerCase())
          ) {
            return contact;
          }
        })?.length > 0 ? (
          contacts
            ?.filter((contact) => {
              if (search === "") {
                return contact;
              } else if (
                contact.firstName.toLowerCase().includes(search.toLowerCase())
              ) {
                return contact;
              }
            })
            ?.map((contact) => (
              <div key={contact.contactID} className="bg-white p-4 rounded-lg shadow-lg flex justify-between">
                <div key={contact.contactID}>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-800">
                      First Name:
                    </span>{" "}
                    {contact.firstName}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-800">
                      Last Name:
                    </span>{" "}
                    {contact.lastName}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-800">Email:</span>{" "}
                    {contact.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-800">
                      Phone No:
                    </span>{" "}
                    {contact.phoneNo}
                  </p>
                </div>

                <div>
                  <svg
                    className="fill-none stroke-gray-400 hover:stroke-gray-800 w-4 h-4 mb-2 cursor-pointer"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleEditClick(contact)}
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>

                  <svg
                    className="fill-none stroke-gray-400 hover:stroke-gray-800 w-4 h-4 cursor-pointer"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleDeleteClick(contact)}
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </div>
              </div>
            ))
        ) : (
          <p className="text-sm text-gray-400 font-medium">No contact found</p>
        )}
      </div>
  )
};

export default ContactItem;
