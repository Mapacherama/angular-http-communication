import { DataService } from "./data.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Book } from "app/models/book";
import { BookTrackerError } from "../models/bookTrackerError";
describe("DataService Tests", () => {
  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  let testBooks: Book[] = [
    {
      bookID: 1,
      title: "The Final Empire",
      author: "Brandon Sanderson",
      publicationYear: 2006,
    },
    {
      bookID: 2,
      title: "The Well of Ascension",
      author: "Brandon Sanderson",
      publicationYear: 2007,
    },
    {
      bookID: 3,
      title: "The Way of Kings",
      author: "Brandon Sanderson",
      publicationYear: 2010,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    dataService = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // it('should GET all books', () => {
  //   dataService.getAllBooks()
  //   .subscribe((data: Book[]) => {
  //     expect(data.length).toBe(3);
  //   })
  // });

  // it("should return a bookTrackerError", () => {
  //   dataService.getAllBooks().subscribe(
  //     (data: Book[]) => fail("this should have been an error"),
  //     (err: BookTrackerError) => {
  //       expect(err.errorNumber).toEqual(100),
  //         expect(err.friendlyMessage).toEqual(
  //           "An error occurred retrieving data."
  //         );
  //     }
  //   );
  // });

  let booksRequest: TestRequest = httpTestingController.expectOne("/api/books");
  expect(booksRequest.request.method).toEqual("GET");

  booksRequest.flush("error", {
    status: 500,
    statusText: "Server Error",
  });
});

// });
