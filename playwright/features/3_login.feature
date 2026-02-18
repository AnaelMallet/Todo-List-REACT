# language: fr

Fonctionnalité: Connexion

    @Open_browser
    @Navigation_page_connexion
    Scénario: Vérification de champs: adresse email obligatoire
        Lorsque je saisis "" dans le champs possédant l'ID "emailLoginInput"
        Alors l'élément possédant l'ID "emailLoginInputErrorText" avec le texte "L'adresse email est obligatoire." est visible

    Scénario: Vérification de champs: mot de passe obligatoire
        Lorsque je saisis "" dans le champs possédant l'ID "passwordLoginInput"
        Alors l'élément possédant l'ID "passwordLoginInputErrorText" avec le texte "Le mot de passe est obligatoire." est visible

    Scénario: Vérification de champs: adresse email invalide
        Lorsque je saisis "test" dans le champs possédant l'ID "emailLoginInput"
        Alors l'élément possédant l'ID "emailLoginInputErrorText" avec le texte "L'adresse email n'est pas valide." est visible

    Scénario: Vérification de champs: mot de passe invalide
        Lorsque je saisis "test" dans le champs possédant l'ID "passwordLoginInput"
        Alors l'élément possédant l'ID "passwordLoginInputErrorText" avec le texte "Le mot de passe n'est pas valide." est visible

    Scénario: Vérification de champs: adresse email valide
        Lorsque je saisis "test@test.fr" dans le champs possédant l'ID "emailLoginInput"
        Alors l'élément possédant l'ID "emailLoginInputErrorText" avec le texte "L'adresse email est obligatoire." n'est pas visible
        Et l'élément possédant l'ID "emailLoginInputErrorText" avec le texte "L'adresse email n'est pas valide." n'est pas visible

    Scénario: Vérification de champs: mot de passe valide
        Lorsque je saisis "P@ssw0rdT3st!ng" dans le champs possédant l'ID "passwordLoginInput"
        Alors l'élément possédant l'ID "passwordLoginInputErrorText" avec le texte "Le mot de passe est obligatoire." n'est pas visible
        Et l'élément possédant l'ID "passwordLoginInputErrorText" avec le texte "Le mot de passe n'est pas valide." n'est pas visible

    Scénario: Tentative de connexion: Erreur
        Lorsque je saisis "test@E2E.fr" dans le champs possédant l'ID "emailLoginInput"
        Et que je saisis "P@ssw0rdT3st" dans le champs possédant l'ID "passwordLoginInput"
        Et que je clique sur le bouton possédant l'ID "submitLoginButton"
        Alors la notification "Adresse email ou mot de passe incorrect" est visible

    Scénario: Tentative de connexion: Succès
        Lorsque je saisis "test@test.fr" dans le champs possédant l'ID "emailLoginInput"
        Et que je saisis "P@ssw0rdT3st!ng" dans le champs possédant l'ID "passwordLoginInput"
        Et que je clique sur le bouton possédant l'ID "submitLoginButton"
        Alors la notification "Vous êtes maintenant connecté !" est visible
        Et je suis sur la page nommé "Todo-list-REACT"
        Et je suis connecté

    @Close_browser
    Scénario: Déconnexion
        Lorsque je clique sur le bouton possédant l'ID "logoutButton"
        Alors la notification "Vous êtes déconnecté !" est visible
        Et je suis déconnecté