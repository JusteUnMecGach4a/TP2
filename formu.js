// ******************************************************
// TP2 - LE LANGAGE JAVASCRIPT (COTE CLIENT)
// Fichier : formu.js
// Auteur : Votre Nom
// Date : 2025-10-15
// ******************************************************

/**
* Fonction vide ajoutée pour résoudre l'erreur ReferenceError: afficheOubli is not defined
* causée par la présence de onblur="..." dans le fichier HTML.
* @param {string} champID L'ID du champ à vérifier.
* @param {string} spanID L'ID du span d'erreur.
*/
var afficheOubli = (champID, spanID) => {
    // Cette fonction est intentionnellement vide pour éviter le crash.
    // La validation est gérée par la fonction verification() au moment de la soumission.
};


/**
* Fonction principale de vérification et de récapitulatif.
* Récupère les données du formulaire, vérifie leur intégrité, et affiche le récapitulatif.
* @param {Event} event L'objet événement de la soumission du formulaire.
*/
function verification(event) {
    // Empêche la soumission par défaut du formulaire (rechargement de la page).
    if (event) {
        event.preventDefault();
    }
    
    // 1. Récupération des valeurs des champs simples (getElementById)
    var civilite = document.getElementById("civilite").value;
    var nom = document.getElementById("nom").value.trim();
    var prenom = document.getElementById("prenom").value.trim();
    var adresse = document.getElementById("adresse").value.trim();
    // CORRECTION TYPEERROR: Ajout de .value pour que .trim fonctionne
    var ville = document.getElementById("ville").value.trim(); 
    var codePostal = document.getElementById("codePostal").value.trim();
    var adresseMail = document.getElementById("adresseMail").value.trim();

    // 2. Récupération de la Catégorie Socio-Professionnelle (radio - getElementsByName)
    var professionRadios = document.getElementsByName("profession");
    var professionChoisie = "Non spécifié";

    // Parcourir le tableau des éléments radio pour trouver celui qui est 'checked'
    for (var i = 0; i < professionRadios.length; i++) {
        if (professionRadios[i].checked) {
            professionChoisie = professionRadios[i].value;
            break;
        }
    }

    // 3. Récupération de l'abonnement Newsletter (checkbox - getElementsByName)
    var newsCheckboxes = document.getElementsByName("news");
    var newsCheckbox = newsCheckboxes.length > 0 ? newsCheckboxes[0] : { checked: false }; 
    var abonnementNews = newsCheckbox.checked ? "Oui" : "Non";
    
    // ***************************************************************
    // INSTRUCTIONS CONSOLE.LOG POUR DÉBOGAGE
    // ***************************************************************
    console.log("--- Récupération des données du formulaire ---");
    console.log("Nom complet : " + nom + " " + prenom);
    console.log("Adresse : " + adresse + ", " + ville + " " + codePostal);
    console.log("Abonnement Newsletter : " + abonnementNews);
    console.log("----------------------------------------------");
    
    // --- PARTIE STRUCTURES DE TESTS (if) ET VALIDATION ---
    
    var estValide = true;
    var messageErreur = "Erreurs de saisie :\n";

    /**
     * Fonction d'aide pour la validation des champs de texte et l'affichage d'erreur local (dans le span).
     */
    var validerChamp = (valeur, nomChamp, idSpan) => {
        var spanErreur = document.getElementById(idSpan);
        var valid = true;

        if (valeur === "") {
            messageErreur += `- Veuillez saisir votre ${nomChamp}.\n`;
            valid = false;
        } 
        
        // Affichage dans le span si l'ID existe
        if (spanErreur) {
            if (!valid) {
                spanErreur.textContent = `Veuillez saisir votre ${nomChamp}.`;
                spanErreur.style.color = 'red';
                spanErreur.style.fontSize = '0.9em';
            } else {
                spanErreur.textContent = "";
            }
        }
        return valid;
    };
    
    // Cache le message d'erreur global avant de recommencer la validation
    var formContainer = document.getElementById('contact');
    var errorDiv = document.getElementById('global-error-message');
    if (errorDiv) {
        errorDiv.remove();
    }

    // 1. Validation de TOUS les champs obligatoires (Nom, Prénom, Adresse, Ville, Code Postal)
    // L'appel à validerChamp met à jour estValide et affiche le message local si le champ est vide.
    estValide = validerChamp(nom, 'nom', 'saisieNom') && estValide;
    estValide = validerChamp(prenom, 'prénom', 'saisiePrenom') && estValide;
    estValide = validerChamp(adresse, 'adresse', 'saisieAdresse') && estValide;
    estValide = validerChamp(ville, 'ville', 'saisieVille') && estValide;
    estValide = validerChamp(codePostal, 'code postal', 'saisieCodePostal') && estValide;
    

    // 2. Validation du champ Mail si la checkbox est cochée
    if (abonnementNews === "Oui") {
        // Réutilise la fonction validerChamp qui gère l'affichage du span 'saisieAdresseMail'
        estValide = validerChamp(adresseMail, 'adresse mail', 'saisieAdresseMail') && estValide;
    } else {
        // Si la newsletter n'est PAS cochée, on s'assure que le message d'erreur local est effacé
        var spanErreurMail = document.getElementById('saisieAdresseMail');
        if (spanErreurMail) {
            spanErreurMail.textContent = "";
        }
    }


    // ***************************************************************
    // INSTRUCTIONS CONSOLE.LOG POUR DÉBOGAGE
    // ***************************************************************
    console.log("--- Résultat de la validation ---");
    console.log("Est valide : " + estValide);
    if (!estValide) {
        console.error(messageErreur);
    }
    console.log("-----------------------------------");
    // ***************************************************************

    // --- LOGIQUE D'AFFICHAGE DU RÉCAPITULATIF (window.open) ---
    
    if (estValide) {
        // Construction du contenu HTML pour la nouvelle fenêtre
        var contenuRecap = `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <title>Récapitulatif des données</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; }
                    .recap { 
                        width: 90%; max-width: 400px; margin: 20px auto;
                        padding: 20px; border: 1px solid #ccc; border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1); background-color: white;
                    }
                    h2 { color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
                    p { margin: 5px 0; line-height: 1.4; }
                    strong { display: inline-block; min-width: 140px; margin-right: 10px; }
                    button {
                        transition: all 0.2s ease;
                        padding: 10px 15px; 
                        background-color: #007bff; 
                        color: white; 
                        border: none; 
                        border-radius: 5px; 
                        cursor: pointer;
                    }
                    button:hover { background-color: #0056b3; }
                </style>
            </head>
            <body>
                <div class="recap">
                    <h2>Récapitulatif des éléments saisis</h2>
                    <p><strong>Civilité:</strong> ${civilite}</p>
                    <p><strong>Nom:</strong> ${nom}</p>
                    <p><strong>Prénom:</strong> ${prenom}</p>
                    <p><strong>Adresse:</strong> ${adresse.replace(/\n/g, '<br>')}</p>
                    <p><strong>Ville:</strong> ${ville}</p>
                    <p><strong>Code Postal:</strong> ${codePostal}</p>
                    <p><strong>Catégorie Pro:</strong> ${professionChoisie}</p>
                    <p><strong>Abonnement News:</strong> ${abonnementNews}</p>
                    ${abonnementNews === "Oui" ? `<p><strong>Adresse Mail:</strong> ${adresseMail}</p>` : ''}
                    <p style="margin-top: 20px;">C'est une fenêtre de hauteur (1500 pixels) et de largeur (400 pixels).</p>
                    <button onclick="window.close()">Fermer</button>
                </div>
            </body>
            </html>
        `;

        // Utiliser la méthode open() de la classe window
        // Dimensions utilisées: width=400, height=1500
        var nouvelleFenetre = window.open("", "RecapitulatifNao", "width=400,height=1500,scrollbars=yes,resizable=yes");
        
        // Écrire le contenu dans la nouvelle fenêtre
        nouvelleFenetre.document.write(contenuRecap);
        nouvelleFenetre.document.close();
        
    } else {
        // Si la validation échoue, afficher le message d'erreur dans le DOM
        console.error(messageErreur);
        
        // Créer un div de message d'erreur temporaire (remplace le pop-up pour une meilleure UX)
        var messageAlerteDOM = document.createElement('div');
        messageAlerteDOM.id = 'global-error-message';
        messageAlerteDOM.style.color = 'red';
        messageAlerteDOM.style.fontWeight = 'normal'; // Retire le bold pour la liste
        messageAlerteDOM.style.border = '1px solid red';
        messageAlerteDOM.style.padding = '10px';
        messageAlerteDOM.style.marginBottom = '15px';

        // --- CORRECTION: Afficher la liste des erreurs dans le DOM ---
        var listeErreursHTML = messageErreur.replace(/\n/g, '<br>');
        messageAlerteDOM.innerHTML = `<strong>ATTENTION: Veuillez corriger les erreurs suivantes :</strong><br>${listeErreursHTML}`;
        // -----------------------------------------------------------
        
        // Trouver l'endroit pour insérer: après le h2 du formulaire
        var elementH2 = formContainer.querySelector('h2');
        if (elementH2) {
            formContainer.insertBefore(messageAlerteDOM, elementH2.nextSibling);
        } else {
            formContainer.insertBefore(messageAlerteDOM, formContainer.firstChild); 
        }
        
        // Déclencher un focus sur le premier champ invalide (utilisant l'ordre de la validation)
        if (!validerChamp(nom, 'nom', 'saisieNom')) document.getElementById("nom").focus();
        else if (!validerChamp(prenom, 'prénom', 'saisiePrenom')) document.getElementById("prenom").focus();
        else if (!validerChamp(adresse, 'adresse', 'saisieAdresse')) document.getElementById("adresse").focus();
        else if (!validerChamp(ville, 'ville', 'saisieVille')) document.getElementById("ville").focus();
        else if (!validerChamp(codePostal, 'code postal', 'saisieCodePostal')) document.getElementById("codePostal").focus();
        // Si l'abonnement est coché et l'email est vide
        else if (abonnementNews === "Oui" && document.getElementById("adresseMail").value.trim() === "") document.getElementById("adresseMail").focus();
    }
}
