### Angular - Auto Unsubscribe For Pros 
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
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

  // If you work with AOT this method must be present, even if empty! 
  // Otherwise 'ng build --prod' will optimize away any calls to ngOnDestroy, 
  // even if the method is added by the @AutoUnsubscribe decorator
  ngOnDestroy() {
    // You can also do whatever you need here
  }
}
```

### Options

| Option            | Description                                                   | Default Value     |
| ----------------- | ------------------------------------------------------------- | ----------------  |
| `includeArrays`   | unsubscribe from arrays of subscriptions                      | `false`           |
| `arrayName`       | unsubscribe from subscriptions only in specified array        | `''`              |
| `blackList`       | an array of properties to exclude                             | `[]`              |
| `event`           | a name of event callback to execute on                        | `ngOnDestroy`     |

Note: `blackList` is ignored if `arrayName` is specified.

### Similar projects

You can also use https://github.com/NetanelBasal/ngx-take-until-destroy.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/2690948?v=4" width="100px;"/><br /><sub><b>misaizdaleka</b></sub>](https://github.com/misaizdaleka)<br />[💻](https://github.com/Netanel Basal/ngx-auto-unsubscribe/commits?author=misaizdaleka "Code") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!