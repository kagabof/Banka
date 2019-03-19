document.addEventListener("DOMContentLoaded", () =>{
    let email,fname,lname,pass,rpass;
    
    document.getElementById("email").onkeyup= ()=>{
        if (emailIsValid(document.getElementById("email").value)){
            document.getElementById("email").style.border = "1.5px solid green";
            email =1;
        }else{
            document.getElementById("email").style.border = "1.5px solid red";
            email = 0;
        }
    };
    const emailIsValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    };

    document.getElementById("password").onkeyup = () =>{
        
        if (passwordIsValid(document.getElementById("password").value)) {
            document.getElementById("password").style.border = "1.5px solid green";
            pass =1;
        }
        else{
            document.getElementById("password").style.border = "1.5px solid red";
            pass = 0;
        }
    };
    
    const passwordIsValid = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(password);
    };

    document.getElementById("firstName").onkeyup = () => {
        if(nameIsValide(document.getElementById("firstName").value)){
            document.getElementById("firstName").style.border = "1.5px solid green";
            fname = 1;
        }else 
            {
            document.getElementById("firstName").style.border = "1.5px solid red";
            fname = 0;
        }
    };

    document.getElementById("lastName").onkeyup = () => {
        if (nameIsValide(document.getElementById("lastName").value)) {
            document.getElementById("lastName").style.border = "1.5px solid green";
            lname = 1;
        } else {
            document.getElementById("lastName").style.border = "1.5px solid red";
            lname = 0;
        }
    };
    const nameIsValide = (name) => {
       return /^[A-Za-z\s]+$/.test(name);
    };

    document.getElementById("rePassword").onkeyup = () => {
        if (document.getElementById("password").value === document.getElementById("rePassword").value) {
            document.getElementById("rePassword").style.border = "1.5px solid green";
            rpass = 1;
        }else{
            document.getElementById("rePassword").style.border = "1.5px solid red";
            rpass = 0;
        }
    };
    
    document.getElementById("submit").onmousemove= () => {
        if(rpass === 1 && pass=== 1 && email === 1 && fname === 1 && lname === 1){
            document.getElementById("emailError").innerHTML="that was true";
        }else{
            document.getElementById("emailError").style.visibility = "visible";
            document.getElementById("emailError").style.color ="red";
        }
    };
});


