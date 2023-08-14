import { getManifest } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';
import { CustomManifest, CustomRemoteConfig } from '../model/mf.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  remotes: CustomRemoteConfig[] = [];
  constructor() { }
  ngOnInit(): void {
    const manifest = getManifest<CustomManifest>();
    this.remotes = Object.values(manifest).filter((v) => v.viaRoute === true);
  }
}
