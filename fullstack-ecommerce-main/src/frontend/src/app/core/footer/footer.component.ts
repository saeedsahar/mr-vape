import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() brandName!: string;
  private year = new Date().getFullYear();

  project = '';
  copyrightLine1 = `Powered by Saher©${this.year}.`;
  copyrightLine2 = '';
}
