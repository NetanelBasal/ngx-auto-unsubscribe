import { AutoUnsubscribe } from '../src/auto-unsubscribe';


const mockObservable = {
  unsubscribe: jest.fn()
}

const mockObservable2 = {
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
      obs =  mockObservable;
    }

    new TodsComponent()['ngOnDestroy']();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should not warn when implement on destroy', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    @AutoUnsubscribe()
    class TodsComponent {
      obs =  mockObservable;
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
      obs =  mockObservable;
    }
    
    new TodsComponent()['ngOnDestroy']();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should call unsubscribe on destroy', () => {
    @AutoUnsubscribe()
    class TodsComponent {
      obs =  mockObservable;
      ngOnDestroy() {}
    }

    new TodsComponent().ngOnDestroy();
    expect(mockObservable.unsubscribe.mock.calls.length).toBe(1);
  });

  it('should work with multiple observables', () => {
    @AutoUnsubscribe()
    class TodsComponent {
      obs =  mockObservable;
      obs2 =  mockObservable2;
      ngOnDestroy() {}
    }

    new TodsComponent().ngOnDestroy();
    expect(mockObservable.unsubscribe.mock.calls.length).toBe(1);
    expect(mockObservable2.unsubscribe.mock.calls.length).toBe(1);
  });

  it('should not unsubscribe if in blacklist', () => {
    @AutoUnsubscribe({blackList: ['obs']})
    class TodsComponent {
      obs =  mockObservable;
      obs2 =  mockObservable2;      
      ngOnDestroy() {}
    }

    new TodsComponent().ngOnDestroy();
    expect(mockObservable.unsubscribe.mock.calls.length).toBe(0);
    expect(mockObservable2.unsubscribe.mock.calls.length).toBe(1);    
  });

  it('should unsubscribe an array of subscriptions', () => {
    @AutoUnsubscribe({ includeArrays: true })
    class TodsComponent {
      obs = Array(3).fill(mockObservable);
      ngOnDestroy() { }
    }

    new TodsComponent().ngOnDestroy();
    expect(mockObservable.unsubscribe.mock.calls.length).toBe(3);
  });


});
