const pushAdditionalLinkToContract = async (name, link) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.pushAdditionalLink(currentAccount, link, name).send(
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
const updateAdditionalLinkToContract = async (index, name, link) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.updateAdditionalLink(currentAccount, index, link, name).send(
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
const deleteAdditionalLinkToContract = async (index) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.deleteAdditionalLink(currentAccount, index).send(
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