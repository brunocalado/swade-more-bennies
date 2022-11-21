const moduleName = 'swade-more-bennies';

Hooks.once('diceSoNiceReady', (dice3d) => {

  /* Bennies List
  Boxing Glove
  Bullet
  Bullet - Animated
  Bullet Case
  Capybara
  Cheese
  Coin
  Crystal Heart
  Crystal Heart - Animated
  Crystal Heart 2 - Animated
  Dynamite
  Gear
  Goblin
  Grenade
  Grenade 2
  Helmet - World War
  Horseshoe
  Mushroom
  POW
  Sci-Fi Card
  Shard - Blue
  Shard - Dark Blue
  Shard - Green
  Shard - Pink
  Shard - Yellow
  Skull
  Ring - That One
  UFO
  */

  const models = [
    {
      id: "benny-boxing_glove",
      name: 'Boxing Glove',
      fileName: 'boxing_glove.glb'
    },
    {
      id: "benny-bomb",
      name: 'Bomb - Animated',
      fileName: 'bomb.glb'
    },
    {
      id: "benny-bullet",
      name: 'Bullet',
      fileName: 'bullet.glb'
    },
    {
      id: "benny-animated-bullet",
      name: 'Bullet - Animated',
      fileName: 'bullet_animated.glb'
    },
    {
      id: "benny-bullet-case",
      name: 'Bullet Case',
      fileName: 'bullet_case.glb'
    },
    {
      id: "benny-capybara",
      name: 'Capybara',
      fileName: 'capybara.glb'
    },
    {
      id: "benny-cheese",
      name: 'Cheese',
      fileName: 'cheese.glb'
    },
    {
      id: "benny-coin",
      name: 'Coin',
      fileName: 'coin.glb'
    },
    {
      id: "benny-crystal-heart",
      name: 'Crystal Heart',
      fileName: 'crystal_heart.glb'
    },
    {
      id: "benny-crystal_heart-animated",
      name: 'Crystal Heart - Animated',
      fileName: 'crystal_heart_animated.glb'
    },
    {
      id: "benny-crystal_heart2-animated",
      name: 'Crystal Heart 2 - Animated',
      fileName: 'crystal_heart_2.glb'
    },
    {
      id: "benny-dynamite",
      name: 'Dynamite',
      fileName: 'dynamite.glb'
    },
    {
      id: "benny-gear",
      name: 'Gear',
      fileName: 'gear.glb'
    },
    {
      id: "benny-goblin",
      name: 'Goblin',
      fileName: 'goblin.glb'
    },
    {
      id: "benny-grenade",
      name: 'Grenade',
      fileName: 'grenade.glb'
    },
    {
      id: "benny-grenade2",
      name: 'Grenade 2',
      fileName: 'grenade2.glb'
    },
    {
      id: "benny-helmet-world-war",
      name: 'Helmet - World War',
      fileName: 'helmet.glb'
    },
    {
      id: "benny-horseshoe",
      name: 'Horseshoe',
      fileName: 'horseshoe.glb'
    },
    {
      id: "benny-mushroom",
      name: 'Mushroom',
      fileName: 'mushroom.glb'
    },
    {
      id: "benny-pow",
      name: 'POW',
      fileName: 'pow.glb'
    },
    {
      id: "benny-scifi-card",
      name: 'Sci-Fi Card',
      fileName: 'scifi_card.glb'
    },
    {
      id: "benny-grenade2",
      name: 'Grenade 2',
      fileName: 'grenade2.glb'
    },
    {
      id: "benny-shard-pink",
      name: 'Shard - Pink',
      fileName: 'shard_pink.glb'
    },
    {
      id: "benny-shard-blue",
      name: 'Shard - Blue',
      fileName: 'shard_blue.glb'
    },
    {
      id: "benny-shard-dark-blue",
      name: 'Shard - Dark Blue',
      fileName: 'shard_dark_blue.glb'
    },
    {
      id: "benny-shard-yellow",
      name: 'Shard - Yellow',
      fileName: 'shard_yellow.glb'
    },
    {
      id: "benny-shard-green",
      name: 'Shard - Green',
      fileName: 'shard_green.glb'
    },
    {
      id: "benny-skull",
      name: 'Skull',
      fileName: 'skull.glb'
    },
    {
      id: "one-ring",
      name: 'Ring - That One',
      fileName: 'one-ring.glb'
    },
    {
      id: "benny-ufo",
      name: 'UFO - Animated',
      fileName: 'ufo.glb'
    }
  ];

  const choices = {};
  for (const model of models) {
    choices[model.id] = model.name;
  }

  game.settings.register(moduleName, 'selectedBenny', {
    name: "Select a Benny",
    hint: "Choose a Benny to use for this world.",
    scope: "world",
    config: true,
    requiresReload: true,
    type: String,
    choices: choices,
    default: "",
    onChange: async (value) => {
      const currentModelID = game.settings.get(moduleName, 'selectedBenny');
      const newModel = models.find((m) => m.id === currentModelID);
      if (currentModelID) {
        delete game.dice3d.DiceFactory.systems[currentModelID];
      }
      dice3d.addSystem({ id: newModel.id, name: newModel.name }, false);
      dice3d.addDicePreset({
        type: "db",
        system: newModel.id,
        modelFile: 'modules/' + moduleName + '/models/' + newModel.fileName
      });

      for (const user of game.users) {
        await user.unsetFlag("dice-so-nice", "appearance.db");
        await user.setFlag('dice-so-nice', 'appearance.db', { 'system': value });
      }
    }
  });

  // Get the currently selected model and register it.
  const modelId = game.settings.get(moduleName, 'selectedBenny');
  if (modelId) {
    const model = models.find((m) => m.id === modelId);
    dice3d.addSystem({ id: model.id, name: model.name }, false);
    dice3d.addDicePreset({
      type: "db",
      system: model.id,
      modelFile: 'modules/' + moduleName + '/models/' + model.fileName
    });
  }
});
