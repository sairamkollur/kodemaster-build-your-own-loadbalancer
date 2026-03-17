import { BEServerHealth } from './utils/enums';

export interface IBackendServerDetails {
    url: string;
    serverWeight: number;
    
    // Status
    getStatus(): BEServerHealth;
    setStatus(status: BEServerHealth): void;
    
    // Metrics
    incrementRequestsServed(): void;
    getRequestsServed(): number; // Added this getter
    resetMetrics(): void;
}

export class BackendServerDetails implements IBackendServerDetails {
    public url: string;
    public serverWeight: number;
    private status: BEServerHealth;
    private requestsServed: number = 0;

    constructor(url: string, weight: number) {
        this.url = url;
        this.serverWeight = weight;
        // Default to UNHEALTHY per requirements
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

    // Adding this so the test executor can actually see the count
    public getRequestsServed(): number {
        return this.requestsServed;
    }

    public resetMetrics(): void {
        this.requestsServed = 0;
    }
}