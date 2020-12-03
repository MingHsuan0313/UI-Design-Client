import { AngularThirdPartyModule } from './angular-third-party.module';

describe('AngularThirdPartyModule', () => {
  let angularThirdPartyModule: AngularThirdPartyModule;

  beforeEach(() => {
    angularThirdPartyModule = new AngularThirdPartyModule();
  });

  it('should create an instance', () => {
    expect(angularThirdPartyModule).toBeTruthy();
  });
});
