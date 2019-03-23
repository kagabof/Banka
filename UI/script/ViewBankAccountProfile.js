document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("icon-place").onmouseover = () =>{
        document.getElementById("icon-place").style.backgroundColor ="#1d2731";
        let doc = document.getElementsByClassName("icon-1");
        for (let i = 0; i < doc.length; i++) {
            doc[i].style.backgroundColor="white";
            
        }
    }

    document.getElementById("icon-place").onmouseout = () => {
        document.getElementById("icon-place").style.backgroundColor = "whitesmoke";
        let doc = document.getElementsByClassName("icon-1");
        for (let i = 0; i < doc.length; i++) {
            doc[i].style.backgroundColor = "#1d2731";

        }
    };
    document.getElementById("icon-search").onclick = () =>{
        document.getElementById("search").style.display ="inline-block";
        document.getElementById("search").style.transition = "0.5s";
    };

    
});