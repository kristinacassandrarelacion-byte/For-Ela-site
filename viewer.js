const data = JSON.parse(localStorage.getItem("LoveLetter"));

const question = document.getElementById("question");

if (question) {
    if (data && data.recipient) {
        question.innerHTML = `Are you <b>${data.recipient}</b>?`;
    } else {
        question.innerHTML = "No letter was found.";
    }
}

function yesAnswer() {
    window.location.href = "open.html";
}

function noAnswer() {
    window.location.href = "sorry.html";
}