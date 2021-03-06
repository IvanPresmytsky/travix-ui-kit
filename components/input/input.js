import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * General Input component.
 */
class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };
  }

  handleInputBlur = (e) => {
    this.setState({ isFocused: false });
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  };

  handleInputChange = (e) => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  };

  handleInputFocus = (e) => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ isFocused: true });

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
  };

  ref = (elem) => {
    this.input = elem;
  }

  blur() {
    if (this.input) {
      this.input.blur();
    }
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  select() {
    if (this.input) {
      this.input.select();
    }
  }

  renderStatusIcon() {
    return this.props.status ? <span className="ui-input-status" /> : null;
  }

  render() {
    const {
      dataAttrs = {},
      disabled,
      multiline,
      status,
      value,
      ...otherProps
    } = this.props;
    const mods = this.props.mods ? this.props.mods.slice() : [];

    (!this.state.isFocused && status) && mods.push(status);
    this.state.isFocused && mods.push('focused');
    const className = getClassNamesWithMods('ui-input', mods);

    let Element = multiline ? 'textarea' : 'input';

    return (
      <div className="ui-input-container">
        <Element
          {...getDataAttributes(dataAttrs)}
          {...otherProps}
          className={className}
          disabled={disabled}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          ref={this.ref}
          value={value}
        />
        {this.renderStatusIcon()}
      </div>
    );
  }
}

Input.defaultProps = {
  disabled: false,
  multiline: false,
};

Input.propTypes = {
  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /**
   * Current activity state of input.
   */
  disabled: PropTypes.bool,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Multiline mode (textarea).
   */
  multiline: PropTypes.bool,
  /**
   * Name applied to the input.
   */
  name: PropTypes.string,
  /**
   * The callback for onBlur event.
   */
  onBlur: PropTypes.func,
  /**
   * The callback for onChange event.
   */
  onChange: PropTypes.func,
  /**
   * The callback for onFocus event.
   */
  onFocus: PropTypes.func,
  /**
   * The status of the text field.
   */
  status: PropTypes.oneOf(['error', 'valid']),
  /**
   * The value of the text field.
   */
  value: PropTypes.string,
};

export default Input;
