const envelope = document.getElementById("envelope");
const title = document.querySelector("h1");
const subtitle = document.querySelector("p");

envelope.addEventListener("click", function(){

    envelope.style.pointerEvents = "none";

    title.innerHTML = "Opening your letter...";
    subtitle.innerHTML = "Every word was written with love.";

    envelope.style.transform = "scale(1.2)";
    envelope.style.boxShadow =
        "0 0 35px #b100ff, 0 0 80px #b100ff";

    document.querySelector(".seal").style.animation =
        "pulse .6s infinite";

    setTimeout(function(){

        window.location.href = "read.html";

    },3000);

});