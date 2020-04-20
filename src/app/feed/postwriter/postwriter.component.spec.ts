import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostwriterComponent } from './postwriter.component';

describe('PostwriterComponent', () => {
  let component: PostwriterComponent;
  let fixture: ComponentFixture<PostwriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostwriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostwriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
