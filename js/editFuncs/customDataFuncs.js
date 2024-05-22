const setCustomDataToContract = async (customData) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.setCustomData(currentAccount, customData).send(
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