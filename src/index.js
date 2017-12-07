if (typeof window !== 'undefined') {
  // Polyfills for intersection-observer
  require('intersection-observer');
}

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

function handleViewport(Component, options, config = { disconnectOnLeave: false }) {
  class InViewport extends PureComponent {
    constructor(props) {
      super(props);
      this.observer = null;
      this.node = null;
      this.state = {
        inViewport: false
      };
      this.intersected = false;
      this.handleIntersection = this.handleIntersection.bind(this);
      this.initIntersectionObserver = this.initIntersectionObserver.bind(this);
    }

    componentDidMount() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.initIntersectionObserver();
      this.startObserver(this.node, this.observer);
    }

    componentDidUpdate() {
      // reset observer on update, to fix race condition that when observer init, the element is not in viewport
      // such as in animation
      if (!config.disconnectOnLeave && !this.intersected) {
        this.stopObserver(this.node, this.observer);
        this.startObserver(this.node, this.observer);
      }
    }

    initIntersectionObserver() {
      if (!this.observer) {
        this.observer = new IntersectionObserver(
          this.handleIntersection,
          options
        );
      }
    }

    componentWillUnmount() {
      this.stopObserver(this.node, this.observer);
    }

    startObserver(node, observer) {
      if (node && observer) {
        observer.observe(node);
      }
    }

    stopObserver(node, observer) {
      if (node && observer) {
        observer.unobserve(node);
        observer.disconnect();
        observer = null;
      }
    }

    handleIntersection(entries) {
      const { onEnterViewport, onLeaveViewport } = this.props;
      const entry = entries[0] || {};
      const { intersectionRatio } = entry;
      const inViewport = intersectionRatio > 0;

      // enter
      if (!this.intersected && inViewport) {
        this.intersected = true;
        onEnterViewport && onEnterViewport();
      }

      // leave
      if (this.intersected && !inViewport) {
        onLeaveViewport && onLeaveViewport();
        if (config.disconnectOnLeave) {
          // disconnect obsever on leave
          this.observer && this.observer.disconnect();
        } else {
          // only reset flag if config.disconnectOnLeave is true,
          // so that onEnterViewport and onLeaveViewport will only be called once
          this.intersected = false;
        }
      }

      this.setState({
        inViewport
      });
    }

    render() {
      const { onEnterViewport, onLeaveViewport, ...others } = this.props;
      return (
        <Component
          {...others}
          inViewport={this.state.inViewport}
          ref={node => {
            this.node = ReactDOM.findDOMNode(node);
          }}
          innerRef={node => {
            if (node && !this.node) {
              // handle stateless
              this.node = ReactDOM.findDOMNode(node);
              this.initIntersectionObserver();
              this.startObserver(ReactDOM.findDOMNode(node), this.observer);
            }
          }}
        />
      );
    }
  }
  return hoistNonReactStatic(InViewport, Component);
}

export default handleViewport;
