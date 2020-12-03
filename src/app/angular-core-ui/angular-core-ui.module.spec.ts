import { AngularCoreUIModule } from './angular-core-ui.module';

describe('AngularCoreUIModule', () => {
  let angularCoreUIModule: AngularCoreUIModule;

  beforeEach(() => {
    angularCoreUIModule = new AngularCoreUIModule();
  });

  it('should create an instance', () => {
    expect(angularCoreUIModule).toBeTruthy();
  });
});
