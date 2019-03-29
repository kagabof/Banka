document.addEventListener("DOMContentLoaded", () => {

        document.getElementById("accountNumber").onkeyup = () =>{
            if (accountIsValid(document.getElementById("accountNumber").value)){
                document.getElementById("accountNumber").style.border = "1.5px solid green";
            } else {
                document.getElementById("accountNumber").style.border = "1.5px solid red";
            }
        };
    
        const accountIsValid = (accountNumber) => {
            return /^\d*$/.test(accountNumber);
        };

    document.getElementById("owner").onkeyup = () => {
        if (accountIsValid(document.getElementById("owner").value)) {
            document.getElementById("owner").style.border = "1.5px solid green";
        } else {
            document.getElementById("owner").style.border = "1.5px solid red";
        }
    };

    document.getElementById("balance").onkeyup = () => {
        if (accountIsValid(document.getElementById("balance").value)) {
            document.getElementById("balance").style.border = "1.5px solid green";
        } else {
            document.getElementById("balance").style.border = "1.5px solid red";
        }
    };
    document.getElementById("from-create").onsubmit = () => {
        if (!accountIsValid(document.getElementById("accountNumber").value)) {
            document.getElementById("accountNumber").focus();
            document.getElementById("accountNumber").style.border = "1.5px solid red";
            return false;
        } else if (!accountIsValid(document.getElementById("owner").value)){
            document.getElementById("owner").focus();
            document.getElementById("owner").style.border = "1.5px solid red";
            return false;
        } else if (!accountIsValid(document.getElementById("balance").value)){
            document.getElementById("balance").focus();
            document.getElementById("balance").style.border = "1.5px solid red";
            return false;
        }else{
            return true;
        }
    };
    

});