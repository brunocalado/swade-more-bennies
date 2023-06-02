const moduleName = 'swade-more-bennies';

Hooks.once('init', () => {
  // call this with: game.settings.get("swade-more-bennies", "restrictedMode")
  game.settings.register(moduleName, "restrictedMode", {
    name: 'Restricted Mode', // 
    hint: 'This will remove the possibility for clients to choose their benny and leave them with the one you choose.', // 
    scope: 'world',
    config: true,
    requiresReload: true,
    type: Boolean,
    default: false
  });  
});

Hooks.once('diceSoNiceReady', (dice3d) => {
  const separator = `¤`;  

  // --------------------------------------------------
  // Bennies List
  /* 
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
  Ghost Trap
  Goblin
  Grenade  
  Grenade 2
  Halloween Pumpkin
  Helmet - World War
  Horseshoe  
  Lightsaber
  Mushroom
  Pizza
  Poker Chip
  POW
  Sci-Fi Card
  Shard - Blue
  Shard - Dark Blue
  Shard - Green
  Shard - Pink 
  Shard - Yellow
  Skull  
  SWPF - Sarenrae
  Ring - That One
  UFO  
  Turtle - Ninja
  Turtle - Shell
  UFO
  Zombie
  */
  
  const models = [
    {
      id: "benny-boxing_glove",
      name: `${separator}  Boxing Glove`,
      fileName: 'boxing_glove.glb'      
    },    
    {
      id: "benny-bomb",
      name: `${separator} Bomb - Animated`,
      fileName: 'bomb.glb'      
    },  
    {
      id: "benny-bullet",
      name: `${separator} Bullet`,
      fileName: 'bullet.glb'      
    },
    {
      id: "benny-animated-bullet",
      name: `${separator} Bullet - Animated`,
      fileName: 'bullet_animated.glb'      
    },
    {
      id: "benny-bullet-case",
      name: `${separator} Bullet Case`,
      fileName: 'bullet_case.glb'      
    },
    {
      id: "benny-capybara",
      name: `${separator} Capybara`,
      fileName: 'capybara.glb'      
    },        
    {
      id: "benny-cheese",
      name: `${separator} Cheese`,
      fileName: 'cheese.glb'      
    },    
    {
      id: "benny-poker_chip",
      name: `${separator} Poker Chip`,
      fileName: 'poker_chip.glb'      
    },            
    {
      id: "benny-coin",
      name: `${separator} Coin`,
      fileName: 'coin.glb'      
    },    
    {
      id: "benny-crystal-heart",
      name: `${separator} Crystal Heart`,
      fileName: 'crystal_heart.glb'      
    },
    {
      id: "benny-crystal_heart-animated",
      name: `${separator} Crystal Heart - Animated`,
      fileName: 'crystal_heart_animated.glb'      
    },
    {
      id: "benny-crystal_heart2-animated",
      name: `${separator} Crystal Heart 2 - Animated`,
      fileName: 'crystal_heart_2.glb'      
    },    
    {
      id: "benny-dynamite",
      name: `${separator} Dynamite`,
      fileName: 'dynamite.glb'      
    },    
    {
      id: "benny-gear",
      name: `${separator} Gear`,
      fileName: 'gear.glb'      
    },
    {
      id: "benny-ghost_trap",
      name: `${separator} Ghost Trap`,
      fileName: 'ghost_trap.glb'      
    },    
    {
      id: "benny-goblin",
      name: `${separator} Goblin`,
      fileName: 'goblin.glb'      
    },
    {
      id: "benny-grenade",
      name: `${separator} Grenade`,
      fileName: 'grenade.glb'      
    },
    {
      id: "benny-grenade2",
      name: `${separator} Grenade 2`,
      fileName: 'grenade2.glb'      
    },
    {
      id: "benny-halloween-pumpkin",
      name: `${separator} Halloween Pumpkin`,
      fileName: 'halloween-pumpkin.glb'      
    },    
    {
      id: "benny-helmet-world-war",
      name: `${separator} Helmet - World War`,
      fileName: 'helmet.glb'      
    },    
    {
      id: "benny-horseshoe",
      name: `${separator} Horseshoe`,
      fileName: 'horseshoe.glb'      
    },        
    {
      id: "benny-lightsaber",
      name: `${separator} Lightsaber`,
      fileName: 'lightsaber.glb'      
    },     
    {
      id: "benny-mushroom",
      name: `${separator} Mushroom`,
      fileName: 'mushroom.glb'      
    },        
    {
      id: "benny-pizza",
      name: `${separator} Pizza`,
      fileName: 'pizza.glb'      
    },     
    {
      id: "benny-pow",
      name: `${separator} POW`,
      fileName: 'pow.glb'      
    },    
    {
      id: "benny-scifi-card",
      name: `${separator} Sci-Fi Card`,
      fileName: 'scifi_card.glb'      
    },
    {
      id: "benny-grenade2",
      name: `${separator} Grenade 2`,
      fileName: 'grenade2.glb'      
    },
    {
      id: "benny-shard-pink",
      name: `${separator} Shard - Pink`,
      fileName: 'shard_pink.glb'      
    },
    {
      id: "benny-shard-blue",
      name: `${separator} Shard - Blue`,
      fileName: 'shard_blue.glb'      
    },
    {
      id: "benny-shard-dark-blue",
      name: `${separator} Shard - Dark Blue`,
      fileName: 'shard_dark_blue.glb'      
    },
    {
      id: "benny-shard-yellow",
      name: `${separator} Shard - Yellow`,
      fileName: 'shard_yellow.glb'      
    },
    {
      id: "benny-shard-green",
      name: `${separator} Shard - Green`,
      fileName: 'shard_green.glb'      
    },           
    {
      id: "benny-skull",
      name: `${separator} Skull`,
      fileName: 'skull.glb'      
    },   
    {
      id: "benny-swpf_sarenrae",
      name: `${separator} SWPF - Sarenrae`,
      fileName: 'swpf_sarenrae.glb'      
    },           
    {
      id: "one-ring",
      name: `${separator} Ring - That One`,
      fileName: 'one-ring.glb'      
    },    
    {
      id: "benny-turtle-ninja",
      name: `${separator} Turtle - Ninja`,
      fileName: 'turtle_ninja.glb'
    },    
    {
      id: "benny-turtle-shell",
      name: `${separator} Turtle - Shell`,
      fileName: 'turtle_shell.glb'
    },    
    {
      id: "benny-ufo",
      name: `${separator} UFO - Animated`,
      fileName: 'ufo.glb'      
    },
    {
      id: "zombie",
      name: `${separator} Zombie`,
      fileName: 'zombie.glb'      
    }    
  ];
 
  // --------------------------------------------------
  // 
  if (!game.settings.get("swade-more-bennies", "restrictedMode")) {
    for (let model of models) {
      dice3d.addSystem({id: model.id, name: model.name }, false);
      
      dice3d.addDicePreset({
        type:"db",
        system: model.id, 
        modelFile: 'modules/' + moduleName + '/models/' + model.fileName    
      });
    }    
  } else {
    const choices = {};
    for (const model of models) {
      choices[model.id] = model.name;
    }
    
    // Register Setting
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
        const currentModelID = game.settings.get("swade-more-bennies", "selectedBenny")
        const newModel = models.find((m) => m.id === currentModelID);
        if (currentModelID) {
          delete game.dice3d.DiceFactory.systems[currentModelID];
        }
        
        // Add model
        dice3d.addSystem({ id: newModel.id, name: newModel.name }, false);
        dice3d.addDicePreset({
          type: "db",
          system: newModel.id,
          modelFile: 'modules/' + moduleName + '/models/' + newModel.fileName
        });

        //DSN stores the user's selected preset as a flag. This clears it and sets it with the new one.
        for (const user of game.users) {
          await user.unsetFlag("dice-so-nice", "appearance.db");
          await user.setFlag('dice-so-nice', 'appearance.db', { 'system': value });
        }
      }
    });

    // Get the currently selected model and register it.
    const modelId = game.settings.get("swade-more-bennies", "selectedBenny");
    if (modelId) {
      const model = models.find((m) => m.id === modelId);
      dice3d.addSystem({ id: model.id, name: model.name }, false);
      dice3d.addDicePreset({
        type: "db",
        system: model.id,
        modelFile: 'modules/' + moduleName + '/models/' + model.fileName
      });
    }
    
  } // END MAIN ELSE
  
});
