/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import type { Router } from '@angular/router';
import type { AlertController } from '@ionic/angular';
import { take, tap } from 'rxjs/operators';

import type { ActionService } from '../shared/services/action.service';

@Component({
  selector: 'app-scanner',
  styleUrls: ['./scanner.component.scss'],
  templateUrl: './scanner.component.html',
})
export class ScannerComponent implements OnInit {
  availableCameras: MediaDeviceInfo[]

  currentDevice: MediaDeviceInfo = null

  torchEnabled = false

  torchCompatible = false

  private currentCameraIndex = 0

  constructor(
    private readonly alertController: AlertController,
    private readonly actionService: ActionService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  onHasPermission(hasPermissions: boolean): void {
    if (!hasPermissions) {
      this.alertController
        .create({
          buttons: ['Ok'],
          header: 'No permission',
          message:
            'To use this application you need to give permission to use the camera.',
        })
        .then(alert => alert.present())
    }
  }

  onIsTorchCompatible(compatible: boolean): void {
    this.torchCompatible = compatible
  }

  onCamerasFound(cameras: MediaDeviceInfo[]): void {
    this.availableCameras = cameras
    this.currentDevice = this.availableCameras[0]
  }

  onCodeResult(resultString: string): void {
    console.log(resultString)
    this.actionService
      .handleScan(resultString)
      .pipe(
        take(1),
        tap(index => console.log('saved', index))
      )
      .subscribe(
        (index: number) => this.router.navigateByUrl(`/tabs/details/${index}`)
        // TODO: Error handling
      )
  }

  switchCamera(): void {
    this.currentCameraIndex++
    if (this.currentCameraIndex === this.availableCameras.length) {
      this.currentCameraIndex = 0
    }
        this.currentDevice = this.availableCameras[this.currentCameraIndex];
  }
}
