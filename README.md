### Angular - Auto Unsubscribe For Pros 
[![npm](https://img.shields.io/npm/dt/ngx-auto-unsubscribe.svg)]()
[![Build Status](https://semaphoreci.com/api/v1/netanel7799/ngx-auto-unsubscribe/branches/master/badge.svg)](https://semaphoreci.com/netanel7799/ngx-auto-unsubscribe)
[![Build Status](https://travis-ci.org/NetanelBasal/ngx-auto-unsubscribe.svg?branch=master)](https://travis-ci.org/NetanelBasal/ngx-auto-unsubscribe)
[![npm](https://img.shields.io/npm/l/ngx-auto-unsubscribe.svg)]()
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

#### Class decorator that will automatically unsubscribe from observables when the component destroyed

## Installation
`npm install ngx-auto-unsubscribe --save`

## Usage
```js
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

// you can also do @AutoUnsubscribe({ includeArrays: true }) 
// if you want to unsubscribe from arrays of observables (default is false)
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

