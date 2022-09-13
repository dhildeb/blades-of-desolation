export const setBonus = {
    'berserkers': [
        {effect: ['strength'], value: [5]},
        {effect: ['resistances', 'magicResistance'], value: ['fire', 5]},
    ],
    'isenhart\'s': [
        {effect: ['strength'], value: [2]},
        {effect: ['regen'], value: [1]},
        {effect: ['dmgType', 'lifeSteal'], value: ['radiant', 5]},
    ],
    'deaths': [
        {effect: ['baseMagic'], value: [3]},
        {effect: ['magicRegen'], value: [1]},
    ],
    'angelic raiment': [
        {effect: ['strength'], value: [5]},
        {effect: ['resistance', 'resistance'], value: ['cold', 'necrotic']},
        {effect: ['regen', 'magicRegen'], value: [2, 1]},
    ],
    'cathans traps': [
        {effect: ['magicResistance'], value: [5]},
        {effect: ['resistances'], value: ['lightning']},
        {effect: ['resistances'], value: ['fire']},
        {effect: ['thorns', 'magicRegen', 'lifeSteal'], value: [6, 1, 8]},

    ]
}