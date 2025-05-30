console.log("✅ photoBingo.js bien chargé");

window.readImageAsBase64 = function (inputId) {
    console.log("Lecture du fichier pour : " + inputId);
    return new Promise((resolve, reject) => {
        const input = document.getElementById(inputId);
        if (!input || !input.files || input.files.length === 0) {
            console.warn("Aucun fichier est trouvé");
            resolve(null);
            return;
        }

        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            console.log("Fichier lu avec succès : " + file.name);
            resolve(reader.result);
        };
        reader.onerror = err => {
            console.log("Erreur lors de la lecture du fichier : " + file.name);
            reject(err);
        };
        reader.readAsDataURL(file);
    });
};

window.uploadImageToFirebase = async function (index, base64) {
    console.log("🚀 Fonction uploadImageToFirebase appelée avec index =", index);

    const response = await fetch(base64);
    const blob = await response.blob();

    const ref = firebase.storage().ref(`bingo/photo-${index}-${Date.now()}.jpg`);
    const snapshot = await ref.put(blob);
    const url = await snapshot.ref.getDownloadURL();

    await firebase.firestore().collection("bingoImages").add({
        index: index,
        url: url,
        timestamp: new Date()
    });

    console.log("✅ Image envoyée sur Firebase :", url);
    return url;
};