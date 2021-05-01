import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    //redirectTo: 'login', pathMatch: 'full' // makes default to login page instead of the home page
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'add-community',
    loadChildren: () => import('./add-community/add-community.module').then( m => m.AddCommunityPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'community-page',
    loadChildren: () => import('./community-page/community-page.module').then( m => m.CommunityPagePageModule)
  },
  {
    path: 'community-details',
    loadChildren: () => import('./community-details/community-details.module').then( m => m.CommunityDetailsPageModule)
  },  {
    path: 'join-community',
    loadChildren: () => import('./join-community/join-community.module').then( m => m.JoinCommunityPageModule)
  },
  {
    path: 'community-calendar',
    loadChildren: () => import('./community-calendar/community-calendar.module').then( m => m.CommunityCalendarPageModule)
  },
  {
    path: 'manage-members',
    loadChildren: () => import('./manage-members/manage-members.module').then( m => m.ManageMembersPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
