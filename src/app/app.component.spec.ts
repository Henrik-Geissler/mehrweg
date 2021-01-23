/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, TestBed } from '@angular/core/testing'
import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import { AppComponent } from './app.component'

describe('AppComponent', () => {
  let platformReadySpy
  let platformSpy
  let splashScreenSpy
  let statusBarSpy
  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault'])
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide'])
    platformReadySpy = Promise.resolve()
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy })
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })
  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent)
    expect(platformSpy.ready).toHaveBeenCalled()
    await platformReadySpy
    expect(statusBarSpy.styleDefault).toHaveBeenCalled()
    expect(splashScreenSpy.hide).toHaveBeenCalled()
  })

  // TODO: add more tests!
})
