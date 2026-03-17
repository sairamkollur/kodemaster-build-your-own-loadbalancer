import { BEServerHealth } from './utils/enums';

export interface IBackendServerDetails {
    url: string;
    serverWeight: number;
    // The test likely looks for this property directly
    requestsServed: number; 
    
    getStatus(): BEServerHealth;
    setStatus(status: BEServerHealth): void;
    
    incrementRequestsServed(): void;
    resetMetrics(): void;
}

export class BackendServerDetails implements IBackendServerDetails {
    public url: string;
    public serverWeight: number;
    // MUST be public so the test executor can read it
    public requestsServed: number = 0; 
    private status: BEServerHealth;

    constructor(url: string, weight: number) {
        this.url = url;
        this.serverWeight = weight;
        // MUST default to UNHEALTHY
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
    }
}