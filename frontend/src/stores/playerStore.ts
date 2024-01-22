import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { Player } from "@/model/Player";

export const usePlayerStore = () => {
  const playerStore = defineStore({
    id: "player",
    state: () => ({
      players: [] as Player[],
      loading: false,
      _initialized: false,
    }),
    actions: {
      async fetchPlayers() {
        console.debug("fetching players");
        this.loading = true;
        const response = await axios.get("/players");
        this.loading = false;
        this.players = response.data.map(
          (player: Player) => new Player(player)
        );
      },
      async fetchPlayerById(id: number) {
        // Check if the tournament is already in the state
        const player = this.players.find((player) => player.id === id);
        if (player) {
          return player;
        } else {
          const response = await axios.get(`/players/${id}`);
          return response.data;
        }
      },
      async addPlayer( lastName: string,  firstName?: string, federationId?: string) {
        const response = await axios.post("/players", {
          lastName,
          firstName,
          federationId,
        });
        this.players.push(response.data);
      }
    },
  });

  const instance = playerStore();
  // Initialize the store
  if (!instance._initialized) {
    instance._initialized = true;
    instance.fetchPlayers();
  }

  return instance;
};
