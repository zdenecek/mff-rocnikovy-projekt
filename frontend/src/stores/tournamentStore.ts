import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { Tournament } from "@/model/Tournament";

let instance: any;

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
        this.loading = true;
        const response = await axios.get("/tournaments");
        this.loading = false;
        this._tournaments = response.data.map(
          (tournament: Tournament) => new Tournament(tournament)
        );
      },
    async fetchTournamentById(id: number): Promise<Tournament> {
        // Check if the tournament is already in the state

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
      async deleteTournament(id: number) {
        await axios.delete(`/tournaments/${id}`);
        this._tournaments = this._tournaments.filter(
          (tournament) => tournament.id !== id
        );
      },

      async deleteTournaments(ids: number[]) {
        await axios.post(`/tournaments/delete`, { ids });
        this._tournaments = this._tournaments.filter(
          (tournament) => !ids.includes(tournament.id)
        );
      },
      async updateTournament(tournament: Tournament) {
        await axios.put(`/tournaments/${tournament.id}`, tournament);
        const index = this._tournaments.findIndex(
          (t) => t.id === tournament.id
        );
        this._tournaments[index] = tournament;
      }
    },
    getters: {
      tournaments(state): Tournament[] {
        return state._tournaments;
      },
    },
  });

  instance = tournamentStore();
  // Initialize the store
  if (!instance._initialized) {
    instance.fetchTournaments();
    instance._initialized = true;
  }

  return instance;
};
