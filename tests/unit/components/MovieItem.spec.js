import FavoriteList from "@/app/components/favorite/FavoritesList";
import Vuex from "vuex";
import { expect } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";

describe("FavoriteList.vue", () => {
  let wrapper;
  let getters;
  // let actions;
  let store;
  let localVue;
  let favoriteContainer;
  let favoriteTotal;
  let removeAllBtn;
  let favoriteList;

  function setUpWrapper(itemsArr, quantity) {
    localVue = createLocalVue();
    localVue.use(Vuex);

    getters = {
      favoriteItems: () => itemsArr,
      favoriteItemsQuantity: () => quantity
    };

    store = new Vuex.Store({
      getters
    });

    wrapper = shallowMount(FavoriteList, {
      localVue,
      store,
      stubs: ["router-view"]
    });

    favoriteContainer = wrapper.find("#favorite");
    favoriteTotal = wrapper.find(".favorite-total");
    removeAllBtn = wrapper.find(".favorite-remove-all--text");
    favoriteList = wrapper.find(".favorite-list");
  }

  describe("the user doesn't have bookmarked films in favorite list", () => {
    it('should display the "Add some items..." warning text', () => {
      setUpWrapper([], 0);

      expect(favoriteContainer.html()).to
        .contain(`<p data-v-c486f738="" class="favorite-empty-text has-text-centered">
    Add some items to the favorite list!
  </p>`);
    });

    it('should display "Total Quantity: 0"', () => {
      setUpWrapper([], 0);

      expect(favoriteTotal.html()).to.contain(
        `<span data-v-c486f738="" class="has-text-weight-bold">0</span>`
      );
    });

    it('should disable "Remove all" button', () => {
      setUpWrapper([], 0);

      expect(removeAllBtn.element.disabled).to.be.true;
    });
  });

  describe("the user has bookmarked films in his favorite list", () => {
    it("should display movie items when", () => {
      setUpWrapper(["Venom"], 1);
      expect(favoriteList.html()).to.contain(
        `<favoritelistitem-stub data-v-c486f738="" item="Venom"></favoritelistitem-stub>`
      );
    });

    it('should not display the "Add some items..." warning text', () => {
      setUpWrapper(["Venom", "Ant-Man and the Wasp"], 2);

      expect(favoriteContainer.html()).to.not
        .contain(`<p data-v-c486f738="" class="favorite-empty-text has-text-centered">
    Add some items to the favorite list!
  </p>`);
    });

    it('should display "Total Quantity: 2"', () => {
      setUpWrapper(["Venom", "Ant-Man and the Wasp"], 2);

      expect(favoriteTotal.html()).to.contain(
        `<span data-v-c486f738="" class="has-text-weight-bold">2</span>`
      );
    });

    it('should enable "Remove all" button', () => {
      setUpWrapper(["Venom", "Ant-Man and the Wasp"], 2);

      expect(removeAllBtn.element.disabled).to.be.false;
    });
  });
});
