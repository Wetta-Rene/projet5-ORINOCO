////////////////////////////////////////////////////// AFFICHAGE CONTENU DU HEADER ////////////////////////////////////////////////////
        var contenuHeader = fonctionAffichageHeader();
        document.getElementById("header").innerHTML = contenuHeader;
        ///////////////////////////////////////////////////////////  END /////////////////////////////////////////////////////////////////

        /////////////////  MESSAGE PANIER ////////////////////////

        affichageMessageFlash(); // on affiche un message si besoin

        ///////////////////////////////////////////////////////////  

        // -------------------------------------------------------------------------------------------------------------------- //
        ///////////////////////////////////////////////////////////  PANIER  /////////////////////////////////////////////////////

        if (JSON.parse(localStorage.getItem("panier") === "vide")) { //panier vide 
            /////////////////////////  MESSAGE PANIER ///////////////////////////////////////////

            affichageMessageFlash(); // on affiche un message si besoin

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
            document.getElementById("resultatsPanier").innerHTML = 
                '<div class="messagePanierVide">'+
                    '<p>Oupss, il n\'y a rien dans le panier... </p>'+
                    '<p><a href="index.html"> Allez voir notre catalogue ! </a></p>'+
                    '<p><i class="fas fa-arrow-alt-circle-down"></i></p>'+
                '</div>';
            document.getElementById("contactPanier").innerHTML = 
                '<article class="messagePanierVide">'+
                    '<a href="index.html"><i class="far fa-folder-open"></i></a>'+
                '</article>';


        } else { // panier pas vide
            var produitsLocal = JSON.parse(localStorage.getItem("panier")); // on recupere le panier en local

            for (let x in produitsLocal) { // on balaye le contenu du panier
                var ligneProduitLocal = produitsLocal[x]; //>> recherche  ligneProduitLocal.nom

                // variation quantite - ou supprimer a l'affichage
                var signeMoinsPanier = "";
                var plusOuMoins = String("moins");
                if (ligneProduitLocal.quantite > 1) {
                    signeMoinsPanier = '<div class="sousElement-lignePanier"><button class="boutonPanierQuantite" onclick="fonctionQuantiteMoins(\'' + ligneProduitLocal.reference + '\')">Qte: -1</button></div>';
                } else {
                    signeMoinsPanier = '<div class="sousElement-lignePanier"><button class="boutonPanierQuantite" onclick="fonctionDelete(' + x + ')">Supprimer du panier</button></div>';
                }

                // creation ligne produit
                let ligne =
                    '<article class="ContenairePanier">'+
                        '<div class="contenaireLignePanier">'+
                            '<div class="element-lignePanier"><img src="' + ligneProduitLocal.urlImage + '" title="' + ligneProduitLocal.reference + '"></div>'+
                            '<div class="element-lignePanier">'+
                                '<div class="element-optionPanier">' + ligneProduitLocal.nom + '</div>'+
                                '<div class="element-optionPanier"><b>Option: </b>' + ligneProduitLocal.option + '</div>'+
                            '</div>'+
                            '<div class="element-lignePanier">' + ligneProduitLocal.description + '</div>'+
                            '<div class="element-lignePanier"><b>Prix U:</b><br/>' + transformPrice(ligneProduitLocal.prixUnitaire) + '</div>'+
                            '<div class="element-lignePanier"><b>Qté:</b><br/>' + ligneProduitLocal.quantite + '</div>'+
                            '<div class="element-lignePanier"><b>Prix total:</b><br/>' + transformPrice(ligneProduitLocal.prixAjour) + '</div>'+
                            '<div class="element-lignePanier">'+
                            '<div class="sousElement-lignePanier"><button class="boutonPanierQuantite" onclick="fonctionQuantitePlus(\'' + ligneProduitLocal.reference + '\')">Qte: +1</button></div>' + signeMoinsPanier + '</div>'+
                        '</div>'+
                    '</article>';

                //affichage du panier sur le html
                document.getElementById("resultatsPanier").innerHTML += ligne;
            } // fin for produilocal


            //
            const totalDesArticlesDuPanier = functionCalculArticlesDuPanier(); // on fait le calcul des articles
            ///// articles au pluriel ou pas //////////////////
            if (totalDesArticlesDuPanier > 1) { // mettre S a article ou pas
                plurielArticleBoutonPanier = "articles";
            } else {
                plurielArticleBoutonPanier = "article";
            }
            const prixTotalDuPanier = functionCalculPrixTotalDuPanier(); // on fait le calcul total des prix du panier
            document.getElementById("totauxPanier").innerHTML = 'Il y a ' + totalDesArticlesDuPanier + ' ' + plurielArticleBoutonPanier + ' dans le panier pour un montant de: ' + transformPrice(prixTotalDuPanier) + ' Euro';
            ///////////////////////////////////////////////////// END SOUS PARTIE PANIER /////////////////////////////////////////////////////////////////////////


            //////////////////////////////////////////////////// PARTIE COMMANDE/CONTACT //////////////////////////////////////////////////////////////
            let partieContact =
                '<article class="elementPanier">'+
                    '<fieldset>'+
                        '<legend> Pour passer commande </legend>'+
                            '<form name="formContact" id="idFormContact" onsubmit="return fonctionSubmitContact()">'+
                                '<div class="element-form"><label>Nom*:</label></div>'+
                                    '<div class="element-form"><label><input type="text" name="nom" id="nom" class="decoInputContact" pattern="^[A-Z]+$" maxlenght="20" placeholder="Tout en MAJUSCULE !" required></label></div>'+
                                '<div class="element-form"><label>Prénom*:</label></div>'+
                                    '<div class="element-form"><label><input type="text" name="prenom" id="prenom" pattern="^[A-ZÀÁÂÃÄÅÇÑñÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ]{1}[a-zçàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ]+$" maxlength="25" class="decoInputContact" placeholder="1 majuscule au début..." required></label></div>'+
                                '<div class="element-form"><label>Adresse*:</label></div>'+
                                    '<div class="element-form"><label><input type="text" name="adresse" id="adresse" class="decoInputContact" placeholder="Numéro rue " maxlength="60" required></label></div>'+
                                '<div class="element-form">CP*:</div>'+
                                    '<div class="element-form"><label><input type="text" name="codePostal" id="codePostal" class="decoInputContact" pattern="[0-9]{5}" maxlength="5" placeholder="5 chiffres !" required></label></div>'+
                                '<div class="element-form"><label>Ville*:</label></div>'+
                                    '<div class="element-form"><label><input type="text" name="ville" id="ville" class="decoInputContact" pattern="^[A-ZÀÁÂÃÄÅÇÑñÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ]+$" maxlength="30" placeholder="Tout en MAJUSCULE !"  required></label></div>'+
                                '<div class="element-form"><label>Email*:</label></div>'+
                                    '<div class="element-form"><label><input type="email" name="mail" id="email" class="decoInputContact" placeholder="Une adresse email !"required></label></div>'+
                                '<div id="inputContact">'+
                                    '<input type="hidden" name="actionPanier" value="eCommande">'+
                                    '<input type="submit" value="Envoyer la commande" id="bouton_envoi">'+
                                '</div>'+
                            '</form>'+
                            '<p id="important">* Champs obligatoire.</p>'+
                    '</fieldset>'+
                '</article>';
            document.getElementById("contactPanier").innerHTML = partieContact;

        } // FIN DU ELSE PANIER VIDE

        //////////////////////////////////////////// FIN DU PANIER PLEIN ////////////////////////////////////////