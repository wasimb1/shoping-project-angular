import { TestBed } from '@angular/core/testing';

import { RecipeBookService } from '../recipe-book.service';

describe('RecipeListService', () => {
  let service: RecipeBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
