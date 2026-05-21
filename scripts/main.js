import { MODULE_ID } from "./constants.js";

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "restrictedMode", {
    name: "Restricted Mode",
    hint: "This will remove the possibility for clients to choose their benny and leave them with the one you choose.",
    scope: "world",
    config: true,
    requiresReload: true,
    type: Boolean,
    default: false
  });
});

Hooks.once("diceSoNiceReady", (dice3d) => {
  const models = [
    { id: "benny-boxing_glove",          name: "Boxing Glove",            fileName: "boxing_glove.glb" },
    { id: "benny-bomb",                  name: "Bomb - Animated",          fileName: "bomb.glb" },
    { id: "benny-bullet",                name: "Bullet",                   fileName: "bullet.glb" },
    { id: "benny-animated-bullet",       name: "Bullet - Animated",        fileName: "bullet_animated.glb" },
    { id: "benny-bullet-case",           name: "Bullet Case",              fileName: "bullet_case.glb" },
    { id: "benny-capybara",              name: "Capybara",                 fileName: "capybara.glb" },
    { id: "benny-cheese",                name: "Cheese",                   fileName: "cheese.glb" },
    { id: "benny-poker_chip",            name: "Poker Chip",               fileName: "poker_chip.glb" },
    { id: "benny-coin",                  name: "Coin",                     fileName: "coin.glb" },
    { id: "benny-crystal-heart",         name: "Crystal Heart",            fileName: "crystal_heart.glb" },
    { id: "benny-crystal_heart-animated",name: "Crystal Heart - Animated", fileName: "crystal_heart_animated.glb" },
    { id: "benny-crystal_heart2-animated",name: "Crystal Heart 2 - Animated", fileName: "crystal_heart_2.glb" },
    { id: "benny-dynamite",              name: "Dynamite",                 fileName: "dynamite.glb" },
    { id: "benny-gear",                  name: "Gear",                     fileName: "gear.glb" },
    { id: "benny-ghost_trap",            name: "Ghost Trap",               fileName: "ghost_trap.glb" },
    { id: "benny-goblin",                name: "Goblin",                   fileName: "goblin.glb" },
    { id: "benny-golden-snitch",         name: "Golden Snitch",            fileName: "golden-snitch.glb" },
    { id: "benny-grenade",               name: "Grenade",                  fileName: "grenade.glb" },
    { id: "benny-grenade2",              name: "Grenade 2",                fileName: "grenade2.glb" },
    { id: "benny-halloween-pumpkin",     name: "Halloween Pumpkin",        fileName: "halloween-pumpkin.glb" },
    { id: "benny-helmet-world-war",      name: "Helmet - World War",       fileName: "helmet.glb" },
    { id: "benny-horseshoe",             name: "Horseshoe",                fileName: "horseshoe.glb" },
    { id: "benny-lightsaber",            name: "Lightsaber",               fileName: "lightsaber.glb" },
    { id: "benny-mushroom",              name: "Mushroom",                 fileName: "mushroom.glb" },
    { id: "benny-pizza",                 name: "Pizza",                    fileName: "pizza.glb" },
    { id: "benny-pow",                   name: "POW",                      fileName: "pow.glb" },
    { id: "benny-scifi-card",            name: "Sci-Fi Card",              fileName: "scifi_card.glb" },
    { id: "benny-shard-pink",            name: "Shard - Pink",             fileName: "shard_pink.glb" },
    { id: "benny-shard-blue",            name: "Shard - Blue",             fileName: "shard_blue.glb" },
    { id: "benny-shard-dark-blue",       name: "Shard - Dark Blue",        fileName: "shard_dark_blue.glb" },
    { id: "benny-shard-yellow",          name: "Shard - Yellow",           fileName: "shard_yellow.glb" },
    { id: "benny-shard-green",           name: "Shard - Green",            fileName: "shard_green.glb" },
    { id: "benny-skull",                 name: "Skull",                    fileName: "skull.glb" },
    { id: "benny-swpf_sarenrae",         name: "SWPF - Sarenrae",          fileName: "swpf_sarenrae.glb" },
    { id: "benny-swpf_thassilonian_3d_1",name: "SWPF - Sihedron",          fileName: "swpf_thassilonian_3d_1.glb" },
    { id: "one-ring",                    name: "Ring - That One",          fileName: "one-ring.glb" },
    { id: "benny-turtle-ninja",          name: "Turtle - Ninja",           fileName: "turtle_ninja.glb" },
    { id: "benny-turtle-shell",          name: "Turtle - Shell",           fileName: "turtle_shell.glb" },
    { id: "benny-ufo",                   name: "UFO - Animated",           fileName: "ufo.glb" },
    { id: "zombie",                      name: "Zombie",                   fileName: "zombie.glb" }
  ];

  if (!game.settings.get(MODULE_ID, "restrictedMode")) {
    _registerAllBennies(dice3d, models);
  } else {
    _registerRestrictedMode(dice3d, models);
  }
});

