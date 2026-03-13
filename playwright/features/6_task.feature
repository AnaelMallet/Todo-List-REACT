#language: fr

Fonctionnalité: Manipulation des tâches

    @Open_browser
    Scénario: Vérification de la connexion: affichage du listage des tâches d'une liste refusé (pas connecté)
        Etant donné que je suis déconnecté
        Alors l'élément possédant l'ID "notConnectedTaskText" avec le texte "Connectez-vous pour voir vos tâches." est visible

    @Navigation_login_page
    @Login
    Scénario: Vérification de la sélection d'une liste
        Etant donné que je suis connecté
        Mais que je n'est pas sélectionné de liste
        Alors l'élément possédant l'ID "notselectedListText" avec le texte "Selectionnez une liste pour voir ces tâches associées." est visible

    Scénario: Vérification de la connexion: affichage du listage des tâches
        Lorsque je sélectionne la liste "test"
        Alors le listage des tâches de la liste est visible

    Scénario: affichage du listage des tâches: listage vide
        Etant donné que le listage des tâches de la liste est visible
        Mais qu'il n'y a aucune tâche de créée
        Alors l'élément possédant l'ID "emptylistingTaskText" avec le texte "...Aucune tâche pour le moment." est visible

    Scénario: affichage du formulaire d'ajout d'une tâche
        Etant donné que le listage des tâches de la liste est visible
        Lorsque je clique sur le bouton possédant l'ID "addTaskButton"
        Alors le formulaire d'ajout d'une tâche est visible

    Scénario: disparition du formulaire d'ajout d'une tâche
        Etant donné que le formulaire d'ajout d'une tâche est visible
        Lorsque je clique sur le bouton possédant l'ID "taskCancelButton"
        Alors le formulaire d'ajout d'une tâche n'est pas visible

    Scénario: ajout d'une tâche
        Lorsque je clique sur le bouton possédant l'ID "addTaskButton"
        Et que je saisis "task title" dans le champs possédant l'ID "taskTitleInput"
        Et que je saisis "task description" dans le champs possédant l'ID "taskDescriptionInput"
        Et que je clique sur le bouton possédant l'ID "taskSubmitButton"
        Alors le formulaire d'ajout d'une tâche n'est pas visible
        Et la notification "La tâche 'task title' à bien été ajouté à la liste 'test'." est visible
        Et la tâche "task title" est visible

    Scénario: Affichage de la popup de modification d'une tâche
        Lorsque je clique sur le bouton possédant l'ID "taskPopoverButton"
        Alors la popup d'option de la tâche est visible

    Scénario: modification d'une tâche
        Lorsque je clique sur le bouton possédant l'ID "taskUpdateButton"
        Et que je saisis "task title updated" dans le champs possédant l'ID "taskTitleInput"
        Et que je clique sur le bouton possédant l'ID "taskSubmitButton"
        Alors la notification "La tâche a été correctement modifié." est visible
        Et la tâche "task title updated" est visible

    Scénario: mise en statut terminé d'une tâche
        Etant donné que la tâche "task title updated" n'est pas terminé
        Lorsque je clique sur le bouton possédant l'ID "taskPopoverButton"
        Et que je clique sur le bouton possédant l'ID "taskDoneButton"
        Alors la notification "La tâche 'task title updated' est terminée." est visible
        Et la tâche "task title updated" est terminé

    Scénario: désélection du statut terminé d'une tâche
        Etant donné que la tâche "task title updated" est terminé
        Lorsque je clique sur le bouton possédant l'ID "taskPopoverButton"
        Et que je clique sur le bouton possédant l'ID "taskDoneButton"
        Alors la notification "La tâche 'task title updated' n'est pas terminée." est visible
        Et la tâche "task title updated" n'est pas terminé

    Scénario: suppression d'une tâche: affichage de la popup
        Lorsque je clique sur le bouton possédant l'ID "taskPopoverButton"
        Et que je clique sur le bouton possédant l'ID "taskDeleteButton"
        Alors la popup "Suppression d'une tâche" est visible
    
    @Logout
    @Close_browser
    Scénario: suppression d'une tâche
        Lorsque je clique sur le bouton possédant l'ID "confirmPopupButton"
        Alors la popup "Suppression d'une tâche" n'est pas visible
        Et la notification "La tâche 'task title updated' à bien été supprimée." est visible
        Et la tâche "task title updated" n'est pas visible