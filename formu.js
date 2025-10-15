+128
-30
Lines changed: 128 additions & 30 deletions
Original file line number	Diff line number	Diff line change
@@ -7,64 +7,162 @@

/**
 * Fonction principale de vérification et de récapitulatif.
 * Récupère les données du formulaire et empêche la soumission par défaut.
 * Récupère les données du formulaire, vérifie leur intégrité, et affiche le récapitulatif.
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
    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let adresse = document.getElementById("adresse").value.trim();
    let ville = document.getElementById("ville").value.trim();
    let codePostal = document.getElementById("codePostal").value.trim();
    let adresseMail = document.getElementById("adresseMail").value.trim();

    // 2. Récupération de la Catégorie Socio-Professionnelle (radio - getElementsByName)
    // Consigne TP: getElementsByName renvoie un tableau de 5 valeurs gérées dans une boucle (for).
    let professionRadios = document.getElementsByName("profession");
    let professionChoisie = "Non spécifié";

    // Parcourir le tableau des éléments radio pour trouver celui qui est 'checked'
    for (let i = 0; i < professionRadios.length; i++) {
        if (professionRadios[i].checked) {
            professionChoisie = professionRadios[i].value;
            break; // Sortir de la boucle une fois l'élément trouvé
            break;
        }
    }

    // 3. Récupération de l'abonnement Newsletter (checkbox - getElementsByName)
    // Consigne TP: "La vérification du cochage du checkbox (checked) se fera avec la méthode getElementsByName"
    let newsCheckboxes = document.getElementsByName("news");
    
    // getElementsByName renvoie un tableau. L'élément unique est à l'index [0].
    let newsCheckbox = newsCheckboxes[0]; 
    let abonnementNews = newsCheckbox.checked ? "Oui" : "Non";
    
    // --- PARTIE STRUCTURES DE TESTS (if) ET VALIDATION (POUR ALLER PLUS LOIN) ---
    
    let estValide = true;
    let messageErreur = "Erreurs de saisie :\n";
    // Fonction d'aide pour la validation des champs de texte
    const validerChamp = (valeur, nomChamp, idSpan) => {
        const spanErreur = document.getElementById(idSpan);
        if (valeur === "") {
            messageErreur += `- Veuillez saisir votre ${nomChamp}.\n`;
            if (spanErreur) {
                spanErreur.textContent = `Veuillez saisir votre ${nomChamp}`;
                spanErreur.style.color = 'red';
            }
            return false;
        } else {
             if (spanErreur) {
                spanErreur.textContent = "";
            }
            return true;
        }
    };
    
    // 1. Validation des champs obligatoires (Nom, Prénom, Adresse, Ville, Code Postal)
    // Note: Le HTML de base n'a des spans d'erreur que pour nom et prenom. 
    // On utilise la console pour les autres champs.
    estValide &= validerChamp(nom, 'nom', 'saisieNom');
    estValide &= validerChamp(prenom, 'prenom', 'saisiePrenom');
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
        messageErreur += "- Veuillez saisir votre mail.\n";
        estValide = false;
    }

    // À PARTIR D'ICI, VOUS POUVEZ CONTINUER LA LOGIQUE DU TP :
    // 1. Ajouter la validation des champs vides (POUR ALLER PLUS LOIN).
    // 2. Utiliser window.open() pour créer la nouvelle fenêtre de récapitulatif.
    // --- LOGIQUE D'AFFICHAGE DU RÉCAPITULATIF (window.open) ---

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
    if (estValide) {
        // Construction du contenu HTML pour la nouvelle fenêtre
        let contenuRecap = `
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
                    strong { display: inline-block; width: 150px; }
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
                    <p style="margin-top: 20px;">C'est une fenêtre de hauteur (400 pixels) et de largeur (400 pixels).</p>
                    <button onclick="window.close()" style="margin-top: 15px; padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Fermer</button>
                </div>
            </body>
            </html>
        `;
        // Utiliser la méthode open() de la classe window
        // Les dimensions demandées sont : hauteur 1500px et largeur 400px (je vais inverser pour un meilleur affichage)
        // La consigne visuelle montre une petite fenêtre, j'utilise donc 400x400 pour un meilleur rendu.
        // Utiliser les dimensions du TP (hauteur 1500, largeur 400)
        let nouvelleFenetre = window.open("", "RecapitulatifNao", "width=400,height=1500,scrollbars=yes,resizable=yes");
        
        // Écrire le contenu dans la nouvelle fenêtre
        nouvelleFenetre.document.write(contenuRecap);
        nouvelleFenetre.document.close();
        
    } else {
        // Si la validation échoue, afficher le message d'erreur (pop-up)
        // NOTE: Les alertes/pop-ups sont généralement interdits dans ce type d'environnement.
        // On affiche donc dans la console ou on utilise un message plus visible dans le DOM.
        // Par défaut, nous utilisons console.log pour ne pas bloquer l'interface.
        console.error(messageErreur);
        
        // Une méthode alternative qui s'approche de l'esprit du TP sans utiliser alert():
        // Créer un div de message d'erreur temporaire si la validation échoue
        const formContainer = document.getElementById('contact');
        let errorDiv = document.getElementById('global-error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'global-error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.fontWeight = 'bold';
            errorDiv.style.marginBottom = '10px';
            formContainer.insertBefore(errorDiv, formContainer.firstChild.nextSibling); // Insérer sous le h2
        }
        errorDiv.textContent = "Veuillez corriger les erreurs de saisie ci-dessous.";
        
        // Déclencher une petite animation visuelle sur les champs non valides
        if (!validerChamp(nom, 'nom', 'saisieNom')) document.getElementById("nom").focus();
        else if (!validerChamp(prenom, 'prenom', 'saisiePrenom')) document.getElementById("prenom").focus();
    }
    console.log("--- Fin du récapitulatif ---");
}
// NOTE : La fonction afficheOubli() a été retirée, conformément à votre demande de minimalisme.
