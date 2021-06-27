import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(
    value: any,
    type: string
  ): SafeHtml | SafeResourceUrl | SafeScript | SafeStyle | SafeUrl {
    console.log(value);
    switch (type) {
      case 'html':
        return this.domSanitizer.bypassSecurityTrustHtml(value);
      case 'resourceUrl':
        return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
      case 'script':
        return this.domSanitizer.bypassSecurityTrustScript(value);
      case 'style':
        return this.domSanitizer.bypassSecurityTrustStyle(value);
      case 'url':
        return this.domSanitizer.bypassSecurityTrustUrl(value);
      default:
        throw new Error(`invalid safe type specified: ${type}`);
    }
  }
}
