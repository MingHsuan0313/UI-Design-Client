import { AngularOfficialModule } from './angular-official.module';

describe('AngularOfficialModule', () => {
  let angularOfficialModule: AngularOfficialModule;

  beforeEach(() => {
    angularOfficialModule = new AngularOfficialModule();
  });

  it('should create an instance', () => {
    expect(angularOfficialModule).toBeTruthy();
  });
});
