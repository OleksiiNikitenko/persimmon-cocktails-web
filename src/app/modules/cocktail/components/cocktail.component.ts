import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CocktailCategory, EditCocktail, FullCocktail, mockCocktail} from "../models/fullCocktail";
import {CocktailService} from "../services/cocktail.service";
import {HttpErrorResponse} from "@angular/common/http";
import {getUser} from "../../../core/models/user";
import {Roles} from "../../../core/models/roles";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {columnsToSortBy} from "../../cocktails/models/query";
import {Observable, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, first, startWith, switchMap} from "rxjs/operators";
import {IngredientName, KitchenwareName} from "../../cocktails/models/IngredientName";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialog} from "../../errors-popup/errors-popup.component";
import {ImageModel} from "../../image/model/image.model";
import {ImageUploadService} from "../../image/services/image-upload-service";

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
  defaultKitchenwareUrl: string = "https://3.imimg.com/data3/FD/AF/MY-3872364/arecanut-round-palm-leaf-plate-500x500.jpg"
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
  private file: File | undefined;

  constructor(private activateRoute: ActivatedRoute,
              private cocktailService: CocktailService,
              private router: Router,
              private dialog: MatDialog,
              private imageService: ImageUploadService) {
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
                error => {
                  this.handleFetchError(error)
                }
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
            error => {
              this.handleFetchError(error)
            }))


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
    this.dialog.open(ErrorDialog, {data: {message: error.error.message}})
  }

  likeCocktail($event: MouseEvent) {
    this.subscription.add(this.cocktailService.likeCocktail(this.cocktailData.dishId)
      .subscribe(() => {
          this.cocktailData.likes += 1
          this.cocktailData.hasLike = true
        },
        error => {
          this.handleFetchError(error)
        }))
    $event.preventDefault()
  }

  divideReceiptIntoLines(receipt: string): string[] {
    return receipt.split('\n\n')
  }

  deleteCocktail(dishId: number, $event: MouseEvent) {
    this.subscription.add(
      this.cocktailService.deleteCocktail(dishId).subscribe(() => {
          this.router.navigate(['/cocktails'])
        },
        error => {
          this.handleFetchError(error)
        }))
    $event.preventDefault()
  }

  private initEditForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.editedCocktailData.name, [Validators.required,
        Validators.pattern('^[a-zA-Z0-9 -]{2,255}$')]),
      description: new FormControl(this.editedCocktailData.description),
      receipt: new FormControl(this.editedCocktailData.receipt, [Validators.required]),
      isActive: new FormControl(this.editedCocktailData.isActive),
      dishCategoryId: new FormControl(this.editedCocktailData.dishCategoryId),
      newLabel: new FormControl(this.editedCocktailData.newLabel)
    });
  }

  goToMode(view: boolean, $event: MouseEvent) {
    $event.preventDefault()
    if (!view) {
      this.editedCocktailData = this.initEditCocktailData()
      this.editCocktailForm = this.initEditForm()
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
          name: c.name,
          image: c.image
        }
      }),
      newLabel: '',
      image: this.cocktailData.image
    }
  }

  private updateAllCategories(res: CocktailCategory[]) {
    this.allCategories = res;
    this.allCategories.push({categoryId: -1, categoryName: "Nothing"})
  }

  deleteLabel(label: string, $event: MouseEvent) {
    this.editedCocktailData.labels = this.editedCocktailData.labels.filter(l => l != label)
    $event.preventDefault()
  }

  submitSaveForm() {
    if (this.isNew) {
      this.subscription.add(
        this.cocktailService.createCocktail(this.editedCocktailData).subscribe(res => {
            // this.router.navigate(['/cocktails/', res.dishId])
            document.location = '/cocktails/' + res.dishId
          },
          err => {
            this.editedCocktailData = this.initEditCocktailData()
            this.handleFetchError(err)
          }))
    } else {
      this.subscription.add(
        this.cocktailService.editCocktail(this.editedCocktailData).subscribe(() => {
          window.location.reload()
        }, err => {
          this.editedCocktailData = this.initEditCocktailData()
          this.handleFetchError(err)
        }))
    }
  }

  addLabel($event: MouseEvent) {
    if (this.editedCocktailData.newLabel.length != 0 &&
      this.editedCocktailData.labels.indexOf(this.editedCocktailData.newLabel) == -1) {
      this.editedCocktailData.labels.push(this.editedCocktailData.newLabel)
    }
    this.editedCocktailData.newLabel = ''
    $event.preventDefault()
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

  deleteAddedIngredient(ingredientId: number, $event: MouseEvent) {
    this.editedCocktailData.ingredientList = this.editedCocktailData.ingredientList.filter(i => i.ingredientId != ingredientId)
    $event.preventDefault()
  }

  displayIngredientName(ingr: IngredientName | null): string {
    if (ingr == null) return ''
    else return ingr.name
  }

  updateCanAddLabel(event: any) {
    this.canAddLabel = this.editedCocktailData.labels.indexOf(this.editedCocktailData.newLabel) !== -1
  }

    deleteAddedKitchenware(kitchenwareId: number, $event: MouseEvent) {
    this.editedCocktailData.kitchenwareList =
      this.editedCocktailData.kitchenwareList.filter(i => i.kitchenwareId != kitchenwareId);
    $event.preventDefault()
  }

  onChangePhoto($event: any) {
    this.file = $event.target.files[0];
    $event.preventDefault()
  }

  onPhotoUpload($event: MouseEvent) {
    $event.preventDefault()
    if (this.file != undefined) {
      // this.loading = !this.loading;
      console.log(this.file);
      this.imageService.upload(this.file).subscribe(
        (event: ImageModel) => {
          if (typeof (event) === 'object') {
            // this.loading = false;
            this.editedCocktailData.image = event
          }
        }
      );
    }
  }
}

