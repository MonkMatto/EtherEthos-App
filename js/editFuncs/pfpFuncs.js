const setPFPToContract = async (pfpAddress, pfpID) => {
    try {
        createStatusMsg()
        await EE_Contract_User.methods.setPFP(currentAccount, pfpAddress, pfpID).send(
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