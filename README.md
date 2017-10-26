### Angular - Auto Unsubscribe For Pros 
[![Build Status](https://travis-ci.org/NetanelBasal/ngx-auto-unsubscribe.svg?branch=master)](https://travis-ci.org/NetanelBasal/ngx-auto-unsubscribe)
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

#### Class decorator that will automatically unsubscribe from observables when the component destroyed

## Installation
`npm install ngx-auto-unsubscribe --save`

## Usage
```js
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'inbox'
})
export class InboxComponent {
  one: Subscription;
  two: Subscription;
  
  constructor( private store: Store<any>, private element : ElementRef ) {}
  
  ngOnInit() {
    this.one = store.select("data").subscribe(data => // do something);
    this.two = Observable.interval.subscribe(data => // do something);
  }
  
  // If you work with AOT this method must be present, even if empty! 
  // Otherwise 'ng build --prod' will optimize away any calls to ngOnDestroy, 
  // even if the method is added by the @AutoUnsubscribe decorator
  ngOnDestroy() {
    // You can also do whatever you need here
  }
}
```

