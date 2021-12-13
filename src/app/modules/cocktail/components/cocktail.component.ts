import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CocktailCategory, EditCocktail, FullCocktail, mockCocktail} from "../models/fullCocktail";
import {CocktailService} from "../services/cocktail.service";
import {HttpErrorResponse} from "@angular/common/http";
import {getUser} from "../../../core/models/user";
import {Roles} from "../../../core/models/roles";
import {FormControl, FormGroup} from "@angular/forms";
import {columnsToSortBy} from "../../cocktails/models/query";

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css', '../../../app.component.css']
})
export class CocktailComponent implements OnInit {
  id: number
  cocktailData: FullCocktail
  public editedCocktailData: EditCocktail;
  isNew: boolean
  defaultCocktailUrl: string = "https://www.yahire.com/blogs/wp-content/uploads/2017/04/summer-cocktails.jpg"
  defaultIngredientUrl: string = "https://zestfulkitchen.com/wp-content/uploads/2018/02/Blood-Orange-Cocktail_-11.jpg"
  defaultKitchenwareUrl: string = "https://crystalglasscentre.co.uk/uploads/images/full/IMG_7030_1302191412.jpg"
  canEdit: boolean = getUser().role === Roles.Moderator || getUser().role === Roles.Admin
  public loaded: boolean = false;
  viewMode: boolean = true;
  editCocktailForm: FormGroup;
  isAuthenticated: boolean = getUser().role !== Roles.Anonymous;
  allCategories: CocktailCategory[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private cocktailService: CocktailService,
              private router: Router) {
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
              this.initEditForm()
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
              this.initEditForm()
            },
            error => this.handleFetchError(error)
          )
      }
      cocktailService.fetchAllCocktailCategories()
        .subscribe(res => this.updateAllCategories(res),
          err => console.error(err))
    }
    this.editedCocktailData = this.initEditCocktailData()
    this.editCocktailForm = this.initEditForm()
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

  deleteCocktail(dishId: number) {
    this.cocktailService.deleteCocktail(dishId).subscribe(()=>{
        this.router.navigate(['/cocktails'])
      },
      err => console.error(err))
  }

  private initEditForm() : FormGroup {
    return new FormGroup({
      name: new FormControl(this.cocktailData.name),
      description: new FormControl(this.cocktailData.description),
      receipt: new FormControl(this.cocktailData.receipt),
      isActive: new FormControl(this.cocktailData.isActive),
      dishCategoryId: new FormControl(this.cocktailData.dishCategoryId),
      newLabel: new FormControl(this.editedCocktailData.newLabel)
    });
  }

  goToMode(view: boolean) {
    if(!view) {
      this.editedCocktailData = this.initEditCocktailData()
    }
    this.viewMode = view
  }

  private initEditCocktailData() {
    let labelsCopy : string[] = []
    this.cocktailData.labels.forEach(label => labelsCopy.push(label))
    return {
      name: this.cocktailData.name,
      description: this.cocktailData.description,
      receipt: this.cocktailData.receipt,
      dishId: this.cocktailData.dishId,
      dishCategoryId: this.cocktailData.dishCategoryId === null ? -1 : this.cocktailData.dishCategoryId,
      labels: labelsCopy,
      isActive: this.cocktailData.isActive,
      kitchenwareList: this.cocktailData.kitchenwareList.map(c => {
        return {
          kitchenwareId: c.kitchenwareId,
          name: c.name
        }
      }),
      ingredientList: this.cocktailData.ingredientList.map(c => {
        return {
          ingredientId: c.ingredientId,
          name: c.name
        }
      }),
      newLabel: ''
    }
  }

  private updateAllCategories(res: CocktailCategory[]) {
    this.allCategories = res;
    this.allCategories.push({categoryId: -1, categoryName: "Nothing"})
  }

  deleteLabel(label:string) {
    this.editedCocktailData.labels = this.editedCocktailData.labels.filter(l => l!=label)
  }

  editCocktail() {
    this.cocktailService.editCocktail(this.editedCocktailData).subscribe(() => {
      window.location.reload()
    })
  }

  // private labelsChanged(labels : string[], changedLabels : string[]) : boolean {
  //   if(labels.length != changedLabels.length) return false;
  //   for(let i : number = 0; i<labels.length; i += 1){
  //     if(labels[i] !== changedLabels[i]) return false
  //   }
  //   return true
  // }
  addLabel() {
    if(this.editedCocktailData.newLabel.length != 0 &&
      this.editedCocktailData.labels.indexOf(this.editedCocktailData.newLabel) == -1){
      this.editedCocktailData.labels.push(this.editedCocktailData.newLabel)
    }
    this.editedCocktailData.newLabel = ''
  }
}
