import { db, storage } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

window.generateLetter = async function () {

    const recipient = document.getElementById("recipient").value.trim();
    const title = document.getElementById("title").value.trim();
    const letter = document.getElementById("letter").value.trim();

    const musicFile = document.getElementById("music").files[0];

    const start = Number(document.getElementById("start").value);

    const end = Number(document.getElementById("end").value);

    if (!recipient || !title || !letter) {

        alert("Please complete all fields.");

        return;

    }

    const success = document.getElementById("success");

    success.style.display = "block";

    success.innerHTML = `
        <h2>✨ Sealing your letter...</h2>
        <p>Please wait while your music uploads.</p>
    `;

    try {

        let musicURL = "";

        if (musicFile) {

            const musicRef = ref(
                storage,
                "music/" + Date.now() + "_" + musicFile.name
            );

            await uploadBytes(musicRef, musicFile);

            musicURL = await getDownloadURL(musicRef);

        }

        const docRef = await addDoc(
            collection(db, "letters"),
            {

                recipient,

                title,

                letter,

                musicURL,

                start,

                end,

                created: Date.now()

            }
        );

        const link =
`${window.location.origin}${window.location.pathname.replace("create.html","")}verify.html?id=${docRef.id}`;

        success.innerHTML = `

            <h2>💜 Letter Created!</h2>

            <p>Send this link to your special person.</p>

            <input
            style="width:100%;padding:12px;border-radius:12px;margin-top:15px;"
            value="${link}"
            readonly>

            <button id="copyBtn">
            📋 Copy Link
            </button>

        `;

        document.getElementById("copyBtn").onclick = function () {

            navigator.clipboard.writeText(link);

            alert("Link copied!");

        };

    }

    catch (err) {

        console.error(err);

        success.innerHTML = `
            <h2>❌ Error</h2>
            <p>${err.message}</p>
        `;

    }

}