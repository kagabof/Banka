document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("search").onkeyup = () =>{
        search();
    };


    const search = () =>{
        let input, fin, table, tr, td, i, value;
        input = document.getElementById("search");
        fil = input.value.toUpperCase();

        
        tr = document.getElementsByTagName("tr");
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if(td){
                value = td.textContent || td.innerText;
                if (value.toUpperCase().indexOf(fil)>-1) {
                    tr[i].style.display = "";

                }else{
                    tr[i].style.display ="none";
                }
            }
            
        }
    }
});