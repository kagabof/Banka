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
});