import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CocktailCategory, EditCocktail, FullCocktail, mockCocktail} from "../models/fullCocktail";
import {CocktailService} from "../services/cocktail.service";
import {HttpErrorResponse} from "@angular/common/http";
import {getUser} from "../../../core/models/user";
import {Roles} from "../../../core/models/roles";
import {FormControl, FormGroup} from "@angular/forms";
import {columnsToSortBy} from "../../cocktails/models/query";
import {Observable, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, startWith, switchMap} from "rxjs/operators";
import {IngredientName, KitchenwareName} from "../../cocktails/models/IngredientName";

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
  ingredientFormControl: FormControl = new FormControl()
  kitchenwareFormControl: FormControl = new FormControl();
  filteredOptionsForIngredients: Observable<IngredientName[]>;
  filteredOptionsForKitchenware: Observable<KitchenwareName[]>;
  private subscription: Subscription = new Subscription()
  canAddLabel: boolean = false;

  constructor(private activateRoute: ActivatedRoute,
              private cocktailService: CocktailService,
              private router: Router) {
    const idParam: string | null = activateRoute.snapshot.paramMap.get('id')
    this.id = (Number)(idParam)
    this.isNew = idParam === "create" && this.canEdit
    if (this.isNew) this.viewMode = false
    this.cocktailData = mockCocktail()
    if (!Number.isNaN(this.id) || this.isNew) {
      if (!Number.isNaN(this.id)) {
        if (this.canEdit) {
          this.subscription.add(
            cocktailService.fetchCocktail(this.id)
              .subscribe(
                res => {
                  this.cocktailData = res
                  this.loaded = true
                  this.initEditForm()
                },
                error => this.handleFetchError(error)
              ))
        } else {
          this.subscription.add(
            cocktailService.fetchActiveCocktail(this.id)
              .subscribe(
                res => {
                  this.cocktailData = res
                  this.loaded = true
                  this.initEditForm()
                },
                error => this.handleFetchError(error)
              ))
        }
      } else {
// new
      }
      this.subscription.add(
        cocktailService.fetchAllCocktailCategories()
          .subscribe(res => this.updateAllCategories(res),
            err => console.error(err)))


    }
    this.editedCocktailData = this.initEditCocktailData()
    this.editCocktailForm = this.initEditForm()

    this.filteredOptionsForIngredients = this.ingredientFormControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => {
          return this.cocktailService.fetchIngredientsByPrefix(val || '', this.canEdit)
        })
      );

    this.filteredOptionsForKitchenware = this.kitchenwareFormControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => {
          return this.cocktailService.fetchKitchenwareByPrefix(val || '', this.canEdit)
        })
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private handleFetchError(error: HttpErrorResponse) {
    this.loaded = false;
    if (error.status === 404) console.error("Not found: " + error.message)
    else if (error.status === 403) console.error("Forbidden: " + error.message)
    else console.error("Unknown: " + error.message)
  }

  likeCocktail() {
    this.subscription.add(this.cocktailService.likeCocktail(this.cocktailData.dishId)
      .subscribe(() => {
          this.cocktailData.likes += 1
          this.cocktailData.hasLike = true
        },
        err => console.error(err)))
  }

  divideReceiptIntoLines(receipt: string): string[] {
    return receipt.split('\n\n')
  }

  deleteCocktail(dishId: number) {
    this.subscription.add(
      this.cocktailService.deleteCocktail(dishId).subscribe(() => {
          this.router.navigate(['/cocktails'])
        },
        err => console.error(err)))
  }

  private initEditForm(): FormGroup {
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
    if (!view) {
      this.editedCocktailData = this.initEditCocktailData()
    }
    this.viewMode = view
  }

  private initEditCocktailData() {
    let labelsCopy: string[] = []
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

  deleteLabel(label: string) {
    this.editedCocktailData.labels = this.editedCocktailData.labels.filter(l => l != label)
  }

  submitSaveForm() {
    if (this.isNew) {
      this.subscription.add(
        this.cocktailService.createCocktail(this.editedCocktailData).subscribe(res => {
            // this.router.navigate(['/cocktails/', res.dishId])
          document.location = '/cocktails/'+res.dishId
          },
          err => {
            console.error(err)
            this.editedCocktailData = this.initEditCocktailData()
          }))
    } else {
      this.subscription.add(
        this.cocktailService.editCocktail(this.editedCocktailData).subscribe(() => {
          window.location.reload()
        }, err => {
          console.error(err)
          this.editedCocktailData = this.initEditCocktailData()
        }))
    }
  }

  addLabel() {
    console.log("clikde")
    if (this.editedCocktailData.newLabel.length != 0 &&
      this.editedCocktailData.labels.indexOf(this.editedCocktailData.newLabel) == -1) {
      this.editedCocktailData.labels.push(this.editedCocktailData.newLabel)
    }
    this.editedCocktailData.newLabel = ''
  }

  addIngredient($event: MouseEvent) {
    if (this.editedCocktailData.ingredientList.find(i => i.ingredientId == this.ingredientFormControl.value.ingredientId) == null) {
      this.editedCocktailData.ingredientList.push(this.ingredientFormControl.value)
    }
    this.ingredientFormControl.setValue('')
    $event.preventDefault()
  }

  addKitchenware($event: MouseEvent) {
    if (this.editedCocktailData.kitchenwareList.find(i => i.kitchenwareId ==
      this.kitchenwareFormControl.value.kitchenwareId) == null) {
      this.editedCocktailData.kitchenwareList.push(this.kitchenwareFormControl.value)
    }
    this.kitchenwareFormControl.setValue('')
    $event.preventDefault()
  }

  deleteAddedIngredient(ingredientId: number) {
    this.editedCocktailData.ingredientList = this.editedCocktailData.ingredientList.filter(i => i.ingredientId != ingredientId)
  }

  displayIngredientName(ingr: IngredientName | null): string {
    if (ingr == null) return ''
    else return ingr.name
  }

  updateCanAddLabel(event : any) {
    this.canAddLabel = this.editedCocktailData.labels.indexOf(this.editedCocktailData.newLabel) !== -1
  }

  deleteAddedKitchenware(kitchenwareId: number) {
    this.editedCocktailData.kitchenwareList =
      this.editedCocktailData.kitchenwareList.filter(i => i.kitchenwareId != kitchenwareId)
  }
}
