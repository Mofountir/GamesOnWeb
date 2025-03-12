import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameCard } from '../components/GameCard';
import { useAuthStore } from '../store/useStore';
import { LogOut } from 'lucide-react';
import { games } from '../data/games';
import { useTranslation } from 'react-i18next';

export const GameHub = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center space-x-4">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            src={user?.avatar}
            alt="Avatar"
            className="w-16 h-16 rounded-full ring-4 ring-purple-500/20"
          />
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
            >
              {t('welcome.back')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300"
            >
              {user?.username}
            </motion.p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={20} />
          <span>{t('welcome.logout')}</span>
        </motion.button>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {games.map((game) => (
          <motion.div key={game.id} variants={item}>
            <GameCard
              game={{
                ...game,
                title: t(`games.${game.id}.title`),
                description: t(`games.${game.id}.description`),
                technology: t(`games.${game.id}.tech`),
                techDescription: t(`games.${game.id}.techDesc`)
              }}
              onClick={() => navigate(`/game/${game.id}`)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};