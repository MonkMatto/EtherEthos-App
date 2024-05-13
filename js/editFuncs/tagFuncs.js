const pushTagToContract = async (value) => {
    try {
        createStatusMsg()
        await EE_Contract_User.methods.pushTag(currentAccount, value).send(
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
const deleteTagToContract = async (index) => {
    try {
        createStatusMsg()
        await EE_Contract_User.methods.deleteTag(currentAccount, index).send(
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