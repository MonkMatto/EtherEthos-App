const bulkGrantBadgeToContract = async (index, addressesArray, name) => {
    console.log(addressesArray)
    try {
        createStatusMsg()
        await EE_Contract_User.methods.bulkGrantBadge(currentAccount, addressesArray, name).send(
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
const deleteBadgeToContract = async (index) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.deleteBadge(currentAccount, index).send(
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