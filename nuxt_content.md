# Nuxt Content

Nuxt Content est un module qui permet de lire du contenu Markdown, JSON, YAML, XML et CSV directement dans Nuxt via des appels à une API interne. Il existe déjà d'autres projets comme VuePress, Gridsome, Gatsby (React) et Hugo (Go) et pleins d'autres...

## Installation

On part d'une installation from scratch de Nuxt.

`npx create-nuxt-app nuxt_cooking`

Lors de l'étape **Nuxt.js modules**, sélectionnez "Content".

Versions utilisées lors de la rédaction.

```javascript
"dependencies": {
  "@nuxt/content": "^1.10.0",
  "nuxt": "^2.14.7"
  },
"devDependencies": {
  "@nuxtjs/tailwindcss": "^2.1.0",
}
```

Post installation, lancez le projet en vous placant dans le projet `cd nuxt_cooking` afin d'exécuter le serveur de devéloppement `npm run dev`.

La page [http://localhost:3000](http://localhost:3000) est accessible.

Remarque : il est tout à fait possible de rajouter Nuxt Content dans un projet déjà existant via la commande `npm i @nuxt/content`.

## Préparation des fichiers de données

Les données seront stockées dans des fichiers Markdown. Chaque fichier contient une recette de cuisine.

Dans le frontmatter, on nomme un titre, une liste d'ingrédients et une liste d'instructions.

Exemple d'une recette en 1 seule étape :

```md
---
title: "Crêpes"
ingredients:
  - list:
    - 2 tasses de farine (ou 1 tasse de farine + 1 tasse de Maïzena)
    - 2 oeufs
    - 3 tasses de lait
directions:
  - list:
    - Versez dans le robot mixeur tous les ingrédients sauf le lait. Ne mettez qu’une tasse.
    - Mettez en marche le robot et ajoutez le reste du lait au fur et à mesure du mixage.
    - Faites chauffer la crêpière avec de l’huile.

---

Au robot mixeur, parce que sans grumeaux, c’est plus
délicieux...
```

Exemple d'une recette en plusieurs étapes :

```md
---
title: Petits carrés aux amandes caramélisées
ingredients:
  - step: Pour le biscuit (shortbread)
    list:
      - 115 g de beurre (mou)
      - 50 g de sucre
      - 175 g de farine
  - step: Pour les amandes caramélisées
    list:
      - 1 CàS de crème fraîche (entière)
      - 1 CàS de miel
      - 75 g de beurre
      - 100 g de sucre
      - 125 g d’amandes effilées
directions:
  - step: Préparation du biscuit
    list:
      - Préchauffez le four à 180°C
      - Mélangez le beurre, le sucre et la farine. Puis bien malaxer (avec les mains) la pâte et en faire une boule
      - Posez la pâte au fond d’un moule chemisé beurré et fariné (c’est mieux de mettre du papier de cuisson à la place...). Étalez bien la pâte à l’aide de votre poignet
      - Enfournez pour 15 min (le sablé sera légèrement doré)
  - step: Préparation des amandes caramélisées
    list:
      - Dans une casserole, faites chauffer la crème fraîche, le miel, le beurre et le sucre à feu doux
      - Dès que le mélange est lisse, ajoutez les amandes effilées
      - Répartissez le mélange sur le biscuit et remettez au four 20 minutes à 180°C (jusqu’à ce que les amandes soient dorées)
---

Pour les accros aux amandes.
```

Créez vos fichiers de recettes dans le dossier "content/recipes" avec l'extension ".md".

## API

Dans le dossier "content", il y a un fichier "hello.md" et il y a aussi le dossier "recipes" avec les recettes crées.

Avec votre navigateur, rendez-vous sur la page [http://localhost:3000/_content](http://localhost:3000/_content). Vous pouvez constatez que l'API retourne le fichier "hello.md" dans une liste de données. Ce qui nous intéresse, c'est notre répertoire "recipes". Pour y accéder [http://localhost:3000/_content/recipes](localhost:3000/_content/recipes).

Si mon fichier se nomme "crepes", [http://localhost:3000/_content/recipes/crepes](http://localhost:3000/_content/recipes/crepes) retourne bien le contenu du fichier ainsi que d'autres données relatives au fichier.

Remarque : vous pouvez supprimer le fichier "hello.md".

## Fiche recette

### Appel de l'API

Dans la fonction `asyncData`, on fait appel à notre requête asynchrone pour rechercher la recette via son slug.

```javascript
export default {
  async asyncData({ $content, params }) {
    const recipe = await $content('recipes', params.slug).fetch()

    return { recipe }
  },
}
```

La recette est stockée dans la variable `recipe`.

### Affichage

Ainsi, on peut afficher le contenu de la fiche recette.

```html
<template>
  <article class="container mx-auto py-4">
    <h1 class="text-4xl font-bold leading-tight text-center">
      {{ recipe.title }}
    </h1>
    <nuxt-content :document="recipe" />

    <div class="grid grid-cols-2 gap-4">
      <section>
        <h2 class="text-3xl">Ingrédients</h2>
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <h3 class="text-2xl">{{ ingredient.step }}</h3>
          <ul>
            <li v-for="list in ingredient.list" :key="list">
              {{ list }}
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h2 class="text-3xl">Instructions</h2>
        <div v-for="(direction, index) in recipe.directions" :key="index">
          <h3 class="text-2xl">{{ direction.step }}</h3>
          <ol class="list-decimal ml-4">
            <li v-for="list in direction.list" :key="list">
              {{ list }}
            </li>
          </ol>
        </div>
      </section>
    </div>
  </article>
</template>
```

Pour les parties "ingrédients" et "instructions", on passe par une boucle `v-for`.

### Afficher le titre de la page

A ce stade, on n'a pas de balise title.

```javascript
data() {
  return {
    title: '',
  }
},

mounted() {
  this.title = this.recipe.title
},

head() {
  return {
    title: this.title,
  }
},
```

Remarque : on doit passer par `mounted` d'après [le cycle de Nuxt](https://nuxtjs.org/guides/concepts/nuxt-lifecycle)

## Page d'accueil

Dans la page d'accueil ("pages/index.vue"), nous allons lister l'ensemble des recettes disponibles.

### JavaScript

Dans la partie JavaScript, on appel l'ensemble des recettes avec seulement les champs "title" et "slug" triées par ordre alphabétique que l'on stock dans une variable nommée `recipes`.

```javascript
  async asyncData({ $content, params }) {
    const recipes = await $content('recipes')
      .only(['title', 'slug'])
      .sortBy('title', 'asc') // Trie par ordre alphabétique
      .fetch()

    return { recipes }
  },

  data() {
    return {
      title: 'Recettes',
    }
  },

  head() {
    return {
      title: this.title,
    }
  },
```

On en profite également pour afficher le titre de la page dans une variable `title`.

### Template

On peut ainsi appeler l'ensemble de nos recette dans une boucle `v-for`.

```html
<template>
  <section class="container mx-auto py-4">
    <h1 class="text-4xl font-bold leading-tight text-center">
      {{ title }} ({{ recipes.length }})
    </h1>
    <article>
      <ul>
        <li v-for="(recipe, index) in recipes" :key="index">
          <NuxtLink :to="recipe.slug">{{ recipe.title }}</NuxtLink>
        </li>
      </ul>
    </article>
  </section>
</template>
```

On utilise la propriété `<NuxtLink>` propre à Nuxt pour gérer les liens vers la recette.

## Bonus : édition en live

## Conclusion

Nuxt Content permet de générer rapidement un début de projet sans véritable base de données.

## Sources

- Site officiel Nuxt Content : [https://content.nuxtjs.org](https://content.nuxtjs.org) ;
- Site officiel de Nuxt : [https://nuxtjs.org](https://nuxtjs.org).
