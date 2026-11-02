# AWA1 — squelette de projet individuel

## Prérequis

Node.js LTS, npm, éditeur de code et navigateur.

## Démarrage

Dans le dossier `CookingCraft` :

1. Installer les dépendances : `npm install`
2. Terminal 1 : `npm run server` (API à `http://localhost:3001/api/items`)
3. Terminal 2 : `npm run dev` (ouvrir l’URL Vite affichée)

Le projet utilise Vue 3 et le plugin Vite `@vitejs/plugin-vue`, déclaré dans `package.json` et activé dans `vite.config.js`.

**Si une ancienne version a déjà été installée :** après avoir remplacé les fichiers, exécuter `npm install` de nouveau, puis redémarrer Vite. Pas besoin de supprimer `node_modules` sauf si l'installation reste incohérente.

# Cadrage du projet — CookingCraft

## 1. Public cible & Besoin
- **Public cible** : Joueurs de Minecraft, geeks gourmands et familles cherchant à cuisiner des plats ludiques et réels inspirés de l'univers du jeu.
- **Besoin** : Trouver des recettes de cuisine bien réelles adaptées des plats emblématiques de Minecraft, visualiser la passerelle entre les ingrédients du jeu et ceux de sa cuisine, et suivre la préparation étape par étape sans quitter le plan de travail.

## 2. Jeu de données
Chaque recette de l'API contient :
- `id` : identifiant (ex. `minecraft-cake`, `suspicious-stew`, `pumpkin-pie`)
- `name` : nom du plat
- `category` : Pâtisserie, Plats chauds, En-cas, Boissons / Potions
- `difficulty` : Facile, Moyen, Chef
- `prepTime` : temps de préparation (en minutes)
- `hungerPoints` : nombre de cuisses de gigot restaurées dans le jeu (1 à 10)
- `minecraftGrid` : les ingrédients nécessaires dans l'établi 3x3 (ex. 3 seaux de lait, 2 sucres, 1 œuf, 3 blés)
- `realIngredients` : liste des vrais ingrédients de cuisine avec quantités (ex. 250g de farine, 3 œufs, 100g de sucre...)
- `steps` : étapes de préparation réelles
- `isSecret` : quelques recettes farfelues débloquables (ex. *Pomme dorée*)

## 3. Scénario utilisateur
1. **Explorer & Filtrer** : Filtrer les recettes par catégorie (sucré/salé), temps de préparation ou difficulté.
2. **Double vue (Jeu vs Cuisine)** : Sur la fiche détaillée, basculer entre la table de craft 3x3 de Minecraft et la liste des vrais ingrédients de cuisine.
3. **Mode Cuisinier** : Suivre les étapes de préparation avec un minuteur intégré et des cases à cocher pour les ingrédients déjà pesés.

## 4. Intentions d'animations (Le mouvement résout un problème)
1. **Liste de courses interactive & Clavier** :
   - Quand on coche un ingrédient au clavier ou à la souris, la ligne est barrée avec une transition et une coche verte s'anime (*Permet au cuisinier de savoir où il en est dans sa pesée sans perdre le fil*).
2. **Barre de faim / Jauge d'énergie** :
   - Les fameuses cuisses de gigot (barre de faim Minecraft) en SVG inline : elles s'animent et se remplissent selon le pouvoir nourrissant du plat sélectionné (*Traduit visuellement la valeur calorique/nutritive sans forcer à lire des chiffres*).
3. **Minuteur de cuisson** :
   - Démarrer le chronomètre de cuisson déclenche une pulsation d'un fourneau SVG avec un effet de braise incandescente (*Indicateur d'activité en cours sans quitter la page*).
4. **Métamorphose : Du Craft au Plat réel** :
   - Au clic sur « Cuisiner », les blocs de l'établi 3x3 se retournent ou s'écartent en séquence ordonnée pour laisser place à la photo/fiche de la vraie recette prête à être dégustée (*Explique visuellement la conversion des ingrédients virtuels en ingrédients réels*).
5. **Défilement du pas-à-pas** :
   - Les étapes de la recette s'illuminent une à une lors du défilement de la page, gardant en surbrillance l'étape actuellement lue (*Évite de se tromper d'étape quand on a les mains sales en cuisine*).