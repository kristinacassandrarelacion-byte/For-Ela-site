function generateLetter() {

    const recipient = document.getElementById("recipient").value.trim();
    const title = document.getElementById("title").value.trim();
    const letter = document.getElementById("letter").value.trim();

    if (!recipient || !title || !letter) {
        alert("Please fill in all required fields.");
        return;
    }

    const data = {
        recipient: recipient,
        title: title,
        letter: letter
    };

    try {
        localStorage.setItem("LoveLetter", JSON.stringify(data));
    } catch (e) {
        alert("Unable to save your letter.");
        console.error(e);
        return;
    }

    const success = document.getElementById("success");

    success.style.display = "block";

    success.innerHTML = `
        <h2>✨ Sealing Your Letter...</h2>
        <p>Please wait a moment...</p>
    `;

    setTimeout(function () {

        success.innerHTML = `
            <h2>✅ Letter Created Successfully!</h2>

            <p>Your letter has been sealed with care.</p>

            <button id="previewButton">
                💌 Preview Letter
            </button>
        `;

        document
            .getElementById("previewButton")
            .addEventListener("click", function () {
                window.location.href = "letter.html";
            });

    }, 2000);

}