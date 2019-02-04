### Angular - Auto Unsubscribe For Pros

[![npm](https://img.shields.io/npm/dt/ngx-auto-unsubscribe.svg)]()
[![Build Status](https://semaphoreci.com/api/v1/netanel7799/ngx-auto-unsubscribe/branches/master/badge.svg)](https://semaphoreci.com/netanel7799/ngx-auto-unsubscribe)
[![Build Status](https://travis-ci.org/NetanelBasal/ngx-auto-unsubscribe.svg?branch=master)](https://travis-ci.org/NetanelBasal/ngx-auto-unsubscribe)
[![npm](https://img.shields.io/npm/l/ngx-auto-unsubscribe.svg)]()
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

#### Class decorator that will automatically unsubscribe from observable subscriptions when the component is destroyed

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

  // This method must be present, even if empty.
  ngOnDestroy() {
    // We'll throw an error if it doesn't
  }
}
```

### Options

| Option      | Description                                            | Default Value |
| ----------- | ------------------------------------------------------ | ------------- |
| `arrayName` | unsubscribe from subscriptions only in specified array | `''`          |
| `blackList` | an array of properties to exclude                      | `[]`          |
| `event`     | a name of event callback to execute on                 | `ngOnDestroy` |

Note: `blackList` is ignored if `arrayName` is specified.

### Similar projects

You can also use https://github.com/NetanelBasal/ngx-take-until-destroy.
