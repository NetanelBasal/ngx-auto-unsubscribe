import { AutoUnsubscribe } from '../src/auto-unsubscribe';


const mockSubscription = {
  unsubscribe: jest.fn()
}

const mockSubscription2 = {
  unsubscribe: jest.fn()
}

describe('@AutoUnsubscribe', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should warn when not implement on destroy', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    @AutoUnsubscribe()
    class TodsComponent {
      sub =  mockSubscription;
    }

    new TodsComponent()['ngOnDestroy']();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should not warn when implement on destroy', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    @AutoUnsubscribe()
    class TodsComponent {
      sub =  mockSubscription;
      ngOnDestroy() {}
    }

    new TodsComponent()['ngOnDestroy']();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should not warn when disable AOT mode', () => {
    window['disableAutoUnsubscribeAot'] = true;
    const consoleSpy = jest.spyOn(console, 'warn');
    @AutoUnsubscribe()
    class TodsComponent {
      sub =  mockSubscription;
    }

    new TodsComponent()['ngOnDestroy']();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should not warn when disable AOT mode with typo', () => {
    window['disableAuthUnsubscribeAot'] = true;
    const consoleSpy = jest.spyOn(console, 'warn');
    @AutoUnsubscribe()
    class TodsComponent {
      sub =  mockSubscription;
    }

    new TodsComponent()['ngOnDestroy']();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should call unsubscribe on destroy', () => {
    @AutoUnsubscribe()
    class TodsComponent {
      sub =  mockSubscription;
      ngOnDestroy() {}
    }

    new TodsComponent().ngOnDestroy();
    expect(mockSubscription.unsubscribe.mock.calls.length).toBe(1);
  });

  it('should call unsubscribe on custom event callback', () => {
    @AutoUnsubscribe({event: 'ionViewDidLeave'})
    class TodsComponent {
      sub =  mockSubscription;
      ngOnDestroy() {}
      ionViewDidLeave() {}
    }

    const cmp = new TodsComponent();

    cmp.ngOnDestroy();
    expect(mockSubscription.unsubscribe.mock.calls.length).toBe(0);

    cmp.ionViewDidLeave();
    expect(mockSubscription.unsubscribe.mock.calls.length).toBe(1);
  });

  it('should work with multiple observables', () => {
    @AutoUnsubscribe()
    class TodsComponent {
      sub =  mockSubscription;
      sub2 =  mockSubscription2;
      ngOnDestroy() {}
    }

    new TodsComponent().ngOnDestroy();
    expect(mockSubscription.unsubscribe.mock.calls.length).toBe(1);
    expect(mockSubscription2.unsubscribe.mock.calls.length).toBe(1);
  });

  it('should NOT unsubscribe if property is in blacklist', () => {
    @AutoUnsubscribe({blackList: ['sub']})
    class TodsComponent {
      sub =  mockSubscription;
      sub2 =  mockSubscription2;
      ngOnDestroy() {}
    }

    new TodsComponent().ngOnDestroy();
    expect(mockSubscription.unsubscribe.mock.calls.length).toBe(0);
    expect(mockSubscription2.unsubscribe.mock.calls.length).toBe(1);
  });

  describe('includeArrays', () => {
    it('should unsubscribe an array of subscriptions', () => {
      @AutoUnsubscribe({ includeArrays: true })
      class TodsComponent {
        subs = Array(3).fill(mockSubscription);
        ngOnDestroy() { }
      }
  
      new TodsComponent().ngOnDestroy();
      expect(mockSubscription.unsubscribe.mock.calls.length).toBe(3);
    });

    it('should NOT unsubscribe if array is in blacklist', () => {
      @AutoUnsubscribe({ includeArrays: true, blackList: ['subs'] })
      class TodsComponent {
        subs = Array(3).fill(mockSubscription);
        subs2 = Array(3).fill(mockSubscription2);
        ngOnDestroy() {}
      }
  
      new TodsComponent().ngOnDestroy();
      expect(mockSubscription.unsubscribe.mock.calls.length).toBe(0);
      expect(mockSubscription2.unsubscribe.mock.calls.length).toBe(3);
    });
  });

  describe('arrayName', () => {

    beforeEach(() => {
      @AutoUnsubscribe({ arrayName: 'subscriptions' })
      class TodsComponent {
        subscriptions = Array(3).fill(mockSubscription);
        subs = Array(3).fill(mockSubscription2);
        ngOnDestroy() { }
      }
  
      new TodsComponent().ngOnDestroy();
    });

    it(`should unsubscribe from subscriptions in specified array`, () => {
      expect(mockSubscription.unsubscribe.mock.calls.length).toBe(3);
    });

    it(`should not unsubscribe from subscriptions in other arrays`, () => {
      expect(mockSubscription2.unsubscribe.mock.calls.length).toBe(0);
    });
    
  });
});
