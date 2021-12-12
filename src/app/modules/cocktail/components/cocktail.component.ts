import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FullCocktail, mockCocktail} from "../models/fullCocktail";
import {CocktailService} from "../services/cocktail.service";
import {HttpErrorResponse} from "@angular/common/http";
import {getUser} from "../../../core/models/user";
import {Roles} from "../../../core/models/roles";

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {
  id: number
  cocktailData: FullCocktail
  isNew: boolean
  defaultCocktailUrl: string = "https://www.yahire.com/blogs/wp-content/uploads/2017/04/summer-cocktails.jpg"
  defaultIngredientUrl: string = "https://zestfulkitchen.com/wp-content/uploads/2018/02/Blood-Orange-Cocktail_-11.jpg"
  defaultKitchenwareUrl: string = "https://crystalglasscentre.co.uk/uploads/images/full/IMG_7030_1302191412.jpg"
  canEdit: boolean = getUser().role === Roles.Moderator || getUser().role === Roles.Admin
  public loaded: boolean = false;

  constructor(private activateRoute: ActivatedRoute,
              private cocktailService: CocktailService) {
    this.id = (Number)(activateRoute.snapshot.paramMap.get('id'))
    this.isNew = this.id === Number.NaN
    this.cocktailData = mockCocktail()
    if(!this.isNew){
      if(this.canEdit){
        cocktailService.fetchCocktail(this.id)
          .subscribe(
            res => {
              this.cocktailData = res
              this.loaded = true
            },
            error => this.handleFetchError(error)
          )
      }
      else{
        cocktailService.fetchActiveCocktail(this.id)
          .subscribe(
            res => {
              this.cocktailData = res
              this.loaded = true
            },
            error => this.handleFetchError(error)
          )
      }
    }
  }

  ngOnInit(): void {
  }

  private handleFetchError(error: HttpErrorResponse) {
    this.loaded = false;
    if(error.status===404) console.error("Not found: "+error.message)
    else if(error.status === 403) console.error("Forbidden: "+error.message)
    else console.error("Unknown: "+error.message)
  }

  likeCocktail() {
    this.cocktailService.likeCocktail(this.cocktailData.dishId)
      .subscribe(() => {
        this.cocktailData.likes += 1
        this.cocktailData.hasLike = true
      },
      err => console.error(err))
  }

  divideReceiptIntoLines(receipt: string) : string[] {
    return receipt.split('\n\n')
  }

  deleteIngredient(ingredientId: any) {
    this.cocktailService.removeIngredient(ingredientId, this.cocktailData.dishId)
      .subscribe(()=>{
        this.cocktailData.ingredientList = this.cocktailData.ingredientList.filter(i => i.ingredientId !== ingredientId)
      },
          err => console.error(err))
  }

  deleteKitchenware(kitchenwareId: any) {
    this.cocktailService.removeKitchenware(kitchenwareId, this.cocktailData.dishId)
      .subscribe(()=>{
          this.cocktailData.kitchenwareList = this.cocktailData.kitchenwareList.filter(i => i.kitchenwareId !== kitchenwareId)
        },
        err => console.error(err))
  }
}
