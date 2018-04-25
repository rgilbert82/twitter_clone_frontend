import React from 'react';

export default class DarkLayer extends React.Component {
  constructor(props) {
    super(props);
    this.closeLayer = this.closeLayer.bind(this);
  }

  closeLayer(e) {
    e.preventDefault();
    this.props.closeModal();
  }

  render() {
    return (
      <div onClick={this.closeLayer} className="dark_layer">
        <a href="" className="close_modal">close</a>
      </div>
    );
  }
}
