/**
 * 
 * - UTILISATION: {
 *    Lors de la connexion utilisateur, le endpoint graphql /login est appelé.
 *    Cela crée un token accessToken d'une durée de 1 jour que l'on stocke en BDD.
 *    Ensuite une requête /me est envoyé toute les 10 secs pour savoir si l'utilisateur
 *    est connecté ou non en fonction de la validité du token OU si le token
 *    est présent en BDD.
 * 
 *    Parallellement a cela on crée un context User pour stocker diverse infos servant
 *    a savoir si le user est connecté ou non (isLogged true/false par exemple) et l'uuid
 *    du user pour les requêtes ayant desoin d'un contexte user.
 * }
 * 
 * - Faire le endpoint graphql "/login"
 *    => Vérifier si les infos renseigner par le user sont correctes (email exisitant + mdp associé valide)
 *    => Créer l'accessToken et le stocker en BDD (associé au user)
 * 
 * - Connecter le formulaire de connexion avec le endpoint "/login"
 * 
 * - Créer le contexte user
 *    => Bool IsLogged savoir si le user est connecté ou non en fonction de la réponse
 *       a la requête "/me".
 *    => String uuid pour stocker l'uuid du user
 *    => Function Me pour la requête "/me"
 * 
 *  - 
 */