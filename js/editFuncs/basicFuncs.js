function handleEditField(event) {
  const editField = event.target.getAttribute("data-edit-field");
  const inputValue = event.target.value;

  //temp function
  console.log(`Edit field: ${editField}, Input: ${inputValue}`);
  if (editField == "alias") {
    pushAliasToContract(inputValue);
  } else if (editField == "detail") {
    setDetailToContract(inputValue);
  } else if (editField == "pfp-id" || editField == "pfp-address") {
    var idInput = document.querySelectorAll('[data-edit-field="pfp-id"]');
    var addressInput = document.querySelectorAll(
      '[data-edit-field="pfp-address"]',
    );
    console.log(idInput[0].value, addressInput[0].value);
    setPFPToContract(addressInput[0].value, idInput[0].value);
  } else if (editField == "user-verification") {
    setVerificationResponseToContract(inputValue);
  }
}

function handleDeleteField(event) {
  const editField = event.target.getAttribute("data-edit-field");
  console.log(`Delete field: ${editField}`);
  if (editField == "alias") {
    pushAliasToContract(" ");
  } else if (editField == "detail") {
    setDetailToContract(" ");
  } else if (editField == "pfp-id" || editField == "pfp-address") {
    var idInput = document.querySelectorAll('[data-edit-field="pfp-id"]');
    var addressInput = document.querySelectorAll(
      '[data-edit-field="pfp-address"]',
    );
    console.log(idInput[0].value, addressInput[0].value);
    setPFPToContract(0x0000000000000000000000000000000000000000, 0);
  } else if (editField == "user-verification") {
    setDetailToContract(" ");
  }
}

//get submit buttons to manipuulate
const elementsWithDataWrite = document.querySelectorAll("[data-write]");
//add event listener to each submit
elementsWithDataWrite.forEach((element) => {
  //assuming the input is always previous sibling
  const elementParent = element.parentElement;
  const inputField = element.previousElementSibling;
  // const inputFields = element.getElementsByTagName('INPUT');
  const deleteButton = element.nextElementSibling;
  element.addEventListener("click", (event) => {
    handleEditField({
      target: inputField,
    });
  });
  //replace field with anything NOT NULL
  deleteButton.addEventListener("click", () => {
    handleDeleteField({
      target: inputField,
    });
  });
});

const pushAliasToContract = async (value) => {
  try {
    createStatusMsg();
    await EE_Contract_User.methods.setAlias(currentAccount, value).send(
      {
        from: currentAccount,
      },
      function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
      },
    );
  } catch (errorMessage) {
    createErrorMsg(errorMessage.message);
    error = true;
  }
};
const setVerificationResponseToContract = async (value) => {
  try {
    createStatusMsg();
    await EE_Contract_User.methods
      .setVerificationResponse(currentAccount, value)
      .send(
        {
          from: currentAccount,
        },
        function (err, res) {
          if (err) {
            console.log(err);
            return;
          }
        },
      );
  } catch (errorMessage) {
    createErrorMsg(errorMessage.message);
    error = true;
  }
};
const setDetailToContract = async (value) => {
  try {
    createStatusMsg();
    await EE_Contract_User.methods.setDetail(currentAccount, value).send(
      {
        from: currentAccount,
      },
      function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
      },
    );
  } catch (errorMessage) {
    createErrorMsg(errorMessage.message);
    error = true;
  }
};
const setSocialToContract = async (value) => {
  try {
    createStatusMsg();
    await EE_Contract_User.methods.setSocial(currentAccount, value).send(
      {
        from: currentAccount,
      },
      function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
      },
    );
  } catch (errorMessage) {
    createErrorMsg(errorMessage.message);
    error = true;
  }
};
const setWebsiteToContract = async (value) => {
  try {
    createStatusMsg();
    await EE_Contract_User.methods.setWebsite(currentAccount, value).send(
      {
        from: currentAccount,
      },
      function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
      },
    );
  } catch (errorMessage) {
    createErrorMsg(errorMessage.message);
    error = true;
  }
};
const setGalleryToContract = async (value) => {
  try {
    createStatusMsg();
    await EE_Contract_User.methods.setGallery(currentAccount, value).send(
      {
        from: currentAccount,
      },
      function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
      },
    );
  } catch (errorMessage) {
    createErrorMsg(errorMessage.message);
    error = true;
  }
};
const setMainBasicsToContract = async (
  alias,
  detail,
  social,
  website,
  gallery,
) => {
  try {
    createStatusMsg();
    await EE_Contract_User.methods
      .setMainBasics(currentAccount, alias, detail, social, website, gallery)
      .send(
        {
          from: currentAccount,
        },
        function (err, res) {
          if (err) {
            console.log(err);
            return;
          }
        },
      );
  } catch (errorMessage) {
    createErrorMsg(errorMessage.message);
    error = true;
  }
};
const setPriorityLinkToContract = async (index) => {
  try {
    createStatusMsg();
    await EE_Contract_User.methods.setPriorityLink(currentAccount, index).send(
      {
        from: currentAccount,
      },
      function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
      },
    );
  } catch (errorMessage) {
    createErrorMsg(errorMessage.message);
    error = true;
  }
};

//PING
const pingToContract = async () => {
  try {
    createStatusMsg();
    await EE_Contract_User.methods.ping(currentAccount).send(
      {
        from: currentAccount,
      },
      function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
      },
    );
  } catch (errorMessage) {
    createErrorMsg(errorMessage.message);
    error = true;
  }
};

//COMPOSABLE
const toggleComposableToContract = async () => {
  try {
    createStatusMsg();
    await EE_Contract_User.methods.toggleComposable(currentAccount).send(
      {
        from: currentAccount,
      },
      function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
      },
    );
  } catch (errorMessage) {
    createErrorMsg(errorMessage.message);
    error = true;
  }
};
