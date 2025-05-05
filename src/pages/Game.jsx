import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { games } from '../data/games';
import { gameModules } from '../games';
import { Code2 } from 'lucide-react';

export const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // États du jeu
  const [isPaused, setIsPaused] = useState(false);         // État de pause
  const [showPauseMenu, setShowPauseMenu] = useState(false); // Menu de pause (touche P)
  const [showRotaryMenu, setShowRotaryMenu] = useState(false); // Menu rotatif (touche M)
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
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPaused, showRotaryMenu, showPauseMenu, selectedIndex]);

  // Si le jeu n'est pas trouvé
  const gameInfo = games.find(g => g.id === id);
  if (!gameInfo) return null;

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Instructions */}
      <div className="absolute top-4 left-4 z-50 text-white/60 text-sm">
        P: Pause • R: Recommencer • H: Accueil {isPaused && '• M: Menu rotatif'}
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
    </div>
  );
};