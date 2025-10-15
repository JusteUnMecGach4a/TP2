// ******************************************************
// TP2 - LE LANGAGE JAVASCRIPT (COTE CLIENT)
// Fichier : formu.js
// Auteur : Votre Nom
// Date : 2025-10-15
// ******************************************************

/**
 * Fonction principale de vérification et de récapitulatif.
 * Récupère les données du formulaire.
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

    // 2. Récupération de la Catégorie Socio-Professionnelle (radio - getElementsByName)
    let professionRadios = document.getElementsByName("profession");
    let professionChoisie = "Non spécifié";

    // Parcourir le tableau des éléments radio pour trouver celui qui est 'checked'
    // Consigne TP: "vous gerez dans une boucle (for)"
    for (let i = 0; i < professionRadios.length; i++) {
        if (professionRadios[i].checked) {
            professionChoisie = professionRadios[i].value;
            break; // Sortir de la boucle une fois l'élément trouvé
        }
    }

    // 3. Récupération de l'abonnement Newsletter (checkbox - getElementsByName ou getElementById)
    // Ici, nous utilisons l'ID pour plus de simplicité, car l'ID est unique.
    let newsCheckbox = document.getElementById("news");
    let abonnementNews = newsCheckbox.checked ? "Oui" : "Non";


    // À PARTIR D'ICI, VOUS POUVEZ CONTINUER LA LOGIQUE DU TP :
    // 1. Ajouter la validation des champs vides (POUR ALLER PLUS LOIN).
    // 2. Utiliser window.open() pour créer la nouvelle fenêtre de récapitulatif.
    
    console.log("Civilité: " + civilite);
    console.log("Nom: " + nom);
    console.log("Catégorie Pro: " + professionChoisie);
    console.log("Abonnement News: " + abonnementNews);
}

// NOTE : La fonction afficheOubli() a été retirée, conformément à votre demande de minimalisme.
