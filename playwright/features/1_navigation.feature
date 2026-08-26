# language: fr

Fonctionnalité: Naviguation

    Scénario: Naviguer sur la page principal
        Etant donné que j'accède au site
        Alors je suis sur la page nommé "Todo-list-REACT"

    Scénario: Naviguer sur la page de connexion
        Lorsque je clique sur le bouton possédant l'ID "loginButton"
        Alors je suis sur la page nommé "Connexion"

    Scénario: Revenir sur la page principal depuis la page de connexion
        Lorsque je clique sur le bouton possédant l'ID "cancelLoginButton"
        Alors je suis sur la page nommé "Todo-list-REACT"

    Scénario: Naviguer sur la page d'inscription
        Lorsque je clique sur le bouton possédant l'ID "registerButton"
        Alors je suis sur la page nommé "Inscription"

    @Close_browser
    Scénario: Revenir sur la page principal depuis la page d'inscription
        Lorsque je clique sur le bouton possédant l'ID "cancelRegisterButton"
        Alors je suis sur la page nommé "Todo-list-REACT"