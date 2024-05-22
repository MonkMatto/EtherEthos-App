const setNoteToContract = async (otherAccount, noteContent) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.setNote(currentAccount, otherAccount, noteContent).send(
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
const deleteWrittenNoteToContract = async (otherAccount) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.deleteWrittenNote(currentAccount, otherAccount).send(
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
const deleteReceivedNoteToContract = async (otherAccount) => {
    
    try {
        createStatusMsg()
        await EE_Contract_User.methods.deleteReceivedNote(currentAccount, otherAccount).send(
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