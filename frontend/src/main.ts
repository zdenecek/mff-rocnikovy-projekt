import "reflect-metadata";
import { createApp } from 'vue'
import App from './App.vue'
import { router, registerMiddleware } from '@/router'
import axios from 'axios';
import { container } from '@/container';
import { UserServiceContract } from './service/UserServiceContract';
import { UserRepositoryContract } from './repository/UserRepositoryContract';
import { TournamentRepositoryContract } from "./repository/TournamentRepositoryContract";
import { PlayerRepositoryContract } from "./repository/PlayerRepositoryContract";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Accept'] = "application/json";
axios.defaults.withCredentials = true;

const userService = container.resolve<UserServiceContract>("UserServiceContract");

registerMiddleware(userService);

// preload user
userService.user();

// TODO replace strings with symbols
// TODO replace dependecies with lambdas 
// TODO pass error message outside of query (use state manager?)

const dependencies =  {
    userService: container.resolve<UserServiceContract>("UserServiceContract"),
    userRepository: container.resolve<UserRepositoryContract>("UserRepositoryContract"),
    tournamentRepository: container.resolve<TournamentRepositoryContract>("TournamentRepositoryContract"),
    playerRepository: container.resolve<PlayerRepositoryContract>("PlayerRepositoryContract"),
};

createApp(App, dependencies).use(router).mount('#app')
