import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {Kitchenware} from "../../models/kitchenware.model";
import {KitchenwareQuery} from "../../services/kitchenware.query";
import {KitchenwareStore} from "../../services/kitchenware.store";
import {KitchenwareService} from "../../services/kitchenware.service";
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';
import {HttpErrorResponse} from "@angular/common/http";
import {ImageUploadService} from "../../../image/services/image-upload-service";
import {FoundUsersModel} from "../../../friends/models/found-users.model";
import {KitchenwareUiModel} from "../../models/kitchenware.ui.model";


@UntilDestroy()
@Component({
  selector: 'app-kitchenware-main',
  templateUrl: './kitchenware-main.component.html',
  styleUrls: ['./kitchenware-main.component.css', '../../../../app.component.css']
})
export class KitchenwareMainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['photoId', 'kitchenwareId', 'name', 'category', 'editButton', 'statusButton'];
  kitchenware: Kitchenware[] = [];
  dataSource: any;
  imagesUrl: string[] = []
  imageNotAvailable = '../../../../assets/images/image-not-found.jpg'



  constructor(private _liveAnnouncer: LiveAnnouncer,
              private kitchenwareService: KitchenwareService,
              private kitchenwareQuery: KitchenwareQuery,
              private kitchenwareStore: KitchenwareStore,
              private cdr: ChangeDetectorRef,
              private imageService: ImageUploadService) {}

  getIngredients(): Kitchenware[]{
    return this.kitchenware;
  }

  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.kitchenwareService.fetchKitchenware()

    this.kitchenwareQuery.selectAll().pipe(
      untilDestroyed(this)
    ).subscribe(kitchenware => {
      this.dataSource = new MatTableDataSource(kitchenware)
      this.dataSource.sort = this.sort;
      this.cdr.markForCheck()
      this.imagesUrl = Array(kitchenware.length).fill(this.imageNotAvailable)
      this.setImages(kitchenware)
    })


  }

  ngAfterViewInit(): void {
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
}
