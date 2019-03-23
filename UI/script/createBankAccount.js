document.addEventListener("DOMContentLoader", () => {
    document.getElementById("from-create").onsubmit = ()=>{
        // if (document.getElementById("accountNumber").value === null) {
        //     document.getElementById("accountNumber").focus();
        //     document.getElementById("accountNumber").style.border = "1.5px solid red";
        //     return false;
        // } else if (document.getElementById("owner")) {
            
        // }

        document.getElementById("accountNumber").onkeyup = () =>{
            if (accountIsValid(document.getElementById("accountNumber").value)){
        
                document.getElementById("accountNumber").style.border = "1.5px solid red";
            }
        };
    
        const accountIsValid = (accountNumber) => {
            return /^[0-9]+$/.test(accountNumber);
            
        };
        
    };
});