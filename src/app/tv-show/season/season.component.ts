import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { SeasonService } from 'src/app/services/season.service';


@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss'],
})
export class SeasonComponent implements OnInit, OnDestroy {
  private toUnsubscribe$ = new Subject<void>();

  tvId = 0;
  seasonNo = 0;

  seasonDetails:any;

  isExpandCrews = false;
  selectedEpisode = "";

  constructor(private seasonService: SeasonService, private avRouter: ActivatedRoute, public _configuration: ConfigurationService, private title:Title) {
    this.tvId = this.avRouter.snapshot.params.tvId;
    this.seasonNo = this.avRouter.snapshot.params.seasonNo;
  }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getSeasonDetail();
  }

  getSeasonDetail() {
    this.seasonService
      .getSeasonDetail(this.tvId, this.seasonNo)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        console.log(data, 'Season Detail');
        this.seasonDetails = data;
       // this.selectedEpisode = data.episodes[0].name;
        //this.title.setTitle(`${data.name} - Moviest`)
      });
  }

  expandCrews(episode:string){
    this.isExpandCrews = !this.isExpandCrews;
    if(this.isExpandCrews){
      this.selectedEpisode = episode;
    }
    else{
      this.selectedEpisode = "";
    }
  }

  directedBy(cast:any[]){
    return cast.find(x=>x.job.toLowerCase() === 'director').name;
  }

  writtenBy(cast:any[]){
    return cast.find(x=>x.job.toLowerCase() === 'writer').name;
  }
}
