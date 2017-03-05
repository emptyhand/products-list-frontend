import { BuyListPage } from './app.po';

describe('buy-list App', function() {
  let page: BuyListPage;

  beforeEach(() => {
    page = new BuyListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
