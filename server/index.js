import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const recipes = [
  {
    id: 'minecraft-cake',
    name: 'Gâteau Minecraft Traditionnel',
    category: 'Pâtisserie',
    difficulty: 'Chef',
    prepTime: 45,
    hungerPoints: 7,
    minecraftGrid: [
      'milk_bucket', 'milk_bucket', 'milk_bucket',
      'sugar',       'egg',         'sugar',
      'wheat',       'wheat',       'wheat'
    ],
    realIngredients: [
      '300g de farine de blé',
      '3 gros œufs frais',
      '200ml de lait entier',
      '150g de sucre en poudre',
      'Glaçage royal blanc et pâte de fruits rouge'
    ],
    steps: [
      'Préchauffer le four à 180°C (350°F) et beurrer deux moules carrés de 20cm.',
      'Tamiser la farine avec le sucre, incorporer les œufs et le lait au fouet.',
      'Enfourner 35 minutes puis recouvrir du glaçage pixel rouge et blanc.'
    ]
  },
  {
    id: 'suspicious-stew',
    name: 'Soupe Suspecte aux Champignons',
    category: 'Plats chauds',
    difficulty: 'Facile',
    prepTime: 20,
    hungerPoints: 6,
    minecraftGrid: [
      null,          'red_mushroom',   null,
      null,          'brown_mushroom', null,
      'cornflower',  'bowl',           null
    ],
    realIngredients: [
      '250g de champignons de Paris émincés',
      '150g de cèpes ou shiitakés',
      '1 oignon moyen émincé',
      '400ml de bouillon de légumes chaud',
      'Pétales de bleuet comestibles'
    ],
    steps: [
      'Faire suer les oignons et les champignons dans une casserole avec du beurre.',
      'Mouiller avec le bouillon et laisser mijoter 15 minutes.',
      'Mixer finement et servir dans un bol en bois garni de fleurs de bleuet.'
    ]
  },
  {
    id: 'pumpkin-pie',
    name: 'Tarte à la Citrouille d’Automne',
    category: 'Pâtisserie',
    difficulty: 'Moyen',
    prepTime: 40,
    hungerPoints: 8,
    minecraftGrid: [
      null,      null,      null,
      'pumpkin', 'sugar',   'egg',
      null,      null,      null
    ],
    realIngredients: [
      '1 pâte brisée pur beurre',
      '400g de purée de courge ou citrouille',
      '100g de sucre roux',
      '2 œufs battus',
      '1 cuillère à café d’épices à pain d’épices'
    ],
    steps: [
      'Fouetter la purée de citrouille avec les œufs, le sucre et les épices.',
      'Verser la préparation sur le fond de tarte préalablement piqué.',
      'Cuire 40 minutes à 180°C jusqu’à ce que le centre soit pris.'
    ]
  },
  {
    id: 'golden-apple',
    name: 'Pomme Dorée Caramélisée',
    category: 'En-cas',
    difficulty: 'Facile',
    prepTime: 15,
    hungerPoints: 4,
    minecraftGrid: [
      'gold_ingot', 'gold_ingot', 'gold_ingot',
      'gold_ingot', 'apple',      'gold_ingot',
      'gold_ingot', 'gold_ingot', 'gold_ingot'
    ],
    realIngredients: [
      '4 belles pommes Golden ou Gala',
      '200g de sucre cristal',
      '50g de beurre demi-sel',
      'Paillettes d’or alimentaire comestibles'
    ],
    steps: [
      'Faire fondre le sucre en caramel doré sans remuer.',
      'Ajouter le beurre hors du feu pour obtenir un caramel soyeux.',
      'Tremper les pommes piquées sur bâtonnet et saupoudrer d’or alimentaire.'
    ]
  }
];

// Route 1 : Liste complète
app.get('/api/items', (_req, res) => {
  res.json(recipes);
});

// Route 2 : Détail par ID avec validation et erreur 404
app.get('/api/items/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ error: `Recette '${req.params.id}' introuvable.` });
  }
  res.json(recipe);
});

app.listen(3001, () => {
  console.log('API CookingCraft active sur http://localhost:3001/api/items');
});