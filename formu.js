// ******************************************************
// TP2 - LE LANGAGE JAVASCRIPT (COTE CLIENT)
// Fichier : formu.js
// Auteur : Votre Nom
// Date : 2025-10-15
// ******************************************************

// --- EXPRESSIONS RÉGULIÈRES (GLOBALES POUR LES DEUX FONCTIONS) ---
var regExpAlpha = /^[a-zA-ZÀ-ÿ\s'-]+$/;
var errorMessageAlpha = "Votre nom doit contenir uniquement des lettres et des caractères spéciaux (espaces, tirets, accents).";
var regExpNum = /^\d+$/;
var errorMessageNum = "Doit contenir uniquement des chiffres.";
var regExpTel = /^\d{10}$/; 
var errorMessageTel = "Le numéro de téléphone doit contenir exactement 10 chiffres (ex: 0123456789).";
var regExpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var errorMessageEmail = "L'adresse mail n'est pas valide.";


/**
* Fonction pour la validation immédiate (onblur) des champs.
* Elle affiche l'erreur en temps réel sans attendre la soumission du formulaire.
* @param {string} champID L'ID du champ à vérifier.
* @param {string} spanID L'ID du span d'erreur.
*/
var afficheOubli = (champID, spanID) => {
    var inputElement = document.getElementById(champID);
    var spanErreur = document.getElementById(spanID);
    
    // Pour les éléments qui pourraient ne pas avoir de .value (comme un select ou checkbox non géré ici)
    if (!inputElement) return;

    var valeurChamp = inputElement.value.trim(); // Renommé 'valeur' en 'valeurChamp'
    var specificError = "";
    
    // Détermination des règles à appliquer
    var nomChamp = "";
    var regexPattern = null;
    var regexErrorMessage = null;
    
    // Définition des règles spécifiques en fonction de l'ID du champ
    if (champID === 'nom') {
        nomChamp = 'nom';
        regexPattern = regExpAlpha;
        regexErrorMessage = errorMessageAlpha;
    } else if (champID === 'prenom') {
        nomChamp = 'prénom';
        regexPattern = regExpAlpha;
        // La logique d'adaptation du message est gérée plus bas
        regexErrorMessage = errorMessageAlpha; 
    } else if (champID === 'telephone') {
        nomChamp = 'numéro de téléphone';
        regexPattern = regExpTel;
        regexErrorMessage = errorMessageTel;
    } else if (champID === 'codePostal') {
        nomChamp = 'code postal';
        regexPattern = regExpNum;
        regexErrorMessage = errorMessageNum;
    } else if (champID === 'adresseMail') {
        nomChamp = 'adresse mail';
        regexPattern = regExpEmail;
        regexErrorMessage = errorMessageEmail;
        
        // Si la newsletter n'est pas cochée, l'adresse mail n'est pas obligatoire
        var newsCheckbox = document.getElementsByName("news")[0];
        if (newsCheckbox && !newsCheckbox.checked) {
            specificError = ""; // Pas d'erreur, même si vide
            spanErreur.textContent = "";
            return;
        }
    } else if (champID === 'adresse') { // Ajout de l'adresse
        nomChamp = 'adresse';
    } else if (champID === 'ville') { // Ajout de la ville
        nomChamp = 'ville';
    }
    
    // Validation principale: si vide
    if (valeurChamp === "") {
        specificError = `Veuillez saisir votre ${nomChamp}.`;
    } 
    // Validation Regex: si non vide mais le format est mauvais
    else if (regexPattern && !regexPattern.test(valeurChamp)) {
        // Logique pour adapter le message si on est sur le prénom
        if (champID === 'prenom') {
             specificError = `Votre prénom doit contenir uniquement des lettres et des caractères spéciaux (espaces, tirets, accents).`;
        } else {
             specificError = regexErrorMessage;
        }
    }

    // Affichage dans le span
    if (spanErreur) {
        if (specificError) {
            spanErreur.textContent = specificError;
            spanErreur.style.color = 'red';
            spanErreur.style.fontSize = '0.9em';
        } else {
            spanErreur.textContent = "";
        }
    }
};

/**
 * Configure les écouteurs d'événements onblur et input (temps réel) pour les champs requis.
 * Cela permet la validation en temps réel sans avoir à modifier le HTML.
 */
var setupOnBlurListeners = () => { // Renommé la variable de la fonction pour camelCase
    // Liste des champs à surveiller et leur ID de span d'erreur
    var fieldsToValidate = [ // Renommé 'fields' en 'fieldsToValidate'
        { id: 'nom', spanId: 'saisieNom' },
        { id: 'prenom', spanId: 'saisiePrenom' },
        { id: 'telephone', spanId: 'saisieTelephone' },
        { id: 'adresse', spanId: 'saisieAdresse' },
        { id: 'ville', spanId: 'saisieVille' },
        { id: 'codePostal', spanId: 'saisieCodePostal' },
        { id: 'adresseMail', spanId: 'saisieAdresseMail' },
    ];

    fieldsToValidate.forEach(field => {
        var element = document.getElementById(field.id);
        if (element) {
            // 1. Ajoute l'écouteur 'blur' (quitter le champ) - Validation finale lors de la sortie
            element.addEventListener('blur', () => afficheOubli(field.id, field.spanId));
            
            // 2. Ajoute l'écouteur 'input' (taper dans le champ) - Validation en temps réel (détecte les erreurs milliseconde par milliseconde)
            element.addEventListener('input', () => afficheOubli(field.id, field.spanId));
        }
    });
    
    // Ajout d'un écouteur sur la checkbox pour effacer/valider l'email immédiatement
    var newsCheckbox = document.getElementsByName("news")[0];
    if (newsCheckbox) {
        newsCheckbox.addEventListener('change', () => afficheOubli('adresseMail', 'saisieAdresseMail'));
    }
};


/**
* Fonction principale de vérification et de récapitulatif.
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
    var telephone = document.getElementById("telephone").value.trim(); 
    var adresse = document.getElementById("adresse").value.trim();
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
    var newsCheckboxElement = newsCheckboxes.length > 0 ? newsCheckboxes[0] : { checked: false }; // Renommé 'newsCheckbox' en 'newsCheckboxElement'
    var abonnementNews = newsCheckboxElement.checked ? "Oui" : "Non";
    
    // ***************************************************************
    // INSTRUCTIONS CONSOLE.LOG POUR DÉBOGAGE
    // ***************************************************************
    console.log("--- Récupération des données du formulaire ---");
    console.log("Nom complet : " + nom + " " + prenom);
    console.log("Téléphone : " + telephone); 
    console.log("Adresse : " + adresse + ", " + ville + " " + codePostal);
    console.log("Abonnement Newsletter : " + abonnementNews);
    console.log("----------------------------------------------");
    
    // --- PARTIE STRUCTURES DE TESTS (if) ET VALIDATION ---
    
    var isFormValid = true; // Renommé 'estValide' en 'isFormValid'
    var validationErrorMessage = ""; // Renommé 'messageErreur' en 'validationErrorMessage'
    var formContainer = document.getElementById('contact');

    /**
     * Fonction d'aide pour la validation des champs de texte et l'affichage d'erreur local (dans le span).
     * NOTE: Cette fonction est principalement utilisée à la soumission pour accumuler les messages d'erreur.
     */
    var validerChamp = (champValue, champName, errorSpanId, regexPattern = null, regexErrorMessage = null) => { // Renommé les paramètres
        var spanErreur = document.getElementById(errorSpanId);
        var isValid = true; // Renommé 'valid' en 'isValid'
        var specificError = "";

        if (champValue === "") {
            specificError = `Veuillez saisir votre ${champName}.`;
            validationErrorMessage += `- Veuillez saisir votre ${champName}.\n`;
            isValid = false;
        } else if (regexPattern && !regexPattern.test(champValue)) {
            // Logique pour adapter le message à la soumission
            if (champName === 'prénom') {
                specificError = `Votre prénom doit contenir uniquement des lettres et des caractères spéciaux (espaces, tirets, accents).`;
                validationErrorMessage += `- Votre prénom doit contenir uniquement des lettres et des caractères spéciaux (espaces, tirets, accents).\n`;
            } else {
                specificError = regexErrorMessage;
                validationErrorMessage += `- ${regexErrorMessage}\n`;
            }
            isValid = false;
        }
        
        // Affichage dans le span si l'ID existe (s'assure que le message de soumission n'écrase pas le message onblur)
        if (spanErreur && !isValid) {
            spanErreur.textContent = specificError;
            spanErreur.style.color = 'red';
            spanErreur.style.fontSize = '0.9em';
        }
        
        // Si la validation échoue, on s'assure que la variable isFormValid globale est mise à jour
        if (!isValid) {
            isFormValid = false;
        }

        return isValid;
    };
    
    // Suppression du message d'erreur global (qui n'est plus utilisé)
    var errorDiv = document.getElementById('global-error-message');
    if (errorDiv) {
        errorDiv.remove();
    }

    // 1. Validation de TOUS les champs obligatoires (les fonctions d'aide mettent à jour isFormValid et validationErrorMessage)
    validerChamp(nom, 'nom', 'saisieNom', regExpAlpha, errorMessageAlpha);
    validerChamp(prenom, 'prénom', 'saisiePrenom', regExpAlpha, errorMessageAlpha);
    validerChamp(telephone, 'téléphone', 'saisieTelephone', regExpTel, errorMessageTel); 

    validerChamp(adresse, 'adresse', 'saisieAdresse');
    validerChamp(ville, 'ville', 'saisieVille');
    
    validerChamp(codePostal, 'code postal', 'saisieCodePostal', regExpNum, errorMessageNum);
    

    // 2. Validation du champ Mail si la checkbox est cochée
    if (abonnementNews === "Oui") {
        validerChamp(adresseMail, 'adresse mail', 'saisieAdresseMail', regExpEmail, errorMessageEmail);
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
    console.log("Est valide : " + isFormValid);
    if (!isFormValid) {
        console.error("Erreurs de saisie :\n" + validationErrorMessage);
    }
    console.log("-----------------------------------");
    // ***************************************************************

    // --- LOGIQUE D'AFFICHAGE DU RÉCAPITULATIF OU DE L'ERREUR (window.open / alert) ---
    
    if (isFormValid) {
        // Construction du contenu HTML pour la fenêtre de récapitulatif
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
                    <p><strong>Téléphone:</strong> ${telephone}</p>
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

        // Affichage du récapitulatif
        var nouvelleFenetre = window.open("", "RecapitulatifNao", "width=400,height=1500,scrollbars=yes,resizable=yes");
        nouvelleFenetre.document.write(contenuRecap);
        nouvelleFenetre.document.close();
        
    } else {
        // --- LOGIQUE D'AFFICHAGE DE L'ERREUR AVEC alert() ---
        
        // 1. Déclencher l'alerte native avec la liste détaillée des erreurs
        alert("ATTENTION: Veuillez corriger les erreurs suivantes :\n\n" + validationErrorMessage);
        
        // 2. Déclencher un focus sur le premier champ invalide pour guider l'utilisateur
        // Mise à jour de la séquence de focus pour inclure le téléphone
        if (document.getElementById("nom").value.trim() === "" || !regExpAlpha.test(document.getElementById("nom").value.trim())) {
            document.getElementById("nom").focus();
        } else if (document.getElementById("prenom").value.trim() === "" || !regExpAlpha.test(document.getElementById("prenom").value.trim())) {
            document.getElementById("prenom").focus();
        } else if (document.getElementById("telephone").value.trim() === "" || !regExpTel.test(document.getElementById("telephone").value.trim())) {
            document.getElementById("telephone").focus();
        } else if (document.getElementById("adresse").value.trim() === "") {
            document.getElementById("adresse").focus();
        } else if (document.getElementById("ville").value.trim() === "") {
            document.getElementById("ville").focus();
        } else if (document.getElementById("codePostal").value.trim() === "" || !regExpNum.test(document.getElementById("codePostal").value.trim())) {
            document.getElementById("codePostal").focus();
        } else if (abonnementNews === "Oui" && (document.getElementById("adresseMail").value.trim() === "" || !regExpEmail.test(document.getElementById("adresseMail").value.trim()))) {
            document.getElementById("adresseMail").focus();
        }
    }
}

// Correction du problème: installer les écouteurs dès que la page est prête.
document.addEventListener('DOMContentLoaded', setupOnBlurListeners);
