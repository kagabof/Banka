document.addEventListener("DOMContentLoaded", () =>{
    
    document.getElementById("email").onkeyup= ()=>{
        if (emailIsValid(document.getElementById("email").value)){
            document.getElementById("email").style.border = "1.5px solid green";
            
        }else{
            document.getElementById("email").style.border = "1.5px solid red";
            
        }
    };
    const emailIsValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    };

    document.getElementById("password").onkeyup = () =>{
        
        if (passwordIsValid(document.getElementById("password").value)) {
            document.getElementById("password").style.border = "1.5px solid green";
            
        }
        else{
            document.getElementById("password").style.border = "1.5px solid red";
            
        }
    };
    
    const passwordIsValid = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(password);
    };

    document.getElementById("firstName").onkeyup = () => {
        if(nameIsValide(document.getElementById("firstName").value)){
            document.getElementById("firstName").style.border = "1.5px solid green";
            
        }else 
            {
            document.getElementById("firstName").style.border = "1.5px solid red";
            
        }
    };

    document.getElementById("lastName").onkeyup = () => {
        if (nameIsValide(document.getElementById("lastName").value)) {
            document.getElementById("lastName").style.border = "1.5px solid green";
            
        } else {
            document.getElementById("lastName").style.border = "1.5px solid red";
            
        }
    };
    const nameIsValide = (name) => {
       return /^[A-Za-z\s]+$/.test(name);
    };

    document.getElementById("rePassword").onkeyup = () => {
        if (document.getElementById("password").value === document.getElementById("rePassword").value) {
            document.getElementById("rePassword").style.border = "1.5px solid green";
            
        }else{
            document.getElementById("rePassword").style.border = "1.5px solid red";
            
        }
    };
    document.getElementById("icon-place").onclick = ()=>{
        
        document.getElementById("nav-link").classList.toggle("active");
    };
});


