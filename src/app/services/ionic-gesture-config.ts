import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';

@Injectable()
export class IonicGestureConfig extends HammerGestureConfig {
    buildHammer(element: HTMLElement) {
        const mc = new (<any>window).Hammer(element);
        for (const eventName of Object.keys(this.overrides)) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    }
}