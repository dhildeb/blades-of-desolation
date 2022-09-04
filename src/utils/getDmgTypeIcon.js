export function getDmgTypeIcon(dmgType){
    let icon = ''
    switch(dmgType){
        case 'melee':
            icon = '<i class="fas fa-swords"></i>'
        break
        case 'cold':
            icon = '<i class="fas fa-snowflake"></i>'
        break
        case 'fire':
            icon = '<i class="fad fa-fire"></i>'
        break
        case 'lightning':
            icon = '<i class="fal fa-bolt"></i>'
        break
        case 'magic':
            icon = '<i class="far fa-sparkles"></i>'
        break
        case 'acid':
            icon = '<i class="fad fa-vial"></i>'
        break
        case 'necrotic':
            icon = '<i class="far fa-skull-crossbones"></i>'
        break
        case 'poison':
            icon = '<i class="far fa-flask-poison"></i>'
        break
        case 'psychic':
            icon = '<i class="fal fa-eye"></i>'
        break
        case 'radiant':
            icon = '<i class="fad fa-sun"></i>'
        break
    }
    return icon
}