import { db, storage } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import {
  ref,
  uploadBytesResumable,
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

    <div style="text-align:center">

        <h2 style="
        font-family:'Great Vibes',cursive;
        font-size:48px;
        color:#d9b3ff;
        text-shadow:0 0 15px #8f5cff;">
        💜 Sealing Your Letter
        </h2>

        <p id="statusText"
        style="
        margin-top:15px;
        color:#dddddd;
        font-size:18px;">
        Preparing your beautiful letter...
        </p>

        <div id="envelope"
        style="
        font-size:55px;
        margin-top:20px;
        animation:pulse 1.6s infinite;">
        💌
        </div>

        <div style="
        width:100%;
        height:22px;
        background:#221133;
        border-radius:50px;
        overflow:hidden;
        margin-top:30px;
        border:1px solid #8f5cff;">

            <div id="progressBar"
            style="
            width:0%;
            height:100%;
            background:
            linear-gradient(
            90deg,
            #5d2aff,
            #9d4dff,
            #d46cff);
            transition:.25s;">
            </div>

        </div>

        <p id="progressText"
        style="
        margin-top:12px;
        color:#d9b3ff;
        font-weight:bold;">
        0%
        </p>

    </div>

    `;

    try {

        let musicURL = "";

        if (musicFile) {

            const musicRef = ref(
                storage,
                "music/" + Date.now() + "_" + musicFile.name
            );

            const uploadTask = uploadBytesResumable(
                musicRef,
                musicFile
            );

            await new Promise((resolve, reject) => {

                uploadTask.on(

                    "state_changed",

                    (snapshot) => {

                        const progress = Math.round(
                            (snapshot.bytesTransferred /
                            snapshot.totalBytes) * 100
                        );

                        document.getElementById("progressBar").style.width =
                        progress + "%";

                        document.getElementById("progressText").innerHTML =
                        progress + "% Uploaded";

                        const status =
                        document.getElementById("statusText");

                        if(progress < 20){

                            status.innerHTML =
                            "Preparing the paper...";

                        }

                        else if(progress < 40){

                            status.innerHTML =
                            "Writing every word with love...";

                        }

                        else if(progress < 60){

                            status.innerHTML =
                            "Uploading your music...";

                        }

                        else if(progress < 80){

                            status.innerHTML =
                            "Sealing with purple magic...";

                        }

                        else if(progress < 100){

                            status.innerHTML =
                            "Almost finished...";

                        }

                        else{

                            status.innerHTML =
                            "Finalizing everything...";

                        }

                    },

                    reject,

                    async () => {

                        musicURL =
                        await getDownloadURL(
                        uploadTask.snapshot.ref
                        );

                        resolve();

                    }

                );

            });

        }

        document.getElementById("statusText").innerHTML =
        "Saving your magical letter...";

        const docRef = await addDoc(
            collection(db,"letters"),
            {

                recipient,
                title,
                letter,
                musicURL,
                start,
                end,
                created:Date.now()

            }
        );

        const link =
`${window.location.origin}${window.location.pathname.replace("create.html","")}verify.html?id=${docRef.id}`;

        success.innerHTML = `

        <div style="text-align:center">

            <h2 style="
            color:#d9b3ff;
            font-family:'Great Vibes',cursive;
            font-size:50px;">
            💜 Letter Created
            </h2>

            <p>
            Your magical letter is ready.
            </p>

            <input
            style="
            width:100%;
            padding:15px;
            margin-top:20px;
            border-radius:15px;
            border:1px solid #8f5cff;
            background:#111118;
            color:white;
            "
            value="${link}"
            readonly>

            <button id="copyBtn">
            📋 Copy Link
            </button>

        </div>

        `;

        document.getElementById("copyBtn").onclick=function(){

            navigator.clipboard.writeText(link);

            alert("💜 Link copied!");

        };

    }

    catch(err){

        console.error(err);

        success.innerHTML=`

        <h2 style="color:#ff9090;">
        ❌ Upload Failed
        </h2>

        <p>${err.message}</p>

        `;

    }

}