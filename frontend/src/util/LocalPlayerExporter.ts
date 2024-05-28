import { Player } from '@/models/Player';

export class LocalPlayerExporter {
    static async exportPlayers(players: Player[]) {

        const csvContent = players.map(player => {
            return `${player.id},${player.firstName},${player.lastName},${player.federationId || ''},${player.birthdate?.toISOString().split('T')[0] || ''},${player.category || ''}`;
        }).join('\n');

        const header = 'ID,First Name,Last Name,Federation ID,Birthdate,Category\n';
        const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `players.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
