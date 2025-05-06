import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { games } from '../data/games';
import { getGameRules } from '../data/rules';
import { gameModules } from '../games';
import { Code2, Info } from 'lucide-react';

export const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // États du jeu
  const [isPaused, setIsPaused] = useState(false);         // État de pause
  const [showPauseMenu, setShowPauseMenu] = useState(false); // Menu de pause (touche P)
  const [showRotaryMenu, setShowRotaryMenu] = useState(false); // Menu rotatif (touche M)
  const [showRules, setShowRules] = useState(false);       // Panneau des règles (touche I)
  const [selectedIndex, setSelectedIndex] = useState(0);    // Sélection dans le menu rotatif
  
  // Références
  const gameContainerRef = useRef(null);
  const gameInstanceRef = useRef(null);

  // Chargement du jeu
  useEffect(() => {
    const loadGame = async () => {
      try {
        const gameModule = await gameModules[id]();
        gameInstanceRef.current = gameModule.default.mount(gameContainerRef.current, {
          onScore: (score) => console.log('Score:', score),
          onGameOver: () => console.log('Game Over'),
        });
      } catch (error) {
        console.error('Erreur de chargement:', error);
        navigate('/hub');
      }
    };

    loadGame();
    return () => {
      if (gameInstanceRef.current?.unmount) {
        gameInstanceRef.current.unmount();
      }
    };
  }, [id]);

  // Gestion des touches
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case 'p': // Touche P : Pause et menu de pause
          if (gameInstanceRef.current) {
            if (isPaused) {
              gameInstanceRef.current.resume();
              setShowPauseMenu(false);
              setShowRotaryMenu(false);
              setShowRules(false);
            } else {
              gameInstanceRef.current.pause();
              setShowPauseMenu(true);
            }
            setIsPaused(!isPaused);
          }
          break;

        case 'm': // Touche M : Menu rotatif (uniquement si en pause)
          if (isPaused) {
            setShowRotaryMenu(!showRotaryMenu);
            setShowPauseMenu(false);
            setShowRules(false);
          }
          break;

        case 'i': // Touche I : Afficher/masquer les règles du jeu
          if (gameInstanceRef.current) {
            if (showRules) {
              // Si les règles sont déjà affichées, les fermer
              setShowRules(false);
              // Si on était en pause avant d'ouvrir les règles, revenir au menu de pause
              // sinon reprendre le jeu
              if (isPaused && !showPauseMenu) {
                setShowPauseMenu(true);
              } else if (!isPaused) {
                gameInstanceRef.current.resume();
              }
            } else {
              // Si les règles ne sont pas affichées, les ouvrir
              if (!isPaused) {
                gameInstanceRef.current.pause();
                setIsPaused(true);
              }
              setShowRules(true);
              setShowPauseMenu(false);
              setShowRotaryMenu(false);
            }
          }
          break;

        case 'h': // Touche H : Retour à l'accueil
          navigate('/hub');
          break;

        case 'r': // Touche R : Recommencer
          if (gameInstanceRef.current?.reset) {
            gameInstanceRef.current.reset();
            setIsPaused(false);
            setShowPauseMenu(false);
            setShowRotaryMenu(false);
            setShowRules(false);
          }
          break;

        // Navigation dans le menu rotatif
        case 'arrowleft':
          if (showRotaryMenu) {
            setSelectedIndex((prev) => (prev - 1 + games.length) % games.length);
          }
          break;

        case 'arrowright':
          if (showRotaryMenu) {
            setSelectedIndex((prev) => (prev + 1) % games.length);
          }
          break;

        case 'enter':
          if (showRotaryMenu) {
            const selectedGame = games[selectedIndex];
            navigate(`/game/${selectedGame.id}`);
            setShowRotaryMenu(false);
            setIsPaused(false);
          }
          break;
          
        case 'escape':
          // Fermer les règles si elles sont affichées
          if (showRules) {
            setShowRules(false);
            if (isPaused && !showPauseMenu) {
              setShowPauseMenu(true);
            } else if (isPaused) {
              setIsPaused(false);
              gameInstanceRef.current?.resume();
            }
          }
          // Si on est dans d'autres menus, les gérer ici
          else if (showRotaryMenu) {
            setShowRotaryMenu(false);
            setShowPauseMenu(true);
          } else if (showPauseMenu) {
            setShowPauseMenu(false);
            setIsPaused(false);
            gameInstanceRef.current?.resume();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPaused, showRotaryMenu, showPauseMenu, showRules, selectedIndex]);

  // Si le jeu n'est pas trouvé
  const gameInfo = games.find(g => g.id === id);
  if (!gameInfo) return null;
  
  // Récupération des règles du jeu
  const gameRulesInfo = getGameRules(id);

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Instructions */}
      <div className="absolute top-4 left-4 z-50 text-white/60 text-sm">
        P: Pause • I: Règles • R: Recommencer • H: Accueil {isPaused && '• M: Menu rotatif'}
      </div>

      {/* Zone de jeu */}
      <div ref={gameContainerRef} className="w-full h-full" />

      {/* Menu de pause (touche P) */}
      <AnimatePresence>
        {showPauseMenu && isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="bg-white/10 p-8 rounded-xl text-white text-center">
              <h2 className="text-2xl font-bold mb-4">{gameInfo.title}</h2>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowPauseMenu(false);
                    setIsPaused(false);
                    if (gameInstanceRef.current) {
                      gameInstanceRef.current.resume();
                    }
                  }}
                  className="w-full p-2 bg-green-500 hover:bg-green-600 rounded"
                >
                  Reprendre
                </button>
                <button
                  onClick={() => {
                    if (gameInstanceRef.current?.reset) {
                      gameInstanceRef.current.reset();
                      setShowPauseMenu(false);
                      setIsPaused(false);
                    }
                  }}
                  className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded"
                >
                  Recommencer
                </button>
                <button
                  onClick={() => {
                    setShowPauseMenu(false);
                    setShowRules(true);
                  }}
                  className="w-full p-2 bg-indigo-500 hover:bg-indigo-600 rounded flex items-center justify-center"
                >
                  <Info size={18} className="mr-2" />
                  Règles du jeu
                </button>
                <button
                  onClick={() => navigate('/hub')}
                  className="w-full p-2 bg-purple-500 hover:bg-purple-600 rounded"
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu rotatif (touche M) */}
      <AnimatePresence>
        {showRotaryMenu && isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center perspective-1000">
              {games.map((game, index) => {
                const rotation = (index - selectedIndex) * 60;
                const radian = (rotation * Math.PI) / 180;
                const z = Math.cos(radian) * 150;
                
                return (
                  <motion.div
                    key={game.id}
                    initial={false}
                    animate={{
                      x: Math.sin(radian) * 300,
                      z,
                      rotateY: rotation,
                      opacity: z > 0 ? 1 : 0.3,
                      scale: z > 0 ? 1 : 0.8,
                    }}
                    style={{
                      position: 'absolute',
                      zIndex: games.length - Math.abs(index - selectedIndex),
                    }}
                    className="w-72 h-96 cursor-pointer preserve-3d"
                    onClick={() => {
                      if (index === selectedIndex) {
                        navigate(`/game/${game.id}`);
                        setShowRotaryMenu(false);
                        setIsPaused(false);
                      } else {
                        setSelectedIndex(index);
                      }
                    }}
                  >
                    <div className="w-full h-full backdrop-blur rounded-xl overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-40`} />
                      <div className={`w-full h-48 bg-gradient-to-br ${game.color}`}>
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl">{game.icon}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">{game.icon}</span>
                          <h3 className="text-xl font-bold text-white">{game.title}</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{game.description}</p>
                        <div className="flex items-center text-white/80">
                          <Code2 size={16} className="mr-2" />
                          <span className="text-sm">{game.technology}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
              ← → pour naviguer • Entrée pour sélectionner • M pour fermer
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panneau des règles du jeu (touche I) */}
      <AnimatePresence>
        {showRules && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-y-0 left-0 w-80 bg-gray-800/90 backdrop-blur-sm flex flex-col z-50 shadow-lg"
          >
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{gameInfo.icon}</span>
                <h2 className="text-2xl font-bold text-white">{gameInfo.title}</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Comment jouer</h3>
                <p className="text-gray-300 mb-4">{gameInfo.description}</p>
                
                {/* Instructions spécifiques au jeu - Chargées depuis rules.jsx */}
                <div className="space-y-2 text-gray-300 text-sm">
                  {gameRulesInfo.howToPlay.map((instruction, index) => (
                    <p key={`howto-${index}`}>• {instruction}</p>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Astuces</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  {gameRulesInfo.tips.map((tip, index) => (
                    <p key={`tip-${index}`}>• {tip}</p>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Informations</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>• Technologie: {gameInfo.technology}</p>
                  <p>• Difficulté: {gameRulesInfo.additionalInfo.difficulty}</p>
                  <p>• Recommandé pour: {gameRulesInfo.additionalInfo.recommendedFor}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-900/70 flex justify-between items-center">
              <button
                onClick={() => {
                  setShowRules(false);
                  if (isPaused && !showPauseMenu) {
                    setShowPauseMenu(true);
                  }
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white text-sm"
              >
                Fermer
              </button>
              
              <button
                onClick={() => {
                  setShowRules(false);
                  setIsPaused(false);
                  if (gameInstanceRef.current) {
                    gameInstanceRef.current.resume();
                  }
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm"
              >
                Reprendre le jeu
              </button>
            </div>
            
            <div className="absolute top-4 right-4">
              <button
                onClick={() => {
                  setShowRules(false);
                  if (isPaused && !showPauseMenu) {
                    setShowPauseMenu(true);
                  }
                }}
                className="p-1 bg-gray-700 hover:bg-gray-600 rounded-full text-white/70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};