document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("email").onkeyup = () => {
        if (emailIsValid(document.getElementById("email").value)) {
            document.getElementById("email").style.border = "1.5px solid green";
            email = 1;
        } else {
            document.getElementById("email").style.border = "1.5px solid red";
            email = 0;
        }
    };
const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
};

document.getElementById("password").onkeyup = () => {

    if (passwordIsValid(document.getElementById("password").value)) {
        document.getElementById("password").style.border = "1.5px solid green";
        pass = 1;
    }
    else {
        document.getElementById("password").style.border = "1.5px solid red";
        pass = 0;
    }
};

const passwordIsValid = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(password);

};

    document.getElementById("signinForm").onsubmit = () =>{
        if(document.getElementById("email").value === ""){

            document.getElementById("email").focus();
            document.getElementById("email").style.border = "1.5px solid red";
            return false;

        }else if(document.getElementById("password").value === ""){

            document.getElementById("password").focus();
            document.getElementById("password").style.border = "1.5px solid red";
            return false;

        } else if (document.getElementById("password").value === "admin" && document.getElementById("email").value === "admin@gmail.com"){
            
            let form = document.getElementById("signinForm");
            form.setAttribute("action","AdminView.html");
            return true;
        } else if (document.getElementById("password").value === "staff" && document.getElementById("email").value === "staff@gmail.com") {

            let form = document.getElementById("signinForm");
            form.setAttribute("action", "staffView.html");
            return true;
        } else{
            let form = document.getElementById("signinForm");
            form.setAttribute("action", "TransactionHistory.html");
            return true;
        }
    }
    document.getElementById("icon-place").onclick = () => {

        document.getElementById("nav-link").classList.toggle("active");
    };
});