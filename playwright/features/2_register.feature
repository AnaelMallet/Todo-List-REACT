# language: fr


Fonctionnalité: Inscription

    @Open_browser
    @Navigation_page_inscription
    Scénario: Vérification de champs: Prénom obligatoire
        Lorsque je saisis "" dans le champs possédant l'ID "firstnameInput"
        Alors l'élément possédant l'ID "firstnameInputErrorText" avec le texte "Le prénom est obligatoire." est visible

    Scénario: Vérification de champs: Nom obligatoire
        Lorsque je saisis "" dans le champs possédant l'ID "lastnameInput"
        Alors l'élément possédant l'ID "lastnameInputErrorText" avec le texte "Le nom de famille est obligatoire." est visible

    Scénario: Vérification de champs: Adresse email obligatoire
        Lorsque je saisis "" dans le champs possédant l'ID "emailRegisterInput"
        Alors l'élément possédant l'ID "emailRegisterInputErrorText" avec le texte "L'adresse email est obligatoire." est visible

    Scénario: Vérification de champs: Mot de passe obligatoire
        Lorsque je saisis "" dans le champs possédant l'ID "passwordRegisterInput"
        Alors l'élément possédant l'ID "passwordRegisterInputErrorText" avec le texte "Le mot de passe est obligatoire." est visible

    Scénario: Vérification de champs: Confirmation du mot de passe obligatoire
        Lorsque je saisis "" dans le champs possédant l'ID "confirmationPasswordInput"
        Alors l'élément possédant l'ID "confirmationPasswordInputErrorText" avec le texte "La confirmation du mot de passe est obligatoire." est visible

    Scénario: Vérification de champs: adresse email invalide
        Lorsque je saisis "test" dans le champs possédant l'ID "emailRegisterInput"
        Alors l'élément possédant l'ID "emailRegisterInputErrorText" avec le texte "L'adresse email n'est pas valide." est visible
    
    Scénario: Vérification de champs: Mot de passe invalide
        Lorsque je saisis "test" dans le champs possédant l'ID "passwordRegisterInput"
        Alors l'élément possédant l'ID "passwordRegisterInputErrorText" avec le texte "Le mot de passe n'est pas valide." est visible

    Scénario: Vérification de champs: Confirmation du mot de passe invalide (champs password vide)
        Lorsque je saisis "" dans le champs possédant l'ID "passwordRegisterInput"
        Et que je saisis "test" dans le champs possédant l'ID "confirmationPasswordInput"
        Alors l'élément possédant l'ID "confirmationPasswordInputErrorText" avec le texte "La confirmation du mot de passe n'est pas identique." est visible

    Scénario: Vérification de champs: Confirmation du mot de passe invalide (champs password plein)
        Lorsque je saisis "test" dans le champs possédant l'ID "passwordRegisterInput"
        Et que je saisis "test2" dans le champs possédant l'ID "confirmationPasswordInput"
        Alors l'élément possédant l'ID "confirmationPasswordInputErrorText" avec le texte "La confirmation du mot de passe n'est pas identique." est visible

    Scénario: Vérification de champs: adresse email valide
        Lorsque je saisis "test@test.fr" dans le champs possédant l'ID "emailRegisterInput"
        Alors l'élément possédant l'ID "emailRegisterInputErrorText" avec le texte "L'adresse email est obligatoire." n'est pas visible
        Et l'élément possédant l'ID "emailRegisterInputErrorText" avec le texte "L'adresse email n'est pas valide." n'est pas visible
    
    Scénario: Vérification de champs: Mot de passe valide
        Lorsque je saisis "P@ssw0rdT3sting" dans le champs possédant l'ID "passwordRegisterInput"
        Alors l'élément possédant l'ID "passwordRegisterInputErrorText" avec le texte "Le mot de passe est obligatoire." n'est pas visible
        Et l'élément possédant l'ID "passwordRegisterInputErrorText" avec le texte "Le mot de passe n'est pas valide." n'est pas visible

    Scénario: Vérification de champs: Confirmation du mot de passe valide
        Lorsque je saisis "P@ssw0rdT3sting" dans le champs possédant l'ID "passwordRegisterInput"
        Et que je saisis "P@ssw0rdT3sting" dans le champs possédant l'ID "confirmationPasswordInput"
        Alors l'élément possédant l'ID "confirmationPasswordInputErrorText" avec le texte "La confirmation du mot de passe est obligatoire." n'est pas visible
        Et l'élément possédant l'ID "confirmationPasswordInputErrorText" avec le texte "La confirmation du mot de passe n'est pas identique." n'est pas visible

    Scénario: Tentative d'inscription: Succès (sans nom d'utilisateur)
        Lorsque je saisis "john" dans le champs possédant l'ID "firstnameInput"
        Et que je saisis "doe" dans le champs possédant l'ID "lastnameInput"
        Et que je saisis "test@test.fr" dans le champs possédant l'ID "emailRegisterInput"
        Et que je saisis "P@ssw0rdT3sting" dans le champs possédant l'ID "passwordRegisterInput"
        Et que je saisis "P@ssw0rdT3sting" dans le champs possédant l'ID "confirmationPasswordInput"
        Et que je clique sur le bouton possédant l'ID "submitRegisterButton"
        Alors la notification "Votre compte a bien été créé." est visible
        Et je suis sur la page nommé "Todo-list-REACT"

    @Navigation_page_inscription
    Scénario: Tentative d'inscription: Succès (avec nom d'utilisateur)
        Lorsque je saisis "jane" dans le champs possédant l'ID "firstnameInput"
        Et que je saisis "stewart" dans le champs possédant l'ID "lastnameInput"
        Et que je saisis "jane@test.fr" dans le champs possédant l'ID "emailRegisterInput"
        Et que je saisis "JDoe" dans le champs possédant l'ID "usernameInput"
        Et que je saisis "P@ssw0rdT3sting" dans le champs possédant l'ID "passwordRegisterInput"
        Et que je saisis "P@ssw0rdT3sting" dans le champs possédant l'ID "confirmationPasswordInput"
        Et que je clique sur le bouton possédant l'ID "submitRegisterButton"
        Alors la notification "Votre compte a bien été créé." est visible
        Et je suis sur la page nommé "Todo-list-REACT"

    @Navigation_page_inscription
    @After_scenario
    Scénario: Tentative d'inscription: échec (adresse email déjà utilisé)
        Lorsque je saisis "john" dans le champs possédant l'ID "firstnameInput"
        Et que je saisis "doe" dans le champs possédant l'ID "lastnameInput"
        Et que je saisis "test@test.fr" dans le champs possédant l'ID "emailRegisterInput"
        Et que je saisis "P@ssw0rdT3sting" dans le champs possédant l'ID "passwordRegisterInput"
        Et que je saisis "P@ssw0rdT3sting" dans le champs possédant l'ID "confirmationPasswordInput"
        Et que je clique sur le bouton possédant l'ID "submitRegisterButton"
        Alors la notification "cet adresse email est déjà utilisé." est visible

