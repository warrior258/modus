import { useState } from "react";

type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
};

type Props = {
    setOpenCreate: Function;
    handleCreateData: Function;
    createContactloading: boolean
}


const CreateContact = ({setOpenCreate, handleCreateData, createContactloading}: Props) => {

  const [createContact, setCreateContact] = useState<Contact>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: ''
  });

  return (
    <div className="w-full h-[calc(100vh_-_112px)] absolute bg-black/30 flex justify-center items-center">
      <div className="w-[400px] h-[300px] bg-white rounded-lg shadow-lg relative">
        <svg
        className="w-5 h-5 absolute right-4 top-2 cursor-pointer"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setOpenCreate(false)}
        >
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="currentColor"
          />
        </svg>
        <p className="text-center my-3 text-xl font-medium text-gray-800">
          Create Contact
        </p>
        <form className="grid grid-cols-1 px-10 gap-4" onSubmit={(e) => handleCreateData(e, createContact)}>
          <input
            className="border px-4 py-1.5 text-sm rounded"
            type="text"
            placeholder="First Name..."
            onChange={(e) => setCreateContact({...createContact, firstName: e.target.value})}
            required
          />
          <input
            className="border px-4 py-1.5 text-sm rounded"
            type="text"
            placeholder="Last Name..."
            onChange={(e) => setCreateContact({...createContact, lastName: e.target.value})}
            required
          />
          <input
            className="border px-4 py-1.5 text-sm rounded"
            type="email"
            placeholder="Email..."
            onChange={(e) => setCreateContact({...createContact, email: e.target.value})}
            required
          />
          <input
            className="border px-4 py-1.5 text-sm rounded"
            type="text"
            placeholder="Phone No..."
            onChange={(e) => setCreateContact({...createContact, phoneNo: e.target.value})}
            required
          />
          <button disabled={createContactloading} className="px-4 py-1.5 text-sm rounded bg-blue-500 text-white font-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
