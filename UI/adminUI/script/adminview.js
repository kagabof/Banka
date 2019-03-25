document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search").onkeyup = () => {
        search();
    };


    const search = () => {
        let input, fin, table, tr, td, i, value;
        input = document.getElementById("search");
        fil = input.value.toUpperCase();


        tr = document.getElementsByTagName("tr");
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                value = td.textContent || td.innerText;
                if (value.toUpperCase().indexOf(fil) > -1) {
                    tr[i].style.display = "";

                } else {
                    tr[i].style.display = "none";
                }
            }

        }
    }


    document.getElementById("icon-place").onclick = () => {
        document.getElementById("side-nav").style.display = "inline-block";
        document.getElementById("main-content").style.width = "83%"
    };
    document.getElementById("close").onclick = () => {
        document.getElementById("side-nav").style.display = "none";
        document.getElementById("main-content").style.width = "100%";
        document.getElementById("side-nav").style.transition = "0.5s";
    };
});