import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { Player } from "@/model/Player";
import { LocalPlayerExporter } from "@/util/LocalPlayerExporter";

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
          const response = await axios.get(`/players/id/${id}`);
          return response.data;
        }
      },
      async addPlayer(
        lastName: string,
        firstName?: string,
        federationId?: string
      ) {
        const response = await axios.post("/players", {
          lastName,
          firstName,
          federationId,
        });
        this.players.push(response.data);
      },
      async importPlayers(importName: string, data: any): Promise<void> {
        await axios.post(`/players/import`, {players: data, importName});
        this.fetchPlayers();
      },
      async updatePlayer(player: Player) {
        const response = await axios.patch(`/players/${player.id}`, player);
        const index = this.players.findIndex((p) => p.id === player.id);
        this.players[index] = new Player(response.data.player);
      },
      async deletePlayer(player: Player) {
        await axios.delete(`/players/${player.id}`);
        this.players = this.players.filter((p) => p.id !== player.id);
      },
      async deletePlayers(players: Player[]) {
        const ids = players.map((p) => p.id);
        await axios.post("/players/delete", { ids });
        this.players = this.players.filter(
          (player) => !ids.includes(player.id)
        );
      },
      async exportPlayers(players: Player[]) {
        await LocalPlayerExporter.exportPlayers(players);
      },
      async searchPlayers(query: string): Promise<Player[]> {
        const response = await axios.get(`/players/search?q=${query}`);
        return response.data.map((player: Player) => new Player(player));
      },
    async searchManyPlayers(queries: string[]): Promise<Player[][]> {
        const response = await axios.post(`/players/search`, {
          queries,
        });
        return response.data.map((res: any) => res.map((player: Player) => new Player(player)));
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
