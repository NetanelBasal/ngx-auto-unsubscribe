### Angular - Auto unsubscribe
#### Class decorator that will automatically unsubscribe from observables and events when the component destroyed

## Installation
`npm install ngx-auto-unsubscribe --save`

## Usage
```js
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

@Component({
  selector: 'inbox'
})
@AutoUnsubscribe(blacklist = [])
export class InboxComponent {
  one$;
  two$;
  three;
  
  constructor( private store: Redux, private renderer: Renderer, private element : ElementRef ) {}
  
  ngOnInit() {
    this.one$ = store.select("data").subscribe(data => // do something);
    this.two$ = Observable.interval.subscribe(data => // do something);
    this.three = this.renderer.listen(this.element.nativeElement, this.event, e => // do something)
  }
}
```

Note: Right now there is a problem with AOT mode. You need to define the ngOnDestroy() method explicitly. Otherwise, it will not work. I hope it will be fixed soon.

