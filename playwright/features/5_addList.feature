#language: fr

Fonctionnalité: manipulation des listes

    @Open_browser
    Scénario: Vérification de la connexion: ajout refusé
        Etant donné que je suis déconnecté
        Lorsque je clique sur le bouton possédant l'ID "addListButton"
        Alors la notification "Connectez-vous pour ajouter une liste." est visible

    Scénario: Vérification de la connexion: affichage du listage des listes
        Etant donné que je suis déconnecté
        Alors l'élément possédant l'ID "notConnectedListingText" avec le texte "Connectez-vous pour voir vos listes." est visible

    @Navigation_page_connexion
    @Connexion
    Scénario: Vérification de la connexion: ajout autorisé
        Etant donné que je suis connecté
        Lorsque je clique sur le bouton possédant l'ID "addListButton"
        Alors le champs possédant l'ID "addListInput" est visible

    Scénario: désélection du champs
        Lorsque je désélectionne le champs possédant l'ID "addListInput"
        Alors le champs possédant l'ID "addListInput" n'est pas visible

    Scénario: Vérification de la connexion: affichage du listage des listes
        Etant donné que je suis connecté
        Mais qu'il n'y a aucune liste de créée
        Alors l'élément possédant l'ID "emptyListingText" avec le texte "...Aucune liste pour le moment." est visible

    Scénario: Ajout d'une liste
        Lorsque je clique sur le bouton possédant l'ID "addListButton"
        Et que je saisis "test" dans le champs possédant l'ID "addListInput"
        Et que je valide le champs possédant l'ID "addListInput"
        Alors la notification "La liste 'test' a été ajouté." est visible
        Et la liste "test" est visible dans le listage

    Scénario: Affichage du champs de modification de nom de la liste
        Lorsque je clique sur le bouton possédant l'ID "updateListButton"
        Alors le champs possédant l'ID "updateListInput" est visible

    Scénario: Modification du nom de la liste
        Lorsque je saisis "testing" dans le champs possédant l'ID "updateListInput"
        Et que je valide le champs possédant l'ID "updateListInput"
        Alors la notification "La liste a été mise à jour." est visible
        Et la liste "testing" est visible dans le listage

    Scénario: mise en favoris de la liste
        Lorsque je clique sur le bouton possédant l'ID "listFavoriteButton"
        Alors la notification "La liste 'testing' a été mise en favoris." est visible

    Scénario: désélection de la liste en favoris
        Lorsque je clique sur le bouton possédant l'ID "listFavoriteButton"
        Alors la notification "La liste 'testing' n'est plus en favoris." est visible

    Scénario: suppression d'une liste: affichage de la popup
        Lorsque je clique sur le bouton possédant l'ID "deleteListButton"
        Alors la popup "Suppression d'une liste" est visible

    Scénario: suppression d'une liste: affichage de la popup
        Lorsque je clique sur le bouton possédant l'ID "cancelPopupButton"
        Alors la popup "Suppression d'une liste" n'est pas visible

    Scénario: suppression d'une liste
        Lorsque je clique sur le bouton possédant l'ID "deleteListButton"
        Et que je clique sur le bouton possédant l'ID "confirmPopupButton"
        Alors la popup "Suppression d'une liste" n'est pas visible
        Et la notification "La liste 'testing' à bien été supprimée." est visible
        Et la liste 'test' n'est pas visible dans le listage

    Plan du scénario: Ajout de 5 listes + mise en favoris
        Lorsque je clique sur le bouton possédant l'ID "addListButton"
        Et que je saisis "<listText>" dans le champs possédant l'ID "addListInput"
        Et que je valide le champs possédant l'ID "addListInput"
        Alors la notification "<notifText>" est visible
        Et la liste "<listText>" est visible dans le listage

        Lorsque je clique sur le bouton possédant l'ID "listFavoriteButton"
        Alors la notification "<favoriteText>" est visible

        Exemples:
        | listText |           notifText            |               favoriteText              |
        |    test1 | La liste 'test1' a été ajouté. | La liste 'test1' a été mise en favoris. |
        |    test2 | La liste 'test2' a été ajouté. | La liste 'test2' a été mise en favoris. |
        |    test3 | La liste 'test3' a été ajouté. | La liste 'test3' a été mise en favoris. |
        |    test4 | La liste 'test4' a été ajouté. | La liste 'test4' a été mise en favoris. |
        |    test5 | La liste 'test5' a été ajouté. | La liste 'test5' a été mise en favoris. |

    @Deconnexion
    @Close_browser
    Scénario: Ajout d'une sixième liste + mise en favoris erreur: 5 max
        Lorsque je clique sur le bouton possédant l'ID "addListButton"
        Et que je saisis "test6" dans le champs possédant l'ID "addListInput"
        Et que je valide le champs possédant l'ID "addListInput"
        Et que la liste "test6" est visible dans le listage
        Et que je clique sur le bouton possédant l'ID "listFavoriteButton"
        Alors la notification "Nombre de listes en favoris atteint (5 maximum)." est visible