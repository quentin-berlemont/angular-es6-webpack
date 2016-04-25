import AppComponent from './app.component';
import AppTemplate from './app.html';

/** @test {AppComponent} */
describe('AppComponent', () => {
  it('includes the intended template',() => {
    expect(AppComponent.template).to.equal(AppTemplate);
  });

  it('invokes the right controller', () => {
      expect(AppComponent.controller.name).to.be.equal('AppComponent');
  });

  it('uses `controllerAs` syntax', () => {
    expect(AppComponent).to.have.property('controllerAs');
  });
});
