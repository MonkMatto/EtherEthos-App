const pushAssociatedAccountToContract = async (address, desc) => {
    try {
        createStatusMsg()
        await EE_Contract_User.methods.pushAssociatedAccount(currentAccount, address, desc).send(
          {
            from: currentAccount
          },
          function (err, res) {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
    } catch (errorMessage) {
        createErrorMsg(errorMessage.message)
        error = true;
    }
}
const updateAssociatedAccountToContract = async (index, address, desc) => {
    try {
        createStatusMsg()
        await EE_Contract_User.methods.updateAssociatedAccount(currentAccount, index, address, desc).send(
          {
            from: currentAccount
          },
          function (err, res) {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
    } catch (errorMessage) {
        createErrorMsg(errorMessage.message)
        error = true;
    }
}
const deleteAssociatedAccountToContract = async (index) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.deleteAssociatedAccount(currentAccount, index).send(
          {
            from: currentAccount
          },
          function (err, res) {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
    } catch (errorMessage) {
        createErrorMsg(errorMessage.message)
        error = true;
    }
}