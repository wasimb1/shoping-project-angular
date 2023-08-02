import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeBookComponent } from './components/recipe-book/recipe-book.component';
import { RecipeListComponent } from './components/recipe-book/recipe-list/recipe-list.component';
import { RecipeIngredientComponent } from './components/recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.component';
import { RecipeDetailComponent } from './components/recipe-book/recipe-detail/recipe-detail.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecipeComponent } from './components/recipe-book/recipe-list/recipe/recipe.component';
import { AppBackgroundDirective } from './directives/app-background.directive';
import { appRoutingModule } from './app-routingModule';
import { FirstcomponentComponent } from './components/firstcomponent/firstcomponent.component';
import { RecipeEditComponent } from './components/recipe-book/recipe-edit/recipe-edit.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SearchIngredientListComponent } from './common/components/search-ingredient-list/search-ingredient-list.component';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ShoppingListComponent,
        RecipeBookComponent,
        RecipeListComponent,
        RecipeIngredientComponent,
        RecipeDetailComponent,
        ShoppingEditComponent,
        FooterComponent,
        RecipeComponent,
        AppBackgroundDirective,
        FirstcomponentComponent,
        RecipeEditComponent,
      ClickOutsideDirective,
      SearchIngredientListComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        appRoutingModule,
        ReactiveFormsModule
    ]
})
export class AppModule {}
