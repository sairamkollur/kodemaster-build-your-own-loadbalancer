import { BEServerHealth } from './utils/enums';

export interface IBackendServerDetails {
    url: string;
    serverWeight: number;
    
    // Status
    getStatus(): BEServerHealth;
    setStatus(status: BEServerHealth): void;
    
    // Metrics
    incrementRequestsServed(): void;
    resetMetrics(): void;
}

export class BackendServerDetails implements IBackendServerDetails {
    public url: string;
    public serverWeight: number;
    private status: BEServerHealth;
    // Removing 'public' and keeping it strictly to the interface requirements
    private requestsServed: number = 0;

    constructor(url: string, weight: number) {
        this.url = url;
        this.serverWeight = weight;
        this.status = BEServerHealth.UNHEALTHY;
    }

    public getStatus(): BEServerHealth {
        return this.status;
    }

    public setStatus(status: BEServerHealth): void {
        this.status = status;
    }

    public incrementRequestsServed(): void {
        // Use the += operator to be safe
        this.requestsServed += 1;
    }

    public resetMetrics(): void {
        this.requestsServed = 0;
    }
}