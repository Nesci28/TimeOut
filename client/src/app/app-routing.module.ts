import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'timer',
    loadChildren: () =>
      import('./components/timer/timer.module').then((m) => m.TimerModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./components/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  {
    path: 'overlay',
    loadChildren: () =>
      import('./components/overlay/overlay.module').then(
        (m) => m.OverlayModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
