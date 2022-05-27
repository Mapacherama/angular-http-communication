import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Book } from "app/models/book";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { BookTrackerError } from "../models/bookTrackerError";
import { DataService } from "./data.service";
@Injectable({
  providedIn: "root",
})
export class BooksResolverService
  implements Resolve<Book[] | BookTrackerError>
{
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<BookTrackerError | Book[]>
    | Promise<BookTrackerError | Book[]> {
    return this.dataService.getAllBooks().pipe(catchError((err) => of(err)));
  }
}
