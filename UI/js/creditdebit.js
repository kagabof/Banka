document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("search").onkeyup = () => {
        if (accountIsValid(document.getElementById("search").value)) {

            document.getElementById("search").style.border = "1.5px solid green";
        }else{
            document.getElementById("search").style.border = "1.5px solid red";
        }
    };

    const accountIsValid = (accountNumber) => {
        return /^[0-9]+$/.test(accountNumber);

    };

    document.getElementById("accountForm").onkeyup = () =>{
        if (!accountIsValid(document.getElementById("search").value)){
            document.getElementById("search").focus();
            document.getElementById("search").style.border = "1.5px solid red";
            return false;
        }
        else{
            return true;
        }
    };

    document.getElementById("amount").onkeyup = () => {
        if (accountIsValid(document.getElementById("amount").value)) {

            document.getElementById("amount").style.border = "1.5px solid green";
        } else {
            document.getElementById("amount").style.border = "1.5px solid red";
        }
    };

    document.getElementById("changepassform").onkeyup = () => {
        if (!accountIsValid(document.getElementById("amount").value)) {
            document.getElementById("amount").focus();
            document.getElementById("amount").style.border = "1.5px solid red";
            return false;
        }
        else {
            return true;
        }
    };
    
    document.getElementById("amount1").onkeyup = () => {
        if (accountIsValid(document.getElementById("amount1").value)) {

            document.getElementById("amount1").style.border = "1.5px solid green";
        } else {
            document.getElementById("amount1").style.border = "1.5px solid red";
        }
    };

    document.getElementById("changepassform1").onkeyup = () => {
        if (!accountIsValid(document.getElementById("amount1").value)) {
            document.getElementById("amount1").focus();
            document.getElementById("amount1").style.border = "1.5px solid red";
            return false;
        }
        else {
            return true;
        }
    };
    
});
