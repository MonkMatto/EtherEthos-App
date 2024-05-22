const giveRespectToContract = async (otherAccount) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.giveRespect(currentAccount, otherAccount).send(
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
const revokeRespectToContract = async (otherAccount) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.revokeRespect(currentAccount, otherAccount).send(
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