import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { AddMenuComponent } from '../components/add-menu/add-menu.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter' },
      ],
    },
  },
  { path: '/menus/add', component: AddMenuComponent },

];
