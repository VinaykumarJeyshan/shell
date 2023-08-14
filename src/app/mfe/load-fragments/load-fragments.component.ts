import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PluginOptions } from 'src/app/model/mf.model';
@Component({
  selector: 'app-load-fragments',
  template: ` <ng-container #placeHolder></ng-container> `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadFragmentsComponent implements OnChanges {
  @ViewChild('placeHolder', { read: ViewContainerRef, static: true })
  viewContainer!: ViewContainerRef;
  @Input() options!: PluginOptions;
  async ngOnChanges() {
    this.viewContainer.clear();
    const component = await loadRemoteModule(this.options!).then(
      (m) => {
        console.log(m);return m[this.options?.componentName]
      }
    );
    component && this.viewContainer?.createComponent(component);
  }
}