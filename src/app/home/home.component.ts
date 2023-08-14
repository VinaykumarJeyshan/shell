import { Component, OnInit } from '@angular/core';
import { CustomManifest, PluginOptions } from '../model/mf.model';
import { getManifest } from '@angular-architects/module-federation';
import { ShareLibService } from 'share-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options: PluginOptions[] = [];
  constructor(private readonly shareLib: ShareLibService) {}
  ngOnInit(): void {
    const manifest = getManifest<CustomManifest>();
     
    // filter remote mfe's which needs to loaded inside page (not via route)
    this.options = Object.values(manifest).filter(
      (v) => v.withInPage === true    
    ) as PluginOptions[];
  }

  sendData() {
    this.shareLib.addName('test');
  }
}
