export interface ICensito{
        id: number;
        codScout: string;
        nome: string;
        cognome: string;
        dataNascita: string; // ISO date string
        mail: string;
        attivo: boolean;

        luogoNascita?: string;
        tel?: string;
        cell?: string;
}
