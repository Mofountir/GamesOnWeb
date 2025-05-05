import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Timer, Star, Trophy } from 'lucide-react';

export const GameCard = ({ game, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer group"
      onClick={onClick}
    >
      {/* Gradient de fond */}
      <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

      {/* Contenu de la carte */}
      <div className="relative">
        {/* Image du jeu avec overlay */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
          <div 
            className={`w-full h-full bg-gradient-to-br ${game.color} transform group-hover:scale-105 transition-transform duration-300`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl">{game.icon}</span>
            </div>
          </div>
          {/* Badge technologie */}
          <div className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
            <div className="flex items-center space-x-1.5">
              <Code2 size={14} className="text-white" />
              <span className="text-xs font-medium text-white">{game.technology}</span>
            </div>
          </div>
        </div>

        {/* Informations du jeu */}
        <div className="p-4">
          {/* En-tête avec icône et titre */}
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
              <span className="text-2xl">{game.icon}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {game.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {game.description}
          </p>

          {/* Caractéristiques du jeu */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <Timer size={16} className="text-gray-500 dark:text-gray-400 mr-1.5" />
              <span className="text-xs text-gray-600 dark:text-gray-300">2-5 min</span>
            </div>
            <div className="flex items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <Star size={16} className="text-gray-500 dark:text-gray-400 mr-1.5" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Tous niveaux</span>
            </div>
            <div className="flex items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <Trophy size={16} className="text-gray-500 dark:text-gray-400 mr-1.5" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Classement</span>
            </div>
          </div>

          {/* Bouton jouer */}
          <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-colors text-sm font-medium">
            Jouer maintenant
          </button>
        </div>
      </div>
    </motion.div>
  );
};