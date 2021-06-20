import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  private toUnsubscribe$ = new Subject();

  constructor(private _configurationService: ConfigurationService) {}
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit(): void {
    // this.getConfiguration();
    // this.getCountries();
    // this.getPrimaryTranslations();
  }

  // getConfiguration() {
  //   this._configurationService
  //     .getConfiguration()
  //     .pipe(takeUntil(this.toUnsubscribe$))
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

  // getCountries() {
  //   this._configurationService
  //     .getCountries()
  //     .pipe(takeUntil(this.toUnsubscribe$))
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

  // getPrimaryTranslations(){
  //   this._configurationService.getPrimaryTranslation().pipe(takeUntil(this.toUnsubscribe$)).subscribe((data)=>{
  //     console.log(data);
  //   })
  // }
}
