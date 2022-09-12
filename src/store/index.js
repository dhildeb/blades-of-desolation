import { getRandomDmgType } from "@/utils/getRandomDmgType"
import { createStore } from 'vuex'

const store = createStore({
  state: {
    // all monster stats: {name: 'any', race: '', img: '', spells: [], equipment: [], dmgType: '', hp: 5, magic: 0, luck: 0, strength: 1, dodge: 0, thorns: 0, actions: 1, physicalResistance: 0, magicResistance: 0, lifeSteal:  0, absorb: '', level: 1, loot: {gold: 0, items: []}, exp: 50}
      monsters: [
        //0
        [{name: 'goblin', actions: 1, strength: 2, hp: 7, loot: {gold: 5, items: ['dagger', 'health potion'], chance: [75, 5]}, exp: 50, dodge: 10, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fgoblin.png?alt=media&token=92f9a971-2733-42a9-b616-563ffcbe86dc'},
        {name: 'bullywug', actions: 2, strength: 1, hp: 11, loot: {gold: 5, items: ['spear', 'antidote'], chance: [75, 10]}, exp: 50, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fbullywug.png?alt=media&token=b29b3455-f4ca-4c97-918c-fd20fb8946d0', statusEffects: [{name: 'poison', effect: 'hp', value: 1, chance: 10, negative: false}]},
        {name: 'giant bat', actions: 1, strength: 3, lifeSteal: 20, hp: 15, loot: {gold: 5, items: ['health potion'], chance: [10]}, exp: 50, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fgiant-bat.png?alt=media&token=09a1bbb5-aea2-42ff-afbd-34c420a23b52'},
        {name: 'giant rat', actions: 1, strength: 1, hp: 7, loot: {gold: 2, items: [], chance: []}, exp: 25, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fgiant-rat.png?alt=media&token=c09b17a6-58da-4efc-b5e0-77f8ff3d5323'},
        {name: 'kuo toa', actions: 1, strength: 2, hp: 18, loot: {gold: 5, items: ['spear', 'sticky shield'], chance: [50, 25]}, exp: 50, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fkuo-toa.png?alt=media&token=d4184eda-e4f2-4c13-8015-74abea6980ae'},
        {name: 'seedling', actions: 1, strength: 2, hp: 8, vulnerabilities: ['fire'], thorns: 1, loot: {gold: 5, items: [], chance: []}, exp: 50, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fseedling.png?alt=media&token=4e357d83-5c08-45d2-940e-7ae302b26366'},
        {name: 'skeleton', actions: 1, strength: 4, hp: 9, immunities: ['necrotic', 'psychic', 'petrify', 'poison'], vulnerabilities: ['radiant'], loot: {gold: 5, items: ['shortsword', 'shortbow'], chance: [75, 75]}, exp: 50, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fundead-barbarian.png?alt=media&token=8f7d9113-6d7f-4c60-b74e-a30cf4cb9ed5'},
        ],
        //1
        [{name: 'fire snake', actions: 2, strength: 3, hp: 22, loot: {gold: 20, items: ['fire snake hide'], chance: [15]}, absorb: 'fire', vulnerabilities: ['cold'], dmgType: 'fire', thorns: 5, exp: 200, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Ffiresnake.png?alt=media&token=7a25d2f1-6c6d-4508-a200-57f324e360ba'},
        {name: 'ghoul', actions: 1, strength: 8, hp: 22, loot: {gold: 20, items: ['destone'], chance: [10]}, exp: 200, resistances: ['necrotic'], statusEffects: [{name: 'petrify', effect: 'actions', value: 0, chance: 10, negative: false}], vulnerabilities: ['radiant'], img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fghoul.png?alt=media&token=c5ac81a3-433a-4890-8272-5a4daa4d1b4d'},
        {name: 'bugbear', actions: 1, strength: 9, hp: 27, loot: {gold: 20, items: ['morningstar', 'health potion'], chance: [75, 10]}, exp: 200, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fbugbear.png?alt=media&token=811edeb1-3376-4259-a175-089015c51cb9'},
        {name: 'giant spider', actions: 1, dmgType: 'poison', statusEffects: [{name: 'poison', effect: 'hp', value: 2, chance: 20, negative: false}], immunities: ['poison'], vulnerabilities: ['fire'], strength: 16, hp: 26, loot: {gold: 20, items: ['health potion', 'antidote'], chance: [15, 15]}, exp: 200, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fgiant-spider.png?alt=media&token=944f50cb-b41b-4865-9a28-9078cd65540c'},
        {name: 'imp', actions: 1, strength: 15, magicResistance: 25, physicalResistance: 25, hp: 10, absorb: 'fire', dmgType: 'fire', vulnerabilities: ['cold'], immunities: ['poison'], loot: {gold: 20, items: [], chance: []}, exp: 200, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fimp.png?alt=media&token=f2938d88-c399-4e6a-a6a4-1a99555bef25'},
        {name: 'multi-armed skeleton', actions: 4, strength: 3, hp: 26, loot: {gold: 20, items: [], chance: []}, exp: 200, immunities: ['necrotic', 'psychic', 'petrify', 'poison'], vulnerabilities: ['radiant'], img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fmulti-armed-skeleton.png?alt=media&token=33e98e78-25d8-4582-aff0-55b2588178ef'},
        {name: 'myconid', actions: 2, strength: 8, hp: 22, dmgType: 'poison', statusEffects: [{name: 'poison', effect: 'hp', value: 4, chance: 10, negative: false}], immunities: ['poison'], loot: {gold: 10, items: ['antidote'], chance: [75]}, exp: 100, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fmyconid.png?alt=media&token=d9a68eb5-6170-448f-a987-89cf76b27c95'},
        {name: 'ooze', actions: 1, strength: 11, hp: 22, thorns: 3, magicResistance: 25, dmgType: 'acid', immunities: ['acid', 'psychic', 'petrify'], vulnerabilities: ['poison'], loot: {gold: 10, items: ['restoration potion'], chance: [20]}, exp: 100, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fooze.png?alt=media&token=6d011360-3e02-42f8-b960-1ad823fbd0ab'},
        {name: 'orc', actions: 1, strength: 14, hp: 20, thorns: 1, loot: {gold: 10, items: ['greataxe', 'dagger', 'spiked armor'], chance: [50, 25, 10]}, exp: 100, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Forc.png?alt=media&token=f011fcb1-d057-490c-b599-350229676f87'},
        {name: 'shadow', actions: 1, strength: 9, lifeSteal: 50, physicalResistance: 50, absorb: 'necrotic', vulnerabilities: ['radiant'], immunities: ['petrify', 'poison'], dmgType: 'necrotic', hp: 16, loot: {gold: 10, items: [], chance: []}, exp: 100, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fshadow.png?alt=media&token=9442e3ed-56f0-4782-b2ce-62d14975eeda'},
        {name: 'scarecrow', actions: 2, strength: 6, immunities: ['petrify', 'poison'], physicalResistance: 20, hp: 36, loot: {gold: 20, items: [], chance: []}, exp: 200, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fscarecrow.png?alt=media&token=b005ab31-b378-4cef-b1af-10fdf8ba91c2'},
        {name: 'pseudodragon', actions: 2, strength: 5, magicResistance: 25, physicalResistance: 25, hp: 30, dmgType: 'cold', resistances: ['cold', 'poison'], vulnerabilities: ['fire'], statusEffects: [{name: 'poison', effect: 'hp', value: 1, chance: 25, negative: false}], loot: {gold: 20, items: [], chance: []}, exp: 200, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpseudodragon.png?alt=media&token=0e439993-9b35-42f0-99ff-9483d8bfbd25'},
        ],
        //2
        [{name: 'gelatinous cube', race: 'ooze', img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fgelatinous-cube.png?alt=media&token=c6d9255b-de4f-4fe8-9e5d-66464bd29119', immunities: ['petrify'], dmgType: 'acid', vulnerabilities: ['poison'], hp: 84, strength: 10, thorns: 10, actions: 1, magicResistance: 20, lifeSteal: 25, absorb: 'acid', level: 2, loot: {gold: 45, items: ['restoration potion'], chance: [10]}, exp: 450},
        {name: 'gibbering mouther', race: 'aberration', img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fmouther.png?alt=media&token=7927b7ad-4059-410c-b21f-fc57a5485955', dmgType: 'acid', resistances: ['acid'], vulnerabilities: ['radiant'], hp: 67, strength: 17, dodge: 25, actions: 1, level: 2, loot: {gold: 45, items: [], chance: []}, exp: 450},
        {name: 'nothic', race: 'aberration', img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fnothic.png?alt=media&token=a4f68856-cc22-45df-90ba-11e3142ab915', dmgType: 'magic', vulnerabilities: ['radiant'], resistances: ['magic', 'necrotic'], hp: 45, strength: 8, actions: 2, level: 2, loot: {gold: 45, items: [], chance: []}, exp: 450},
        {name: 'ogre', race: 'giant', img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fogre.png?alt=media&token=dc59cd31-1642-455c-910c-989836b155eb', dmgType: '', hp: 59, strength: 12, actions: 1, level: 2, loot: {gold: 45, items: ['greatclub', 'gauntlets of ogre power'], chance: [50, 5]}, exp: 450},
        ],
        //3
        [{name: 'displacer beast', dodge: 50, actions: 2, strength: 7, hp: 85, loot: {gold: 70, items: ['displacer cloak'], chance: [5]}, exp: 700, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fdisplacer-beast.png?alt=media&token=c177fa03-5378-4692-be8b-e52c794599c9'},
        {name: 'yuan-ti malison', actions: 2, strength: 10, absorb: 'poison', hp: 66, dmgType: 'poison', statusEffects: [{name: 'poison', effect: 'hp', value: 5, chance: 30, negative: false}], loot: {gold: 70, items: ['scimitar'], chance: [75]}, exp: 700, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fsnakeman.png?alt=media&token=5de8dc0d-7345-4ee3-9085-bf3e58b0b073'},
        {name: 'spectator', actions: 2, strength: 16, hp: 39, absorb: 'magic', loot: {gold: 70, items: [], chance: []}, exp: 700, dmgType: 'magic', img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fspectator.png?alt=media&token=c79ddd43-f172-41f7-a1de-bc600ae4b654'},
        {name: 'werewolf', actions: 2, strength: 7, hp: 58, absorb: 'melee', loot: {gold: 70, items: ['handaxe', 'shortsword'], chance: [75, 75]}, exp: 700, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fwolfman.png?alt=media&token=fde92071-b1ab-4372-bb41-cfdd574aa1ec'},
        ],
        //4
        [{name: 'ettin', actions: 2, strength: 14, hp: 85, loot: {gold: 110, items: ['morningstar', 'morningstar'], chance: [75, 75]}, exp: 1100, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fettin.png?alt=media&token=d08052f2-8965-460f-b745-2a3d04890b0a'},
        {name: 'flameskull', actions: 2, strength: 10, hp: 40, loot: {gold: 110, items: ['mantle of spell resistance'], chance: [1]}, exp: 1100, absorb: 'magic', dmgType: 'magic', statusEffects: [{name: 'poison', effect: 'hp', value: 5, chance: 15, negative: false}, {name: 'petrify', effect: 'actions', value: 0, chance: 10, negative: false}], immunities: ['petrify'], img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fflameskull.png?alt=media&token=c580f87e-37a5-426f-868d-2283d230adf5'},
        {name: 'young phoenix', actions: 1, strength: 26, hp: 45, loot: {gold: 110, items: ['wand of fire', 'phoenix potion'], chance: [1, 1]}, exp: 1100, absorb: 'fire', dmgType: 'fire', physicalResistance: 50, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpheonix.png?alt=media&token=a8d21857-1c00-4c11-ad1b-6bb5456a5220'},
        ],
        //5
        [{name: 'barbed devil', actions: 3, strength: 10, hp: 110, loot: {gold: 180, items: [], chance: []}, immunities: ['fire', 'poison'], exp: 1800, thorns: 5, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fbarbed-devil.png?alt=media&token=b3c691e9-93f9-45ca-867d-30965616026a'},
        {name: 'flesh golem', actions: 2, strength: 13, hp: 93, loot: {gold: 180, items: ['javelin of lightning'], chance: [5]}, exp: 1800, absorb: 'lightning', immunities: ['petrify'], img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fflesh-golem.png?alt=media&token=4c36dfad-d0b6-434f-9fd9-97976ef0d97d'},
        {name: 'troll', actions: 3, strength: 9, lifeSteal: 40, regen: 10, hp: 84, loot: {gold: 180, items: ['ring of lesser regeneration'], chance: [2]}, exp: 1800, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Ftroll.png?alt=media&token=17bcb389-591b-4404-bfba-516529ee9e11'},
        ],
        //6
        [{name: 'sorcerer beast', actions: 1, strength: 45, hp: 58, loot: {gold: 230, items: ['wand of magic'], chance: [3]}, exp: 2300, dmgType: 'magic', statusEffects: [{name: 'poison', effect: 'hp', value: 10, chance: 10, negative: false}, {name: 'petrify', effect: 'actions', value: 0, chance: 10, negative: false}], img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fsorcerer-beastman.png?alt=media&token=b8e28940-d354-45c6-a433-d90979e7ae22'}
        ],
        //7
        [{name: 'shield guardian', actions: 2, strength: 25, lifeSteal: 50, hp: 142, physicalResistance: 75, immunities: ['petrify', 'poison'], loot: {gold: 290, items: ['spear', 'longsword +1', 'shield +2'], chance: [75, 15, 5]}, exp: 2900, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpngwing.com%20(71).png?alt=media&token=7ea84b7f-3825-4c13-8527-d1e8d1d58fb7'}
        ],
        //8
        [{name: 'hydra', actions: 5, strength: 10, lifeSteal: 20, hp: 172, loot: {gold: 390, items: ['ring of regeneration']}, chance: [1], exp: 3900, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpngwing.com%20(72).png?alt=media&token=ff66a119-8295-4532-afa7-73de03d564ac'},
        {name: 'water elemental', actions: 1, dmgType: 'cold', strength: 50, hp: 208, vulnerabilities: ['lightning'], immunities: ['petrify', 'poison'], loot: {gold: 390, items: [], chance: []}, exp: 3900, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fwater-elemental.png?alt=media&token=0732233c-46dd-4710-b0ff-885adf1debb9'},
        ],
        //9
        [{name: 'treant', actions: 2, strength: 22, hp: 138, physicalResistance: 25, vulnerabilities: ['fire'], loot: {gold: 500, items: [], chance: []}, exp: 5000, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpngwing.com%20(73).png?alt=media&token=863bed33-f995-4ad1-900f-5fef35f806c9'}
        ],
        //10
        [{name: 'aboleth', actions: 2, strength: 12, hp: 235, loot: {gold: 590, magicResistance: 75, items: [], chance: []}, exp: 5900, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Faboleth-beholder.png?alt=media&token=c20a9625-a10c-4207-8413-d0b9c8dad72c'},
        {name: 'young red dragon', actions: 3, strength: 20, hp: 278, absorb: 'fire', magicResistance: 25, physicalResistance: 25, dmgType: 'fire', loot: {gold: 590, items: ['red dragon scalemail']}, exp: 5900, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fred-dragon.png?alt=media&token=d92dc5a2-e36e-4271-bb47-0096710c57a9'},
        ],
        //11
        [{name: 'remorhaz', actions: 1, strength: 50, absorb: 'fire', thorns: '10', immunities: ['cold'], dmgType: 'fire', hp: 395, loot: {gold: 720, items: [], chance: []}, exp: 7200, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpngwing.com%20(74).png?alt=media&token=faabbe05-aa5f-4e78-a351-29656e23f096'},
        {name: 'ice golem', actions: 3, strength: 25, absorb: 'cold', vulnerabilities: ['fire'], thorns: '10', dmgType: 'cold', hp: 481, loot: {gold: 720, items: [], chance: []}, exp: 7200, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fice-golem.png?alt=media&token=515795bf-c616-468e-85b9-aa73030b1651'},
        ],
        //12
        [{name: 'archmage', actions: 1, strength: 60, hp: 499, physicalResistance: 25, magicResistance: 50, dmgType: 'magic', statusEffects: [{name: 'poison', effect: 'hp', value: 10, chance: 25, negative: false}, {name: 'petrify', effect: 'actions', value: 0, chance: 25, negative: false}], loot: {gold: 840, items: ['robe of the archmagi', 'staff of the magi'], chance: [1, 1]}, exp: 8400, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpngwing.com%20(75).png?alt=media&token=2f1e550d-50f4-4c82-9864-110bf7b7c8f2'}
        ],
        //13
        [{name: 'beholder', actions: 3, strength: 30, hp: 1800, loot: {gold: 1000, items: [], chance: []}, dmgType: 'magic', statusEffects: [{name: 'poison', effect: 'hp', value: 10, chance: 15, negative: false}, {name: 'petrify', effect: 'actions', value: 0, chance: 15, negative: false}], exp: 10000, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fbeholder.png?alt=media&token=15bc1d92-68e6-4f1b-8fad-28504605bfdc'},
        {name: 'mind flayer', actions: 1, strength: 80, hp: 2270, loot: {gold: 1000, items: [], chance: []}, magicResistance: 50, absorb: 'psychic', lifeSteal: 75, dmgType: 'psychic', exp: 10000, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fmind-flayer.png?alt=media&token=ed563277-d397-4f94-8627-58220e02424e'},
        ],
        //14
        [{name: 'purple dragon', actions: 3, absorb: 'psychic', magicResistance: 25, physicalResistance: 25, dmgType: 'psychic', strength: 14, hp: 1570, loot: {gold: 1150, items: ['purple dragon scalemail'], chance: [20]}, exp: 11500, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpurple-dragon.png?alt=media&token=86a34b7a-7c1f-4718-aa29-644a62914ded'}
        ],
        //15
        [{name: 'baphomet', actions: 4, strength: 21, hp: 2750, loot: {gold: 1300, items: [], chance: []}, exp: 13000, immunities: ['petrify'], img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fbaphomet.png?alt=media&token=187c94ae-a505-441a-8773-847c8755e127'}
        ],
        //16
        [{name: 'adult blue dragon', actions: 3, strength: 16, hp: 2250, loot: {gold: 1500, items: [], chance: []}, immunities: ['petrify'], exp: 15000, dmgType: 'lightning', absorb: 'lightning', magicResistance: 50, physicalResistance: 25, statusEffects: [{name: 'petrify', effect: 'actions', value: 0, chance: 50, negative: false}], img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fblue-dragon.png?alt=media&token=edbedc28-1cce-43dc-9d9e-0ed92fbb24ed'}
        ],
        //17
        [{name: 'adult gold dragon', actions: 3, strength: 28, magicResistance: 50, physicalResistance: 25, hp: 2560, dmgType: 'fire', absorb: 'fire', loot: {gold: 1800, items: [], chance: []}, exp: 18000, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpngwing.com%20(78).png?alt=media&token=3c267af7-a727-48d9-9a84-ded90c8669a6'}
        ],
        //18
        [{name: 'abyssal ooze', actions: 3, strength: 39, hp: 5740, loot: {gold: 2000, items: [], chance: []}, immunities: ['petrify'], exp: 20000,thorns: 39, absorb: 'melee', dmgType: 'acid', img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fabyssal-ooze.png?alt=media&token=76919f5f-6822-439d-bd5c-2437fb3b5e8b'}
        ],
        //19
        [{name: 'balor', actions: 2, strength: 29, absorb: 'fire', dmgType: 'fire', thorns: 10, magicResistance: 30, hp: 26200, loot: {gold: 2200, items: [], chance: []}, exp: 22000, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpngwing.com%20(77).png?alt=media&token=31b1e9f0-1f1a-4473-8a05-db64d0ddff1b'}
        ],
        //20
        [{name: 'death', actions: 10, strength: 100, hp: 1000000, loot: {gold: 2500, items: [], chance: []}, immunities: ['petrify'], vulnerabilities: ['radiant'], absorb: 'necrotic', exp: 25000, img: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fpngwing.com%20(79).png?alt=media&token=aa71a739-6b17-42d9-83fc-5d470623a567'}
        ]
    ],
    // price ranges c: 100-1000, uc: 1000-4000, r: 4000-10000, vr: 10000-25000
    // TODO add: armor of resistance, armor of vulnerability, brooch of shielding, demon armor, dragon slayer, holy avenger, mace of smiting, ring of resistance
    items: [
      // Common
      {name: 'shortsword', effect: 'strength', value: 2, type: 'mainHand', speed: 1, price: 400, rarity: 'c', description: 'Bigger than a dagger shorter than a longsword'},
      {name: 'quarterstaff', effect: 'strength', value: 2, type: 'mainHand', price: 400, rarity: 'c', requirements: [{stat: 'classType', req: 'monk'}], description: 'The weapon of a monk'},
      {name: 'longsword', effect: 'strength', value: 4, type: 'mainHand', speed: 2, price: 750, rarity: 'c', description: 'Longer than a shortsword'},
      {name: 'dagger', effect: 'strength', value: 1, type: 'offHand', price: 200, rarity: 'c', description: 'A good off hand weapon'},
      {name: 'spear', effect: 'strength', value: 1, type: 'mainHand', speed: 1, price: 200, rarity: 'c', description: 'Most basic of weapons for beginners'},
      {name: 'shortbow', effect: ['strength', 'dmgType'], value: [2, 'range'], type: 'mainHand', speed: 2, price: 200, rarity: 'c', description: 'A good ranged weapon for beginners'},
      {name: 'longbow', effect: ['strength', 'dmgType'], value: [4, 'range'], type: 'mainHand', speed: 2, price: 600, rarity: 'c', description: 'The longer version of the shortbow'},
      {name: 'light crossbow', effect: ['strength', 'dmgType'], value: [2, 'range'], type: 'mainHand', speed: 1, price: 400, rarity: 'c', description: 'Faster than a bow'},
      {name: 'Heavy crossbow', effect: ['strength', 'dmgType'], value: [5, 'range'], type: 'mainHand', speed: 3, price: 800, rarity: 'c', description: 'Forget speed we\'re going for power here'},
      {name: 'hand crossbow', effect: ['strength', 'dmgType'], value: [1, 'range'], type: 'offHand', speed: 1, price: 400, rarity: 'c', description: 'A off hand weapon'},
      {name: 'sticky shield', effect: 'baseHp', value: 3, type: 'offHand', price: 300, rarity: 'c', description: 'Easy to use, hard to remove'},
      {name: 'battleaxe', effect: 'strength', value: 3, type: 'mainHand', speed: 2, price: 600, rarity: 'c', requirements: [{stat: 'baseStrength', req: 2}]},
      {name: 'scimitar', effect: 'strength', value: 2, type: 'mainHand', price: 800, rarity: 'c'},
      {name: 'handaxe', effect: 'strength', value: 1, type: 'mainHand', speed: 1, price: 200, rarity: 'c'},
      {name: 'greatclub', effect: 'strength', value: 5, type: 'mainHand', speed: 3, price: 300, rarity: 'c'},
      {name: 'morningstar', effect: 'strength', value: 3, type: 'mainHand', speed: 1, price: 800, rarity: 'c'},
      {name: 'javelin', effect: 'strength', value: 1, type: 'mainHand', price: 200, rarity: 'c'},
      {name: 'shield', effect: 'physicalResistance', value: 10, type: 'offHand', price: 500, rarity: 'c'},
      {name: 'padded armor', effect: 'baseHp', value: 4, type: 'armor', price: 400, rarity: 'c'},
      {name: 'leather armor', effect: 'baseHp', value: 8, type: 'armor', price: 800, rarity: 'c'},
      {name: 'spiked armor', effect: ['baseHp', 'thorns'], value: [5, 1], type: 'armor', price: 900, rarity: 'c'},
      {name: 'chain mail', effect: ['baseHp', 'baseActions'], value: [12, -1], type: 'armor', price: 1000, rarity: 'c'},
      {name: 'robe', effect: 'hp', value: 2, type: 'cloak', price: 500, rarity: 'c'},
      {name: 'cape', effect: 'physicalResistance', value: 2, type: 'cloak', price: 500, rarity: 'c'},
      {name: 'wand', effect: 'baseMagic', value: 1, type: 'mainHand', price: 500, rarity: 'c'},
      {name: 'health potion', effect: 'hp', value: 10, type: 'consumable', price: 50, rarity: 'c'},
      {name: 'antidote', effect: 'statusEffects', value: 'poison', type: 'consumable', price: 50, rarity: 'c'},
      {name: 'destone', effect: 'statusEffects', value: 'petrify', type: 'consumable', price: 50, rarity: 'c'},
      {name: 'mana potion', effect: 'magic', value: 2, type: 'consumable', price: 50, rarity: 'c'},
      
      // Uncommon
      {name: 'plate', effect: ['baseHp', 'physicalResistance', 'baseActions'], value: [30, 20, -3], type: 'armor', price: 2500, rarity: 'uc'},
      {name: 'ring of warmth', effect: 'resistances', value: 'cold', type: 'accessory', price: 1500, rarity: 'uc'},
      {name: 'ring of winter', effect: 'resistances', value: 'fire', type: 'accessory', price: 1500, rarity: 'uc'},
      {name: 'ring of mind', effect: 'resistances', value: 'psychic', type: 'accessory', price: 1500, rarity: 'uc'},
      {name: 'ring of conduction', effect: 'resistances', value: 'lightning', type: 'accessory', price: 1500, rarity: 'uc'},
      {name: 'ring of ooze', effect: 'resistances', value: 'acid', type: 'accessory', price: 1500, rarity: 'uc'},
      {name: 'ring of light', effect: 'resistances', value: 'necrotic', type: 'accessory', price: 1500, rarity: 'uc'},
      {name: 'ring of darkness', effect: 'resistances', value: 'radiant', type: 'accessory', price: 1500, rarity: 'uc'},
      {name: 'ring of antidote', effect: 'resistances', value: 'poison', type: 'accessory', price: 1500, rarity: 'uc'},
      {name: 'ring of soft', effect: 'immunities', value: 'petrify', type: 'accessory', price: 1500, rarity: 'uc'},
      {name: 'shield +1', effect: 'physicalResistance', value: 20, type: 'offHand', price: 5000, rarity: 'uc'},
      {name: 'greataxe', effect: 'strength', type: 'mainHand', value: 9, requirements: [{stat: 'baseStrength', req: 4}], speed: 3, price: 1200, rarity: 'uc'},
      {name: 'adamantine armor', effect: ['immunities', 'baseActions'], value: ['crit', -1], type: 'armor', price: 4000, rarity: 'uc'},
      {name: 'fire snake hide', effect: ['dmgType', 'thorns', 'resistances', 'vulnerabilities'], value: ['fire', 2, 'fire', 'cold'], type: 'armor', price: 1400, rarity: 'uc'},
      {name: 'boots of elvenkind', effect: ['dodge', 'baseActions'], value: [10, 1], type: 'accessory', price: 1500, rarity: 'uc'},
      {name: 'boots of the winterlands', effect: 'resistances', value: 'cold', type: 'accessory', price: 2000, rarity: 'uc'},
      {name: 'bracers of archery', effect: 'strength', value: 5, type: 'accessory', price: 2000, rarity: 'uc', requirements: [{stat: 'equipment', req: 'bow'}]},
      {name: 'bracers of defense', effect: 'physicalResistance', value: 15, type: 'accessory', price: 2000, rarity: 'uc', requirements: [{stat: 'armor', req: null}]},
      {name: 'cloak of protection', effect: 'physicalResistance', value: 20, type: 'cloak', price: 2500, rarity: 'uc'},
      {name: 'gauntlets of ogre power', effect: ['strength', 'baseActions'], value: [3, -1], type: 'accessory', price: 2000, rarity: 'uc', requirements: [{stat: 'baseHp', req: 15}]},
      {name: 'luckstone', effect: 'luck', value: 2, type: 'accessory', price: 2000, rarity: 'uc'},
      {name: 'health potion', effect: 'hp', value: 25, type: 'consumable', price: 250, rarity: 'uc'},
      {name: 'mana potion', effect: 'magic', value: 5, type: 'consumable', price: 250, rarity: 'uc'},
      {name: 'restoration potion', effect: ['magic', 'hp'], value: [2, 10], type: 'consumable', price: 250, rarity: 'uc'},
      
      // Rare
      {name: 'javelin of lightning', effect: ['strength', 'dmgType', 'statusEffects'], value: [5, 'lightning', {name: 'petrify', effect: 'actions', value: 0, chance: 15, negative: false}], type: 'mainHand', price: 8000, rarity: 'r'},
      {name: 'gloves of speed', effect: 'strength', value: 1, type: 'offHand', price: 5000, rarity: 'r', speed: -1},
      {name: 'displacer cloak', effect: 'dodge', value: 25, type: 'cloak', price: 5000, rarity: 'r'},
      {name: 'amulent of health', effect: 'baseHp', value: 19, type: 'accessory', price: 5000, rarity: 'r'},
      {name: 'armor +1', effect: ['physicalResistance', 'baseActions'], value: [25, -1], type: 'armor', price: 5000, rarity: 'r'},
      {name: 'longsword +1', effect: 'strength', value: 10, type: 'mainHand', speed: 2, price: 5000, rarity: 'r', requirements: [{stat: 'baseStrength', req: 5}]},
      {name: 'belt of hill giant strength', effect: 'strength', value: 5, type: 'accessory', price: 5000, rarity: 'r', requirements: [{stat: 'baseHp', req: 15}]},
      {name: 'boots of speed', effect: 'baseActions', value: 5, type: 'accessory', price: 7500, rarity: 'r'},
      {name: 'dagger of venom', effect: ['strength', 'dmgType', 'statusEffects'], value: [10, 'poison', {name: 'poison', effect: 'hp', value: 2, chance: 20, negative: false}], type: 'offHand', price: 10000, rarity: 'r', requirements: [{stat: 'classType', req: 'rogue'}]},
      {name: 'flame tongue', effect: ['strength', 'dmgType'], value: [10, 'fire'], type: 'mainHand', speed: 3, price: 10000, rarity: 'r'},
      {name: 'mace of disruption', effect: ['strength', 'dmgType'], value: [6, 'radiant'], type: 'mainHand', speed: 2, price: 10000, rarity: 'r'},
      {name: 'mantle of spell resistance', effect: 'magicResistance', value: 25, type: 'cloak', price: 10000, rarity: 'r'},
      {name: 'periapt of proof against poison', effect: 'immunities', value: 'poison', type: 'accessory', price: 10000, rarity: 'r'},
      {name: 'ring of evasion', effect: ['dodge', 'baseActions'], value: [20, 1], type: 'accessory', price: 4000, rarity: 'r'},
      {name: 'ring of protection', effect: ['physicalResistance', 'magicResistance'], value: [10, 10], type: 'accessory', price: 8000, rarity: 'r'},
      {name: 'shield +2', effect: 'physicalResistance', value: 40, type: 'offHand', price: 10000, rarity: 'r'},
      {name: 'sun blade', effect: ['strength', 'dmgType'], value: [5, 'radiant'], type: 'mainHand', speed: 1, price: 10000, rarity: 'r'},
      {name: 'health potion', effect: 'hp', value: 50, type: 'consumable', price: 500, rarity: 'r'},
      {name: 'mana potion', effect: 'magic', value: 10, type: 'consumable', price: 500, rarity: 'r'},
      {name: 'potion of speed', effect: 'actions', value: 10, type: 'consumable', price: 2000, rarity: 'r'},
      {name: 'restoration potion', effect: ['magic', 'hp'], value: [5, 25], type: 'consumable', price: 500, rarity: 'r'},
      {name: 'ring of lesser regeneration', effect: 'regen', value: 1, type: 'accessory', price: 8000, rarity: 'r'},
      {name: 'wand of fire', effect: ['baseMagic', 'dmgType', 'resistances'], value: [10, 'fire', 'fire'], type: 'mainHand', speed: 2, price: 25000, rarity: 'r', requirements: [{stat: 'classType', req: ['wizard', 'warlock']}]},
      {name: 'wand of frost', effect: ['baseMagic', 'dmgType'], value: [3, 'cold'], type: 'mainHand', speed: 2, price: 10000, rarity: 'r', requirements: [{stat: 'classType', req: ['wizard', 'warlock']}]},
      {name: 'wand of force', effect: ['baseMagic', 'dmgType'], value: [3, 'melee'], type: 'mainHand', speed: 2, price: 10000, rarity: 'r', requirements: [{stat: 'classType', req: ['wizard', 'warlock']}]},
      {name: 'wand of lightning', effect: ['baseMagic', 'dmgType', 'statusEffects'], value: [3, 'lightning', {name: 'petrify', effect: 'actions', value: 0, chance: 15, negative: false}], type: 'mainHand', speed: 2, price: 10000, rarity: 'r', requirements: [{stat: 'classType', req: ['wizard', 'warlock']}]},
      {name: 'wand of withering', effect: ['baseMagic', 'dmgType'], value: [3, 'necrotic'], type: 'mainHand', speed: 2, price: 10000, rarity: 'r', requirements: [{stat: 'classType', req: ['cleric', 'warlock']}]},
      {name: 'wand of magic', effect: ['baseMagic', 'magicRegen'], value: [3, 1], type: 'mainHand', speed: 2, price: 15000, rarity: 'r', requirements: [{stat: 'baseMagic', req: 3}]},

      
      // Very Rare
      {name: 'sword of life stealing', effect: ['strength', 'dmgType', 'lifeSteal'], value: [5, 'necrotic', 25], type: 'mainHand', speed: 3, price: 25000, rarity: 'vr'},
      {name: 'purple dragon scalemail', effect: ['baseHp', 'resistances', 'baseActions'], value: [50, 'psychic', -1], type: 'armor', price: 10000, rarity: 'vr'},
      {name: 'red dragon scalemail', effect: ['baseHp', 'resistances', 'baseActions'], value: [50, 'fire', -1], type: 'armor', price: 10000, rarity: 'vr'},
      {name: 'aminated shield', effect: 'physicalResistance', value: 20, type: '', price: 10000, rarity: 'vr'},
      {name: 'armor +2', effect: ['physicalResistance', 'baseActions'], value: [50, -1], type: 'armor', price: 10000, rarity: 'vr'},
      {name: 'belt of storm giant strength', effect: 'strength', value: 9, type: 'accessory', price: 15000, rarity: 'vr', requirements: [{stat: 'baseHp', req: 35}]},
      {name: 'belt of dwarvenkind', effect: ['baseHp', 'resistances'], value: [2, 'poison'], type: 'accessory', price: 5000, rarity: 'vr'},
      {name: 'dancing sword', effect: ['baseActions', 'strength'], value: [1, 5], type: '', speed: 0, price: 10000, rarity: 'vr'},
      {name: 'dwarven plate', effect: ['baseHp', 'physicalResistance', 'baseActions'], value: [50, 50, -2], type: 'armor', price: 25000, rarity: 'vr', requirements: [{stat: 'race', req: 'dwarf'}]},
      {name: 'dwarven hammer', effect: 'strength', value: 15, type: 'mainHand', speed: 3, price: 15000, rarity: 'vr', requirements: [{stat: 'race', req: 'dwarf'}]},
      {name: 'frost brand', effect: ['strength', 'dmgType', 'resistances'], value: [10, 'cold', 'fire'], type: 'mainHand', speed: 2, price: 25000, rarity: 'vr'},
      {name: 'ring of regeneration', effect: 'regen', value: 5, type: 'accessory', price: 20000, rarity: 'vr'},
      {name: 'rod of absorption', effect: 'absorb', value: 'randomDmgType', type: 'mainHand', price: 25000, rarity: 'vr'},
      {name: 'scimitar of speed', effect: ['actions', 'strength'], value: [1, 15], type: 'mainHand', price: 25000, rarity: 'vr'},
      {name: 'shield +3', effect: 'physicalResistance', value: 75, type: 'offHand', price: 50000, rarity: 'vr'},
      {name: 'spellguard shield', effect: ['physicalResistance', 'magicResistance'], value: [10, 25], type: 'offHand', price: 50000, rarity: 'vr'},
      {name: 'staff of fire', effect: ['baseMagic', 'dmgType', 'resistances'], value: [10, 'fire', 'fire'], type: 'mainHand', speed: 2, price: 25000, rarity: 'vr', requirements: [{stat: 'classType', req: ['wizard', 'warlock']}]},
      {name: 'staff of frost', effect: ['baseMagic', 'dmgType', 'resistances'], value: [10, 'cold', 'cold'], type: 'mainHand', speed: 2, price: 25000, rarity: 'vr', requirements: [{stat: 'classType', req: ['wizard', 'warlock']}]},
      {name: 'staff of force', effect: ['baseMagic', 'dmgType', 'resistances'], value: [10, 'melee', 'melee'], type: 'mainHand', speed: 2, price: 25000, rarity: 'vr', requirements: [{stat: 'classType', req: ['wizard', 'warlock']}]},
      {name: 'staff of lightning', effect: ['baseMagic', 'dmgType', 'resistances', 'statusEffects'], value: [10, 'lightning', 'lightning', {name: 'petrify', effect: 'actions', value: 0, chance: 25, negative: false}], type: 'mainHand', speed: 2, price: 25000, rarity: 'vr', requirements: [{stat: 'classType', req: ['wizard', 'warlock']}]},
      {name: 'staff of withering', effect: ['baseMagic', 'dmgType', 'resistances'], value: [10, 'necrotic', 'necrotic'], type: 'mainHand', speed: 2, price: 25000, rarity: 'vr', requirements: [{stat: 'classType', req: ['cleric', 'warlock']}]},
      {name: 'sword of sharpness', effect: 'strength', value: 15, type: 'mainHand', speed: 2, price: 25000, rarity: 'vr', requirements: [{stat: 'baseStrength', req: 10}]},
      {name: 'wand of the war mage', effect: 'baseMagic', value: 15, type: 'mainHand', speed: 2, price: 25000, rarity: 'vr', requirements: [{stat: 'classType', req: ['warlock', 'cleric', 'wizard']}]},
      {name: 'health potion', effect: 'hp', value: 100, type: 'consumable', price: 1000, rarity: 'vr'},
      {name: 'mana potion', effect: 'magic', value: 20, type: 'consumable', price: 1000, rarity: 'vr'},
      {name: 'restoration potion', effect: ['magic', 'hp'], value: [10, 50], type: 'consumable', price: 1000, rarity: 'vr'},
      
      // Legendary
      {name: 'defender', effect: ['strength', 'physicalResistance'], value: [10, 50], type: 'mainHand', speed: 2, price: 100000, rarity: 'l', requirements: [{stat: 'classType', req: 'paladin'}]},
      {name: 'armor of invulnerability', effect: ['physicalResistance', 'baseActions'], value: [100, -3], type: 'armor', price: 100000, rarity: 'l', requirements: [{stat: 'baseStrength', req: 15}]},
      {name: 'luck blade', effect: ['strength', 'luck'], value: [5, 10], type: 'mainHand', speed: 2, price: 100000, rarity: 'l'},
      {name: 'ring of spell turning', effect: ['thorns', 'magicResistance'], value: [100, 100], type: 'accessory', price: 100000, rarity: 'l'},
      {name: 'robe of the archmagi', effect: ['magicResistance', 'baseMagic', 'physicalResistance'], value: [25, 10, 25], type: 'cloak', price: 100000, rarity: 'l', requirements: [{stat: 'baseMagic', req: 15}]},
      {name: 'staff of the magi', effect: ['baseMagic', 'absorb'], value: [10, 'magic'], type: 'mainHand', speed: 2, price: 100000, rarity: 'l', requirements: [{stat: 'classType', req: ['wizard', 'warlock']}]},
      {name: 'sword of extra sharpness', effect: 'strength', value: 25, type: 'mainHand', speed: 2, price: 100000, rarity: 'l', requirements: [{stat: 'baseStrength', req: 15}]},
      {name: 'sword petrification', effect: ['strength', 'statusEffects'], value: [5, {name: 'petrify', effect: 'actions', value: 0, chance: 50, negative: false}], type: 'mainHand', speed: 3, price: 100000, rarity: 'l', requirements: [{stat: 'baseStrength', req: 15}]},
      {name: 'sword poison', effect: ['strength', 'statusEffects'], value: [5, {name: 'poison', effect: 'hp', value: 10, chance: 50, negative: false}], type: 'mainHand', speed: 3, price: 100000, rarity: 'l', requirements: [{stat: 'baseStrength', req: 15}]},
      {name: 'manual of bodily health', effect: 'baseHp', value: 25, type: 'consumable', price: 10000, rarity: 'l'},
      {name: 'phoenix potion', effect: 'baseHp', value: 5, type: 'consumable', price: 2500, rarity: 'l'},
      {name: 'tome of magic', effect: 'baseMagic', value: 3, type: 'consumable', price: 10000, rarity: 'l'},
      {name: 'Manual Of Gainful Exercise', effect: 'baseStrength', value: 5, type: 'consumable', price: 10000, rarity: 'l'},
      {name: 'manual of quickness of action', effect: 'baseActions', value: 2, type: 'consumable', price: 10000, rarity: 'l'},
    ],
    abilities: [
      {name: 'rage', level: 1, effect: ['physicalResistance', 'strength'], value: [10, 2], buff: true, classType: 'barbarian', uses: 1, baseUses: 1, description: 'Reduces physical damage and increases your strength'}, 
      {name: 'second wind', level: 1, effect: ['hp'], value: [5], temp: false, buff: true, classType: 'fighter', uses: 1, baseUses: 1, description: 'Restores some hp'}, 
      {name: 'action surge', level: 2, effect: ['actions'], value: [1], buff: true, classType: 'fighter', uses: 1, baseUses: 1, description: 'Regain some actions'}, 
      {name: 'quickening heal', level: 4, effect: ['hp'], value: [10], temp: false, buff: true, classType: 'monk', uses: 1, baseUses: 1, description: 'Restore some hp'}, 
      {name: 'song of rest', level: 2, effect: ['hp'], value: [3], temp: false, buff: true, areaEffect: true, classType: 'bard', uses: 1, baseUses: 1, description: 'Restores some of your party\'s hp'}, 
      {name: 'sneak attack', level: 1, effect: ['strength'], value: [4], buff: true, classType: 'rogue', uses: 1, baseUses: 1, description: 'Increases strength'}, 
      {name: 'cunning action', level: 2, effect: ['dodge'], value: [10], buff: true, classType: 'rogue', uses: 1, baseUses: 1, description: 'Increases dodge chance'}, 
    ],
    spells: [
      //cantrips
      [
        {name: 'acid splash', strength: 5, dmgType: 'acid', level: 0},
        {name: 'poison spray', strength: 6, dmgType: 'poison', statusEffects: [{name: 'poison', effect: 'hp', value: 3, chance: 10, negative: false}], level: 0},
        {name: 'chill touch', strength: 5, dmgType: 'necrotic', level: 0},
        {name: 'edritch blast', strength: 6, dmgType: 'melee', level: 0},
        {name: 'fire bolt', strength: 5, dmgType: 'fire', level: 0},
        {name: 'ray of frost', strength: 5, dmgType: 'cold', level: 0},
        {name: 'sacred flame', strength: 5, dmgType: 'radiant', level: 0},
        {name: 'shocking grasp', strength: 5, dmgType: 'lightning', statusEffects: [{name: 'petrify', effect: 'actions', value: 0, chance: 10, negative: false}], level: 0},
        {name: 'vicious mockery', strength: 5, dmgType: 'psychic', level: 0},
        {name: 'light heal', effect: 'hp', value: 2, buff: true, level: 0, description: 'Heals target +2'},
      ],
      //1
      [
        {name: 'burning hands', strength: 9, dmgType: 'fire', level: 1},
        {name: 'hellish rebuke', strength: 10, dmgType: 'fire', reqs: {classType: 'warlock'}, level: 1},
        {name: 'inflict wounds', strength: 15, dmgType: 'necrotic', reqs: {classType: 'warlock'}, level: 1},
        {name: 'guided bolt', strength: 12, dmgType: 'radiant', level: 1},
        {name: 'magic missile', areaEffect: true, strength: 4, dmgType: 'melee', level: 1},
        {name: 'cure wounds', effect: 'hp', value: 5, buff: true, temp: true, level: 1, reqs: {classType: 'cleric'}, description: 'Heal Party +2'},
        {name: 'weaken', effect: 'strength', value: -3, buff: true, temp: true, level: 1, description: 'Reduces targets strength by -3'},
        {name: 'power up', effect: 'strength', value: 3, buff: true, level: 1, description: 'Increases strength of target by +3'},
      ],
      //2 : lesser restoration-remove all statusEffects and debuffs
      [
        {name: 'shield', effect: 'physicalResistance', value: 50, buff: true, temp: true, level: 2, description: 'Increases physical resistance of target by 50%'},
        {name: 'acid arrow', strength: 18, dmgType: 'acid', level: 2},
        {name: 'poison arrow', strength: 10, dmgType: 'poison', statusEffects: [{name: 'poison', effect: 'hp', value: 5, chance: 25, negative: false}], level: 2},
        {name: 'scorching ray', areaEffect: true, strength: 6, dmgType: 'fire', level: 2},
        {name: 'shatter', areaEffect: true, strength: 8, dmgType: 'melee', level: 2},
        {name: 'branding smite', strength: 18, dmgType: 'radiant', level: 2},
        {name: 'moonbeam', areaEffect: true, strength: 6, dmgType: 'radiant', level: 2},
        {name: 'prayer of healing', areaEffect: true, effect: 'hp', value: 5, buff: true, level: 2, reqs: {classType: 'cleric'}, description: 'Heal Party +5'},
      ],
      //3
      [
        {name: 'cloud of daggers', areaEffect: true, strength: 12, dmgType: 'melee', level: 3},
        {name: 'call lightning', strength: 22, dmgType: 'lightning', statusEffects: [{name: 'petrify', effect: 'actions', value: 0, chance: 20, negative: false}], level: 3},
        {name: 'fireball', strength: 24, dmgType: 'fire', level: 3},
        {name: 'lightning bolt', strength: 24, dmgType: 'lightning', statusEffects: [{name: 'petrify', effect: 'actions', value: 0, chance: 15, negative: false}], level: 3},
        {name: 'haste', effect: 'actions', value: 3, buff: true, level: 3, description: 'Increases party\'s actions +3'},
        {name: 'slow', effect: 'actions', value: 1, level: 3, description: 'Reduces targets actions by 1'},
        {name: 'mass healing word', areaEffect: true, effect: 'hp', value: 8, buff: true, level: 3, reqs: {classType: 'cleric'}, description: 'Heal Party +8'},
      ],
      //4
      [
        {name: 'grant death touch', effect: ['strength', 'dmgType', 'lifeSteal'], value: [5, 'necrotic', 20], buff: true, temp: true, level: 4, description: 'Give target 20% life steal'},
        {name: 'blight', strength: 32, dmgType: 'necrotic', level: 4},
        {name: 'ice storm', strength: 16, areaEffect: true, dmgType: 'cold', level: 4},
        {name: 'phantasmal killer', strength: 40, dmgType: 'psychic', level: 4},
        {name: 'poison', strength: 1, dmgType: 'poison', statusEffects: [{name: 'poison', effect: 'hp', value: 10, chance: 100, negative: false}], level: 4},
      ],
      //5
      [
        {name: 'cloud kill', areaEffect: true, strength: 20, dmgType: 'poison', statusEffects: [{name: 'poison', effect: 'hp', value: 10, chance: 25, negative: false}], level: 5},
        {name: 'cone of cold', strength: 48, dmgType: 'cold', level: 5},
        {name: 'flame strike', strength: 48, dmgType: 'fire', level: 5},
        {name: 'insect plague', areaEffect: true, strength: 20, dmgType: 'melee', level: 5},
        {name: 'greater restoration', effect: 'hp', value: 55, buff: true, level: 5, reqs: {classType: 'cleric'}, description: 'Heal target by +55'},
        {name: 'mass cure wounds', areaEffect: true, effect: 'hp', value: 25, buff: true, level: 5, reqs: {classType: 'cleric'}, description: 'Heal Party +25'},
      ],
      //6
      [
        {name: 'chain lightning', areaEffect: true, strength: 25, dmgType: 'lightning', statusEffects: [{name: 'petrify', effect: 'actions', value: 0, chance: 10, negative: false}], level: 6},
        {name: 'circle of death', areaEffect: true, strength: 24, dmgType: 'necrotic', level: 6},
        {name: 'disintegrate', strength: 70, dmgType: 'melee', level: 6},
        {name: 'sunbeam', strength: 65, dmgType: 'radiant', level: 6},
        {name: 'freezing sphere', areaEffect: true, strength: 60, dmgType: 'cold', level: 6},
        {name: 'harm', strength: 60, dmgType: 'necrotic', level: 6},
        {name: 'heal', effect: 'hp', value: 70, buff: true, level: 6, reqs: {classType: 'cleric'}, description: 'Heal target +70'},
      ],
      //7
      [
        {name: 'finger of death', strength: 86, dmgType: 'necrotic', level: 7},
        {name: 'fire storm', areaEffect: true, strength: 35, dmgType: 'necrotic', level: 7},
        {name: 'teleport', areaEffect: true, effect: 'inBattle', value: false, level: 7, description: 'Flee from battle'},
        {name: 'prasmatic spray', areaEffect: true, strength: 35, dmgType: getRandomDmgType(), level: 7},
        {name: 'mass slow', areaEffect: true, effect: 'actions', value: 1, debuff: true, level: 6, description: 'Reduces enemies actions for a turn'},
        {name: 'mass haste', areaEffect: true, effect: 'actions', value: 6, buff: true, temp: true, level: 6, description: 'Party gains speed +6'},
      ],
      //8
      [
        {name: 'earthquake', areaEffect: true, strength: 50, dmgType: 'melee', level: 8},
        {name: 'poison fog', areaEffect: true, strength: 40, statusEffects: [{name: 'poison', effect: 'hp', value: 20, chance: 50, negative: false}], dmgType: 'poison', level: 8},
        {name: 'incendiary cloud', areaEffect: true, strength: 50, dmgType: 'fire', level: 8},
        {name: 'sunburst', areaEffect: true, strength: 56, dmgType: 'radiant', level: 8},
      ],
      //9
      [
        {name: 'mass heal', areaEffect: true, effect: 'hp', value: 116, buff: true, level: 9, reqs: {classType: 'cleric'}, description: 'Heal Party +116'},
        {name: 'meteor storm', areaEffect: true, strength: 120, dmgType: 'fire', level: 9},
        {name: 'power word kill', strength: 100, dmgType: 'fire', level: 9},
        {name: 'weird', areaEffect: true, strength: 75, dmgType: 'psychic', level: 9},
      ],
    ],
    quests: [
      {objective: 'kill', target: 'monsters', goal: 10, reward: 150, progress: 0}, {objective: 'kill', target: 'monsters', goal: 25, reward: 500, progress: 0}, 
      {objective: 'kill', target: 'monsters', goal: 5, reward: 50, progress: 0}, 
      {objective: 'find', target: 'item', goal: 'c', reward: 'uc', progress: 0}, 
      {objective: 'find', target: 'item', goal: 'uc', reward: 'r', progress: 0}, 
      {objective: 'find', target: 'item', goal: 'r', reward: 'vr', progress: 0},
      {objective: 'explore', target: 0, goal: '0-5-3', reward: 'exp', progress: 0},
    ],
    combatMonsters: [],
    player: {
      characters: [],
      gold: 500,
      items: [],
      kills: {},
      quest: {},
      options: {},
      currentLocation: '0-1-1',
      explored: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    },
    location: 0,
    shop: 'general',
    shopItems: [],
    timer: 60000,
    timerInterval: null,
    selected: '',
    characterImgList: [],
    locationImgList: [],
    // max exp til next lvl
    levelUpChart: [500, 2600, 7200, 13300, 24200, 45000, 64400, 89900, 132600, 185000, 236000, 309600, 386400, 490000, 598000, 715000, 870000, 1098000, 1280000, 1474000],
    message: ''
  },
  getters: {

  },
  mutations: {
    selectCharacter(state, char){
      state.selected = char
    },
    bringOutYourDead(state){
      state.combatMonsters = []
    },
    destroyCharacter(state, characterId){
      state.player.characters = state.player.characters.filter(c => c.id != characterId)
    },
    reducePlayerGold(state, cost){
      state.player.gold -= cost
    },
    equipItem(state, data){
      let char = state.player.characters.find(c => c.id == data.characterId)
      if(Array.isArray(data.item.effect)){
        for(let i = 0; i < data.item.effect.length; i++){
          if(Array.isArray(char[data.item.effect[i]])){
            char[data.item.effect[i]].push(data.item.value[i])
          }else if(typeof char[data.item.effect[i]] === 'string'){
            char[data.item.effect[i]] = data.item.value[i]
          }
          else{
            char[data.item.effect[i]] += data.item.value[i]
          }
        }
      }else{
        if(Array.isArray(char[data.item.effect])){
          char[data.item.effect].push(data.item.value)
        }else if(typeof char[data.item.effect] === 'string'){
          char[data.item.effect] = data.item.value
        }else{
          char[data.item.effect] += data.item.value
        }
      }
      char[data.item.type] = data.item.id
    },
    unequipItem(state, data){
      let char = state.player.characters.find(c => c.id == data.characterId)
      if(Array.isArray(data.item.effect)){
        for(let i = 0; i < data.item.effect.length; i++){
          if(Array.isArray(char[data.item.effect[i]])){
            let index = char[data.item.effect[i]].indexOf(data.item.value[i])
            char[data.item.effect[i]].splice(index, 1)
          }else if(typeof char[data.item.effect[i]] === 'string'){
            let index = char.equipment.find(e => e.effect.includes('dmgType'))?.effect.indexOf('dmgType')

            char[data.item.effect[i]] = data.item.effect[i] == 'dmgType' ? char.equipment.find(e => e.effect.includes('dmgType'))?.value[index] ?? 'melee' : null
          }else{
            char[data.item.effect[i]] -= data.item.value[i]
          }
        }
      }else{
        if(Array.isArray(char[data.item.effect])){
          let index = char[data.item.effect].indexOf(data.item.value)
          char[data.item.effect].splice(index, 1)
        }else if(typeof char[data.item.effect] === 'string'){
          let index = char.equipment.find(e => e.effect.includes('dmgType'))?.effect.indexOf('dmgType')
          char[data.item.effect] = data.item.effect == 'dmgType' ? char.equipment.find(e => e.effect.includes('dmgType'))?.value[index] ?? 'melee' : null
        }else{
          char[data.item.effect] -= data.item.value
        }
      }
      char[data.item.type] = null
    },
    addStatsToMonster(state, data){
      let item = state.items.filter(i => i.name == data.item)
      item = item[0]
      let monster = state.combatMonsters.filter(cm => cm.id == data.monsterId)
      monster = monster[0]
      if(Array.isArray(item.effect)){
        for(let i = 0; i < item.effect.length; i++){
          if(Array.isArray(monster[item.effect[i]])){
            monster[item.effect[i]].push(item.value[i])
          }else{
            monster[item.effect[i]] += item.value[i]
          }
        }
      }else{
        if(Array.isArray(monster[item.effect])){
          monster[item.effect].push(item.value)
        }else{
          monster[item.effect] += item.value
        }
      }
    }
  },
  actions: {

  },
  modules: {
  }
})

export default store
