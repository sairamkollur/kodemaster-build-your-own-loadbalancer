import { BEServerHealth } from './utils/enums';

export interface IBackendServerDetails {
    url: string;
    serverWeight: number;
    requestsServed: number;
    currentConnections: number;

    getStatus(): BEServerHealth;
    setStatus(status: BEServerHealth): void;

    incrementRequestsServed(): void;
    resetMetrics(): void;
}

export class BackendServerDetails implements IBackendServerDetails {
    public url: string;
    public serverWeight: number;
    public requestsServed: number;
    public currentConnections: number;
    private status: BEServerHealth;

    constructor(url: string, serverWeight: number) {
        this.url = url;
        this.serverWeight = serverWeight;
        this.requestsServed = 0;
        this.currentConnections = 0;
        this.status = BEServerHealth.UNHEALTHY;
    }

    public getStatus(): BEServerHealth {
        return this.status;
    }

    public setStatus(status: BEServerHealth): void {
        this.status = status;
    }

    public incrementRequestsServed(): void {
        this.requestsServed++;
    }

    public resetMetrics(): void {
        this.requestsServed = 0;
        this.currentConnections = 0;
    }
}