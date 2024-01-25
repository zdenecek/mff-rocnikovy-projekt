import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { Tournament } from "@/model/Tournament";

export const useTournamentStore = () => {
  const tournamentStore = defineStore({
    id: "tournament",
    state: () => ({
      _tournaments: [] as Tournament[],
      loading: false,
      _initialized: false,
    }),

    actions: {
      async fetchTournaments() {
        console.debug("fetching tournaments");
        this.loading = true;
        const response = await axios.get("/tournaments");
        this.loading = false;
        this._tournaments = response.data.map(
          (tournament: Tournament) => new Tournament(tournament)
        );
      },
      async fetchTournamentById(id: number): Promise<Tournament> {
        // Check if the tournament is already in the state

        console.debug(`fetching tournament by id ${id}`);
        const tournament = this.tournaments.find(
          (tournament) => tournament.id === id
        );
        if (tournament && tournament.results) {
          // If the tournament is in the state, return it
          return tournament;
        } else {
          // If the tournament is not in the state, fetch it from the server
          const response = await axios.get(`/tournaments/${id}`);
          return new Tournament(response.data);
        }
      },
    },
    getters: {
      tournaments(state): Tournament[] {
        return state._tournaments;
      },
    },
  });

  const instance = tournamentStore();
  // Initialize the store
  if (!instance._initialized) {
    instance.fetchTournaments();
    instance._initialized = true;
  }

  return instance;
};
