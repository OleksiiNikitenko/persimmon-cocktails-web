import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {Kitchenware} from "../../models/kitchenware.model";
import {KitchenwareQuery} from "../../services/kitchenware.query";
import {KitchenwareStore} from "../../services/kitchenware.store";
import {KitchenwareService} from "../../services/kitchenware.service";
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';


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

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private kitchenwareService: KitchenwareService,
              private kitchenwareQuery: KitchenwareQuery,
              private kitchenwareStore: KitchenwareStore,
              private cdr: ChangeDetectorRef) {}

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
    })
  }

  ngAfterViewInit(): void {
  }
}
