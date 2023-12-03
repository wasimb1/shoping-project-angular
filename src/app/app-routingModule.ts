import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeBookComponent } from "./components/recipe-book/recipe-book.component";
import { RecipeDetailComponent } from "./components/recipe-book/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
import { FirstcomponentComponent } from "./components/firstcomponent/firstcomponent.component";
import { RecipeEditComponent } from "./components/recipe-book/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./common/services/recipe-resolver.service";

const appRoutes: Routes = [
  {
    path: 'recipesbook', component: RecipeBookComponent, children: [
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
      { path: ':id/edit', component: RecipeEditComponent , resolve: [RecipeResolverService]},
      { path: '', component: FirstcomponentComponent },
    ]
  },
    { path: 'shopinglist', component: ShoppingListComponent },
    { path: '', redirectTo: '/recipesbook', pathMatch: 'full' },
  ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class appRoutingModule {
}
