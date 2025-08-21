import { ECigTemplatePage } from './app.po';

describe('ECig App', function() {
  let page: ECigTemplatePage;

  beforeEach(() => {
    page = new ECigTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
