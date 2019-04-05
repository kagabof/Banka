document.addEventListener("DOMContentLoaded", () =>{
    
    document.getElementById("icon-place").onclick = () =>{
        document.getElementById("side-nav").style.display = "inline-block";
        document.getElementById("main-content").style.width = "83%"
    };
    document.getElementById("close").onclick = () => {
        document.getElementById("side-nav").style.display = "none";
        document.getElementById("main-content").style.width = "90%";
        document.getElementById("side-nav").style.transition = "0.5s";
    };
    

    document.getElementById("btnview").onclick = () =>{
        document.getElementById("viewdisplay").style.display ="block";
        document.getElementById("changepass").style.display = "none";
    };

    document.getElementById("btnpass").onclick = () => {
        document.getElementById("changepass").style.display = "block";
        document.getElementById("viewdisplay").style.display = "none";
    }; 


    document.getElementById("password").onkeyup = () => {

        if (passwordIsValid(document.getElementById("password").value)) {
            document.getElementById("password").style.border = "1.5px solid green";
        }
        else {
            document.getElementById("password").style.border = "1.5px solid red";
        }
    };
    

    document.getElementById("password1").onkeyup = () => {

        if (passwordIsValid(document.getElementById("password1").value)) {
            document.getElementById("password1").style.border = "1.5px solid green";
        }
        else {
            document.getElementById("password1").style.border = "1.5px solid red";
        }
    };

    document.getElementById("password2").onkeyup = () => {

        if (passwordIsValid(document.getElementById("password2").value)) {
            if (document.getElementById("password2").value === document.getElementById("password1").value) {
                document.getElementById("password2").style.border = "1.5px solid green";
            }
        }
        else {
            document.getElementById("password2").style.border = "1.5px solid red";
        }
    };

    

    document.getElementById("changepassform").onsubmit = () => {
        if (!passwordIsValid(document.getElementById("password").value)) {
            document.getElementById("password").focus();
            document.getElementById("password").style.border = "1.5px solid red";
            return false;

        } else if (!passwordIsValid(document.getElementById("password1").value)) {

            document.getElementById("password1").focus();
            document.getElementById("password1").style.border = "1.5px solid red";
            return false;

        } 
        else if (!passwordIsValid(document.getElementById("password2").value)) {
             if (document.getElementById("password2").value !== document.getElementById("password1").value) {
                 document.getElementById("password2").focus();
                 document.getElementById("password2").style.border = "1.5px solid red";
                
             }
            return false;
        } 
        else {
            return true;
        }
    }
    const passwordIsValid = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(password);

    };
});

