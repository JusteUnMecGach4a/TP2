// ******************************************************
// TP2 - LE LANGAGE JAVASCRIPT (COTE CLIENT)
// Fichier : formu.js
// Auteur : Votre Nom
// Date : 2025-10-15
// ******************************************************

/**
* Fonction principale de vérification et de récapitulatif.
* Récupère les données du formulaire, vérifie leur intégrité, et affiche le récapitulatif.
* @param {Event} event L'objet événement de la soumission du formulaire.
*/
function verification(event) {
    // Empêche la soumission par défaut du formulaire, permettant au JS de gérer l'action.
    if (event) {
        event.preventDefault();
    }
    
    // 1. Récupération des valeurs des champs simples (getElementById)
    var civilite = document.getElementById("civilite").value;
    var nom = document.getElementById("nom").value.trim();
    var prenom = document.getElementById("prenom").value.trim();
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
    // S'assurer que la checkbox existe
    var newsCheckbox = newsCheckboxes.length > 0 ? newsCheckboxes[0] : { checked: false }; 
    var abonnementNews = newsCheckbox.checked ? "Oui" : "Non";
    
    // --- PARTIE STRUCTURES DE TESTS (if) ET VALIDATION ---
    
    var estValide = true;
    var messageErreur = "Erreurs de saisie :\n";

    /**
     * Fonction d'aide pour la validation des champs de texte et l'affichage d'erreur local.
     * Note: La fonction est définie avec 'var' (variable globale de fonction) pour rester cohérente.
     */
    var validerChamp = (valeur, nomChamp, idSpan) => {
        var spanErreur = document.getElementById(idSpan); // Remplacé 'const' par 'var'
        var valid = true; // Remplacé 'let' par 'var'

        if (valeur === "") {
            messageErreur += `- Veuillez saisir votre ${nomChamp}.\n`;
            valid = false;
        } 
        
        // Affichage dans le span si l'ID existe
        if (spanErreur) {
            if (!valid) {
                spanErreur.textContent = `Veuillez saisir votre ${nomChamp}.`;
                spanErreur.style.color = 'red';
            } else {
                spanErreur.textContent = "";
            }
        }
        return valid;
    };
    
    // Cache le message d'erreur global avant de recommencer la validation
    var formContainer = document.getElementById('contact'); // Remplacé 'const' par 'var'
    
    // Suppression de l'ancienne boîte d'erreur si elle existe
    var errorDiv = document.getElementById('global-error-message'); // Remplacé 'const' par 'var'
    if (errorDiv) {
        errorDiv.remove();
    }

    // 1. Validation des champs obligatoires (Nom, Prénom, Adresse, Ville, Code Postal)
    estValide = validerChamp(nom, 'nom', 'saisieNom') && estValide;
    estValide = validerChamp(prenom, 'prénom', 'saisiePrenom') && estValide;

    // Pour les autres champs obligatoires
    if (adresse === "") {
        messageErreur += "- Veuillez saisir votre adresse.\n";
        estValide = false;
    }
    if (ville === "") {
        messageErreur += "- Veuillez saisir votre ville.\n";
        estValide = false;
    }
    if (codePostal === "") {
        messageErreur += "- Veuillez saisir votre code postal.\n";
        estValide = false;
    }

    // 2. Validation du champ Mail si la checkbox est cochée
    if (abonnementNews === "Oui" && adresseMail === "") {
        messageErreur += "- Veuillez saisir votre adresse mail pour l'abonnement à la newsletter.\n";
        estValide = false;
    }

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
        
        // Créer un div de message d'erreur temporaire
        // Étant donné que nous avons retiré l'élément en début de fonction, nous le recréons.
        var newErrorDiv = document.createElement('div');
        newErrorDiv.id = 'global-error-message';
        newErrorDiv.className = 'text-red-600 font-bold mb-4 p-3 bg-red-50 border border-red-200 rounded-lg';
        
        // Trouver l'endroit pour insérer: après le h2 du formulaire
        var h2 = formContainer.querySelector('h2');
        if (h2) {
            formContainer.insertBefore(newErrorDiv, h2.nextSibling);
        } else {
            formContainer.insertBefore(newErrorDiv, formContainer.firstChild); 
        }
        newErrorDiv.textContent = "ATTENTION: Veuillez corriger les erreurs de saisie ci-dessous.";
        
        // Déclencher un focus sur le premier champ invalide
        if (!validerChamp(nom, 'nom', 'saisieNom')) document.getElementById("nom").focus();
        else if (!validerChamp(prenom, 'prénom', 'saisiePrenom')) document.getElementById("prenom").focus();
        else if (adresse === "") document.getElementById("adresse").focus();
        else if (ville === "") document.getElementById("ville").focus();
        else if (codePostal === "") document.getElementById("codePostal").focus();
        else if (abonnementNews === "Oui" && adresseMail === "") document.getElementById("adresseMail").focus();
    }
}
