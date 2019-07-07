import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../../authentication/token.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-source-pdf',
  templateUrl: './source-pdf.component.html',
  styleUrls: ['./source-pdf.component.css']

})
export class SourcePdfComponent implements OnInit {

  public pdfOptions;

  constructor(private route: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      const source = params.source;

      const url = `${environment.rest}pdf/${source}/${id}`;
      this.pdfOptions = {
        url,
        httpHeaders: {
          token: this.tokenService.token
        }
      };

    })
  }

}
