// Fichier contenant les règles et instructions pour chaque jeu

export const gameRules = {
    // Goomba Challenge
    'goomba-challenge': {
      howToPlay: [
        'Utilisez les flèches gauche/droite pour déplacer votre personnage',
        'Évitez les goombas qui tombent du ciel',
        'Plus vous restez longtemps en vie, plus vous gagnez de points',
        'Le jeu s\'accélère avec le temps'
      ],
      tips: [
        'Anticipez la trajectoire des goombas',
        'Ne restez pas immobile trop longtemps',
        'Parfois, il vaut mieux se déplacer au dernier moment',
        'Observez les motifs de chute pour prévoir les zones sûres'
      ],
      additionalInfo: {
        technology: 'DOM',
        difficulty: 'Progressive',
        recommendedFor: 'Tous les fans de Mario',
      }
    },
    
    // Mario Collision
    'collision': {
      howToPlay: [
        'Utilisez les flèches directionnelles pour vous déplacer',
        'Appuyez sur Espace pour sauter par-dessus les obstacles',
        'Collectez les pièces pour gagner des points',
        'Évitez les obstacles pour ne pas perdre de vies'
      ],
      tips: [
        'Passez rapidement avant d\'atteindre un obstacle',
        'Concentrez-vous sur les pièces dorées qui sont au passage entre les niveaux',
        'Le timing est crucial pour faire plusieur niveaux.',
      ],
      additionalInfo: {
        technology: 'Canvas',
        difficulty: 'Intermédiaire',
        recommendedFor: 'Joueurs qui aiment les défis de réflexes',
      }
    },
    
    // 3D Mario Land
    '3d-land': {
      howToPlay: [
        'Utilisez ZQSD pour vous déplacer dans l\'environnement 3D',
        'Espace pour sauter',
        'Récupérez les objets interactifs pour les activer',
        'Explorez le monde pour trouver des étoiles cachées'
      ],
      tips: [
        'Utilisez la caméra (touches fléchées) pour mieux observer votre environnement'
      ],
      additionalInfo: {
        technology: 'Babylon.js',
        difficulty: 'Variable selon les zones',
        recommendedFor: 'Explorateurs et amateurs de jeux 3D',
      }
    }
  };
  
  // Fonction d'aide pour récupérer les règles d'un jeu spécifique
  export const getGameRules = (gameId) => {
    return gameRules[gameId] || {
      howToPlay: ['Instructions non disponibles pour ce jeu'],
      tips: ['Astuces non disponibles pour ce jeu'],
      additionalInfo: {
        difficulty: 'Non spécifiée',
        recommendedFor: 'Tous les joueurs',
        averagePlaytime: 'Variable'
      }
    };
  };
  
 