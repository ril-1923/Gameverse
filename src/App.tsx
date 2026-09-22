import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from './contexts/AppProviders';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import Categories from './pages/Categories';
import Leaderboard from './pages/Leaderboard';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Achievements from './pages/Achievements';
import Play from './pages/Play';
import Search from './pages/Search';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AppProviders>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="games" element={<Games />} />
            <Route path="games/:id" element={<GameDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="play/*" element={<Play />} />
            <Route path="search" element={<Search />} />
            <Route path="settings" element={<Settings />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProviders>
  );
}
