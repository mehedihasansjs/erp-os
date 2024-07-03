import { Injectable } from '@angular/core';

/**
 * The capabilities of a client device largely depend on the amount of available RAM.
 * Traditionally, developers had to use heuristics and either benchmark a device or
 * infer device capabilities based on other factors like the device manufacturer or User Agent strings.
 * 
 * The Device Memory API provides a way to determine the amount of RAM a device has.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Device_Memory_API
 */
@Injectable()
export class DeviceMemoryService {

  constructor() { }
}
