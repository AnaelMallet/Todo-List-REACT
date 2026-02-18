# language: fr

Fonctionnalité: Modification du profil

    @Open_browser
    @Navigation_page_connexion
    @Connexion
    Scénario: Naviguer sur la page de profil du l'utilisateur
        Lorsque je clique sur le bouton possédant l'ID "profileButton"
        Alors je suis sur la page nommé "Utilisateur"

    Scénario: Naviguer sur la page principal depuis la page du profil
        Lorsque je clique sur le bouton possédant l'ID "cancelProfileButton"
        Alors je suis sur la page nommé "Todo-list-REACT"

    @Navigation_page_profil
    Scénario: vérification de champs: visibilité du champs "Prénom"
        Lorsque je clique sur le bouton possédant l'ID "updateFirstnameButton"
        Alors le champs possédant l'ID "updateFirstnameInput" est actif

    Scénario: vérification de champs: non visibilité du champs "Prénom"
        Lorsque je clique sur le bouton possédant l'ID "updateFirstnameButton"
        Alors le champs possédant l'ID "updateFirstnameInput" n'est pas actif

    Scénario: vérifications de champs: visibilité de l'erreur du champs "Prénom"
        Lorsque je clique sur le bouton possédant l'ID "updateFirstnameButton"
        Et que je saisis "" dans le champs possédant l'ID "updateFirstnameInput"
        Alors l'élément possédant l'ID "updateFirstnameErrorText" avec le texte "Le prénom est obligatoire." est visible

    Scénario: vérifications de champs: non visibilité de l'erreur du champs "Prénom"
        Lorsque je clique sur le bouton possédant l'ID "updateFirstnameButton"
        Alors l'élément possédant l'ID "updateFirstnameErrorText" avec le texte "Le prénom est obligatoire." n'est pas visible
        
    Scénario: vérification de champs: visibilité du champs "Nom"
        Lorsque je clique sur le bouton possédant l'ID "updateLastnameButton"
        Alors le champs possédant l'ID "updateLastnameInput" est actif

    Scénario: vérification de champs: non visibilité du champs "Nom"
        Lorsque je clique sur le bouton possédant l'ID "updateLastnameButton"
        Alors le champs possédant l'ID "updateLastnameInput" n'est pas actif

    Scénario: vérifications de champs: visibilité de l'erreur du champs "Nom"
        Lorsque je clique sur le bouton possédant l'ID "updateLastnameButton"
        Et que je saisis "" dans le champs possédant l'ID "updateLastnameInput"
        Alors l'élément possédant l'ID "updateLastnameErrorText" avec le texte "Le nom est obligatoire." est visible

    Scénario: vérifications de champs: non visibilité de l'erreur du champs "Nom"
        Lorsque je clique sur le bouton possédant l'ID "updateLastnameButton"
        Alors l'élément possédant l'ID "updateLastnameErrorText" avec le texte "Le nom est obligatoire." n'est pas visible

    Scénario: vérification de champs: visibilité du champs "Email"
        Lorsque je clique sur le bouton possédant l'ID "updateEmailButton"
        Alors le champs possédant l'ID "updateEmailInput" est actif

    Scénario: vérification de champs: non visibilité du champs "Email"
        Lorsque je clique sur le bouton possédant l'ID "updateEmailButton"
        Alors le champs possédant l'ID "updateEmailInput" n'est pas actif

    Scénario: vérifications de champs: visibilité de l'erreur du champs "Email"
        Lorsque je clique sur le bouton possédant l'ID "updateEmailButton"
        Et que je saisis "" dans le champs possédant l'ID "updateEmailInput"
        Alors l'élément possédant l'ID "updateEmailErrorText" avec le texte "L'adresse email est obligatoire." est visible
    
    Scénario: vérifications de champs: visibilité de l'erreur du champs "Email"
        Lorsque je saisis "test" dans le champs possédant l'ID "updateEmailInput"
        Alors l'élément possédant l'ID "updateEmailErrorText" avec le texte "L'adresse email n'est pas valide." est visible
    
    Scénario: vérifications de champs: non visibilité de l'erreur du champs "Email"
        Lorsque je clique sur le bouton possédant l'ID "updateEmailButton"
        Alors l'élément possédant l'ID "updateEmailErrorText" avec le texte "L'adresse email n'est pas valide." n'est pas visible

    Scénario: vérification de champs: visibilité du champs "password" et "confirmationPassword"
        Lorsque je clique sur le bouton possédant l'ID "updatePasswordButton"
        Alors le champs possédant l'ID "updatePasswordInput" est visible
        Et le champs possédant l'ID "updateConfirmationPasswordInput" est visible

    Scénario: vérification de champs: non visibilité du champs "password" et "confirmationPassword"
        Lorsque je clique sur le bouton possédant l'ID "updatePasswordButton"
        Alors le champs possédant l'ID "updatePasswordInput" n'est pas visible
        Et le champs possédant l'ID "updateConfirmationPasswordInput" n'est pas visible

    Scénario: vérifications de champs: visibilité de l'erreur du champs "password" et "confirmationPassword"
        Lorsque je clique sur le bouton possédant l'ID "updatePasswordButton"
        Et que je saisis "" dans le champs possédant l'ID "updatePasswordInput"
        Alors l'élément possédant l'ID "updatePasswordErrorText" avec le texte "Le mot de passe est obligatoire." est visible
        
    Scénario: vérifications de champs: visibilité de l'erreur du champs "password" et "confirmationPassword"
        Lorsque je saisis "test" dans le champs possédant l'ID "updatePasswordInput"
        Alors l'élément possédant l'ID "updatePasswordErrorText" avec le texte "Le mot de passe n'est pas valide." est visible

    Scénario: vérifications de champs: visibilité de l'erreur du champs "confirmationPassword"
        Lorsque je saisis "" dans le champs possédant l'ID "updateConfirmationPasswordInput"
        Alors l'élément possédant l'ID "updateConfirmationPasswordErrorText" avec le texte "La confirmation du mot de passe est obligatoire." est visible
        
    Scénario: vérifications de champs: visibilité de l'erreur du champs "confirmationPassword"
        Lorsque je saisis "test2" dans le champs possédant l'ID "updateConfirmationPasswordInput"
        Alors l'élément possédant l'ID "updateConfirmationPasswordErrorText" avec le texte "La confirmation du mot de passe n'est pas identique." est visible

    Scénario: vérifications de champs: non visibilité de l'erreur du champs "password" et "confirmationPassword"
        Lorsque je clique sur le bouton possédant l'ID "updatePasswordButton"
        Alors l'élément possédant l'ID "updatePasswordErrorText" avec le texte "Le mot de passe n'est pas valide." n'est pas visible
        Et l'élément possédant l'ID "updateConfirmationPasswordErrorText" avec le texte "La confirmation du mot de passe n'est pas identique." n'est pas visible

    @Close_browser
    Scénario: modification des champs de l'utilisateur: Succès
        Lorsque je clique sur le bouton possédant l'ID "updateFirstnameButton"
        Et que je saisis "John" dans le champs possédant l'ID "updateFirstnameInput"
        Et que je clique sur le bouton possédant l'ID "updateLastnameButton"
        Et que je saisis "Doe" dans le champs possédant l'ID "updateLastnameInput"
        Et que je clique sur le bouton possédant l'ID "updateEmailButton"
        Et que je saisis "test@test.fr" dans le champs possédant l'ID "updateEmailInput"
        Et que je clique sur le bouton possédant l'ID "updatePasswordButton"
        Et que je saisis "P@ssw0rdT3st!ng" dans le champs possédant l'ID "updatePasswordInput"
        Et que je saisis "P@ssw0rdT3st!ng" dans le champs possédant l'ID "updateConfirmationPasswordInput"
        Et que je clique sur le bouton possédant l'ID "submitProfileButton"
        Alors la notification "Utilisateur mis à jour" est visible