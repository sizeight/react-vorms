import React from 'react';
import PropTypes from 'prop-types';

import { Modal, ModalBody } from 'reactstrap';


const propTypes = {
  // For delete message.
  elemType: PropTypes.string.isRequired,
  // Delete button color
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']),
  // Delete button size
  size: PropTypes.oneOf(['lg', 'sm']),
  onDelete: PropTypes.func.isRequired,
};

const defaultProps = {
  color: 'link',
  size: 'sm',
};

/*
 * A reusable delete confirmation form.
 */
class DeleteForm extends React.Component {
  state = {
    showModal: false,
    isSubmitting: false,
  }

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  onSubmit = () => {
    const { onDelete } = this.props;
    this.setState({ isSubmitting: true });
    this.toggleModal();
    onDelete();
  }

  render() {
    const { elemType, color, size } = this.props;
    const { showModal, isSubmitting } = this.state;

    return (
      <div>
        <button
          type="button"
          className={`btn btn-${color}`}
          disabled={isSubmitting}
          onClick={this.toggleModal}
        >
          {size === 'sm' ? <small>Delete</small> : 'Delete'}
        </button>

        {showModal && (
          <Modal
            isOpen={showModal}
            toggle={this.toggleModal}
          >
            <ModalBody>
              <p className="mt-4 mb-4">
                {`Are you sure you want to delete this${elemType ? ` ${elemType}` : ''}?`}
              </p>
              <div className="text-right mb-2">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm mr-2"
                  onClick={this.toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={this.onSubmit}
                >
                  OK
                </button>
              </div>
            </ModalBody>
          </Modal>
        )}
      </div>
    );
  }
}

DeleteForm.propTypes = propTypes;
DeleteForm.defaultProps = defaultProps;

export default DeleteForm;