/**
 * Registers all benny models as individual selectable systems in Dice So Nice.
 * Called from the diceSoNiceReady hook when restrictedMode is off.
 * @param {object} dice3d - The Dice3D API instance from diceSoNiceReady.
 * @param {Array<{id: string, name: string, fileName: string}>} models
 */
function _registerAllBennies(dice3d, models) {
  for (const model of models) {
    try {
      dice3d.addSystem({ id: model.id, name: model.name, group: "More Bennies" }, "default");
      dice3d.addDicePreset(
        {
          type: "db",
          system: model.id,
          modelFile: `modules/${MODULE_ID}/models/${model.fileName}`
        },
        "d2"
      );
    } catch (err) {
      console.error(`[${MODULE_ID}] Failed to register benny "${model.id}":`, err);
    }
  }
}

/**
 * Registers only the GM-selected benny model and exposes a world setting for choosing it.
 * Called from the diceSoNiceReady hook when restrictedMode is on.
 * @param {object} dice3d - The Dice3D API instance from diceSoNiceReady.
 * @param {Array<{id: string, name: string, fileName: string}>} models
 */
function _registerRestrictedMode(dice3d, models) {
  const choices = Object.fromEntries(models.map((m) => [m.id, m.name]));

  game.settings.register(MODULE_ID, "selectedBenny", {
    name: "Select a Benny",
    hint: "Choose a Benny to use for this world.",
    scope: "world",
    config: true,
    requiresReload: true,
    type: String,
    choices,
    default: "",
    onChange: async (value) => {
      const newModel = models.find((m) => m.id === value);
      if (!newModel) return;

      // Remove the previous system from the DSN factory before adding the new one.
      const factory = game.dice3d?.DiceFactory;
      if (factory) {
        for (const model of models) {
          factory.systems.delete(model.id);
        }
      }

      try {
        dice3d.addSystem({ id: newModel.id, name: newModel.name, group: "More Bennies" }, "default");
        dice3d.addDicePreset(
          {
            type: "db",
            system: newModel.id,
            modelFile: `modules/${MODULE_ID}/models/${newModel.fileName}`
          },
          "d2"
        );
      } catch (err) {
        console.error(`[${MODULE_ID}] Failed to register restricted benny "${newModel.id}":`, err);
        return;
      }

      // DSN stores the user's selected preset as a flag — update all users to the new choice.
      for (const user of game.users) {
        await user.unsetFlag("dice-so-nice", "appearance.db");
        await user.setFlag("dice-so-nice", "appearance.db", { system: value });
      }
    }
  });

  const modelId = game.settings.get(MODULE_ID, "selectedBenny");
  if (!modelId) return;

  const model = models.find((m) => m.id === modelId);
  if (!model) return;

  try {
    dice3d.addSystem({ id: model.id, name: model.name, group: "More Bennies" }, "default");
    dice3d.addDicePreset(
      {
        type: "db",
        system: model.id,
        modelFile: `modules/${MODULE_ID}/models/${model.fileName}`
      },
      "d2"
    );
  } catch (err) {
    console.error(`[${MODULE_ID}] Failed to register restricted benny "${model.id}":`, err);
  }
}
