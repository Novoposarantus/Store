import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { TransferState } from "@angular/platform-browser";
import { isPlatformServer } from "@angular/common";

@Injectable()
export class ServerService {
    public isServer: boolean;
    constructor(private tstate: TransferState,
                @Inject(PLATFORM_ID) platformId) {
                    this.isServer = isPlatformServer(platformId);
                }
}
        