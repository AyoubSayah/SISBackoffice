import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/error-pages/not-found/not-found.component';

const routes: Routes = [{
  path: '', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  // canActivate: [SubjectsGuard]
}, {
  path: 'subjects', loadChildren: () => import('./features/subject/subject.module').then(m => m.SubjectModule),
},

{ path: '404', component: NotFoundComponent },

{ path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
