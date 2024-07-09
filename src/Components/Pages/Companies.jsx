import React, { useState } from "react";
import {
  UserPlusIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import Table from "./Table.jsx";
import Overview from "./Overview.jsx";
import Form from "./Form.jsx";
import Modal from "./Modal.jsx";

// WHOLE PAGE
export default function Companies() {
  const [modal, setModal] = useState(false);

  // MODAL TOGGLE
  const toggleModal = () => {
    setModal((m) => (m = !m));
  };

  const [errorWindow, setErrorWindow] = useState(false);

  // ERROR WINDOW TOGGLE
  const toggleErrorWindow = () => {
    setErrorWindow((e) => (e = !e));
  };

  const [errors, setErrors] = useState("");

  //PROPS FOR <INPUT>
  const formArr = [
    {
      label: "Company Name",
      name: "companyName",
    },
    {
      label: "Representative Name",
      name: "representativeName",
    },
    {
      label: "Representative Position",
      name: "representativePosition",
    },
    {
      label: "Phone Number",
      name: "number",
    },
    {
      label: "Email",
      name: "email",
    },
    {
      label: "City",
      name: "city",
    },
    {
      label: "Barangay",
      name: "barangay",
    },
    {
      label: "Street",
      name: "street",
    },
  ];

  //DISPLAY TEMPLATE ON <TABLE></TABLE>
  const TableColumns = [
    {
      header: "Company ID",
      row: "index",
    },

    {
      header: "Company Name",
      row: "companyName",
    },
    {
      header: "Representative Name",
      row: "representativeName",
    },
    {
      header: "City",
      row: "city",
    },
    {
      header: "Phone number",
      row: "number",
    },
    {
      header: "Email",
      row: "email",
    },
  ];

  // THING THAT GETS SAVED ON TABLE
  const [companyArr, setCompanyArr] = useState([]);

  var errorFields = [];
  //ADDS FORM OBJ ON COMPANY-ARRAY
  const onSubmitHandler = (form, callback) => {
    if (
      form.companyName &&
      form.representativeName &&
      form.representativePosition &&
      form.number &&
      form.email &&
      form.city &&
      form.barangay &&
      form.street
    ) {
      toggleModal();
      {
        rowToEdit === null
          ? setCompanyArr((c) => [...c, form])
          : setCompanyArr((c) =>
              c.map((currentRow, index) => {
                if (index !== rowToEdit) {
                  return currentRow;
                } else {
                  return form;
                }
              })
            );
      }
      {
        errorWindow ? toggleErrorWindow() : "";
      }
      setRowToEdit(null);
    } else {
      toggleModal();

      errorFields = [];
      for (const [key, value] of Object.entries(form)) {
        if (!value) {
          errorFields.push(key);
        }
      }

      setErrors((e) => errorFields.join(", "));

      {
        !errorWindow ? toggleErrorWindow() : "";
      }
    }

    //RESETS FIELDS
    callback();
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  const handleEditRow = (index) => {
    setRowToEdit(index);

    toggleModal();
  };

  return (
    <section className={`font-main flex-1`}>
      <div className={`bg-normalGray box-border flex  h-full`}>
        <Overview
          title={`Companies`}
          quantity={
            companyArr.length < 10 ? "0" + companyArr.length : companyArr.length
          }
        />
        <div className={`flex flex-col flex-1 m-4`}>
          <div className={`m-4`}>
            <div className={`flex justify-between`}>
              <h1 className={`text-3xl font-bold`}>Companies</h1>
              <div>
                <button
                  onClick={toggleModal}
                  className={`text-white bg-red-600 border-2 border-red-800 rounded-lg px-4 py-2 mx-4 hover:bg-red-700  transition-all duration-100 flex gap-4 items-center`}
                >
                  Create Company
                  <div
                    className={`py-2 px-3 rounded-lg bg-red-700 hover:bg-red-800 transition-all duration-100`}
                  >
                    <UserPlusIcon className="size-5" />
                  </div>
                </button>
              </div>
            </div>
            <Modal modal={modal} toggleModal={toggleModal}>
              <Form
                error={errorFields}
                btnTitle={"Create Company"}
                title={"Company"}
                submitBtn={"Create Company"}
                formArr={formArr}
                onSubmit={onSubmitHandler}
                defaultValue={rowToEdit !== null && companyArr[rowToEdit]}
                icon={<UserPlusIcon className="size-5" />}
              />
            </Modal>
            <div>
              {errorWindow && (
                <div
                  className={`rounded mt-8 p-4 text-lg font-bold text-red-600  shadow-shadowTable bg-red-200 flex justify-between transition-all`}
                >
                  <h1>
                    <span className="text-red-700">Please fill in the: </span>
                    {errors}
                  </h1>
                  <button
                    onClick={toggleErrorWindow}
                    className={`p-2 hover:text-red-700 text-xl`}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
          <Table
            columnArr={TableColumns}
            dataArr={companyArr}
            editRow={handleEditRow}
          />
        </div>
      </div>
    </section>
  );
}
