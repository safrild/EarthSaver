import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WelcomeComponent} from './welcome/welcome.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {FeedComponent} from './feed/feed.component';
import {GroupsComponent} from './groups/groups.component';
import {ProfileComponent} from './profile/profile.component';
import {GroupComponent} from './groups/group/group.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
  {path: 'group', component: GroupComponent, canActivate: [AuthGuard]},
  {path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
