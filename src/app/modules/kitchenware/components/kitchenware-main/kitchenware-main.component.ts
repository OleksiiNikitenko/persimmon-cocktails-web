import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {Kitchenware} from "../../models/kitchenware.model";
import {KitchenwareQuery} from "../../services/kitchenware.query";
import {KitchenwareStore} from "../../services/kitchenware.store";
import {KitchenwareService} from "../../services/kitchenware.service";
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageUploadService} from "../../../image/services/image-upload-service";
import {getUser} from "../../../../core/models/user";
import {Roles} from "../../../../core/models/roles";
import {first} from "rxjs/operators";


@UntilDestroy()
@Component({
  selector: 'app-kitchenware-main',
  templateUrl: './kitchenware-main.component.html',
  styleUrls: ['./kitchenware-main.component.css', '../../../../app.component.css']
})
export class KitchenwareMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'name', 'category', 'dynamicButton', 'statusButton'];
  canEdit: boolean = getUser().role === Roles.Moderator || getUser().role === Roles.Admin
  kitchenware: Kitchenware[] = [];
  dataSource: any;
  searchKitchenwareForm: FormGroup | any;
  searchKitchenwareRequest: string = "";
  kitchenwareWasSearched: boolean = false;
  imagesUrl: string[] = [];
  imageNotAvailable = 'https://i.ibb.co/16mJRVD/67eb9e144841.jpg'
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  toggle = true;
  statusBtn:string[] = [];
  status: boolean[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private kitchenwareService: KitchenwareService,
              private kitchenwareQuery: KitchenwareQuery,
              private kitchenwareStore: KitchenwareStore,
              private cdr: ChangeDetectorRef,
              private imageService: ImageUploadService) {}


  getKitchenware(): Kitchenware[]{
    this.handleKitchenwareStatus()
    return this.kitchenware;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.kitchenwareService.fetchKitchenware()
    this.searchKitchenwareForm = new FormGroup({
      name: new FormControl('')
    });
    this.kitchenwareQuery.selectAll().pipe(
      untilDestroyed(this)
    ).subscribe(kitchenware => {
      this.kitchenware = kitchenware
      this.dataSource = new MatTableDataSource(kitchenware)
      this.dataSource.sort = this.sort;
      this.cdr.markForCheck()
      console.log(kitchenware)
      this.imagesUrl = Array(kitchenware.length).fill(this.imageNotAvailable)
      this.setImages(kitchenware)
      this.statusBtn=Array(kitchenware.length).fill('Enabled')
      this.handleKitchenwareStatus()
    })
  }

  getKitchenwareFromDB(): void{
    this.kitchenwareService.fetchKitchenware()
    this.kitchenwareQuery.selectAll().pipe(
      untilDestroyed(this)
    ).subscribe(kitchenware => {
      this.kitchenware = kitchenware
      this.dataSource = new MatTableDataSource(kitchenware)
      this.dataSource.sort = this.sort;
      this.cdr.markForCheck()
      this.statusBtn=Array(kitchenware.length).fill('Enabled')
      this.handleKitchenwareStatus()
    })
  }

  checkValue(event: KeyboardEvent) {
    return event.code.match(/^[a-zA-Z0-9 -]*$/) ?
      event.code : event.preventDefault();
  }

  handleKitchenwareStatus(){
    for (let i = 0; i < this.kitchenware.length; i++) {
      if (!this.kitchenware[i].active){
        this.statusBtn[i]='Disabled';
      }
      else  this.statusBtn[i]='Enabled';

    }
  }
  getImageByIdKitchenware(imageId: number, i: number) {
    if (imageId != null) {
      this.imageService.getImageById(imageId).subscribe(
        (response) => {
          if (response != null)
            this.imagesUrl[i] = response.urlMiddle
          else
            this.imagesUrl[i] = this.imageNotAvailable
        },
        (error: HttpErrorResponse) => {
          // alert(error.error.message);
          throw error;
        }
      );
    }
  }
  setImages(kitchenware: any) {
    for (let i = 0; i < kitchenware.length; i++) {
      this.getImageByIdKitchenware(kitchenware[i].photoId, i)
    }
  }
  ngAfterViewInit(): void {
  }

  public changeStatus(kitchenwareId:number, index: number) {
    console.log(this.kitchenware)
    if(this.kitchenware.length != 0)
    {
      this.kitchenwareService.changeStatus(kitchenwareId, this.kitchenware[index].active).pipe(first()).subscribe((response: any)=>{
        this.getKitchenwareFromDB()
      })
      if (this.statusBtn[index]=='Enabled') {
        this.statusBtn[index] ='Disabled';
      }
      else {
        this.statusBtn[index] = 'Enabled';
      }
    }
  }

  getKitchenwareByName(name: string): void {
    if (this.searchKitchenwareForm.valid && name!='') {
      this.kitchenwareService
        .searchKitchenware(name)
        .subscribe((kitchenware: Kitchenware[]) => {
          this.kitchenware = kitchenware;
          this.dataSource = new MatTableDataSource(this.kitchenware);
        });
    }
    else{
      this.getKitchenwareFromDB()
    }
  }

  fieldKitchenwareChanged(name: string): void {
    if (name.length == 0) {
      this.kitchenware = [];
      this.dataSource = new MatTableDataSource(this.kitchenware);
    }
  }
}

