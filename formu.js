// ******************************************************
// TP2 - LE LANGAGE JAVASCRIPT (COTE CLIENT)
// Fichier : formu.js
// Auteur : Votre Nom
// Date : 2025-10-15
// ******************************************************

/**
 * Fonction principale de vérification et de récapitulatif.
 * Récupère les données du formulaire et empêche la soumission par défaut.
 * @param {Event} event L'objet événement de la soumission du formulaire.
 */
function verification(event) {
    // Empêche la soumission par défaut du formulaire, permettant au JS de gérer l'action.
    // Ceci est crucial lorsque la fonction est appelée via l'attribut onsubmit du formulaire.
    if (event) {
        event.preventDefault();
    }
    
    // 1. Récupération des valeurs des champs simples (getElementById)
    let civilite = document.getElementById("civilite").value;
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let adresse = document.getElementById("adresse").value;
    let ville = document.getElementById("ville").value;
    let codePostal = document.getElementById("codePostal").value;
    let adresseMail = document.getElementById("adresseMail").value;

    // 2. Récupération de la Catégorie Socio-Professionnelle (radio - getElementsByName)
    // Consigne TP: getElementsByName renvoie un tableau de 5 valeurs gérées dans une boucle (for).
    let professionRadios = document.getElementsByName("profession");
    let professionChoisie = "Non spécifié";

    // Parcourir le tableau des éléments radio pour trouver celui qui est 'checked'
    for (let i = 0; i < professionRadios.length; i++) {
        if (professionRadios[i].checked) {
            professionChoisie = professionRadios[i].value;
            break; // Sortir de la boucle une fois l'élément trouvé
        }
    }

    // 3. Récupération de l'abonnement Newsletter (checkbox - getElementsByName)
    // Consigne TP: "La vérification du cochage du checkbox (checked) se fera avec la méthode getElementsByName"
    let newsCheckboxes = document.getElementsByName("news");
    
    // getElementsByName renvoie un tableau. L'élément unique est à l'index [0].
    let newsCheckbox = newsCheckboxes[0]; 
    let abonnementNews = newsCheckbox.checked ? "Oui" : "Non";


    // À PARTIR D'ICI, VOUS POUVEZ CONTINUER LA LOGIQUE DU TP :
    // 1. Ajouter la validation des champs vides (POUR ALLER PLUS LOIN).
    // 2. Utiliser window.open() pour créer la nouvelle fenêtre de récapitulatif.
    
    console.log("--- Récapitulatif des données saisies ---");
    console.log("Civilité: " + civilite);
    console.log("Nom: " + nom);
    console.log("Prénom: " + prenom);
    console.log("Adresse: " + adresse.replace(/\n/g, ' '));
    console.log("Ville: " + ville);
    console.log("Code Postal: " + codePostal);
    console.log("Catégorie Pro: " + professionChoisie);
    console.log("Abonnement News: " + abonnementNews);
    if (abonnementNews === "Oui") {
        console.log("Adresse Mail: " + adresseMail);
    }
    console.log("--- Fin du récapitulatif ---");
}

// NOTE : La fonction afficheOubli() a été retirée, conformément à votre demande de minimalisme.
