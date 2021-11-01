import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import PageSpinner from '../../components/PageSpinner';
import GameplaySettings from '../Gameplay/GameplaySettings';
import LeagueSettings from '../League/LeagueSettings';
import MissionAndRewardList from '../Mission/MissionAndRewardList';
import Leaderboard from '../Leaderboard/Leaderboard';
import CustomLeagueSettings from '../League/CustomLeagueSettings';
import PlayerSearch from '../Player/PlayerSearch';
import PlayerDetail from '../Player/PlayerDetail';
import PlayerTransaction from '../Player/PlayerTransaction';
import LeagueList from '../League/LeagueList';
import { BASE_PATH } from '../../config/settings';
import LeagueEdit from '../League/LeagueEdit';


//different routes of the project
const routePaths = [
  { to: '/', title: [{route: '/', title: 'Gameplay Settings'}], Component: GameplaySettings },
  { to: '/gameplay_settings', title: [{route: '/gameplay_settings', title: 'Gameplay Settings'}], Component: GameplaySettings },
  { to: '/league_settings', title: [{route: '/league_settings', title: 'League Settings'}], Component: LeagueSettings },
  { to: '/mission_and_reward', title: [{route: '/mission_and_reward', title: 'Mission And Rewards'}], Component: MissionAndRewardList },
  { to: '/leaderboard', title: [{route: '/leaderboard', title: 'Leaderboard Rewards'}], Component: Leaderboard },
  { to: '/custom_league', title: [{route: '/custom_league', title: 'Custom League'}], Component: CustomLeagueSettings },
  { to: '/player_search', title: [{route: '/player_search', title: 'Player\'s Management'}], Component: PlayerSearch },
  { to: '/player_detail/:name', title: '', Component: PlayerDetail },
  { to: '/player_transaction/:id', title: '', Component: PlayerTransaction },
  { to: '/league_list', title: '', Component: LeagueList },
  { to: '/league_edit', title: [{route: '/league_edit', title: 'League Edit'}], Component: LeagueEdit },
];

export default function Home(props) {
  // const [routeTitle, setRouteTitle] = useState("");
  const [routeBreadCrumbs, setRouteBreadCrumbs] = useState([]);
  return (
    <Router basename={BASE_PATH}>
      <div className="d-flex">
        <MainLayout {...props} breakpoint={props.breakpoint} routeTitle={routeBreadCrumbs}>
          <React.Suspense fallback={<PageSpinner />}>
            {routePaths.map(({ to, Component, title }) => (<Route key={to} exact path={to} render={() => { 
              // setRouteTitle(title ? title : routeBreadCrumbs); 
              return (<Component {...props} setRouteBreadCrumbs={(updatedRoutes) => {setRouteBreadCrumbs(updatedRoutes)}} routeBreadCrumbs={routeBreadCrumbs}/>) }} />))}
          </React.Suspense>
        </MainLayout>
      </div>
    </Router>
  );
}
