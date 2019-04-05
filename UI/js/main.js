document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("icon-place").onclick = () => {
        document.getElementById("nav-link").classList.toggle("active");
    };
});