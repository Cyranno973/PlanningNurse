import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK,} from 'angular-calendar';
import {EventService} from "../services/event.service";
import {CustomDateFormatter} from '../utility/custom-date-formatter.provider';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class PlanningComponent implements OnInit {

  // gestion date fr
  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  locale: string = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  // fin gestion date

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  // view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  // viewDate: Date = new Date();

  // events: CalendarEvent[];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;


  constructor(private modal: NgbModal, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.getAllEvent().subscribe(
      events => {
        this.events = events;
      }
    )
  }


  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //     }
  //     this.viewDate = date;
  //   }
  // }
  //
  // eventTimesChanged({
  //                     event,
  //                     newStart,
  //                     newEnd,
  //                   }: CalendarEventTimesChangedEvent): void {
  //   this.eventService.events = this.eventService.events.map((iEvent) => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd,
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

  // handleEvent(action: string, event: CalendarEvent): void {
  //   this.modalData = { event, action };
  //   this.modal.open(this.modalContent, { size: 'lg' });
  // }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }
  //
  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  //
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


}

