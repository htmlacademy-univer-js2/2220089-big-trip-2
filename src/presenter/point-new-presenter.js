import PointEditView from '../view/point-edit-view';
import { RenderPosition, remove, render } from '../framework/render';
import { UserAction, UpdateType, TYPES } from '../const';
import dayjs from 'dayjs';
import { isEscapeKey } from '../utils/common';


export default class PointNewPresenter{
    #pointsListContainer;
    #addFormComponent = null;

    #offersByType;
    #destinations;

    #changeData;
    #destroyCallback = null;
    constructor(pointsListContainer, offersByType, destinations, changeData) {
      this.#pointsListContainer = pointsListContainer;

      this.#offersByType = offersByType;
      this.#destinations = destinations;

      this.#changeData = changeData;
    }

    init(destroyCallback) {
      this.#destroyCallback = destroyCallback;

      this.#renderAddFormComponent();
    }

    #renderAddFormComponent() {
      if(this.#addFormComponent !== null) {
        return;
      }

      this.#addFormComponent = new PointEditView(this.#generateDefaultPoint(), this.#offersByType, this.#destinations, true);

      this.#addFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
      this.#addFormComponent.setFormDeleteHandler(this.#handleDeleteButtonClick);

      render(this.#addFormComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);

      document.addEventListener('keydown', this.#escapeKeyDownHandler);
    }

    destroy() {
      if(this.#addFormComponent === null) {
        remove(this.#addFormComponent);
      }

      this.#destroyCallback?.();

      remove(this.#addFormComponent);
      this.#addFormComponent = null;

      document.removeEventListener('keydown', this.#escapeKeyDownHandler);
    }

    setSaving = () => {
      this.#addFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    };

    setAborting = () => {
      const resetFormState = () => {
        this.#addFormComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      };

      this.#addFormComponent.shake(resetFormState);
    };

    #handleFormSubmit = (point) => {
      this.#changeData(UserAction.ADD_POINT, UpdateType.MINOR, point);
    };

    #handleDeleteButtonClick = () => {
      this.destroy();
    };

    #escapeKeyDownHandler = (evt) => {
      if(isEscapeKey(evt)) {
        evt.preventDefault();
        this.destroy();
      }
    };

    #generateDefaultPoint(){
      return{
        id: 0,
        basePrice: 0,
        dateFrom: dayjs().toString(),
        dateTo: dayjs().toString(),
        destination: this.#destinations[0].id,
        isFavorite: false,
        offers: [],
        type: TYPES[0],
      };
    }
}
