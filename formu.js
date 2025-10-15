// ******************************************************
// TP2 - LE LANGAGE JAVASCRIPT (COTE CLIENT)
// Fichier : formu.js
// Auteur : Votre Nom
// Date : 2025-10-15
// ******************************************************

/**
 * Fonction pour afficher un message d'erreur si un champ est vide.
 * Elle est appelée lors de l'événement onblur sur les champs Nom et Prénom.
 * @param {string} idChamp - L'ID de l'élément input (ex: 'nom', 'prenom').
 * @param {string} idSpan - L'ID de l'élément span où afficher l'erreur (ex: 'saisieNom', 'saisiePrenom').
 */
function afficheOubli(idChamp, idSpan) {
    // Récupérer l'élément input et l'élément span
    let champ = document.getElementById(idChamp);
    let spanErreur = document.getElementById(idSpan);

    // Vérifier si le champ est vide (après suppression des espaces blancs aux extrémités)
    if (champ.value.trim() === "") {
        // Afficher le message d'erreur
        spanErreur.textContent = "Veuillez saisir votre " + idChamp + ".";
        // Optionnel : mettre le champ en évidence
        champ.style.borderColor = "red";
    } else {
        // Effacer le message d'erreur et le style
        spanErreur.textContent = "";
        champ.style.borderColor = ""; // Rétablit la couleur par défaut définie par le CSS
    }
}

/**
 * Fonction principale de vérification et de récapitulatif.
 * Elle est appelée par le bouton Envoyer.
 */
function verification() {
    // 1. Récupération des valeurs des champs simples (getElementById)
    let civilite = document.getElementById("civilite").value;
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let adresse = document.getElementById("adresse").value;
    let ville = document.getElementById("ville").value;
    let codePostal = document.getElementById("codePostal").value;
    let adresseMail = document.getElementById("adresseMail").value;

    // Réinitialiser les messages d'erreur et vérifier si tous les champs requis sont remplis
    let estValide = true;
    let champsAControler = [
        { id: "nom", message: "Veuillez saisir votre nom" },
        { id: "prenom", message: "Veuillez saisir votre prénom" },
        { id: "adresse", message: "Veuillez saisir votre adresse" },
        { id: "ville", message: "Veuillez saisir votre ville" },
        { id: "codePostal", message: "Veuillez saisir votre code postal" }
    ];

    champsAControler.forEach(champ => {
        let element = document.getElementById(champ.id);
        let spanErreur = document.getElementById("saisie" + champ.id.charAt(0).toUpperCase() + champ.id.slice(1));

        // Pour les champs sans onblur (adresse, ville, codePostal), on doit vérifier ici
        if (element.value.trim() === "") {
            // Pour l'adresse, l'ID du span n'est pas défini dans le HTML de base, on utilise une console.log
            if (spanErreur) {
                spanErreur.textContent = champ.message;
            } else {
                console.log("Erreur de saisie pour : " + champ.message);
            }
            element.style.borderColor = "red";
            estValide = false;
        } else {
            if (spanErreur) spanErreur.textContent = "";
            element.style.borderColor = "";
        }
    });

    // Si la validation échoue, on arrête la fonction ici
    if (!estValide) {
        // On pourrait afficher un message global ici si on n'utilise pas les pop-ups
        console.log("Formulaire non valide : des champs sont vides.");
        return; // Sortie de la fonction si la validation échoue
    }

    // 2. Récupération de la Catégorie Socio-Professionnelle (radio - getElementsByName)
    let professionRadios = document.getElementsByName("profession");
    let professionChoisie = "Non spécifié";

    // Parcourir le tableau des éléments radio pour trouver celui qui est 'checked'
    for (let i = 0; i < professionRadios.length; i++) {
        if (professionRadios[i].checked) {
            professionChoisie = professionRadios[i].value;
            break; // Sortir de la boucle une fois l'élément trouvé
        }
    }

    // 3. Récupération de l'abonnement Newsletter (checkbox - getElementsByName ou getElementById)
    let newsCheckbox = document.getElementById("news");
    let abonnementNews = newsCheckbox.checked ? "Oui" : "Non";
    let detailMail = newsCheckbox.checked ? adresseMail : "N/A";

    // 4. Construction du contenu HTML pour la nouvelle fenêtre
    let contenuRecap = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Récapitulatif de Contact</title>
            <style>
                body { font-family: 'Roboto', sans-serif; background-color: #f4f4f4; padding: 20px; color: #333; }
                .card { background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 400px; margin: 0 auto; }
                h2 { color: #007bff; border-bottom: 2px solid #ccc; padding-bottom: 10px; margin-bottom: 20px; }
                p { margin: 10px 0; border-bottom: 1px dashed #eee; padding-bottom: 5px; }
                strong { color: #0056b3; display: inline-block; width: 150px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>Récapitulatif des éléments saisis</h2>
                <p><strong>Civilité :</strong> ${civilite}</p>
                <p><strong>Nom :</strong> ${nom}</p>
                <p><strong>Prénom :</strong> ${prenom}</p>
                <p><strong>Adresse :</strong> ${adresse.replace(/\n/g, '<br>')}</p>
                <p><strong>Ville :</strong> ${ville}</p>
                <p><strong>Code Postal :</strong> ${codePostal}</p>
                <p><strong>Catégorie Pro :</strong> ${professionChoisie}</p>
                <p><strong>Abonnement News :</strong> ${abonnementNews}</p>
                ${abonnementNews === "Oui" ? `<p><strong>Adresse Mail :</strong> ${detailMail}</p>` : ''}
            </div>
        </body>
        </html>
    `;

    // 5. Création et ouverture de la nouvelle fenêtre (window.open())
    // Dimensions demandées: hauteur 500px, largeur 400px.
    let nouvelleFenetre = window.open("", "RecapContact", "width=400,height=500,scrollbars=yes,resizable=yes");

    // Écrire le contenu HTML dans la nouvelle fenêtre
    if (nouvelleFenetre) {
        nouvelleFenetre.document.write(contenuRecap);
        nouvelleFenetre.document.close();
    } else {
        // Gérer le cas où le blocage de pop-up empêche l'ouverture
        console.error("Impossible d'ouvrir la nouvelle fenêtre. Vérifiez le bloqueur de pop-up.");
    }
}
